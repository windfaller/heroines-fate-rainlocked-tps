#!/usr/bin/env python3
"""Generate HD forest, tree/torii cutouts, and additive VFX sprites."""
from __future__ import annotations

import math
import os

import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ENV = os.path.join(ROOT, "public/runtime-assets/env")
FX = os.path.join(ROOT, "public/runtime-assets/fx")
os.makedirs(FX, exist_ok=True)


def save_png(arr: np.ndarray, path: str) -> None:
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    Image.fromarray(arr, "RGBA").save(path, optimize=True)
    im = Image.open(path)
    print(f"wrote {path} {im.size} {im.mode}")


def save_jpg(im: Image.Image, path: str, quality: int = 90) -> None:
    im.save(path, quality=quality, optimize=True, subsampling=1)
    print(f"wrote {path} {im.size} {im.mode} q{quality}")


def upscale_forest() -> None:
    for name in ("forest-far", "forest-mid"):
        src = Image.open(os.path.join(ENV, f"{name}.jpg")).convert("RGB")
        w, h = src.size
        out_w, out_h = max(3584, w * 2), max(2016, h * 2)
        hd = src.resize((out_w, out_h), Image.Resampling.LANCZOS)
        save_jpg(hd, os.path.join(ENV, f"{name}-hd.jpg"), 90)


def key_torii() -> None:
    src = Image.open(os.path.join(ENV, "torii-ruin.png")).convert("RGBA")
    arr = np.asarray(src).astype(np.float32)
    h, w, _ = arr.shape
    rgb = arr[..., :3]
    a = arr[..., 3]
    luma = rgb.mean(axis=2)
    # Background: already transparent OR near-black connected to the border.
    bg = (a < 12) | (luma < 14)
    vis = ~bg
    # Flood-fill from all border pixels that look like background.
    from collections import deque

    seen = np.zeros((h, w), dtype=np.uint8)
    q: deque[tuple[int, int]] = deque()

    def push(y: int, x: int) -> None:
        if seen[y, x]:
            return
        if not bg[y, x] and not (a[y, x] < 40 and luma[y, x] < 22):
            return
        seen[y, x] = 1
        q.append((y, x))

    for x in range(w):
        push(0, x)
        push(h - 1, x)
    for y in range(h):
        push(y, 0)
        push(y, w - 1)
    while q:
        y, x = q.popleft()
        if y > 0:
            push(y - 1, x)
        if y + 1 < h:
            push(y + 1, x)
        if x > 0:
            push(y, x - 1)
        if x + 1 < w:
            push(y, x + 1)

    # Soften: dilate fill slightly then blur alpha
    fill = seen.astype(np.float32)
    # Keep original transparent areas as transparent even if not reached (holes).
    fill = np.maximum(fill, (a < 12).astype(np.float32))
    alpha = (1.0 - fill) * np.maximum(a, vis.astype(np.float32) * 255.0)
    # Pixels that were opaque and not filled keep their alpha
    alpha = np.where(seen.astype(bool), 0.0, np.maximum(a, 0.0))
    # Also punch remaining fully-transparent magenta leftovers
    alpha = np.where(a < 8, 0.0, alpha)

    img = arr.copy()
    img[..., 3] = alpha
    # Kill RGB fringe on fully transparent pixels
    trans = img[..., 3] < 8
    img[trans, :3] = 0
    # Slight alpha blur for edge
    a_img = Image.fromarray(np.clip(img[..., 3], 0, 255).astype(np.uint8), "L")
    a_blur = a_img.filter(ImageFilter.GaussianBlur(radius=0.8))
    # Don't blur interior; only mix near edges
    a0 = np.asarray(a_img).astype(np.float32)
    a1 = np.asarray(a_blur).astype(np.float32)
    edge = (a0 > 8) & (a0 < 250)
    mixed = np.where(edge, 0.35 * a0 + 0.65 * a1, a0)
    img[..., 3] = mixed
    save_png(img, os.path.join(ENV, "torii-cutout.png"))


def hash2(x: np.ndarray, y: np.ndarray, seed: float) -> np.ndarray:
    n = np.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453
    return n - np.floor(n)


