import type { AttackDef, AttackState, Combatant } from '../types.ts';

let attackSeq = 1;

export const ATTACKS: Record<string, AttackDef> = {
  'rin.primary.1': {
    id: 'rin.primary.1', telegraphTicks: 6, contactTicks: 4, resultTicks: 3, recoveryTicks: 8,
    shape: 'sphere', range: 2.2, radius: 1.1, damage: 12, guardDamage: 8, poiseBreakTicks: 20,
  },
  'rin.primary.2': {
    id: 'rin.primary.2', telegraphTicks: 8, contactTicks: 4, resultTicks: 3, recoveryTicks: 10,
    shape: 'sphere', range: 2.3, radius: 1.2, damage: 14, guardDamage: 10, poiseBreakTicks: 22,
  },
  'rin.primary.3': {
    id: 'rin.primary.3', telegraphTicks: 10, contactTicks: 5, resultTicks: 4, recoveryTicks: 14,
    shape: 'sphere', range: 2.5, radius: 1.4, damage: 18, guardDamage: 14, poiseBreakTicks: 28,
  },
  'rin.secondary': {
    id: 'rin.secondary', telegraphTicks: 16, contactTicks: 2, resultTicks: 4, recoveryTicks: 18,
    shape: 'ray', range: 40, radius: 0.25, damage: 10, guardDamage: 18, poiseBreakTicks: 30,
  },
  'rin.q': {
    id: 'rin.q', telegraphTicks: 10, contactTicks: 8, resultTicks: 4, recoveryTicks: 16,
    shape: 'sphere', range: 0, radius: 6, damage: 8, guardDamage: 12, poiseBreakTicks: 24,
  },
  'rin.r': {
    id: 'rin.r', telegraphTicks: 4, contactTicks: 8, resultTicks: 2, recoveryTicks: 12,
    shape: 'sphere', range: 6, radius: 1.2, damage: 12, guardDamage: 8, poiseBreakTicks: 18,
  },
  'rin.f': {
    id: 'rin.f', telegraphTicks: 20, contactTicks: 10, resultTicks: 8, recoveryTicks: 24,
    shape: 'sphere', range: 0, radius: 8, damage: 40, guardDamage: 30, poiseBreakTicks: 48,
  },
  'enemy.slash': {
    id: 'enemy.slash', telegraphTicks: 18, contactTicks: 6, resultTicks: 4, recoveryTicks: 20,
    shape: 'sphere', range: 1.8, radius: 1.0, damage: 12, guardDamage: 8, poiseBreakTicks: 18,
  },
  'enemy.heavy': {
    id: 'enemy.heavy', telegraphTicks: 28, contactTicks: 8, resultTicks: 6, recoveryTicks: 28,
    shape: 'sphere', range: 2.2, radius: 1.3, damage: 22, guardDamage: 14, poiseBreakTicks: 30,
  },
  'enemy.arrow': {
    id: 'enemy.arrow', telegraphTicks: 24, contactTicks: 2, resultTicks: 4, recoveryTicks: 30,
    shape: 'ray', range: 28, radius: 0.2, damage: 10, guardDamage: 6, poiseBreakTicks: 12,
  },
  'enemy.cast': {
    id: 'enemy.cast', telegraphTicks: 30, contactTicks: 8, resultTicks: 6, recoveryTicks: 36,
    shape: 'sphere', range: 10, radius: 2.4, damage: 8, guardDamage: 4, poiseBreakTicks: 10,
  },
  'hound.dash': {
    id: 'hound.dash', telegraphTicks: 16, contactTicks: 8, resultTicks: 4, recoveryTicks: 22,
    shape: 'sphere', range: 5, radius: 1.0, damage: 14, guardDamage: 10, poiseBreakTicks: 16,
  },
  'elite.chain': {
    id: 'elite.chain', telegraphTicks: 22, contactTicks: 10, resultTicks: 6, recoveryTicks: 26,
    shape: 'sphere', range: 3.2, radius: 1.6, damage: 18, guardDamage: 12, poiseBreakTicks: 22,
  },
  'boss.triple1': {
    id: 'boss.triple1', telegraphTicks: 20, contactTicks: 8, resultTicks: 4, recoveryTicks: 8,
    shape: 'cone', range: 6, radius: 3.5, damage: 16, guardDamage: 10, poiseBreakTicks: 18,
  },
  'boss.triple2': {
    id: 'boss.triple2', telegraphTicks: 12, contactTicks: 8, resultTicks: 4, recoveryTicks: 8,
    shape: 'cone', range: 6, radius: 3.5, damage: 16, guardDamage: 10, poiseBreakTicks: 18,
  },
  'boss.triple3': {
    id: 'boss.triple3', telegraphTicks: 28, contactTicks: 10, resultTicks: 6, recoveryTicks: 22,
    shape: 'cone', range: 7, radius: 4, damage: 22, guardDamage: 14, poiseBreakTicks: 26,
  },
  'boss.chop': {
    id: 'boss.chop', telegraphTicks: 36, contactTicks: 8, resultTicks: 8, recoveryTicks: 28,
    shape: 'box', range: 5, radius: 2.2, damage: 28, guardDamage: 20, poiseBreakTicks: 36,
  },
  'boss.rain-arrow': {
    id: 'boss.rain-arrow', telegraphTicks: 24, contactTicks: 6, resultTicks: 6, recoveryTicks: 20,
    shape: 'sphere', range: 14, radius: 2.0, damage: 12, guardDamage: 6, poiseBreakTicks: 12,
  },
  'boss.clone-cut': {
    id: 'boss.clone-cut', telegraphTicks: 22, contactTicks: 8, resultTicks: 6, recoveryTicks: 18,
    shape: 'box', range: 10, radius: 1.4, damage: 20, guardDamage: 12, poiseBreakTicks: 20,
  },
  'boss.wave': {
    id: 'boss.wave', telegraphTicks: 26, contactTicks: 12, resultTicks: 6, recoveryTicks: 24,
    shape: 'sphere', range: 0, radius: 12, damage: 18, guardDamage: 8, poiseBreakTicks: 16,
  },
  'boss.thunder': {
    id: 'boss.thunder', telegraphTicks: 32, contactTicks: 6, resultTicks: 6, recoveryTicks: 20,
    shape: 'sphere', range: 16, radius: 2.2, damage: 24, guardDamage: 10, poiseBreakTicks: 18,
  },
};

