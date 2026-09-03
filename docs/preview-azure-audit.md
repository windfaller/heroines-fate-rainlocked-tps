# Preview + Azure asset audit — 暮刃紀行：雨鎖山門

**Target:** https://brave-orbit-velvet-flora.grok.me?debug=true  
**Probed:** 2026-09-03 09:53–09:56 Taipei (UTC+8)  
**Mode:** read-only. No login, no writes, no full GLB/MP4 downloads (HEAD or Range `bytes=0-15` only for large files).  
**Method:** `WebFetch` + `curl` + authenticated `gh`/GitHub API. No headed browser, so in-page `console.*` after WebGL start is not a live DevTools capture.

Evidence tags used on every claim: `CONFIRMED_CURRENT` / `STALE_REFERENCE` / `UNKNOWN` / `BLOCKED`.

---

## 1. Does the page load?

| Claim | Tag | Evidence |
|---|---|---|
| Document URL returns HTML 200 | CONFIRMED_CURRENT | `curl -sI https://brave-orbit-velvet-flora.grok.me/?debug=true` → `HTTP/2 200`, `content-type: text/html; charset=utf-8`. Same for `/` without query. |
| Hosted on Vercel, fronted by Cloudflare | CONFIRMED_CURRENT | Response headers: `x-vercel-cache: MISS`, `x-vercel-id: iad1::…`, `server: cloudflare`, `x-robots-tag: noindex`. |
| `<title>` is 暮刃紀行：雨鎖山門 | CONFIRMED_CURRENT | Live HTML: `<title>暮刃紀行：雨鎖山門</title>`. |
| `html lang` is Traditional Chinese | CONFIRMED_CURRENT | `<html lang="zh-Hant">`. |
| Viewport meta present | CONFIRMED_CURRENT | `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"/>`. |
| SSR body is a loading screen, then client hydrates a title/menu | CONFIRMED_CURRENT | SSR: `<div class="loading-screen"><i></i><span>暮刃紀行</span><small>點燃燈火…</small></div>`. WebFetch of the live URL extracted the post-hydrate title copy (see §2). |
| Full in-browser console after canvas/WebGL start | UNKNOWN | No headed DevTools. Static fetch cannot print `console.warn("[engine]", …)` at runtime. |
| HTML contains NUL bytes | CONFIRMED_CURRENT | Downloaded HTML is 2712 bytes with **3 NUL bytes** inside TanStack Start stream: match ids `__root__` and empty id contain `\0`. This is router match-id encoding, not a visible title-string corruption. |

### Live HTML quotes (CONFIRMED_CURRENT)

From GET `https://brave-orbit-velvet-flora.grok.me/?debug=true` (2712 bytes):

- `<title>暮刃紀行：雨鎖山門</title>`
- `<meta name="description" content="雨夜山門動作 RPG。選擇刃者，突破雨鎖，擊敗雨蝕武者。"/>`
- `<meta property="og:title" content="暮刃紀行：雨鎖山門">`
- `<meta property="og:image" content="https://brave-orbit-velvet-flora.grok.me/og.jpg">`
- `<script src="/tb-app.js?v=73" type="module"></script>`
- `<meta name="grok-project-id" content="01a0388c-23b8-74e2-9cad-ef668fc18249">`
- `<script src="https://grok.com/grok-app-builder/extensions.js" data-project-id="01a0388c-23b8-74e2-9cad-ef668fc18249" defer></script>`

### Fetch-layer / link errors (not a JS console dump)

| URL | Status | Tag |
|---|---|---|
| `https://brave-orbit-velvet-flora.grok.me/__grok/manifest.webmanifest` (linked in `<head>`) | **HTTP/2 404** `text/html` | CONFIRMED_CURRENT |
| `https://grok.com/grok-app-builder/extensions.js` (linked in `<head>`) | **HTTP/2 429** Cloudflare | CONFIRMED_CURRENT |
| `https://brave-orbit-velvet-flora.grok.me/robots.txt` | **HTTP/2 404** HTML | CONFIRMED_CURRENT |
| `https://brave-orbit-velvet-flora.grok.me/favicon.svg` | **HTTP/2 200** 356 bytes `image/svg+xml` | CONFIRMED_CURRENT |

Whether the 404/429 appear as red console lines in Chrome is **UNKNOWN** (no DevTools). They are real network failures on URLs the document requests.

