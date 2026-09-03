import type { RunState } from '../types.ts';
import { distXZ } from '../combat/damage.ts';
import { KEEPER_POS } from '../../levels/rainboundShrine.ts';

export const ESCORT_LEASH = 18;
export const ESCORT_OOB_TICKS = 8 * 60;

export function tickEscort(run: RunState): void {
  if (run.hioState !== 'escorting' && run.hioState !== 'rescued') return;
  const hio = run.npcs.find((n) => n.kind === 'hio');
  if (!hio || hio.dead) {
    run.hioState = 'down';
    run.hioHp = 0;
    run.escortFailCause = 'hio-down';
    return;
  }

  if (run.hioState === 'rescued') {
    run.hioState = 'escorting';
  }

  const follow = run.player.pos;
  const d = distXZ(hio.pos, follow);
  if (d > 2.2) {
    const nx = (follow.x - hio.pos.x) / (d || 1);
    const nz = (follow.z - hio.pos.z) / (d || 1);
    const step = Math.min(4.2 / 60, d - 1.6);
    hio.pos = { x: hio.pos.x + nx * step, y: hio.pos.y, z: hio.pos.z + nz * step };
  }

  if (d > ESCORT_LEASH) {
    run.hioOutOfBoundsTicks += 1;
  } else {
    run.hioOutOfBoundsTicks = Math.max(0, run.hioOutOfBoundsTicks - 2);
  }

  if (run.hioOutOfBoundsTicks >= ESCORT_OOB_TICKS) {
    run.escortFailCause = 'escort-bounds';
  }

  if (distXZ(hio.pos, KEEPER_POS) <= 4.0 && distXZ(run.player.pos, KEEPER_POS) <= 6.0) {
    if (!run.triggersFired.includes('escort-arrive')) {
      run.triggersFired.push('escort-arrive');
    }
  }

  run.hioHp = hio.hp;
}

export function isEscortFailed(run: RunState): boolean {
  return run.escortFailCause !== null;
}
