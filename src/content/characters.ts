import type { Combatant } from '../domain/types.ts';
import { PLAYER_HP } from '../domain/types.ts';
import type { Vec3 } from '../domain/types.ts';

export function makeRin(pos: Vec3, guardBonus = 0): Combatant {
  const guard = 50 + guardBonus;
  return {
    id: 'player-rin',
    kind: 'player',
    team: 'player',
    pos: { ...pos },
    yaw: 0,
    hp: PLAYER_HP,
    maxHp: PLAYER_HP,
    guard,
    maxGuard: guard,
    iFrames: 0,
    damageCooldown: 0,
    poiseBreakTimer: 0,
    dead: false,
    attack: null,
    stamina: 100,
    maxStamina: 100,
    radius: 0.35,
    height: 1.69,
    speed: 6.8,
  };
}

export function makeHio(pos: Vec3, hpBonus = 0): Combatant {
  const hp = 80 + hpBonus;
  return {
    id: 'npc-hio',
    kind: 'hio',
    team: 'npc',
    pos: { ...pos },
    yaw: Math.PI,
    hp,
    maxHp: hp,
    guard: 20,
    maxGuard: 20,
    iFrames: 0,
    damageCooldown: 0,
    poiseBreakTimer: 0,
    dead: false,
    attack: null,
    stamina: 100,
    maxStamina: 100,
    radius: 0.34,
    height: 1.62,
    speed: 4.2,
  };
}

export function makeKeeper(pos: Vec3): Combatant {
  return {
    id: 'npc-keeper',
    kind: 'keeper',
    team: 'npc',
    pos: { ...pos },
    yaw: 0,
    hp: 999,
    maxHp: 999,
    guard: 999,
    maxGuard: 999,
    iFrames: 9999,
    damageCooldown: 0,
    poiseBreakTimer: 0,
    dead: false,
    attack: null,
    stamina: 100,
    maxStamina: 100,
    radius: 0.4,
    height: 1.7,
    speed: 0,
  };
}