---

## 2. What is the actual product?

**Playable game shell with a title/character-select overlay — not a marketing-only landing page.** `CONFIRMED_CURRENT`

WebFetch of `https://brave-orbit-velvet-flora.grok.me?debug=true` returned hydrated UI text (not just the SSR spinner):

> 暮刃紀行
> 點燃燈火…
> 雨鎖山門
> # 暮刃紀行
> TWILIGHT BLADE
> 雨先只認兩把刃。每護送一次下山，山門才肯再點一盞燈。七盞都亮了，被害人的影才准打開。
> 踏入山門 操作說明 鑑賞模式
> 解鎖與紀錄 設定
> WASD 移動 · J 環身近戰 · L 射擊 · T 切換同向／反向 · Q／R／F 招式 · 解救緋緒並護送回入口
> 雨鎖山門

### Screens / systems visible in live UI or live JS

| Feature | Present? | Tag | Notes |
|---|---|---|---|
| Title / copy / TWILIGHT BLADE | Yes | CONFIRMED_CURRENT | WebFetch quotes above. CSS classes `.title-copy`, `.title-rain-canvas`. |
| Character select | Yes (roster in JS; two starters unless debug) | CONFIRMED_CURRENT | Live bundle ids/names: `rin` 凜, `shino` 紫乃, `kuzuha` 葛葉, `ling` 凌霜, `elara` Elara, `vivienne` Vivienne, `sawa` 紗舞. Source: first two unlocked; `?debug=true` treats clears as full roster (`effectiveClears`). |
| Move | Documented on title | CONFIRMED_CURRENT | Quote: `WASD 移動`. Virtual stick exists in `src/ui/MobileControls.tsx`. Actual WASD in a 3D stage: **UNKNOWN** (no play session). |
| Combat | Documented + systems in bundle | CONFIRMED_CURRENT (UI/code) / UNKNOWN (feel) | Quote: `J 環身近戰 · L 射擊 · T 切換同向／反向 · Q／R／F 招式`. Engine uses `THREE.WebGLRenderer` + sprite-plane `ActorView`. |
| Rescue | Documented + systems in bundle | CONFIRMED_CURRENT (UI/code) / UNKNOWN (run) | Quote: `解救緋緒並護送回入口`. Objectives in JS: `攻擊柱上的繩索，解救緋緒`, `帶著緋緒逃回山腳入口`. |
| Gallery / 鑑賞模式 | Button on title; assets on Azure | CONFIRMED_CURRENT (button+files) / UNKNOWN (open gallery UI) | Title button `鑑賞模式` (2 occurrences in `tb-app.js`). Azure `rin_intro.mp4` 200, `hio_story.mp4` 200. |
| Settings / unlock log | Buttons on title | CONFIRMED_CURRENT | `解鎖與紀錄`, `設定`. Settings strings: `主音量`, `音樂`, `音效`, debug checkbox wired to save settings. |

`?debug=true` is implemented. Source `src/game/systems/save.ts`:

```
return new URLSearchParams(window.location.search).get("debug") === "true";
// Debug URL counts as a full roster clear without writing the save.
export function effectiveClears(clears: number): number {
  if (isDebugQuery()) return Math.max(clears, CLEARS_FOR_ALL_BLADES);
```

Live minified equivalent is in `tb-app.js`. `CONFIRMED_CURRENT`

Clicking **踏入山門** and seeing a WebGL frame is **UNKNOWN** (no headed browser). Code path exists: `src/preview-mount.tsx` mounts `<GameApp />` into `#tb-game` and hides `#tb-root`; `GameEngine` constructs `THREE.WebGLRenderer({ canvas, … })`.


---

## 3. HTML / JS / CSS URLs and tech

### Preview document graph (CONFIRMED_CURRENT)

