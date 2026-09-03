import type { Simulation } from '../../domain/simulation.ts';
import type { RendererHost } from '../rendering/RendererHost.ts';
import type { TpsCameraRig } from '../camera/TpsCameraRig.ts';
import type { AudioDirector } from '../audio/AudioDirector.ts';

export function installDiagnostics(
  sim: Simulation,
  renderer: RendererHost | null,
  camera: TpsCameraRig | null,
  audio: AudioDirector,
): void {
  const snapshot = () => ({
    ...sim.snapshot(),
    camera: camera?.snapshot() ?? null,
    audio: { status: audio.status, muted: audio.muted },
    viewport: typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio } : null,
    renderer: renderer?.info() ?? null,
  });
  const api: Window['__GAME_DIAGNOSTICS__'] = {
    snapshot,
    rendererInfo: () => renderer?.info() ?? { backend: 'none' },
  };
  if (import.meta.env.DEV && sim.allowDebug) {
    api.advanceTime = (ms: number) => sim.advanceTime(ms);
    api.setSeed = (seed: number) => sim.setSeed(seed);
    api.setDebugView = (kind: string, enabled: boolean) => {
      void kind;
      void enabled;
    };
  }
  window.__GAME_DIAGNOSTICS__ = api;
}
