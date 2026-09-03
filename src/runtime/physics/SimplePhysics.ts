import type { Vec3 } from '../../domain/types.ts';
import type { IPhysicsWorld, MoveResult, StaticBox } from './IPhysicsWorld.ts';

export class SimplePhysicsWorld implements IPhysicsWorld {
  private staticBoxes: StaticBox[] = [];
  private velY = 0;
  private coyote = 0;

  reset(): void {
    this.staticBoxes = [];
    this.velY = 0;
    this.coyote = 0;
  }

  addStaticBox(id: string, center: Vec3, half: Vec3): void {
    this.staticBoxes.push({ id, center, half });
  }

  boxes(): StaticBox[] {
    return this.staticBoxes;
  }

  raycast(origin: Vec3, dir: Vec3, max: number): number {
    let hit = max;
    for (let t = 0.1; t < max; t += 0.15) {
      const p = { x: origin.x + dir.x * t, y: origin.y + dir.y * t, z: origin.z + dir.z * t };
      for (const b of this.staticBoxes) {
        if (
          Math.abs(p.x - b.center.x) <= b.half.x &&
          Math.abs(p.y - b.center.y) <= b.half.y &&
          Math.abs(p.z - b.center.z) <= b.half.z
        ) {
          return t;
        }
      }
    }
    return hit;
  }

  moveCharacter(_id: string, from: Vec3, wish: Vec3, radius: number, height: number): MoveResult {
    let x = wish.x;
    let z = wish.z;
    let y = from.y;
    this.velY -= 20 * (1 / 60);
    y += this.velY * (1 / 60);
    let grounded = false;
    let fell = false;
    const groundY = this.groundAt(x, z, radius);
    if (y <= groundY) {
      y = groundY;
      this.velY = 0;
      grounded = true;
      this.coyote = 6;
    } else {
      this.coyote -= 1;
    }
    if (y < groundY - 6) {
      fell = true;
      y = groundY;
      this.velY = 0;
      grounded = true;
    }
    void height;
    return { pos: { x, y, z }, grounded, fell };
  }

  private groundAt(x: number, z: number, radius: number): number {
    let y = -20;
    for (const b of this.staticBoxes) {
      if (Math.abs(x - b.center.x) <= b.half.x + radius && Math.abs(z - b.center.z) <= b.half.z + radius) {
        const top = b.center.y + b.half.y;
        if (top > y) y = top;
      }
    }
    return y;
  }
}
