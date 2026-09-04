import * as THREE from 'three';

export interface LoadProgress {
  stage: string;
  knownBytes: number | null;
  note: string;
  done: number;
  total: number;
}

/** Smaller / essential first so title can appear even if HD art is slow. */
const CRITICAL_TEX: { id: string; url: string; repeat?: [number, number] }[] = [
  { id: 'env.stone', url: './runtime-assets/env/stone.jpg', repeat: [4, 3] },
  { id: 'env.forest-far', url: './runtime-assets/env/forest-far.jpg' },
  { id: 'env.torii-cutout', url: './runtime-assets/env/torii-cutout.png' },
  { id: 'env.tree-1', url: './runtime-assets/env/tree-1.png' },
  { id: 'env.tree-2', url: './runtime-assets/env/tree-2.png' },
  { id: 'fx.slash', url: './runtime-assets/fx/slash.png' },
  { id: 'fx.beam', url: './runtime-assets/fx/beam.png' },
  { id: 'fx.spark', url: './runtime-assets/fx/spark.png' },
  { id: 'fx.impact', url: './runtime-assets/fx/impact.png' },
  { id: 'char.rin', url: './runtime-assets/ui/rin-portrait.jpg' },
  { id: 'char.keeper', url: './runtime-assets/ui/keeper.png' },
  { id: 'char.hio', url: './runtime-assets/ui/hio.png' },
  { id: 'char.soldier', url: './runtime-assets/char/soldier.png' },
  { id: 'char.boss', url: './runtime-assets/char/boss1.png' },
];

const DEFERRED_TEX: { id: string; url: string; repeat?: [number, number] }[] = [
  { id: 'env.vermilion', url: './runtime-assets/env/vermilion.jpg', repeat: [2, 2] },
  { id: 'env.wood', url: './runtime-assets/env/wood.jpg', repeat: [2, 2] },
  { id: 'env.forest-far-hd', url: './runtime-assets/env/forest-far-hd.jpg' },
  { id: 'env.forest-mid-hd', url: './runtime-assets/env/forest-mid-hd.jpg' },
  { id: 'env.forest-mid', url: './runtime-assets/env/forest-mid.jpg' },
  { id: 'env.tree-3', url: './runtime-assets/env/tree-3.png' },
  { id: 'env.tree-4', url: './runtime-assets/env/tree-4.png' },
  { id: 'env.moss', url: './runtime-assets/env/moss.jpg', repeat: [3, 3] },
  { id: 'env.path-ahead', url: './runtime-assets/env/path-ahead.jpg' },
  { id: 'fx.ring', url: './runtime-assets/fx/ring.png' },
  { id: 'char.hio-bound', url: './runtime-assets/ui/hio-bound.png' },
  { id: 'char.archer', url: './runtime-assets/char/archer.png' },
  { id: 'char.mage', url: './runtime-assets/char/mage.png' },
  { id: 'char.hound', url: './runtime-assets/char/hound.png' },
  { id: 'char.elite', url: './runtime-assets/char/elite.png' },
  { id: 'char.rin-full', url: './runtime-assets/ui/rin-full.png' },
];

const CONCURRENCY = 4;
const PER_TEX_MS = 8000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(() => reject(new Error(`timeout:${label}`)), ms);
    p.then(
      (v) => { window.clearTimeout(t); resolve(v); },
      (e) => { window.clearTimeout(t); reject(e); },
    );
  });
}

export class AssetRegistry {
  stages: LoadProgress[] = [];
  failed: { id: string; stage: string; status: string }[] = [];
  textures = new Map<string, THREE.Texture>();
  onStage?: (stage: string, done?: number, total?: number) => void;
  done = 0;
  total = CRITICAL_TEX.length;

  async boot(): Promise<void> {
    this.note('boot-ui', '準備介面');
    if (typeof Image === 'undefined') {
      this.note('runtime-art', 'vitest: skip TextureLoader');
      return;
    }
    await this.loadBatch(CRITICAL_TEX, 'runtime-art');
  }

  /** Optional second pass after title is up. */
  async loadDeferred(): Promise<void> {
    if (typeof Image === 'undefined') return;
    await this.loadBatch(DEFERRED_TEX, 'runtime-art-hd');
  }

  private async loadBatch(
    list: { id: string; url: string; repeat?: [number, number] }[],
    stage: string,
  ): Promise<void> {
    const loader = new THREE.TextureLoader();
    this.total = list.length;
    this.done = 0;
    this.onStage?.(stage, 0, this.total);
    let cursor = 0;
    const workers = Array.from({ length: Math.min(CONCURRENCY, list.length) }, async () => {
      while (cursor < list.length) {
        const i = cursor;
        cursor += 1;
        const spec = list[i]!;
        try {
          const tex = await withTimeout(loader.loadAsync(spec.url), PER_TEX_MS, spec.id);
          tex.colorSpace = THREE.SRGBColorSpace;
          if (spec.repeat) {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(spec.repeat[0], spec.repeat[1]);
          }
          const hi = spec.id.includes('forest-') || spec.id.startsWith('env.tree') || spec.id === 'env.torii-cutout' || spec.id.startsWith('fx.');
          tex.anisotropy = spec.id.includes('forest-') ? 8 : hi ? 4 : 2;
          this.textures.set(spec.id, tex);
          // Keep portrait alias for character card lookups that still expect char.rin full-body.
          if (spec.id === 'char.rin-full') this.textures.set('char.rin', tex);
        } catch {
          this.failed.push({ id: spec.id, stage, status: 'missing' });
        }
        this.done += 1;
        this.note(spec.id, spec.url);
        this.onStage?.(stage, this.done, this.total);
        // Yield so the splash can paint.
        await new Promise<void>((r) => window.setTimeout(r, 0));
      }
    });
    await Promise.all(workers);
  }

  private note(stage: string, note: string): void {
    this.stages.push({ stage, knownBytes: null, note, done: this.done, total: this.total });
  }
}