def pine_mask(w: int, h: int, variant: int) -> np.ndarray:
    """Return float alpha 0..1, feet at bottom."""
    ys = np.linspace(0, 1, h)[:, None]
    xs = np.linspace(-1, 1, w)[None, :]
    # 0 at top, 1 at bottom
    t = ys
    rng = np.random.RandomState(110 + variant)
    # Trunk band
    lean = (-0.04, 0.03, -0.02, 0.05)[variant]
    trunk_x = lean * (1 - t)
    trunk_w = (0.055, 0.07, 0.05, 0.08)[variant] * (0.55 + 0.7 * t)
    trunk = np.exp(-0.5 * ((xs - trunk_x) / np.maximum(trunk_w, 1e-4)) ** 2)
    trunk *= np.clip((t - 0.18) / 0.08, 0, 1)

    # Stacked canopy layers (pine triangles with droop)
    canopy = np.zeros((h, w), dtype=np.float32)
    n_layers = (9, 8, 11, 7)[variant]
    top = (0.02, 0.04, 0.015, 0.05)[variant]
    bottom = (0.62, 0.58, 0.66, 0.55)[variant]
    for i in range(n_layers):
        u = i / max(n_layers - 1, 1)
        cy = top + (bottom - top) * (u ** 0.85)
        # wider toward base
        half = (0.10 + 0.78 * (u ** 0.75)) * (0.72, 0.95, 0.62, 1.05)[variant]
        layer_h = (0.10 + 0.04 * (1 - u)) * (1.05, 1.15, 0.9, 1.2)[variant]
        # triangle: width shrinks toward top of layer
        local = (cy - t) / layer_h  # 0 at bottom of layer, 1 at top
        in_layer = (local >= -0.15) & (local <= 1.05)
        width_here = half * np.clip(1.05 - local, 0, 1.2) ** 0.85
        # droop / scallop using cosine
        scallop = 0.08 * np.cos(xs * (7 + variant * 2) * math.pi + i * 1.7)
        cx = trunk_x * 0.4 + 0.02 * math.sin(i * 1.3 + variant)
        dist = np.abs(xs - cx)
        edge_n = (hash2(xs * 40 + i, t * 70, variant + i * 0.3) - 0.5) * 0.07
        inside = dist < (width_here + scallop + edge_n)
        dens = np.clip(1.0 - (dist / np.maximum(width_here, 1e-3)) ** 1.6, 0, 1)
        dens *= np.clip(1.0 - np.abs(local - 0.35) * 1.1, 0.15, 1)
        dens *= in_layer.astype(np.float32)
        dens *= inside.astype(np.float32)
        # mist gaps on variant 2
        if variant == 2:
            gaps = hash2(xs * 12, t * 18, 9 + i)
            dens *= 0.45 + 0.55 * (gaps > 0.28).astype(np.float32)
        canopy = np.maximum(canopy, dens)

    # Soften canopy top into fog
    canopy *= np.clip((t - 0.01) / 0.06, 0, 1)
    canopy *= np.clip((0.70 - t) / 0.08, 0, 1) * 0.0 + np.clip((0.68 - t) / 0.10 + 1.0, 0, 1)
    # actually keep canopy only in upper 70%
    canopy *= (t < 0.68).astype(np.float32) + (t >= 0.68).astype(np.float32) * np.clip((0.78 - t) / 0.10, 0, 1)

    # Root / moss flare
    moss = np.exp(-0.5 * ((xs - trunk_x) / (trunk_w * 2.8 + 0.04)) ** 2)
    moss *= np.clip((t - 0.86) / 0.08, 0, 1)

    alpha = np.clip(np.maximum(np.maximum(canopy, trunk * 0.95), moss * 0.75), 0, 1)
    # edge noise bite
    bite = hash2(xs * 55, t * 90, 20 + variant)
    alpha *= 0.88 + 0.12 * bite
    # faint outer halo for anti-alias
    return np.clip(alpha, 0, 1)


