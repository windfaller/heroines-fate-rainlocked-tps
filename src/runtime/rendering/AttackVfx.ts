import * as THREE from 'three';
import type { AttackState, Combatant, RunState } from '../../domain/types.ts';
import { attackForwardPoint } from '../../domain/combat/attacks.ts';

export type TelegraphKind =
  | 'crescent'
  | 'ray'
  | 'ring'
  | 'column'
  | 'wedge'
  | 'disc'
  | 'slab'
  | 'streak'
  | 'hexburst';

export function telegraphKindFor(defId: string, shape: AttackState['shape']): TelegraphKind {
  if (defId.startsWith('rin.primary')) return 'crescent';
  if (defId === 'rin.secondary' || defId === 'enemy.arrow' || defId === 'boss.rain-arrow') return 'ray';
  if (defId === 'rin.q') return 'ring';
  if (defId === 'rin.r' || defId === 'hound.dash' || defId === 'boss.clone-cut') return 'streak';
  if (defId === 'rin.f' || defId === 'boss.thunder') return 'column';
  if (defId.startsWith('boss.triple') || shape === 'cone') return 'wedge';
  if (defId === 'boss.chop' || shape === 'box') return 'slab';
  if (defId === 'elite.chain') return 'hexburst';
  if (defId === 'enemy.slash') return 'crescent';
  if (defId === 'enemy.heavy' || defId === 'enemy.cast' || defId === 'boss.wave') return 'disc';
  return 'disc';
}

function mat(color: number, opacity: number, additive = true, map?: THREE.Texture): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    map: map ?? null,
    transparent: true,
    opacity,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    side: THREE.DoubleSide,
  });
}

function liftY(c: Combatant, extra = 0): number {
  return c.pos.y + 0.55 + extra;
}

function yawOf(c: Combatant): number {
  return c.yaw;
}

type FxMaps = {
  slash?: THREE.Texture;
  beam?: THREE.Texture;
  spark?: THREE.Texture;
  impact?: THREE.Texture;
  ring?: THREE.Texture;
};

export class AttackVfx {
  root = new THREE.Group();
  private telegraphs = new Map<string, THREE.Object3D>();
  private flashes: { mesh: THREE.Object3D; born: number; life: number }[] = [];
  private seenContact = new Set<string>();
  private projectiles = new Map<string, THREE.Object3D>();
  private maps: FxMaps = {};

  constructor() {
    this.root.userData.placeholder = 'gb.attack-vfx';
  }

  applyTextures(textures: Map<string, THREE.Texture>): void {
    this.maps.slash = textures.get('fx.slash');
    this.maps.beam = textures.get('fx.beam');
    this.maps.spark = textures.get('fx.spark');
    this.maps.impact = textures.get('fx.impact');
    this.maps.ring = textures.get('fx.ring');
    for (const t of Object.values(this.maps)) {
      if (!t) continue;
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
    }
  }

