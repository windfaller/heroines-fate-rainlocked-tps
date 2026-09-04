import { Simulation } from '../domain/simulation.ts';
import { AssetRegistry } from '../runtime/assets/AssetRegistry.ts';
import { createRuntimePhysics } from '../runtime/physics/PhysicsWorld.ts';
import type { Texture } from 'three';

const BOOT_BUDGET_MS = 25000;

export async function bootstrap(
  sim: Simulation,
  opts?: { onStage?: (stage: string, done?: number, total?: number) => void },
): Promise<{ textures: Map<string, Texture>; assets: AssetRegistry }> {
  const assets = new AssetRegistry();
  assets.onStage = (stage, done, total) => {
    sim.state.loadStage = stage;
    if (typeof done === 'number' && typeof total === 'number' && total > 0) {
      sim.state.loadProgress = Math.min(0.92, done / total);
    }
    opts?.onStage?.(stage, done, total);
  };
  sim.state.loadStage = 'boot-ui';
  sim.state.loadProgress = 0;
  const started = performance.now();
  try {
    sim.state.loadStage = 'boot-parallel';
    opts?.onStage?.('boot-parallel', 0, 1);

    const artPromise = assets.boot();
    const physPromise = (async () => {
      try {
        const phys = await Promise.race([
          createRuntimePhysics(),
          new Promise<never>((_, rej) => {
            window.setTimeout(() => rej(new Error('physics-timeout')), 12000);
          }),
        ]);
        sim.physics = phys;
      } catch (e) {
        sim.state.loadError = e instanceof Error ? e.message : 'physics';
        // Fallback already inside createRuntimePhysics; if race timed out, leave existing SimplePhysics.
      }
    })();

    await Promise.race([
      Promise.all([artPromise, physPromise]),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, BOOT_BUDGET_MS);
      }),
    ]);

    // If budget hit while still loading, continue with what we have.
    sim.state.loadStage = 'ready';
    sim.state.loadProgress = 1;
    opts?.onStage?.('ready', 1, 1);
    sim.finishLoading();
  } catch (e) {
    sim.failLoading(sim.state.loadStage, e instanceof Error ? e.message : 'unknown');
  }
  void started;
  return { textures: assets.textures, assets };
}

export function createBootSim(): Simulation {
  return new Simulation({ seed: 20260903, allowDebug: import.meta.env.DEV });
}
