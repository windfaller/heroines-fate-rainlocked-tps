import * as THREE from 'three';
import type { ActorKind, Combatant } from '../../domain/types.ts';

export interface HumanoidPalette {
  skin: number;
  cloth: number;
  clothDark: number;
  accent: number;
  hair: number;
  weapon: number;
  metal: number;
}

const PALETTES: Record<string, HumanoidPalette> = {
  player: {
    skin: 0xf3e4d6,
    cloth: 0xf4fbff,
    clothDark: 0x8ee7ff,
    accent: 0xb9f3ff,
    hair: 0xd2f4ff,
    weapon: 0xd7eefc,
    metal: 0x9ab8c8,
  },
  hio: {
    skin: 0xf0dcc4,
    cloth: 0xe8c56b,
    clothDark: 0xc49a2a,
    accent: 0xffe7a0,
    hair: 0xf6d56a,
    weapon: 0xffe08a,
    metal: 0xddb84a,
  },
  keeper: {
    skin: 0xeadcc8,
    cloth: 0xffe7a0,
    clothDark: 0xc9b06a,
    accent: 0xfff3c8,
    hair: 0xf8e0a8,
    weapon: 0xffd48a,
    metal: 0xe0b84a,
  },
  dummy: {
    skin: 0xc4b8a8,
    cloth: 0x8899aa,
    clothDark: 0x667788,
    accent: 0xa8b8c4,
    hair: 0x66707a,
    weapon: 0x8a6a44,
    metal: 0x6a5848,
  },
  enemy: {
    skin: 0x6a4a5e,
    cloth: 0x4a2358,
    clothDark: 0x2a1238,
    accent: 0x7a3d6a,
    hair: 0x1a0c18,
    weapon: 0x5a3048,
    metal: 0x3a2030,
  },
  boss: {
    skin: 0x5a3048,
    cloth: 0x3a1028,
    clothDark: 0x1a0814,
    accent: 0x7a2040,
    hair: 0x140810,
    weapon: 0x6a1428,
    metal: 0x3a1020,
  },
};

export function paletteFor(kind: ActorKind): HumanoidPalette {
  if (kind === 'player') return PALETTES.player!;
  if (kind === 'hio') return PALETTES.hio!;
  if (kind === 'keeper') return PALETTES.keeper!;
  if (kind === 'dummy') return PALETTES.dummy!;
  if (kind === 'boss') return PALETTES.boss!;
  return PALETTES.enemy!;
}

export function placeholderIdFor(kind: ActorKind): string {
  switch (kind) {
    case 'player':
      return 'gb.player.humanoid';
    case 'hio':
      return 'gb.hio.humanoid';
    case 'keeper':
      return 'gb.keeper.humanoid';
    case 'sword-soldier':
      return 'gb.sword-soldier.humanoid';
    case 'archer':
      return 'gb.archer.humanoid';
    case 'caster':
      return 'gb.caster.humanoid';
    case 'shadow-hound':
      return 'gb.shadow-hound.assembled';
    case 'lantern-hunter':
      return 'gb.lantern-hunter.humanoid';
    case 'boss':
      return 'gb.boss.humanoid';
    case 'dummy':
      return 'gb.dummy.humanoid';
  }
}

function std(color: number, extras?: { roughness?: number; metalness?: number; emissive?: number; emissiveIntensity?: number }): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: extras?.roughness ?? 0.55,
    metalness: extras?.metalness ?? 0.12,
    emissive: extras?.emissive ?? 0x000000,
    emissiveIntensity: extras?.emissiveIntensity ?? 0,
  });
}

function box(mat: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function sphere(mat: THREE.Material, r: number, x: number, y: number, z: number, seg = 10): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, 8), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function cyl(mat: THREE.Material, rt: number, rb: number, h: number, x: number, y: number, z: number, seg = 8): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function tag(obj: THREE.Object3D, id: string): void {
  obj.userData.placeholder = id;
  obj.traverse((o) => {
    o.userData.placeholder = id;
  });
}

export function countMeshes(obj: THREE.Object3D): number {
  let n = 0;
  obj.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) n += 1;
  });
  return n;
}

export function assembleHumanoid(c: Combatant): THREE.Group {
  const g = new THREE.Group();
  g.name = c.id;
  const pid = placeholderIdFor(c.kind);
  g.userData.placeholder = pid;
  g.userData.kind = c.kind;
  g.userData.height = c.height;
  if (c.kind === 'shadow-hound') assembleHound(g, c, pid);
  else assembleBiped(g, c, pid);
  g.updateMatrixWorld(true);
  return g;
}