| URL | Role | Status | Last-Modified UTC | Taipei |
|---|---|---|---|---|
| `https://brave-orbit-velvet-flora.grok.me/?debug=true` | HTML | 200 | dynamic, max-age=0 | 2026-09-03 09:53 |
| `/assets/styles-BCWhPCHo.css` | CSS | 200 text/css 40552 B | 2026-09-03 01:08:30 GMT | 09:08 |
| `/assets/index-Bm5w5DxF.js` | TanStack/React runtime | 200 JS 385218 B | 2026-09-03 01:08:30 GMT | 09:08 |
| `/assets/routes-Ca3OjXme.js` | `/` route | 200 JS 260 B | 2026-09-03 01:08:30 GMT | 09:08 |
| `/tb-app.js?v=73` | Game bundle | 200 JS 943493 B | 2026-09-03 01:08:30 GMT | 09:08 |
| `/og.jpg` | OG image | 200 JPEG 128482 B | 2026-09-03 01:54:00 GMT | 09:54 |
| `/x-banner.jpg` | X banner | 200 JPEG 40286 B | 2026-09-03 01:54:01 GMT | 09:54 |
| `/__grok/icon-180.png` | Apple touch icon | 200 PNG 2100 B | 2026-09-03 01:54:01 GMT | 09:54 |
| `/__grok/manifest.webmanifest` | PWA manifest | **404** | — | — |
| `https://grok.com/grok-app-builder/extensions.js` | Grok host extension | **429** | — | — |

`routes-Ca3OjXme.js` exports only the loading-screen component (`暮刃紀行` / `點燃燈火…`). The playable UI is injected by `/tb-app.js?v=73` (`src/preview-mount.tsx`). CONFIRMED_CURRENT

### Stack

| Layer | Finding | Tag |
|---|---|---|
| Bundler | Vite (hashed `/assets/*`, `vite:preloadError` in bundle, `vite.config.ts` in repo) | CONFIRMED_CURRENT |
| App framework | TanStack Start/Router (`self.$_TSR`). **Not Next.js.** | CONFIRMED_CURRENT |
| UI | React 19 | CONFIRMED_CURRENT |
| CSS | Tailwind v4.3.3 (`/*! tailwindcss v4.3.3`) | CONFIRMED_CURRENT |
| 3D | three ^0.185.1. Live bundle: `THREE.WebGLRenderer`, Sprite x14, Mesh x126. **No GLTFLoader.** | CONFIRMED_CURRENT |
| Characters | Billboard planes + PNG sheets (`THREE.PlaneGeometry`) | CONFIRMED_CURRENT |
| R3F / Drei | In package.json; **0 hits** in `tb-app.js` | CONFIRMED_CURRENT |
| Audio | Procedural Web Audio. howler in package.json; **0 hits** in `tb-app.js`. No mp3/ogg URLs. | CONFIRMED_CURRENT |
| Auth | better-auth in root route; **0 hits** in `tb-app.js` (preview-mount hides `#tb-root`) | CONFIRMED_CURRENT |
| Host | Grok App Builder (`grok-project-id`, `/__grok/*`, `x-vercel-*`) | CONFIRMED_CURRENT |

`package.json` name: `app-builder-workspace`. CONFIRMED_CURRENT


---

## 4. Azure static-site roots and discovered files

**Do not treat container directory 404 as proof assets do not exist.** Azure `$web` static websites do not list directories. CONFIRMED_CURRENT

Account host: `https://gogoshared.z23.web.core.windows.net`  
Game prefix from live JS + `src/assets/manifest.ts`: `/games/twilight-blade`  
Cache-bust: `ASSET_REV = 61` (`?v=61`). CONFIRMED_CURRENT

### Directory / root probes

| URL suffix | HEAD | GET Range 0-15 | Tag |
|---|---|---|---|
| `/` (account root) | **400** `OutOfRangeInput` | 404 `WebContentNotFound` | CONFIRMED_CURRENT |
| `/$web` | 404 `WebContentNotFound` | 404 | CONFIRMED_CURRENT |
| `/games` | 404 | 404 | CONFIRMED_CURRENT |
| `/games/` | 404 | 404 | CONFIRMED_CURRENT |
| `/games/twilight-blade` | 404 | 404 | CONFIRMED_CURRENT |
| `/games/twilight-blade/` | 404 | 404 | CONFIRMED_CURRENT |
| `/games/twilight-blade/index.html` | 404 | 404 | CONFIRMED_CURRENT |
| `/games/twilight-blade/assets/` | 404 | 404 | CONFIRMED_CURRENT |
| `/images/gogowinners/logo/2023logo-06.png` (unrelated known blob) | **200** | **206** | CONFIRMED_CURRENT — account is live; listing is off |

### CORS

