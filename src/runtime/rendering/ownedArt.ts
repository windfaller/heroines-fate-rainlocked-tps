import * as THREE from 'three';

function canvas(w: number, h: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function texFrom(c: HTMLCanvasElement | OffscreenCanvas): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c as HTMLCanvasElement);
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  t.anisotropy = 8;
  return t;
}

/** Owned ink-wash paper. Not sourced from Azure. */
export function makeInkPaperTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 256;
  const c = canvas(w, h);
  const ctx = (c as HTMLCanvasElement).getContext('2d')!;
  ctx.fillStyle = '#1c1710';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(${40 + (i % 20)}, ${32 + (i % 16)}, ${18}, ${0.04 + (i % 7) * 0.01})`;
    ctx.beginPath();
    ctx.ellipse(Math.random() * w, Math.random() * h, 18 + Math.random() * 40, 10 + Math.random() * 22, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = 'rgba(212,176,86,0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  return texFrom(c);
}

/** Cheap wet puddle disc. Owned. */
export function makePuddleTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 128;
  const c = canvas(w, h);
  const ctx = (c as HTMLCanvasElement).getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
  g.addColorStop(0, 'rgba(160,190,210,0.55)');
  g.addColorStop(0.45, 'rgba(40,70,90,0.5)');
  g.addColorStop(1, 'rgba(10,16,22,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const t = texFrom(c);
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** Shrine plaque with Traditional Chinese lore. Owned canvas text. */
export function makePlaqueTexture(title: string, body: string): THREE.CanvasTexture {
  const w = 256;
  const h = 384;
  const c = canvas(w, h);
  const ctx = (c as HTMLCanvasElement).getContext('2d')!;
  ctx.fillStyle = '#3a2214';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#c9a24a';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.fillStyle = '#e8d29a';
  ctx.font = 'bold 28px "Noto Serif TC", serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, w / 2, 64);
  ctx.font = '20px "Noto Serif TC", serif';
  ctx.fillStyle = '#d8c8a0';
  const chars = body.split('');
  let y = 110;
  let line = '';
  for (const ch of chars) {
    if (line.length >= 8) {
      ctx.fillText(line, w / 2, y);
      y += 32;
      line = '';
    }
    line += ch;
  }
  if (line) ctx.fillText(line, w / 2, y);
  return texFrom(c);
}

/** Ink silhouette for 葛葉 teaser. Owned. */
export function makeKuzuhaSilhouette(): THREE.CanvasTexture {
  const w = 160;
  const h = 220;
  const c = canvas(w, h);
  const ctx = (c as HTMLCanvasElement).getContext('2d')!;
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(12,10,14,0.82)';
  ctx.beginPath();
  ctx.ellipse(80, 70, 28, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(52, 100, 56, 90);
  ctx.fillStyle = 'rgba(212,176,86,0.35)';
  ctx.fillRect(70, 188, 20, 6);
  return texFrom(c);
}
