import type { ActorKind, Combatant, Vec3 } from '../domain/types.ts';

interface Spec {
  hp: number;
  guard: number;
  radius: number;
  height: number;
  speed: number;
}

const SPECS: Record<string, Spec> = {
  'sword-soldier': { hp: 35, guard: 25, radius: 0.38, height: 1.7, speed: 3.4 },
  archer: { hp: 28, guard: 15, radius: 0.36, height: 1.65, speed: 2.8 },
  caster: { hp: 40, guard: 20, radius: 0.4, height: 1.7, speed: 2.4 },
  'shadow-hound': { hp: 22, guard: 12, radius: 0.42, height: 0.7, speed: 6.2 },
  'lantern-hunter': { hp: 150, guard: 60, radius: 0.48, height: 2.0, speed: 3.6 },
  boss: { hp: 800, guard: 120, radius: 0.7, height: 2.4, speed: 3.2 },
  dummy: { hp: 20, guard: 0, radius: 0.35, height: 1.6, speed: 0 },
};

export function makeEnemy(id: string, kind: ActorKind, pos: Vec3): Combatant {
  const spec = SPECS[kind] ?? SPECS['sword-soldier']!;
  return {
    id,
    kind,
    team: 'enemy',
    pos: { ...pos },
    yaw: 0,
    hp: spec.hp,
    maxHp: spec.hp,
    guard: spec.guard,
    maxGuard: spec.guard,
    iFrames: 0,
    damageCooldown: 0,
    poiseBreakTimer: 0,
    dead: false,
    attack: null,
    stamina: 100,
    maxStamina: 100,
    radius: spec.radius,
    height: spec.height,
    speed: spec.speed,
  };
}