function assembleBiped(g: THREE.Group, c: Combatant, pid: string): void {
  const pal = paletteFor(c.kind);
  const s = Math.max(0.55, c.height / 1.69);
  const skin = std(pal.skin, { roughness: 0.62 });
  const cloth = std(pal.cloth, { roughness: 0.48, metalness: c.kind === 'player' ? 0.18 : 0.08 });
  const dark = std(pal.clothDark, { roughness: 0.5, metalness: 0.1 });
  const accent = std(pal.accent, {
    roughness: 0.4,
    metalness: 0.2,
    emissive: pal.accent,
    emissiveIntensity: c.kind === 'player' || c.kind === 'hio' ? 0.18 : 0.06,
  });
  const hair = std(pal.hair, { roughness: 0.7 });
  const metal = std(pal.metal, { roughness: 0.32, metalness: 0.72 });
  const blade = std(pal.weapon, { roughness: 0.28, metalness: 0.65, emissive: pal.weapon, emissiveIntensity: 0.12 });

  const hipY = 0.92 * s;
  const torsoH = 0.42 * s;
  const torsoY = hipY + 0.08 * s + torsoH * 0.5;
  const shoulderY = torsoY + torsoH * 0.38;
  const headR = 0.105 * s;
  const headY = c.height - headR;
  const legGap = 0.11 * s;
  const thighH = 0.38 * s;
  const shinH = 0.34 * s;
  const footH = 0.07 * s;

  g.add(box(dark, 0.16 * s, footH, 0.28 * s, -legGap, footH * 0.5, 0.02 * s));
  g.add(box(dark, 0.16 * s, footH, 0.28 * s, legGap, footH * 0.5, 0.02 * s));
  g.add(box(cloth, 0.14 * s, shinH, 0.14 * s, -legGap, footH + shinH * 0.5, 0));
  g.add(box(cloth, 0.14 * s, shinH, 0.14 * s, legGap, footH + shinH * 0.5, 0));
  g.add(box(dark, 0.16 * s, thighH, 0.16 * s, -legGap, footH + shinH + thighH * 0.5, 0));
  g.add(box(dark, 0.16 * s, thighH, 0.16 * s, legGap, footH + shinH + thighH * 0.5, 0));
  g.add(box(accent, 0.34 * s, 0.14 * s, 0.2 * s, 0, hipY, 0));
  const torso = box(cloth, 0.36 * s, torsoH, 0.22 * s, 0, torsoY, 0);
  g.add(torso);
  g.userData.torso = torso;
  g.add(box(accent, 0.22 * s, 0.08 * s, 0.24 * s, 0, torsoY + 0.04 * s, 0.02 * s));
  g.add(cyl(skin, 0.05 * s, 0.055 * s, 0.08 * s, 0, headY - headR - 0.04 * s, 0, 6));
  const head = sphere(skin, headR, 0, headY, 0, 12);
  g.add(head);
  g.add(box(hair, 0.2 * s, 0.08 * s, 0.18 * s, 0, headY + headR * 0.55, -0.01 * s));
  g.add(box(dark, 0.03 * s, 0.02 * s, 0.02 * s, -0.035 * s, headY + 0.01 * s, headR * 0.82));
  g.add(box(dark, 0.03 * s, 0.02 * s, 0.02 * s, 0.035 * s, headY + 0.01 * s, headR * 0.82));

  const armX = 0.24 * s;
  const upperH = 0.28 * s;
  const foreH = 0.26 * s;
  g.add(box(cloth, 0.1 * s, upperH, 0.1 * s, -armX, shoulderY - upperH * 0.35, 0));
  g.add(box(cloth, 0.1 * s, upperH, 0.1 * s, armX, shoulderY - upperH * 0.35, 0));
  g.add(box(skin, 0.09 * s, foreH, 0.09 * s, -armX, shoulderY - upperH * 0.7 - foreH * 0.45, 0.02 * s));
  g.add(box(skin, 0.09 * s, foreH, 0.09 * s, armX, shoulderY - upperH * 0.7 - foreH * 0.45, 0.02 * s));
  g.add(box(skin, 0.08 * s, 0.08 * s, 0.1 * s, -armX, shoulderY - upperH - foreH * 0.55, 0.04 * s));
  const rHand = box(skin, 0.08 * s, 0.08 * s, 0.1 * s, armX, shoulderY - upperH - foreH * 0.55, 0.04 * s);
  g.add(rHand);

  const weapon = makeWeapon(c.kind, s, blade, metal, accent);
  weapon.position.set(armX, rHand.position.y + 0.15 * s, 0.12 * s);
  g.add(weapon);
  g.userData.weapon = weapon;

  if (c.kind === 'hio') {
    for (let i = 0; i < 3; i++) {
      const b = box(accent, 0.04 * s, 0.55 * s, 0.04 * s, (i - 1) * 0.12 * s, torsoY, 0.14 * s);
      b.userData.binding = true;
      g.add(b);
    }
  }
  if (c.kind === 'boss') {
    const pauldron = box(dark, 0.22 * s, 0.12 * s, 0.28 * s, 0, shoulderY + 0.06 * s, 0);
    g.add(pauldron);
    g.add(box(accent, 0.5 * s, 0.08 * s, 0.08 * s, 0, headY + headR + 0.04 * s, 0));
  }
  tag(g, pid);
}

