import { Simulation } from '../domain/simulation.ts';
import { AssetRegistry } from '../runtime/assets/AssetRegistry.ts';
import { createRuntimePhysics } from '../runtime/physics/PhysicsWorld.ts';
import type { Texture } from 'three';

export async function bootstrap(
  sim: Simulation,
  opts?: { onStage?: (stage: string, done?: number, total?: number) => void },
): Promise<Map<string, Texture>> {
  const assets = new AssetRegistry();
  assets.onStage = (stage, done, total) => {
    sim.state.loadStage = stage;
    if (typeof done === 'number' && typeof total === 'number' && total > 0) {
      sim.state.loadProgress = done / total;
    }
    opts?.onStage?.(stage, done, total);
  };
  sim.state.loadStage = 'boot-ui';
  sim.state.loadProgress = 0;
  try {
    sim.state.loadStage = 'boot-parallel';
    opts?.onStage?.('boot-parallel', 0, 1);
    const artPromise = assets.boot();
    const physPromise = (async () => {
      try {
        sim.physics = await createRuntimePhysics();
      } catch (e) {
        sim.state.loadError = e instanceof Error ? e.message : 'physics';
      }
    })();
    await Promise.all([artPromise, physPromise]);
    sim.state.loadStage = 'ready';
    sim.state.loadProgress = 1;
    opts?.onStage?.('ready', 1, 1);
    sim.finishLoading();
  } catch (e) {
    sim.failLoading(sim.state.loadStage, e instanceof Error ? e.message : 'unknown');
  }
  return assets.textures;
}

export function createBootSim(): Simulation {
  return new Simulation({ seed: 20260903, allowDebug: import.meta.env.DEV });
}
