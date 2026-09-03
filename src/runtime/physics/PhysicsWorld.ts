import type { Vec3 } from '../../domain/types.ts';
import type { IPhysicsWorld, MoveResult, StaticBox } from './IPhysicsWorld.ts';
import { SimplePhysicsWorld } from './SimplePhysics.ts';

export class RapierPhysicsWorld implements IPhysicsWorld {
  private R: any;
  private world: any;
  private controller: any;
  private bodies = new Map<string, any>();
  private boxList: StaticBox[] = [];
  private fallback = new SimplePhysicsWorld();
  ready = true;

  constructor(R: any) {
    this.R = R;
    this.world = new R.World({ x: 0, y: -20, z: 0 });
    this.controller = this.world.createCharacterController(0.08);
    this.controller.setMaxSlopeClimbAngle((50 * Math.PI) / 180);
    this.controller.setMinSlopeSlideAngle((40 * Math.PI) / 180);
    this.controller.enableSnapToGround(0.25);
    this.controller.setApplyImpulsesToDynamicBodies(false);
    this.controller.setCharacterMass(60);
  }

  reset(): void {
    this.boxList = [];
    this.fallback.reset();
    this.world.free();
    this.world = new this.R.World({ x: 0, y: -20, z: 0 });
    this.controller = this.world.createCharacterController(0.08);
    this.controller.setMaxSlopeClimbAngle((50 * Math.PI) / 180);
    this.controller.setMinSlopeSlideAngle((40 * Math.PI) / 180);
    this.controller.enableSnapToGround(0.25);
    this.bodies.clear();
  }

  addStaticBox(id: string, center: Vec3, half: Vec3): void {
    this.boxList.push({ id, center, half });
    this.fallback.addStaticBox(id, center, half);
    const body = this.world.createRigidBody(this.R.RigidBodyDesc.fixed().setTranslation(center.x, center.y, center.z));
    this.world.createCollider(this.R.ColliderDesc.cuboid(half.x, half.y, half.z), body);
    this.bodies.set(id, body);
  }

  boxes(): StaticBox[] {
    return this.boxList;
  }

  raycast(origin: Vec3, dir: Vec3, max: number): number {
    const ray = new this.R.Ray({ x: origin.x, y: origin.y, z: origin.z }, { x: dir.x, y: dir.y, z: dir.z });
    const hit = this.world.castRay(ray, max, true);
    return hit ? hit.timeOfImpact : max;
  }

  moveCharacter(id: string, from: Vec3, wish: Vec3, radius: number, height: number): MoveResult {
    void id;
    const desired = { x: wish.x - from.x, y: wish.y - from.y - 0.02, z: wish.z - from.z };
    const half = Math.max(0.1, height * 0.5 - radius);
    const collider = this.R.ColliderDesc.capsule(half, radius).setTranslation(from.x, from.y + height * 0.5, from.z);
    const tmpBody = this.world.createRigidBody(this.R.RigidBodyDesc.kinematicPositionBased().setTranslation(from.x, from.y, from.z));
    const col = this.world.createCollider(collider, tmpBody);
    this.controller.computeColliderMovement(col, desired);
    const mv = this.controller.computedMovement();
    const grounded = this.controller.computedGrounded();
    const pos = { x: from.x + mv.x, y: from.y + mv.y, z: from.z + mv.z };
    this.world.removeRigidBody(tmpBody);
    this.world.step();
    const fell = pos.y < from.y - 6;
    return { pos, grounded, fell };
  }
}

export async function createRuntimePhysics(): Promise<IPhysicsWorld> {
  try {
    const mod: any = await import('@dimforge/rapier3d-compat');
    const R = mod.default ?? mod;
    await R.init();
    return new RapierPhysicsWorld(R);
  } catch {
    return new SimplePhysicsWorld();
  }
}
