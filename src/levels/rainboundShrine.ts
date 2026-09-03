import type { Vec3 } from '../domain/types.ts';
import type { MissionLevel } from './schema.ts';

/** Path length along the S-curve. 1 unit = 1 m. */
export const PATH_LENGTH = 231;

export const WORLD_SCALE = 1.75;

export function pathAt(s: number): Vec3 {
  const t = Math.max(0, Math.min(PATH_LENGTH, s));
  const x = 32 * Math.sin((t / PATH_LENGTH) * Math.PI);
  const y = 5.5 * (t / PATH_LENGTH);
  const z = -t * WORLD_SCALE;
  return { x, y, z };
}

export const KEEPER_POS = pathAt(45);
export const BOSS_CENTER = pathAt(202);
export const SEAL_POS = pathAt(226);
export const SPAWN_POS = pathAt(2);

export const RAINBOUND: MissionLevel = {
  id: 'rainbound-shrine',
  version: 1,
  title: '雨鎖山門',
  theme: 'rain-night-shrine',
  estimatedDuration: '12-18min',
  sections: [
    { id: 's0', name: '雨中入口', s0: 0, s1: 20, function: 'spawn' },
    { id: 's1', name: '外鳥居', s0: 20, s1: 38, function: 'tutorial' },
    { id: 's2', name: '燈守據點', s0: 38, s1: 53, function: 'keeper' },
    { id: 's3', name: '石階林', s0: 53, s1: 81, function: 'encounter-a' },
    { id: 's4', name: '斷橋', s0: 81, s1: 105, function: 'traversal' },
    { id: 's5', name: '洗心池', s0: 105, s1: 133, function: 'encounter-b' },
    { id: 's6', name: '燈庭', s0: 133, s1: 163, function: 'elite' },
    { id: 's7', name: '內參道', s0: 163, s1: 183, function: 'checkpoint' },
    { id: 's8', name: '封門廣場', s0: 183, s1: 221, function: 'boss' },
    { id: 's9', name: '封印台', s0: 221, s1: 231, function: 'rescue' },
    { id: 's10', name: '撤離路', s0: 53, s1: 45, function: 'escort-shortcut' },
  ],
  waves: [
    {
      id: 'tutorial-blade',
      sectionId: 's1',
      triggerId: 's1-torii',
      enemies: [{ kind: 'sword-soldier', id: 'tut-blade', s: 30, offsetX: 2 }],
    },
    {
      id: 'enc-a-w1',
      sectionId: 's3',
      triggerId: 's3-stairs',
      enemies: [
        { kind: 'sword-soldier', id: 'enc-a-blade-1', s: 62, offsetX: -2 },
        { kind: 'sword-soldier', id: 'enc-a-blade-2', s: 66, offsetX: 2 },
      ],
    },
    {
      id: 'wave-enc-a-2',
      sectionId: 's3',
      triggerId: 'enc-a-w2',
      enemies: [
        { kind: 'archer', id: 'enc-a-archer', s: 74, offsetX: 6 },
        { kind: 'sword-soldier', id: 'enc-a-blade-3', s: 70, offsetX: -2 },
        { kind: 'sword-soldier', id: 'enc-a-blade-4', s: 72, offsetX: 2 },
      ],
    },
    {
      id: 'wave-bridge-hound',
      sectionId: 's4',
      triggerId: 's4-bridge',
      enemies: [{ kind: 'shadow-hound', id: 'enc-bridge-hound', s: 92, offsetX: -3 }],
    },
    {
      id: 'enc-b-w1',
      sectionId: 's5',
      triggerId: 's5-pool',
      enemies: [
        { kind: 'caster', id: 'enc-b-caster', s: 116, offsetX: 0 },
        { kind: 'shadow-hound', id: 'enc-b-hound-1', s: 112, offsetX: -3 },
        { kind: 'shadow-hound', id: 'enc-b-hound-2', s: 112, offsetX: 3 },
      ],
    },
    {
      id: 'wave-enc-b-2',
      sectionId: 's5',
      triggerId: 'enc-b-w2',
      enemies: [{ kind: 'archer', id: 'enc-b-archer', s: 124, offsetX: 5 }],
    },
    {
      id: 'elite',
      sectionId: 's6',
      triggerId: 's6-court',
      enemies: [
        { kind: 'lantern-hunter', id: 'elite-hunter', s: 148, offsetX: 0 },
        { kind: 'sword-soldier', id: 'elite-blade', s: 144, offsetX: -3 },
        { kind: 'archer', id: 'elite-archer', s: 152, offsetX: 4 },
      ],
    },
    {
      id: 'boss',
      sectionId: 's8',
      triggerId: 's8-arena',
      enemies: [{ kind: 'boss', id: 'boss-rain-eroded', s: 202, offsetX: 0 }],
    },
    {
      id: 'escort-w1',
      sectionId: 's10',
      triggerId: 'escort-start',
      enemies: [
        { kind: 'shadow-hound', id: 'esc-hound-1', s: 170, offsetX: -2 },
        { kind: 'shadow-hound', id: 'esc-hound-2', s: 168, offsetX: 2 },
      ],
    },
    {
      id: 'wave-escort-2',
      sectionId: 's10',
      triggerId: 'escort-w2',
      enemies: [
        { kind: 'archer', id: 'esc-archer', s: 90, offsetX: 4 },
        { kind: 'sword-soldier', id: 'esc-blade', s: 88, offsetX: -2 },
      ],
    },
  ],
  triggers: [
    { id: 's1-torii', pos: pathAt(24), radius: 14 },
    { id: 's2-keeper', pos: pathAt(45), radius: 16 },
    { id: 's3-stairs', pos: pathAt(56), radius: 16 },
    { id: 'enc-a-w2', pos: pathAt(68), radius: 16 },
    { id: 's4-bridge', pos: pathAt(84), radius: 16 },
    { id: 's5-pool', pos: pathAt(108), radius: 16 },
    { id: 'enc-b-w2', pos: pathAt(120), radius: 16 },
    { id: 's6-court', pos: pathAt(136), radius: 18 },
    { id: 's7-inner', pos: pathAt(168), radius: 16 },
    { id: 's8-arena', pos: pathAt(188), radius: 22 },
    { id: 's9-seal', pos: pathAt(226), radius: 14 },
    { id: 'escort-start', pos: pathAt(226), radius: 16 },
    { id: 'escort-w2', pos: pathAt(100), radius: 18 },
    { id: 'escort-arrive', pos: pathAt(45), radius: 14 },
    { id: 'light-main-lantern', pos: pathAt(45), radius: 10 },
  ],
  checkpoints: [
    { id: 'keeper', pos: pathAt(45) },
    { id: 'inner-path', pos: pathAt(170) },
    { id: 'rescue', pos: pathAt(226) },
    { id: 'escort', pos: pathAt(220) },
  ],
  interactables: [
    { id: 'binding-1', pos: pathAt(226), kind: 'binding' },
    { id: 'binding-2', pos: pathAt(226), kind: 'binding' },
    { id: 'binding-3', pos: pathAt(226), kind: 'binding' },
    { id: 'main-lantern', pos: pathAt(45), kind: 'lantern' },
  ],
  rewards: ['archive.hio.rescue', 'archive.kuzuha.teaser', 'module.pin-rain', 'module.iron-breath'],
  assetGroups: ['boot-critical', 'rainbound-section-0', 'rainbound-boss-lazy'],
};

export const BRIDGE_GAPS = [
  { s: 90, width: 1.5 },
  { s: 98, width: 1.5 },
];

export function nearestPathS(pos: Vec3): number {
  let best = 0;
  let bestD = Infinity;
  for (let s = 0; s <= PATH_LENGTH; s += 2) {
    const p = pathAt(s);
    const d = (p.x - pos.x) ** 2 + (p.z - pos.z) ** 2;
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best;
}
