export type QualityTier = 'A' | 'B' | 'C';

export function pickTier(gl2: boolean, dpr: number): QualityTier {
  if (!gl2) return 'C';
  if (dpr >= 1.5) return 'A';
  return 'B';
}

export function applyTier(renderer: { setPixelRatio: (n: number) => void }, tier: QualityTier): void {
  const cap = tier === 'A' ? 1.75 : tier === 'B' ? 1.25 : 1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
}
