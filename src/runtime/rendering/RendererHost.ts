import * as THREE from 'three';
import { applyTier, pickTier, type QualityTier } from './quality.ts';

export class RendererHost {
  renderer: THREE.WebGLRenderer;
  tier: QualityTier;
  constructor(canvas: HTMLCanvasElement) {
    const gl2 = !!canvas.getContext('webgl2');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.45;
    this.renderer.shadowMap.enabled = true;
    this.tier = pickTier(gl2, window.devicePixelRatio || 1);
    applyTier(this.renderer, this.tier);
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
  }

  info() {
    const i = this.renderer.info;
    return {
      backend: 'webgl2',
      tier: this.tier,
      calls: i.render.calls,
      triangles: i.render.triangles,
      textures: i.memory.textures,
      geometries: i.memory.geometries,
    };
  }
}