HEAD on a 200 JPEG: no `Access-Control-Allow-Origin`.  
GET with `Origin: https://brave-orbit-velvet-flora.grok.me` and `Range: bytes=0-15` on `/games/twilight-blade/assets/env/forest-far.jpg?v=61`: **HTTP/1.1 206 Partial Content** + `Access-Control-Allow-Origin: *`. CONFIRMED_CURRENT

Sample object `Last-Modified: Wed, 02 Sep 2026 11:41:11 GMT` = **2026-09-02 19:41 Taipei**. CONFIRMED_CURRENT


### Discovered files that exist (HEAD 200; GET 206 first 16 bytes)

Base: `https://gogoshared.z23.web.core.windows.net/games/twilight-blade`

**Environment**

| Path | bytes | type |
|---|---:|---|
| `/assets/env/shrine-pass.jpg` | 823066 | jpeg |
| `/assets/env/forest-far.jpg?v=61` | 557905 | jpeg |
| `/assets/env/forest-mid.jpg?v=61` | 789605 | jpeg |
| `/assets/env/path-ahead.jpg?v=61` | 687207 | jpeg |
| `/assets/env/stone.jpg?v=61` | 1104229 | jpeg |
| `/assets/env/wood.jpg?v=61` | 451832 | jpeg |
| `/assets/env/vermilion.jpg?v=61` | 910086 | jpeg |
| `/assets/env/moss.jpg?v=61` | 936514 | jpeg |
| `/assets/env/cobble.jpg?v=61` | 1038149 | jpeg |
| `/assets/env/bark.jpg?v=61` | 1021899 | jpeg |
| `/assets/env/victory.jpg?v=61` | 812683 | jpeg |
| `/assets/env/defeat.jpg?v=61` | 540243 | jpeg |
| `/assets/env/cedar.png?v=61` | 2003330 | png |
| `/assets/env/pine.png?v=61` | 2015661 | png |
| `/assets/env/maple.png?v=61` | 1830209 | png |
| `/assets/env/mist.png?v=61` | 507851 | png |
| `/assets/env/torii-ruin.png?v=61` | 1415445 | png |
| `/assets/env/komainu.png?v=61` | 2217620 | png |
| `/assets/env/jizo.png?v=61` | 1344580 | png |
| `/assets/env/slash-arc.png?v=61` | 545937 | png |

All rows: CONFIRMED_CURRENT.


**NPC / enemies / sprites / portraits / relics**

| Path | bytes | type |
|---|---:|---|
| `/assets/npc/keeper.png?v=61` | 807042 | png |
| `/assets/npc/hio-k.png?v=61` | 297326 | png |
| `/assets/npc/hio-bound-k.png?v=61` | 271292 | png |
| `/assets/npc/hio-portrait.jpg?v=61` | 64241 | jpeg |
| `/assets/enemies/keyed/soldier.png?v=61` | 361005 | png |
| `/assets/enemies/keyed/boss1.png?v=61` | 610092 | png |
| `/assets/sprites/rin/idle/idle_sheet.png?v=61` | 706893 | png |
| `/assets/sprites/rin/walk/walk_sheet.png?v=61` | 1076197 | png |
| `/assets/sprites/rin/attack/attack_sheet.png?v=61` | 573366 | png |
| `/assets/sprites/rin/skill1/skill1.png?v=61` | 265656 | png |
| `/assets/sprites/shino/idle/idle_sheet.png?v=61` | 377864 | png |
| `/assets/sprites/sawa/idle/idle_sheet.png?v=61` | 615598 | png |
| `/assets/relics/moon-edge.jpg?v=61` | 24945 | jpeg |
| `/assets/characters/rin/full.png?v=61` | 1346841 | png |
| `/assets/characters/rin/portrait.jpg?v=61` | 112483 | jpeg |
| `/assets/characters/shino/full.png?v=61` | 714869 | png |
| `/assets/characters/shino/portrait.jpg?v=61` | 102834 | jpeg |
| `/assets/characters/kuzuha/portrait.jpg?v=61` | 151034 | jpeg |
| `/assets/characters/ling/portrait.jpg?v=61` | 82195 | jpeg |
| `/assets/characters/elara/portrait.jpg?v=61` | 141049 | jpeg |
| `/assets/characters/vivienne/portrait.jpg?v=61` | 130707 | jpeg |
| `/assets/characters/sawa/portrait.jpg?v=61` | 110450 | jpeg |