  sync(run: RunState): void {
    const live = new Set<string>();
    const actors: Combatant[] = [run.player, ...run.enemies, ...run.npcs];
    for (const c of actors) {
      if (!c.attack || c.dead) continue;
      const atk = c.attack;
      live.add(atk.id);
      let obj = this.telegraphs.get(atk.id);
      if (!obj) {
        obj = this.makeTelegraph(c, atk);
        this.telegraphs.set(atk.id, obj);
        this.root.add(obj);
      }
      this.placeTelegraph(obj, c, atk);
      const pulse = atk.phase === 'telegraph'
        ? 0.55 + 0.4 * Math.sin(atk.elapsed * 0.45)
        : atk.phase === 'contact'
          ? 1
          : 0.28;
      obj.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (m && m.opacity !== undefined) {
          const base = (o.userData.baseOpacity as number | undefined) ?? 1;
          m.opacity = pulse * base;
        }
      });
      obj.visible = atk.phase === 'telegraph' || atk.phase === 'contact' || atk.phase === 'result';
      if (atk.phase === 'contact' && !this.seenContact.has(atk.id)) {
        this.seenContact.add(atk.id);
        this.spawnFlash(c, atk, run.tick);
      }
    }
    for (const [id, obj] of this.telegraphs) {
      if (!live.has(id)) {
        this.root.remove(obj);
        this.telegraphs.delete(id);
      }
    }

    const pLive = new Set<string>();
    for (const pr of run.projectiles) {
      pLive.add(pr.id);
      let m = this.projectiles.get(pr.id);
      if (!m) {
        m = this.makeProjectile(pr.team === 'player');
        this.projectiles.set(pr.id, m);
        this.root.add(m);
      }
      const y = Math.max(pr.pos.y, 0.7);
      m.position.set(pr.pos.x, y, pr.pos.z);
      const tx = pr.pos.x + pr.dir.x;
      const ty = y + pr.dir.y;
      const tz = pr.pos.z + pr.dir.z;
      if (pr.dir.x !== 0 || pr.dir.y !== 0 || pr.dir.z !== 0) m.lookAt(tx, ty, tz);
    }
    for (const [id, m] of this.projectiles) {
      if (!pLive.has(id)) {
        this.root.remove(m);
        this.projectiles.delete(id);
      }
    }

    const nextFlashes = [];
    for (const f of this.flashes) {
      const age = run.tick - f.born;
      if (age > f.life) {
        this.root.remove(f.mesh);
        continue;
      }
      const k = 1 - age / f.life;
      f.mesh.scale.setScalar(1.4 + (1 - k) * 2.8);
      f.mesh.traverse((o) => {
        const matl = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (matl) {
          const base = (o.userData.baseOpacity as number | undefined) ?? 1;
          matl.opacity = 0.7 * k * base;
        }
      });
      nextFlashes.push(f);
    }
    this.flashes = nextFlashes;
  }

  private sprite(w: number, h: number, color: number, opacity: number, map?: THREE.Texture): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(color, opacity, true, map));
    mesh.userData.baseOpacity = opacity;
    mesh.userData.placeholder = 'gb.attack-vfx';
    return mesh;
  }

  private addSparks(g: THREE.Object3D, n: number, radius: number, scale = 0.32): void {
    for (let i = 0; i < n; i++) {
      const sp = this.sprite(scale, scale, 0xffffff, 0.75, this.maps.spark);
      const a = (i / n) * Math.PI * 2;
      sp.position.set(Math.cos(a) * radius, Math.sin(a * 1.3) * radius * 0.45, Math.sin(a) * radius * 0.35);
      g.add(sp);
    }
  }

  private makeProjectile(player: boolean): THREE.Object3D {
    const g = new THREE.Group();
    g.userData.placeholder = 'gb.attack-vfx';
    const tint = player ? 0xd8ffff : 0xffc0e8;
    const len = player ? 0.95 : 1.15;
    const wid = player ? 0.22 : 0.28;
    const beamTex = this.maps.beam ?? this.maps.spark;
    for (const rotY of [0, Math.PI / 2]) {
      const rib = this.sprite(wid, len, tint, 0.95, beamTex);
      rib.rotation.x = Math.PI / 2;
      rib.rotation.y = rotY;
      g.add(rib);
    }
    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(player ? 0.035 : 0.045, 0.018, len * 0.85, 6),
      mat(0xffffff, 0.9),
    );
    core.rotation.x = Math.PI / 2;
    core.userData.baseOpacity = 0.9;
    core.userData.placeholder = 'gb.attack-vfx';
    g.add(core);
    for (let t = 1; t <= 2; t++) {
      const tr = this.sprite(0.16 / t, 0.16 / t, tint, 0.55 / t, this.maps.spark);
      tr.position.z = -0.38 * t;
      g.add(tr);
    }
    tagPlaceholder(g);
    return g;
  }

  private makeTelegraph(c: Combatant, atk: AttackState): THREE.Object3D {
    const kind = telegraphKindFor(atk.defId, atk.shape);
    const friend = c.team === 'player';
    const color = friend ? 0x9be7ff : c.kind === 'boss' ? 0xff4a6a : 0xd080ff;
    const warn = friend ? 0xe8f8ff : 0xffc070;
    const g = new THREE.Group();
    g.userData.placeholder = 'gb.attack-vfx';
    g.userData.kind = kind;
    const r = Math.max(0.4, atk.radius);
    if (kind === 'crescent') {
      const slash = this.sprite(2.6, 1.35, 0xffffff, 1, this.maps.slash);
      slash.rotation.y = Math.PI / 2;
      slash.position.set(0, 0.28, -1.15);
      g.add(slash);
      const glow = this.sprite(3.3, 1.7, color, 0.42, this.maps.slash);
      glow.rotation.y = Math.PI / 2;
      glow.position.set(0, 0.28, -1.05);
      g.add(glow);
      this.addSparks(g, 3, 0.7, 0.38);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.045, 8, 24, Math.PI), mat(color, 0.4));
      rim.rotation.z = Math.PI / 2;
      rim.position.set(0, 0.15, -0.9);
      rim.userData.baseOpacity = 0.4;
      g.add(rim);
      if (!this.maps.slash) {
        const fallback = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.12, 8, 24, Math.PI), mat(color, 1));
        fallback.rotation.z = Math.PI / 2;
        fallback.position.set(0, 0.15, -0.9);
        fallback.userData.baseOpacity = 1;
        g.add(fallback);
      }
    } else if (kind === 'ray') {
      const len = Math.max(6, atk.range);
      for (const rotY of [0, Math.PI / 2]) {
        const rib = this.sprite(0.55, len, 0xffffff, 0.92, this.maps.beam);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.y = rotY;
        rib.position.z = -len * 0.5;
        g.add(rib);
      }
      const core = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.02, len, 8), mat(0xffffff, 0.85));
      core.rotation.x = Math.PI / 2;
      core.position.z = -len * 0.5;
      core.userData.baseOpacity = 0.85;
      g.add(core);
      const sheath = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.05, len, 8), mat(color, 0.35));
      sheath.rotation.x = Math.PI / 2;
      sheath.position.z = -len * 0.5;
      sheath.userData.baseOpacity = 0.35;
      g.add(sheath);
      const muzzle = this.sprite(0.7, 0.7, 0xffffff, 1, this.maps.spark);
      muzzle.position.z = -0.05;
      g.add(muzzle);
    } else if (kind === 'ring') {
      const ring = this.sprite(r * 2.4, r * 2.4, 0xffffff, 0.85, this.maps.ring);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.04;
      g.add(ring);
      if (!this.maps.ring) {
        const mesh = new THREE.Mesh(new THREE.RingGeometry(r * 0.62, r * 1.15, 32), mat(warn, 0.8));
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0.02;
        mesh.userData.baseOpacity = 0.8;
        g.add(mesh);
      }
      this.addSparks(g, 6, r * 0.9, 0.28);
    } else if (kind === 'column') {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.55, r * 0.8, 4.4, 14, 1, true), mat(color, 0.55));
      mesh.position.y = 1.6;
      mesh.userData.baseOpacity = 0.55;
      g.add(mesh);
      for (const rotY of [0, Math.PI / 2]) {
        const rib = this.sprite(r * 1.1, 4.4, 0xffffff, 0.55, this.maps.beam);
        rib.rotation.y = rotY;
        rib.position.y = 1.6;
        g.add(rib);
      }
      const cap = this.sprite(r * 1.6, r * 1.6, 0xffffff, 0.5, this.maps.ring ?? this.maps.impact);
      cap.rotation.x = -Math.PI / 2;
      g.add(cap);
      const top = this.sprite(1.1, 1.1, 0xffffff, 0.9, this.maps.spark);
      top.position.y = 3.6;
      g.add(top);
    } else if (kind === 'wedge') {
      const mesh = new THREE.Mesh(new THREE.CircleGeometry(r + 0.4, 16, -0.55, 1.1), mat(warn, 0.42));
      mesh.rotation.x = -Math.PI / 2;
      mesh.userData.baseOpacity = 0.42;
      g.add(mesh);
      const slash = this.sprite(1.8, 0.9, 0xffffff, 0.7, this.maps.slash);
      slash.position.set(0, 0.35, -r * 0.45);
      g.add(slash);
      this.addSparks(g, 4, r * 0.5, 0.3);
    } else if (kind === 'disc') {
      const disc = this.sprite(r * 2.2, r * 2.2, 0xffffff, 0.55, this.maps.ring ?? this.maps.impact);
      disc.rotation.x = -Math.PI / 2;
      g.add(disc);
      const rim = new THREE.Mesh(new THREE.RingGeometry(r * 0.88, r, 24), mat(color, 0.5));
      rim.rotation.x = -Math.PI / 2;
      rim.position.y = 0.02;
      rim.userData.baseOpacity = 0.5;
      g.add(rim);
      this.addSparks(g, 5, r * 0.7, 0.28);
    } else if (kind === 'slab') {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(r * 1.4, 0.16, Math.max(2, atk.range)), mat(warn, 0.55));
      mesh.position.z = -Math.max(2, atk.range) * 0.45;
      mesh.position.y = 0.12;
      mesh.userData.baseOpacity = 0.55;
      g.add(mesh);
      const flash = this.sprite(r * 1.6, Math.max(2, atk.range) * 0.9, 0xffffff, 0.45, this.maps.impact);
      flash.rotation.x = -Math.PI / 2;
      flash.position.z = -Math.max(2, atk.range) * 0.45;
      flash.position.y = 0.14;
      g.add(flash);
      this.addSparks(g, 4, r * 0.5, 0.3);
    } else if (kind === 'streak') {
      const len = Math.max(3, atk.range);
      for (const rotY of [0, Math.PI / 2]) {
        const rib = this.sprite(0.55, len, color, 0.85, this.maps.beam ?? this.maps.slash);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.y = rotY;
        rib.position.set(0, 0.6, -len * 0.4);
        g.add(rib);
      }
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, len), mat(0xffffff, 0.55));
      mesh.position.z = -len * 0.4;
      mesh.position.y = 0.6;
      mesh.userData.baseOpacity = 0.55;
      g.add(mesh);
      this.addSparks(g, 3, 0.4, 0.3);
    } else {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.08, 6), mat(warn, 0.45));
      mesh.userData.baseOpacity = 0.45;
      g.add(mesh);
      const ring = this.sprite(r * 2.1, r * 2.1, 0xffffff, 0.6, this.maps.ring ?? this.maps.impact);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.05;
      g.add(ring);
      this.addSparks(g, 6, r * 0.7, 0.3);
    }
    tagPlaceholder(g);
    return g;
  }

  private placeTelegraph(obj: THREE.Object3D, c: Combatant, atk: AttackState): void {
    const kind = telegraphKindFor(atk.defId, atk.shape);
    const grounded = kind === 'ring' || kind === 'disc' || kind === 'wedge' || kind === 'hexburst' || kind === 'slab';
    if (kind === 'ray' || kind === 'streak' || kind === 'crescent' || kind === 'column') {
      const y = kind === 'column' ? liftY(c, 0.2) : kind === 'crescent' ? liftY(c, 0.45) : liftY(c, 0.7);
      obj.position.set(c.pos.x, y, c.pos.z);
    } else if (atk.range === 0) {
      obj.position.set(c.pos.x, liftY(c, grounded ? 0 : 0.2), c.pos.z);
    } else {
      const fwd = attackForwardPoint(c, Math.max(0.6, atk.range * 0.45));
      obj.position.set(fwd.x, liftY(c, 0.05), fwd.z);
    }
    obj.rotation.y = yawOf(c);
  }

  private spawnFlash(c: Combatant, atk: AttackState, tick: number): void {
    const kind = telegraphKindFor(atk.defId, atk.shape);
    const friend = c.team === 'player';
    const color = friend ? 0xe8ffff : 0xffd0a0;
    const g = new THREE.Group();
    g.userData.placeholder = 'gb.attack-vfx';
    const impact = this.sprite(2.2, 2.2, color, 1, this.maps.impact);
    g.add(impact);
    this.addSparks(g, 11, 0.72, 0.42);
    if (kind === 'crescent' || kind === 'wedge') {
      const slash = this.sprite(2.2, 1.1, color, 0.85, this.maps.slash);
      g.add(slash);
    } else if (kind === 'ray' || kind === 'streak') {
      const rib = this.sprite(0.7, 2.4, color, 0.8, this.maps.beam);
      rib.rotation.x = Math.PI / 2;
      g.add(rib);
    } else if (kind === 'column') {
      const burst = this.sprite(2.2, 2.2, color, 0.9, this.maps.impact);
      g.add(burst);
    }
    let p = attackForwardPoint(c, Math.max(0.4, atk.range * 0.3));
    let y = liftY(c, 0.65);
    if (kind === 'ray' || kind === 'streak') {
      p = attackForwardPoint(c, Math.max(2, atk.range * 0.85));
      y = liftY(c, 0.45);
    }
    g.position.set(p.x, y, p.z);
    g.rotation.y = c.yaw;
    tagPlaceholder(g);
    this.root.add(g);
    this.flashes.push({ mesh: g, born: tick, life: 22 });
  }
}

function tagPlaceholder(obj: THREE.Object3D): void {
  obj.traverse((o) => {
    o.userData.placeholder = 'gb.attack-vfx';
  });
}
