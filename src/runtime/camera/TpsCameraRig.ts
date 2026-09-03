import * as THREE from 'three';
import type { RunState } from '../../domain/types.ts';
import type { IPhysicsWorld } from '../physics/IPhysicsWorld.ts';

export type CameraMode = 'locomotion' | 'aim' | 'lock-on' | 'dodge' | 'boss-intro' | 'result';

export class TpsCameraRig {
  camera: THREE.PerspectiveCamera;
  mode: CameraMode = 'locomotion';
  private shake = 0;
  private occlusion = 0;
  constructor() {
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.22, 520);
  }

  resize(w: number, h: number): void {
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  }

  addShake(v: number): void {
    this.shake = Math.min(1, this.shake + v);
  }

  update(run: RunState, physics: IPhysicsWorld, aiming: boolean, reduced: number): void {
    this.mode = run.lockOnId ? 'lock-on' : aiming ? 'aim' : 'locomotion';
    const fov = aiming ? 54 : 62;
    this.camera.fov = fov;
    const yaw = run.cameraYaw;
    const pitch = Math.max(-0.12, Math.min(0.38, run.cameraPitch));
    const distWant = aiming ? 4.2 : 6.2;
    const origin = new THREE.Vector3(run.player.pos.x, run.player.pos.y + 1.38, run.player.pos.z);
    const dir = new THREE.Vector3(
      Math.sin(yaw) * Math.cos(pitch),
      Math.sin(pitch),
      Math.cos(yaw) * Math.cos(pitch),
    );
    const shoulder = new THREE.Vector3(-Math.cos(yaw) * 0.55, 0, Math.sin(yaw) * 0.55);
    const rayO = { x: origin.x, y: origin.y, z: origin.z };
    const rayD = { x: dir.x, y: dir.y, z: dir.z };
    const hit = physics.raycast(rayO, rayD, distWant + 0.4);
    const dist = Math.max(2.6, Math.min(distWant, hit - 0.45));
    this.occlusion = distWant - dist;
    const shakeAmp = this.shake * 0.16 * (1 - reduced);
    this.shake *= 0.86;
    this.camera.position.set(
      origin.x + dir.x * dist + shoulder.x + (Math.random() - 0.5) * shakeAmp,
      origin.y + dir.y * dist + shakeAmp * 0.4,
      origin.z + dir.z * dist + shoulder.z,
    );
    this.camera.lookAt(origin.x + shoulder.x * 0.2, origin.y, origin.z);
    this.camera.updateProjectionMatrix();
  }

  snapshot() {
    return {
      pose: this.camera.position.toArray(),
      fov: this.camera.fov,
      mode: this.mode,
      occlusionLength: this.occlusion,
    };
  }
}
