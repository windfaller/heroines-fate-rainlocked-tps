import type { Vec3 } from '../../domain/types.ts';

export interface MoveResult {
  pos: Vec3;
  grounded: boolean;
  fell: boolean;
}

export interface StaticBox {
  id: string;
  center: Vec3;
  half: Vec3;
}

/**
 * Character controller notes (both Simple and Rapier):
 * - capsule radius 0.35, height 1.69
 * - step offset 0.4 m
 * - slope limit ~50 deg
 * - snap-to-ground 0.25 m
 * - skin/contact offset 0.08 m
 * - gravity -20 m/s^2
 * - coyote 6 ticks
 * Render mesh is NOT the collider.
 */
export interface IPhysicsWorld {
  reset(): void;
  addStaticBox(id: string, center: Vec3, half: Vec3): void;
  moveCharacter(id: string, from: Vec3, wish: Vec3, radius: number, height: number): MoveResult;
  raycast(origin: Vec3, dir: Vec3, max: number): number;
  boxes(): StaticBox[];
}