export function startAttack(owner: Combatant, defId: string): AttackState | null {
  if (owner.dead || owner.poiseBreakTimer > 0) return null;
  if (owner.attack) return null;
  const def = ATTACKS[defId];
  if (!def) return null;
  const atk: AttackState = {
    id: `atk-${attackSeq++}`,
    defId: def.id,
    phase: 'telegraph',
    elapsed: 0,
    telegraphTicks: def.telegraphTicks,
    contactTicks: def.contactTicks,
    resultTicks: def.resultTicks,
    recoveryTicks: def.recoveryTicks,
    shape: def.shape,
    range: def.range,
    radius: def.radius,
    damage: def.damage,
    guardDamage: def.guardDamage,
    poiseBreakTicks: def.poiseBreakTicks,
    hits: [],
    ownerId: owner.id,
  };
  owner.attack = atk;
  return atk;
}

export function tickAttack(owner: Combatant): AttackState | null {
  const atk = owner.attack;
  if (!atk) return null;
  atk.elapsed += 1;
  const t0 = atk.telegraphTicks;
  const t1 = t0 + atk.contactTicks;
  const t2 = t1 + atk.resultTicks;
  const t3 = t2 + atk.recoveryTicks;
  if (atk.elapsed <= t0) atk.phase = 'telegraph';
  else if (atk.elapsed <= t1) atk.phase = 'contact';
  else if (atk.elapsed <= t2) atk.phase = 'result';
  else if (atk.elapsed <= t3) atk.phase = 'recovery';
  else {
    owner.attack = null;
    return null;
  }
  return atk;
}

export function attackForwardPoint(owner: Combatant, range: number): { x: number; y: number; z: number } {
  return {
    x: owner.pos.x + Math.sin(owner.yaw) * range,
    y: owner.pos.y + 1.0,
    z: owner.pos.z - Math.cos(owner.yaw) * range,
  };
}