def colorize_tree(mask: np.ndarray, mid: np.ndarray, moss: np.ndarray, wood: np.ndarray, variant: int) -> np.ndarray:
    h, w = mask.shape
    mh, mw = mid.shape[:2]
    # Sample a vertical strip from forest-mid as foliage albedo
    x0 = int((0.08 + 0.22 * variant) * mw)
    x1 = min(mw, x0 + max(80, mw // 8))
    strip = mid[:, x0:x1]
    strip_im = Image.fromarray(strip).resize((w, h), Image.Resampling.LANCZOS)
    albedo = np.asarray(strip_im).astype(np.float32)
    wood_im = Image.fromarray(wood).resize((w, h), Image.Resampling.LANCZOS)
    wood_a = np.asarray(wood_im).astype(np.float32)
    moss_im = Image.fromarray(moss).resize((int(w * 0.7), int(h * 0.35)), Image.Resampling.LANCZOS)
    moss_a = np.asarray(moss_im).astype(np.float32)

    ys = np.linspace(0, 1, h)[:, None]
    xs = np.linspace(-1, 1, w)[None, :]
    trunk_band = (np.abs(xs) < (0.10 + 0.04 * variant) * (0.5 + 0.7 * ys)).astype(np.float32)

    # Dark wet bark on trunk, mossy green on canopy
    bark = wood_a * np.array([0.35, 0.38, 0.42])  # cool wet
    canopy_col = albedo * np.array([0.55, 0.75, 0.62])
    # fog the upper canopy toward cool gray
    fog = np.clip((0.28 - ys) / 0.28, 0, 1)[..., None]
    fog_col = np.array([48.0, 62.0, 72.0])
    canopy_col = canopy_col * (1 - 0.55 * fog) + fog_col * (0.55 * fog)

    tb = trunk_band[..., None]
    rgb = canopy_col * (1 - 0.72 * tb) + bark * (0.72 * tb)
    # moss near feet
    feet = np.clip((ys - 0.82) / 0.12, 0, 1)
    moss_pad = np.zeros_like(rgb)
    mh2, mw2 = moss_a.shape[:2]
    y0 = h - mh2
    x0b = (w - mw2) // 2
    if y0 >= 0 and x0b >= 0:
        moss_pad[y0 : y0 + mh2, x0b : x0b + mw2] = moss_a * np.array([0.35, 0.7, 0.4])
    ft = feet[..., None]
    rgb = rgb * (1 - 0.55 * ft) + np.maximum(moss_pad, rgb * 0.4) * (0.55 * ft)

    # wet darkening
    rgb *= (0.38, 0.42, 0.40, 0.36)[variant] + 0.22
    # slight cyan moonlight rim on one side
    rim = np.clip(xs * (1 if variant % 2 == 0 else -1), 0, 1) ** 2
    rgb = rgb + rim[..., None] * mask[..., None] * np.array([8.0, 18.0, 28.0])

    out = np.zeros((h, w, 4), dtype=np.float32)
    out[..., :3] = rgb
    out[..., 3] = mask * 255.0
    # premultiply-ish: zero rgb where alpha low
    out[..., :3] *= np.clip(mask[..., None] / 0.15, 0, 1)
    return out


def make_trees() -> None:
    mid = np.asarray(Image.open(os.path.join(ENV, "forest-mid.jpg")).convert("RGB"))
    try:
        moss = np.asarray(Image.open(os.path.join(ENV, "moss.jpg")).convert("RGB"))
    except Exception:
        moss = mid
    try:
        wood = np.asarray(Image.open(os.path.join(ENV, "wood.jpg")).convert("RGB"))
    except Exception:
        wood = mid
    for i in range(4):
        w, h = 560, 1680
        mask = pine_mask(w, h, i)
        # slight blur for AA
        mimg = Image.fromarray((np.clip(mask, 0, 1) * 255).astype(np.uint8), "L")
        mimg = mimg.filter(ImageFilter.GaussianBlur(radius=1.2))
        mask = np.asarray(mimg).astype(np.float32) / 255.0
        arr = colorize_tree(mask, mid, moss, wood, i)
        save_png(arr, os.path.join(ENV, f"tree-{i + 1}.png"))


def dist_to_polyline(px: np.ndarray, py: np.ndarray, pts: np.ndarray) -> np.ndarray:
    """Min distance from each pixel to polyline pts (N,2)."""
    dmin = np.full(px.shape, 1e9, dtype=np.float32)
    for i in range(len(pts) - 1):
        ax, ay = pts[i]
        bx, by = pts[i + 1]
        abx, aby = bx - ax, by - ay
        ab2 = abx * abx + aby * aby + 1e-6
        t = np.clip(((px - ax) * abx + (py - ay) * aby) / ab2, 0, 1)
        dx = px - (ax + t * abx)
        dy = py - (ay + t * aby)
        dmin = np.minimum(dmin, np.sqrt(dx * dx + dy * dy))
    return dmin


def glow(dist: np.ndarray, core_r: float, glow_r: float) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    core = np.clip(1.0 - dist / core_r, 0, 1)
    core = core ** 1.4
    sheath = np.clip(1.0 - dist / glow_r, 0, 1) ** 1.8
    bloom = np.clip(1.0 - dist / (glow_r * 2.4), 0, 1) ** 2.4
    return core, sheath, bloom


def compose_rgba(core, sheath, bloom, core_rgb, sheath_rgb, bloom_rgb, core_a=1.0, sheath_a=0.85, bloom_a=0.45):
    h, w = core.shape
    out = np.zeros((h, w, 4), dtype=np.float32)
    layers = [
        (bloom, bloom_rgb, bloom_a),
        (sheath, sheath_rgb, sheath_a),
        (core, core_rgb, core_a),
    ]
    for cov, rgb, a in layers:
        src_a = np.clip(cov * a, 0, 1)
        out_a = out[..., 3]
        na = src_a + out_a * (1 - src_a)
        for c in range(3):
            out[..., c] = np.where(
                na > 1e-5,
                (rgb[c] * src_a + out[..., c] * out_a * (1 - src_a)) / np.maximum(na, 1e-5),
                out[..., c],
            )
        out[..., 3] = na
    out[..., :3] *= 255.0
    out[..., 3] *= 255.0
    return out


def make_slash() -> None:
    w, h = 1024, 512
    xs = np.arange(w, dtype=np.float32)
    ys = np.arange(h, dtype=np.float32)
    px, py = np.meshgrid(xs, ys)
    # Bezier crescent (katana arc)
    p0 = np.array([70.0, 400.0])
    p1 = np.array([512.0, -40.0])
    p2 = np.array([960.0, 390.0])
    ts = np.linspace(0, 1, 80)
    pts = np.stack([(1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2 for t in ts])
    dist = dist_to_polyline(px, py, pts)
    # variable width: thicker in middle
    # approximate t along x
    tapprox = np.clip((px - 70) / 890.0, 0, 1)
    mid = 1.0 - 4.0 * (tapprox - 0.5) ** 2
    core_r = 7.0 + 10.0 * mid
    glow_r = 22.0 + 26.0 * mid
    core, sheath, bloom = glow(dist, core_r, glow_r)
    # hot tips
    tip = np.exp(-0.5 * ((px - 70) ** 2 + (py - 400) ** 2) / 28**2) + np.exp(
        -0.5 * ((px - 960) ** 2 + (py - 390) ** 2) / 28**2
    )
    core = np.clip(core + 0.55 * tip, 0, 1)
    arr = compose_rgba(
        core,
        sheath,
        bloom,
        core_rgb=(1.0, 1.0, 1.0),
        sheath_rgb=(0.45, 0.95, 1.0),
        bloom_rgb=(1.0, 0.78, 0.28),
        core_a=1.0,
        sheath_a=0.9,
        bloom_a=0.5,
    )
    save_png(arr, os.path.join(FX, "slash.png"))


def make_beam() -> None:
    w, h = 128, 1024
    xs = np.arange(w, dtype=np.float32)
    ys = np.arange(h, dtype=np.float32)
    px, py = np.meshgrid(xs, ys)
    cx = (w - 1) * 0.5
    dist = np.abs(px - cx)
    # lengthwise hot spots
    pulse = 0.75 + 0.25 * np.sin(py * 0.045) * np.sin(py * 0.011)
    core_r = 5.5 * pulse
    glow_r = 18.0 * pulse
    core, sheath, bloom = glow(dist, core_r, glow_r)
    # fade slightly at ends
    end = np.clip(py / 40.0, 0, 1) * np.clip((h - 1 - py) / 40.0, 0, 1)
    core *= end
    sheath *= end
    bloom *= end
    arr = compose_rgba(
        core,
        sheath,
        bloom,
        core_rgb=(1.0, 1.0, 1.0),
        sheath_rgb=(0.35, 0.9, 1.0),
        bloom_rgb=(0.2, 0.55, 1.0),
        core_a=1.0,
        sheath_a=0.88,
        bloom_a=0.42,
    )
    save_png(arr, os.path.join(FX, "beam.png"))


def make_spark() -> None:
    w = h = 128
    xs = np.arange(w, dtype=np.float32)
    ys = np.arange(h, dtype=np.float32)
    px, py = np.meshgrid(xs, ys)
    cx = cy = (w - 1) * 0.5
    dist = np.sqrt((px - cx) ** 2 + (py - cy) ** 2)
    core, sheath, bloom = glow(dist, 8.0, 28.0)
    arr = compose_rgba(
        core,
        sheath,
        bloom,
        core_rgb=(1.0, 1.0, 1.0),
        sheath_rgb=(0.6, 0.95, 1.0),
        bloom_rgb=(1.0, 0.82, 0.35),
        core_a=1.0,
        sheath_a=0.85,
        bloom_a=0.5,
    )
    save_png(arr, os.path.join(FX, "spark.png"))


def make_impact() -> None:
    w = h = 256
    xs = np.arange(w, dtype=np.float32)
    ys = np.arange(h, dtype=np.float32)
    px, py = np.meshgrid(xs, ys)
    cx = cy = (w - 1) * 0.5
    dx, dy = px - cx, py - cy
    dist = np.sqrt(dx * dx + dy * dy)
    ang = np.arctan2(dy, dx)
    core, sheath, bloom = glow(dist, 16.0, 48.0)
    # radial spikes
    spikes = np.clip(np.cos(ang * 8.0) ** 6, 0, 1) * np.clip(1.0 - dist / 110.0, 0, 1)
    ray = np.clip(np.cos(ang * 5.0 + 0.4) ** 10, 0, 1) * np.clip(1.0 - dist / 120.0, 0, 1)
    core = np.clip(core + 0.65 * spikes + 0.45 * ray, 0, 1)
    sheath = np.clip(sheath + 0.4 * spikes, 0, 1)
    arr = compose_rgba(
        core,
        sheath,
        bloom,
        core_rgb=(1.0, 1.0, 1.0),
        sheath_rgb=(0.55, 0.95, 1.0),
        bloom_rgb=(1.0, 0.7, 0.25),
        core_a=1.0,
        sheath_a=0.88,
        bloom_a=0.48,
    )
    save_png(arr, os.path.join(FX, "impact.png"))


def make_ring() -> None:
    w = h = 256
    xs = np.arange(w, dtype=np.float32)
    ys = np.arange(h, dtype=np.float32)
    px, py = np.meshgrid(xs, ys)
    cx = cy = (w - 1) * 0.5
    dist = np.sqrt((px - cx) ** 2 + (py - cy) ** 2)
    radius = 78.0
    ad = np.abs(dist - radius)
    core, sheath, bloom = glow(ad, 6.0, 18.0)
    # inner fill hint
    inner = np.clip(1.0 - dist / radius, 0, 1) ** 2 * 0.25
    sheath = np.clip(sheath + inner, 0, 1)
    arr = compose_rgba(
        core,
        sheath,
        bloom,
        core_rgb=(1.0, 1.0, 1.0),
        sheath_rgb=(0.4, 0.92, 1.0),
        bloom_rgb=(0.95, 0.75, 0.3),
        core_a=1.0,
        sheath_a=0.9,
        bloom_a=0.42,
    )
    save_png(arr, os.path.join(FX, "ring.png"))


def main() -> None:
    if not os.environ.get("SKIP_HD"):
        print("upscale forest…")
        upscale_forest()
        print("key torii…")
        key_torii()
    print("paint trees…")
    make_trees()
    print("vfx sprites…")
    make_slash()
    make_beam()
    make_spark()
    make_impact()
    make_ring()
    print("done")


if __name__ == "__main__":
    main()
