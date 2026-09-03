import type { Combatant } from '../types.ts';

export interface IncomingHit {
  damage: number;
  guardDamage: number;
  poiseBreakTicks: number;
  sourceId: string;
}

export interface DamageResult {
  applied: number;
  kind: 'hit' | 'iframe' | 'cooldown' | 'dead' | 'blocked-stagger';
  poiseBroken: boolean;
  killed: boolean;
}

export function applyDamage(target: Combatant, hit: IncomingHit): DamageResult {
  if (target.dead) {
    return { applied: 0, kind: 'dead', poiseBroken: false, killed: false };
  }
  if (target.iFrames > 0) {
    return { applied: 0, kind: 'iframe', poiseBroken: false, killed: false };
  }
  if (target.damageCooldown > 0) {
    return { applied: 0, kind: 'cooldown', poiseBroken: false, killed: false };
  }

  let poiseBroken = false;
  if (target.guard > 0) {
    target.guard = Math.max(0, target.guard - hit.guardDamage);
    if (target.guard <= 0) {
      poiseBroken = true;
      target.poiseBreakTimer = hit.poiseBreakTicks;
      target.attack = null;
    }
  }

  const applied = Math.max(0, hit.damage);
  target.hp = Math.max(0, target.hp - applied);
  target.damageCooldown = 8;
  if (target.hp <= 0) {
    target.dead = true;
    target.attack = null;
    return { applied, kind: 'hit', poiseBroken, killed: true };
  }
  return {
    applied,
    kind: poiseBroken ? 'blocked-stagger' : 'hit',
    poiseBroken,
    killed: false,
  };
}

export function tickCombatantTimers(c: Combatant): void {
  if (c.iFrames > 0) c.iFrames -= 1;
  if (c.damageCooldown > 0) c.damageCooldown -= 1;
  if (c.poiseBreakTimer > 0) c.poiseBreakTimer -= 1;
  if (c.stamina < c.maxStamina) c.stamina = Math.min(c.maxStamina, c.stamina + 0.35);
}

export function grantIFrames(c: Combatant, ticks: number): void {
  c.iFrames = Math.max(c.iFrames, ticks);
}

export function distXZ(a: { x: number; z: number }, b: { x: number; z: number }): number {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz);
}

export function inSphere(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, r: number): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz <= r * r;
}
