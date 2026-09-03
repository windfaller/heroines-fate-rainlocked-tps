import { Simulation } from '../domain/simulation.ts';
import { AssetRegistry } from '../runtime/assets/AssetRegistry.ts';
import { createRuntimePhysics } from '../runtime/physics/PhysicsWorld.ts';
import type { Texture } from 'three';

export async function bootstrap(
  sim: Simulation,
  opts?: { onStage?: (stage: string) => void },
): Promise<Map<string, Texture>> {
  const assets = new AssetRegistry();
  assets.onStage = (stage) => {
    sim.state.loadStage = stage;
    opts?.onStage?.(stage);
  };
  sim.state.loadStage = 'boot-ui';
  try {
    await assets.boot();
    sim.state.loadStage = 'physics-wasm';
    opts?.onStage?.('physics-wasm');
    try {
      sim.physics = await createRuntimePhysics();
    } catch (e) {
      sim.state.loadError = e instanceof Error ? e.message : 'physics';
    }
    sim.state.loadStage = 'runtime-art';
    opts?.onStage?.('runtime-art');
    sim.finishLoading();
  } catch (e) {
    sim.failLoading(sim.state.loadStage, e instanceof Error ? e.message : 'unknown');
  }
  return assets.textures;
}

export function createBootSim(): Simulation {
  return new Simulation({ seed: 20260903, allowDebug: import.meta.env.DEV });
}