All rows: CONFIRMED_CURRENT.

**Gallery video/stills (HEAD only; files not downloaded)**

| Path | bytes | type |
|---|---:|---|
| `/assets/gallery/hio_story.mp4?v=61` | 4720130 | mp4 |
| `/assets/gallery/hio_story_white.mp4?v=61` | 7906754 | mp4 |
| `/assets/gallery/hio_bound_film.mp4?v=61` | 8612586 | mp4 |
| `/assets/gallery/rin_intro.mp4?v=61` | 8088112 | mp4 |
| `/assets/gallery/rin_bound.jpg?v=61` | 768160 | jpeg |

CONFIRMED_CURRENT.

### Guessed paths that 404 (not linked by live JS)

| Path | Status | Tag |
|---|---|---|
| `/games/twilight-blade/models/player.glb` | 404 | CONFIRMED_CURRENT (guess; **not** in `tb-app.js`) |
| `/games/twilight-blade/assets/models/player.glb` | 404 | CONFIRMED_CURRENT (guess) |
| `/games/twilight-blade/assets/characters/rin/rin.glb` | 404 | CONFIRMED_CURRENT (guess) |
| `/games/twilight-blade/assets/audio/music.shrine.mp3` | 404 | CONFIRMED_CURRENT (guess; audio is synthesized) |
| `/games/twilight-blade/assets/audio/bgm.mp3` | 404 | CONFIRMED_CURRENT (guess) |
| `/games/twilight-blade/audio/music.shrine.mp3` | 404 | CONFIRMED_CURRENT (guess) |

`glb` hits inside `tb-app.js` are Three.js `GLBufferAttribute` / `XRWebGLBinding` identifier fragments, not `.glb` files. CONFIRMED_CURRENT

Remaining env/NPC/sprite/gallery paths listed in `manifest.ts` but not HEAD-probed: UNKNOWN (siblings that were probed all 200).


---

## 5. Viewport / responsive hints

CONFIRMED_CURRENT from live CSS `/assets/styles-BCWhPCHo.css` and HTML meta:

- Viewport: `width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover` (pinch-zoom disabled).
- Theme color `#071018`.
- `@media (width<=720px)`: `.title-copy{width:auto;padding:22px 18px 24px;inset:auto 16px 18px;transform:none}`; `.title-copy h1{font-size:48px}`; `.title-seal{display:none}`; `.title-actions{flex-direction:column}`; skill seals shrink (`.skill-seal{width:4.55rem;height:4.8rem}`).
- Safe area: `.skill-dock{bottom:max(3.2rem, calc(env(safe-area-inset-bottom) + 2.2rem))}` and `bottom-[max(1rem,env(safe-area-inset-bottom))]`.
- `img,video{max-width:100%;height:auto}`.
- `@media (prefers-reduced-motion:reduce)` disables `.result-veil` animation.
- Apple meta: `apple-mobile-web-app-title` = `暮刃紀行：雨鎖山門`, `apple-mobile-web-app-status-bar-style` = `black`.
- Manifest link 404s, so PWA install metadata is broken. CONFIRMED_CURRENT

Whether layout actually fits a phone was not screenshot-tested. UNKNOWN

---

## 6. Concrete defects

