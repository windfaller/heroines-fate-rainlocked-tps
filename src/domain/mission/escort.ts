import type { RunState } from '../types.ts';
import { distXZ } from '../combat/damage.ts';
import { KEEPER_POS } from '../../levels/rainboundShrine.ts';

export const ESCORT_LEASH = 18;
export const ESCORT_OOB_TICKS = 8 * 60;
export const HIO_REVIVE_TICKS = 10 * 60;

export function canReviveHio(run: RunState): boolean {
  if (run.hioState !== 'down') return false;
  const hio = run.npcs.find((n) => n.kind === 'hio');
  if (!hio) return false;
  return distXZ(run.player.pos, hio.pos) <= 3.2;
}

export function reviveHio(run: RunState): boolean {
  if (!canReviveHio(run)) return false;
  const hio = run.npcs.find((n) => n.kind === 'hio');
  if (!hio) return false;
  hio.dead = false;
  hio.hp = Math.max(24, Math.round(hio.maxHp * 0.45));
  run.hioHp = hio.hp;
  run.hioState = 'escorting';
  run.hioDownTicks = 0;
  run.escortFailCause = null;
  run.pendingCues.push('revive');
  return true;
}

export function tickEscort(run: RunState): void {
  const hio = run.npcs.find((n) => n.kind === 'hio');

  if (run.hioState === 'down') {
    run.hioDownTicks += 1;
    if (hio) {
      run.hioHp = 0;
      hio.hp = 0;
    }
    if (run.hioDownTicks >= HIO_REVIVE_TICKS) {
      run.escortFailCause = 'hio-down';
    }
    return;
  }

  if (run.hioState !== 'escorting' && run.hioState !== 'rescued') return;
  if (!hio || (hio.dead && hio.hp <= 0)) {
    run.hioState = 'down';
    run.hioHp = 0;
    run.hioDownTicks = 0;
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