function makeWeapon(kind: ActorKind, s: number, blade: THREE.Material, metal: THREE.Material, accent: THREE.Material): THREE.Group {
  const w = new THREE.Group();
  if (kind === 'archer') {
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.28 * s, 0.03 * s, 6, 14, Math.PI), metal);
    bow.rotation.y = Math.PI / 2;
    bow.rotation.z = Math.PI / 2;
    const string = box(accent, 0.01 * s, 0.52 * s, 0.01 * s, 0, 0, 0);
    w.add(bow, string);
  } else if (kind === 'caster') {
    const orb = sphere(accent, 0.1 * s, 0, 0.2 * s, 0.16 * s, 10);
    (orb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7;
    w.add(orb);
    w.add(cyl(metal, 0.02 * s, 0.03 * s, 0.55 * s, 0, 0, 0.08 * s, 6));
  } else if (kind === 'keeper') {
    w.add(cyl(metal, 0.025 * s, 0.03 * s, 0.7 * s, 0, 0.1 * s, 0.08 * s, 6));
    const lamp = box(accent, 0.14 * s, 0.14 * s, 0.14 * s, 0, 0.48 * s, 0.08 * s);
    (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.85;
    w.add(lamp);
  } else if (kind === 'boss') {
    w.add(box(metal, 0.06 * s, 0.08 * s, 0.12 * s, 0, 0, 0));
    w.add(box(blade, 0.07 * s, 1.35 * s, 0.05 * s, 0, 0.7 * s, 0));
  } else if (kind === 'lantern-hunter') {
    w.add(box(blade, 0.05 * s, 0.85 * s, 0.04 * s, 0, 0.42 * s, 0));
    const lamp = box(accent, 0.12 * s, 0.16 * s, 0.12 * s, 0.16 * s, 0.2 * s, 0.1 * s);
    (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
    w.add(lamp);
  } else if (kind === 'hio') {
    w.add(box(accent, 0.04 * s, 0.02 * s, 0.04 * s, 0, 0, 0));
  } else {
    const tsuba = cyl(metal, 0.08 * s, 0.08 * s, 0.03 * s, 0, 0.02 * s, 0, 10);
    tsuba.rotation.x = Math.PI / 2;
    w.add(box(metal, 0.035 * s, 0.16 * s, 0.035 * s, 0, -0.06 * s, 0));
    w.add(tsuba);
    w.add(box(blade, 0.045 * s, 0.78 * s, 0.03 * s, 0, 0.42 * s, 0));
  }
  return w;
}

function assembleHound(g: THREE.Group, c: Combatant, pid: string): void {
  const pal = paletteFor('sword-soldier');
  const s = Math.max(0.7, c.height / 0.7);
  const fur = std(pal.clothDark, { roughness: 0.75 });
  const belly = std(pal.cloth, { roughness: 0.6 });
  const claw = std(pal.metal, { metalness: 0.4, roughness: 0.45 });
  const body = box(fur, 0.85 * s, 0.32 * s, 0.38 * s, 0, 0.38 * s, 0);
  g.add(body);
  g.userData.torso = body;
  g.add(box(belly, 0.6 * s, 0.16 * s, 0.28 * s, 0, 0.26 * s, 0));
  const head = box(fur, 0.28 * s, 0.22 * s, 0.32 * s, 0, 0.5 * s, 0.32 * s);
  g.add(head);
  g.add(box(fur, 0.08 * s, 0.16 * s, 0.08 * s, -0.08 * s, 0.64 * s, 0.28 * s));
  g.add(box(fur, 0.08 * s, 0.16 * s, 0.08 * s, 0.08 * s, 0.64 * s, 0.28 * s));
  g.add(box(claw, 0.1 * s, 0.08 * s, 0.16 * s, 0, 0.42 * s, 0.48 * s));
  const legH = 0.28 * s;
  for (const lx of [-0.18, 0.18]) {
    for (const lz of [-0.18, 0.16]) {
      g.add(box(fur, 0.09 * s, legH, 0.09 * s, lx * s, legH * 0.5, lz * s));
      g.add(box(claw, 0.1 * s, 0.05 * s, 0.14 * s, lx * s, 0.03 * s, lz * s + 0.03 * s));
    }
  }
  g.add(box(fur, 0.08 * s, 0.08 * s, 0.36 * s, 0, 0.4 * s, -0.34 * s));
  const weapon = new THREE.Group();
  g.add(weapon);
  g.userData.weapon = weapon;
  tag(g, pid);
}
