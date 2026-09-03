import * as THREE from 'three';

export interface LoadProgress {
  stage: string;
  knownBytes: number | null;
  note: string;
}

const RUNTIME_TEX: { id: string; url: string; repeat?: [number, number] }[] = [
  { id: 'env.stone', url: './runtime-assets/env/stone.jpg', repeat: [4, 3] },
  { id: 'env.vermilion', url: './runtime-assets/env/vermilion.jpg', repeat: [2, 2] },
  { id: 'env.wood', url: './runtime-assets/env/wood.jpg', repeat: [2, 2] },
  { id: 'env.forest-far', url: './runtime-assets/env/forest-far.jpg' },
  { id: 'env.forest-mid', url: './runtime-assets/env/forest-mid.jpg' },
  { id: 'env.forest-far-hd', url: './runtime-assets/env/forest-far-hd.jpg' },
  { id: 'env.forest-mid-hd', url: './runtime-assets/env/forest-mid-hd.jpg' },
  { id: 'env.torii-ruin', url: './runtime-assets/env/torii-ruin.png' },
  { id: 'env.torii-cutout', url: './runtime-assets/env/torii-cutout.png' },
  { id: 'env.tree-1', url: './runtime-assets/env/tree-1.png' },
  { id: 'env.tree-2', url: './runtime-assets/env/tree-2.png' },
  { id: 'env.tree-3', url: './runtime-assets/env/tree-3.png' },
  { id: 'env.tree-4', url: './runtime-assets/env/tree-4.png' },
  { id: 'env.moss', url: './runtime-assets/env/moss.jpg', repeat: [3, 3] },
  { id: 'env.path-ahead', url: './runtime-assets/env/path-ahead.jpg' },
  { id: 'fx.slash', url: './runtime-assets/fx/slash.png' },
  { id: 'fx.beam', url: './runtime-assets/fx/beam.png' },
  { id: 'fx.spark', url: './runtime-assets/fx/spark.png' },
  { id: 'fx.impact', url: './runtime-assets/fx/impact.png' },
  { id: 'fx.ring', url: './runtime-assets/fx/ring.png' },
  { id: 'char.rin', url: './runtime-assets/ui/rin-full.png' },
  { id: 'char.hio', url: './runtime-assets/ui/hio.png' },
  { id: 'char.hio-bound', url: './runtime-assets/ui/hio-bound.png' },
  { id: 'char.keeper', url: './runtime-assets/ui/keeper.png' },
  { id: 'char.soldier', url: './runtime-assets/char/soldier.png' },
  { id: 'char.archer', url: './runtime-assets/char/archer.png' },
  { id: 'char.mage', url: './runtime-assets/char/mage.png' },
  { id: 'char.hound', url: './runtime-assets/char/hound.png' },
  { id: 'char.elite', url: './runtime-assets/char/elite.png' },
  { id: 'char.boss', url: './runtime-assets/char/boss1.png' },
];

export class AssetRegistry {
  stages: LoadProgress[] = [];
  failed: { id: string; stage: string; status: string }[] = [];
  textures = new Map<string, THREE.Texture>();
  onStage?: (stage: string) => void;

  async boot(): Promise<void> {
    this.note('boot-ui', 'DOM 介面');
    const canLoad = typeof Image !== 'undefined';
    if (canLoad) {
      const loader = new THREE.TextureLoader();
      for (const spec of RUNTIME_TEX) {
        this.note(spec.id, spec.url);
        try {
          const tex = await loader.loadAsync(spec.url);
          tex.colorSpace = THREE.SRGBColorSpace;
          if (spec.repeat) {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(spec.repeat[0], spec.repeat[1]);
          }
          const hi = spec.id.includes('forest-') || spec.id.startsWith('env.tree') || spec.id === 'env.torii-cutout' || spec.id.startsWith('fx.');
          tex.anisotropy = spec.id.includes("forest-") ? 16 : hi ? 8 : 4;
          this.textures.set(spec.id, tex);
        } catch {
          this.failed.push({ id: spec.id, stage: 'runtime-art', status: 'missing' });
        }
      }
    } else {
      this.note('runtime-art', 'vitest: skip TextureLoader');
    }
    this.note('physics-wasm', 'Rapier 物理核心');
  }

  private note(stage: string, note: string): void {
    this.stages.push({ stage, knownBytes: null, note });
    this.onStage?.(stage);
  }
}