| Defect | Tag |
|---|---|
| Linked `/__grok/manifest.webmanifest` → **404** | CONFIRMED_CURRENT |
| Linked `https://grok.com/grok-app-builder/extensions.js` → **429** | CONFIRMED_CURRENT |
| `/robots.txt` → 404 (site already sends `x-robots-tag: noindex`) | CONFIRMED_CURRENT |
| SSR route is only a spinner; game is a second React tree (`#tb-game`) over Grok host chrome | CONFIRMED_CURRENT (architecture, not necessarily a bug) |
| 3D characters are **not** GLB meshes; they are keyed PNG billboards on planes. Environment is Three.js meshes/sprites textured from Azure JPEGs/PNGs. If the vertical-slice bar is skeletal 3D TPS, this is HD-2D / 2.5D, not a full 3D character pipeline. | CONFIRMED_CURRENT |
| `@react-three/fiber`, `@react-three/drei`, `howler`, `better-auth` are package.json deps unused by shipped `tb-app.js` | CONFIRMED_CURRENT |
| Title buttons `踏入山門` / `操作說明` / `鑑賞模式` / `解鎖與紀錄` / `設定` exist in the bundle with click handlers — not empty placeholders from static analysis | CONFIRMED_CURRENT |
| Buttons no-op after click | UNKNOWN — no click test |
| Placeholder copy like TODO, coming soon, lorem | Not found in `tb-app.js`. CONFIRMED_CURRENT (absence) |
| Audio is procedural pads/noise, not streamed music files | CONFIRMED_CURRENT — may sound like a placeholder score; not a 404 |
| `debug=true` unlocks the full 7-blade roster and gallery locks without writing save | CONFIRMED_CURRENT (intentional) |
| Engine exposes `window.__engine` / `window.__controlsTest` (god, killHostiles, setPos, …) | CONFIRMED_CURRENT from `src/rendering/engine.ts` `exposeQa()` — attached when engine starts |
| WebGL canvas actually paints after 踏入山門 | UNKNOWN |
| Texture load timeouts (`無法載入素材`, `console.warn` in `loadAll`) at runtime | UNKNOWN |
| HTML NULs in TSR stream | CONFIRMED_CURRENT — likely harmless |


---

## 7. GitHub (read-only)

### `https://github.com/windfaller/brave-orbit-velvet-flora`

| Claim | Tag |
|---|---|
| Anonymous/public GET of the HTML/API URL is **404** | CONFIRMED_CURRENT (`curl -sI` → HTTP/2 404; unauthenticated `api.github.com` 404) |
| Repo exists and is **private** | CONFIRMED_CURRENT via authenticated GitHub API as `windfaller`: `private: true`, `visibility: private`, language TypeScript, size 603141 KB |
| Default branch `main`, last push `2026-09-02T15:16:13Z` = **2026-09-02 23:16 Taipei** | CONFIRMED_CURRENT |
| HEAD commit `5499dbd95e7ab919e4d2be41359f62f3b519e871` | CONFIRMED_CURRENT |
| Commit message: `Add unlockable bound stills and films for every blade.` / `Gallery stills open after the first escort; bound films stay sealed until all seven blades.` | CONFIRMED_CURRENT |
| Public clone / anonymous file listing | BLOCKED — private. Authenticated contents API was used read-only. Repo was **not** cloned (~589 MB). |

### Related public repo (not the preview source of truth)

`https://github.com/windfaller/twilight-blade-rainbound-shrine` — **public**, last push `2026-08-25T11:13:29Z` = **2026-08-25 19:13 Taipei**. Description: `TWILIGHT BLADE: RAINBOUND SHRINE / 暮刃紀行：雨鎖山門 — playable 2.5D/3D action RPG vertical slice`.

Relative to the live preview (Azure objects dated 2026-09-02, preview JS dated 2026-09-03): this public repo is **STALE_REFERENCE** as a snapshot of the grok.me preview. It is still a valid public sibling description of the same title.

---

## 8. Not tested / blocked

| Item | Tag |
|---|---|
| Headed Chromium DevTools console after entering the stage | UNKNOWN (no browser session) |
| Click 踏入山門 / combat / rescue / gallery playback | UNKNOWN |
| FPS, draw calls, load time | UNKNOWN — no metrics invented |
| Full sprite/env/gallery inventory (only a sample was HEADed) | UNKNOWN remainder |
| Write SAS / upload to Azure | Not attempted |
| Logging into Grok in a browser | Not attempted |

---

## 9. Bottom line

The grok.me preview **loads** (HTML 200) and hydrates a **Chinese title/menu for a playable 2.5D action-RPG vertical slice** named **暮刃紀行：雨鎖山門 / TWILIGHT BLADE**, not a static landing page. CONFIRMED_CURRENT

Runtime 3D is **Three.js WebGL + PNG billboards + photo textures**, with assets on Azure `$web` under `https://gogoshared.z23.web.core.windows.net/games/twilight-blade/assets/…`. Directory URLs 404; **specific files 200**. No GLB character pipeline in the live bundle. CONFIRMED_CURRENT

Hard live defects: **PWA manifest 404**, **Grok `extensions.js` 429**. Whether the 3D stage actually renders after 踏入山門 was not visually confirmed. UNKNOWN
