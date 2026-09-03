/** Mulberry32 — deterministic, no Math.random in gameplay. */
export class SeededRng {
  private s: number;
  constructor(seed: number) {
    this.s = seed >>> 0;
  }
  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  int(maxExclusive: number): number {
    return Math.floor(this.next() * maxExclusive);
  }
  pick<T>(items: T[]): T {
    return items[this.int(items.length)]!;
  }
  get seed(): number {
    return this.s;
  }
  setSeed(seed: number): void {
    this.s = seed >>> 0;
  }
}
