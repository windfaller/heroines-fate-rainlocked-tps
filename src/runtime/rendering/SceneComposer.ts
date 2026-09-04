import * as THREE from 'three';
import type { Combatant, RunState } from '../../domain/types.ts';
import { pathAt, BOSS_CENTER, KEEPER_POS, SEAL_POS, BRIDGE_GAPS, SPAWN_POS } from '../../levels/rainboundShrine.ts';
import { assembleHumanoid } from './grayboxHumanoid.ts';
import { AttackVfx } from './AttackVfx.ts';
import { makePlaqueTexture, makePuddleTexture } from './ownedArt.ts';
import { SHRINE_PLAQUES } from '../../content/story.ts';

export class SceneComposer {
  scene = new THREE.Scene();
  private actors = new Map<string, THREE.Object3D>();
  private extras = new Map<string, THREE.Object3D>();
  private rain: THREE.LineSegments;
  private rainNear: THREE.LineSegments;
  private titleStage: THREE.Group;
  private vfx = new AttackVfx();
  private wetMat: THREE.MeshStandardMaterial;
  private stoneMat: THREE.MeshStandardMaterial;
  private runtimeTex = new Map<string, THREE.Texture>();
  private artEnvApplied = false;
  private envGroup: THREE.Object3D | null = null;
  private props: THREE.Object3D[] = [];

  constructor() {
    this.scene.background = new THREE.Color(0x1a2832);
    this.scene.fog = new THREE.Fog(0x1a2832, 48, 140);
    const hemi = new THREE.HemisphereLight(0xc8d8f0, 0x2a2430, 1.55);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfff2d8, 2.35);
    dir.position.set(10, 26, 12);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.near = 2;
    dir.shadow.camera.far = 80;
    this.scene.add(dir);
    const fill = new THREE.DirectionalLight(0x88a0c8, 0.85);
    fill.position.set(-12, 10, -8);
    this.scene.add(fill);
    this.wetMat = makeWetGroundMaterial();
    this.stoneMat = new THREE.MeshStandardMaterial({
      color: 0x3a4658,
      roughness: 0.42,
      metalness: 0.22,
      map: this.wetMat.map,
    });
    this.buildWorld();
    this.rain = this.makeRain(700, 70, 0.42, 0.18);
    this.rainNear = this.makeRain(160, 12, 0.28, 0.22);
    this.scene.add(this.rain);
    this.scene.add(this.rainNear);
    this.scene.add(this.vfx.root);
    this.titleStage = this.makeTitleStage();
    this.scene.add(this.titleStage);
  }


  applyRuntimeArt(textures: Map<string, THREE.Texture>): void {
    this.runtimeTex = textures;
    const stone = textures.get('env.stone');
    const verm = textures.get('env.vermilion');
    const wood = textures.get('env.wood');
    const moss = textures.get('env.moss');
    const pathAhead = textures.get('env.path-ahead');
    const forest = textures.get('env.forest-far-hd') ?? textures.get('env.forest-far');
    const mid = textures.get('env.forest-mid-hd') ?? textures.get('env.forest-mid');
    const toriiTex = textures.get('env.torii-cutout') ?? textures.get('env.torii-ruin');
    this.vfx.applyTextures(textures);
    if (stone) {
      this.wetMat.map = stone;
      this.wetMat.color.setHex(0xffffff);
      this.wetMat.roughness = 0.22;
      this.wetMat.metalness = 0.48;
      this.wetMat.needsUpdate = true;
      this.stoneMat.map = stone;
      this.stoneMat.color.setHex(0xe8e8e8);
      this.stoneMat.needsUpdate = true;
    }
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!(mesh as unknown as { isMesh?: boolean }).isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat || !mat.color) return;
      const ph = mesh.userData.placeholder as string | undefined;
      if (ph === 'gb.torii-kit' && verm && mesh.name !== 'prop-card') {
        const hex = mat.color.getHex();
        if (hex >= 0x700000) {
          mat.map = verm;
          mat.color.setHex(0xffc0c0);
          mat.needsUpdate = true;
        }
      }
      if ((ph === 'gb.lantern-prop' || ph === 'gb.arena-ring' || ph === 'gb.shrine-wood') && wood) {
        const hex = mat.color.getHex();
        if (hex < 0x888888 || ph === 'gb.shrine-wood') {
          mat.map = wood;
          mat.color.setHex(0xdddddd);
          mat.needsUpdate = true;
        }
      }
      if (ph === 'gb.moss-decal' && moss) {
        mat.map = moss;
        mat.color.setHex(0xc8d0c0);
        mat.transparent = true;
        mat.opacity = 0.78;
        mat.needsUpdate = true;
      }
      if (ph === 'gb.path-scroll' && pathAhead) {
        mat.map = pathAhead;
        mat.color.setHex(0xffffff);
        mat.needsUpdate = true;
      }
    });
    if (!this.artEnvApplied) {
      this.scene.background = new THREE.Color(0x1a2832);
      this.scene.fog = new THREE.Fog(0x1a2832, 48, 140);
      if (forest || mid) {
        this.envGroup = this.makeEnvSky(forest ?? mid!);
        this.scene.add(this.envGroup);
      }
      const stoneMap = textures.get('env.stone');
      if (stoneMap) {
        const groundMap = stoneMap.clone();
        groundMap.wrapS = THREE.RepeatWrapping;
        groundMap.wrapT = THREE.RepeatWrapping;
        groundMap.repeat.set(18, 18);
        const skirt = new THREE.Mesh(
          new THREE.CircleGeometry(200, 48),
          new THREE.MeshStandardMaterial({ map: groundMap, color: 0xb0b8c0, roughness: 0.82, metalness: 0.08 }),
        );
        skirt.rotation.x = -Math.PI / 2;
        skirt.position.y = -0.55;
        skirt.receiveShadow = true;
        this.scene.add(skirt);
      }
      void toriiTex;
    }
    this.artEnvApplied = true;
    this.dressProps();
    for (const obj of this.actors.values()) this.dressActor(obj);
    this.titleStage.traverse((o) => {
      if (o.userData.kind) this.dressActor(o as THREE.Group);
    });
  }

  private texForKind(kind: string, hioBound = false): THREE.Texture | undefined {
    const id =
      kind === 'player' ? 'char.rin'
      : kind === 'hio' ? (hioBound ? 'char.hio-bound' : 'char.hio')
      : kind === 'keeper' ? 'char.keeper'
      : kind === 'sword-soldier' || kind === 'dummy' ? 'char.soldier'
      : kind === 'archer' ? 'char.archer'
      : kind === 'caster' ? 'char.mage'
      : kind === 'shadow-hound' ? 'char.hound'
      : kind === 'lantern-hunter' ? 'char.elite'
      : kind === 'boss' ? 'char.boss'
      : undefined;
    return id ? this.runtimeTex.get(id) : undefined;
  }

  private dressActor(obj: THREE.Object3D, hioBound = false): void {
    const kind = obj.userData.kind as string | undefined;
    if (!kind) return;
    const tex = this.texForKind(kind, hioBound);
    if (!tex) return;
    let card = obj.getObjectByName('char-card') as THREE.Mesh | undefined;
    if (card) {
      const mat = card.material as THREE.MeshBasicMaterial;
      if (mat.map !== tex) {
        mat.map = tex;
        mat.needsUpdate = true;
      }
      return;
    }
    const h = Number(obj.userData.height) || 1.69;
    const img = tex.image as { width?: number; height?: number } | undefined;
    const aspect = img && img.width && img.height ? img.width / img.height : 0.5;
    const w = h * Math.min(0.58, Math.max(0.32, aspect));
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.22,
      side: THREE.DoubleSide,
      depthWrite: true,
      fog: true,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const visH = h * 0.78;
    card = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, visH), mat);
    card.name = 'char-card';
    card.position.set(0, visH * 0.5 + 0.12, 0);
    card.renderOrder = 2;
    obj.add(card);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(Math.max(0.28, w * 0.45), 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42, depthWrite: false }),
    );
    shadow.name = 'char-shadow';
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.08;
    obj.add(shadow);
    obj.traverse((o) => {
      if (o === card || o === shadow || o.userData.binding) return;
      if ((o as THREE.Mesh).isMesh) o.visible = false;
    });
    card.visible = true;
    shadow.visible = true;
  }

  billboardActors(camera: THREE.Camera): void {
    const cam = camera.position;
    if (this.envGroup) this.envGroup.position.copy(cam);
    const tmp = new THREE.Vector3();
    const faceY = (card: THREE.Mesh) => {
      card.getWorldPosition(tmp);
      card.lookAt(cam.x, tmp.y, cam.z);
      return tmp.distanceTo(cam);
    };
    const dress = (obj: THREE.Object3D) => {
      if (!obj.userData.kind) return;
      this.dressActor(obj);
      const card = obj.getObjectByName('char-card') as THREE.Mesh | undefined;
      if (!card) return;
      const d = faceY(card);
      const pose = obj.userData.attackPose as { twist?: number; lean?: number; bob?: number; scale?: number } | undefined;
      if (pose) {
        card.rotation.z += pose.twist ?? 0;
        card.rotation.x += pose.lean ?? 0;
        card.position.y += pose.bob ?? 0;
        if (pose.scale) card.scale.setScalar(pose.scale);
      }
      if (obj.userData.kind === 'player') {
        const mat = card.material as THREE.MeshBasicMaterial;
        mat.opacity = d < 2.8 ? 0.2 : 1;
        mat.transparent = true;
        card.visible = d > 1.6;
      }
      const swing = obj.getObjectByName('atk-swing');
      const muzzle = obj.getObjectByName('atk-muzzle');
      if (swing?.visible) swing.lookAt(cam.x, swing.getWorldPosition(tmp).y, cam.z);
      if (muzzle?.visible) muzzle.lookAt(cam.x, muzzle.getWorldPosition(tmp).y, cam.z);
    };
    for (const obj of this.actors.values()) dress(obj);
    if (this.titleStage.visible) this.titleStage.traverse((o) => {
      if (o.userData.kind) dress(o);
    });
    for (const obj of this.props) {
      const kind = obj.userData.kind as string | undefined;
      if (kind !== 'prop-tree' && kind !== 'prop-torii') continue;
      const card = obj.getObjectByName('prop-card') as THREE.Mesh | undefined;
      if (card) faceY(card);
    }
  }

  titleLookAt(): { from: THREE.Vector3; at: THREE.Vector3 } {
    const spawn = SPAWN_POS;
    const torii = pathAt(28);
    return {
      from: new THREE.Vector3(spawn.x + 2.8, spawn.y + 1.85, spawn.z + 7.2),
      at: new THREE.Vector3(torii.x, torii.y + 3.1, torii.z),
    };
  }

  private buildWorld(): void {
    const matVerm = new THREE.MeshStandardMaterial({
      color: 0xc81e1e,
      roughness: 0.38,
      metalness: 0.16,
    });
    const matVermDark = new THREE.MeshStandardMaterial({
      color: 0x7a1010,
      roughness: 0.45,
      metalness: 0.12,
    });
    const matGold = new THREE.MeshStandardMaterial({
      color: 0xe0b84a,
      emissive: 0xffb020,
      emissiveIntensity: 1.15,
      roughness: 0.28,
      metalness: 0.35,
    });
    const matStoneDry = this.stoneMat;
    const matCorrupt = new THREE.MeshStandardMaterial({
      color: 0x3a1030,
      emissive: 0x4a1038,
      emissiveIntensity: 0.5,
      roughness: 0.55,
      metalness: 0.2,
    });
    const matWater = new THREE.MeshStandardMaterial({
      color: 0x1a3a55,
      roughness: 0.08,
      metalness: 0.55,
    });

    for (let s = 0; s <= 231; s += 4) {
      if (BRIDGE_GAPS.some((g) => Math.abs(s - g.s) < g.width)) continue;
      const p = pathAt(s);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.45, 8.2), this.wetMat);
      mesh.position.set(p.x, p.y - 0.2, p.z);
      mesh.receiveShadow = true;
      mesh.userData.placeholder = 'gb.ground-boxes';
      this.scene.add(mesh);
    }

    this.addToriiKit(pathAt(28), matVerm, matVermDark, matGold);
    const lanternsS2 = pathAt(45);
    for (const ox of [-4, 0, 4]) this.addLantern({ x: lanternsS2.x + ox, y: lanternsS2.y, z: lanternsS2.z }, matGold, matStoneDry);

    for (let i = 0; i < 8; i++) {
      const p = pathAt(58 + i * 3);
      const step = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.35, 2.2), this.wetMat);
      step.position.set(p.x, p.y + i * 0.05, p.z);
      step.receiveShadow = true;
      step.userData.placeholder = 'gb.ground-boxes';
      this.scene.add(step);
    }

    const pool = pathAt(118);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 0.15, 24), matWater);
    disc.position.set(pool.x, pool.y + 0.05, pool.z);
    disc.userData.placeholder = 'gb.pool-disc';
    this.scene.add(disc);

    for (let i = 0; i < 3; i++) {
      const p = pathAt(148);
      this.addLantern({ x: p.x + (i - 1) * 5, y: p.y, z: p.z }, matGold, matStoneDry);
    }

    const ring = BOSS_CENTER;
    for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2;
      const m = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 1.2), matStoneDry);
      m.position.set(ring.x + Math.cos(ang) * 16, ring.y + 0.4, ring.z + Math.sin(ang) * 16);
      m.userData.placeholder = 'gb.arena-ring';
      this.scene.add(m);
    }
    this.addToriiKit({ x: ring.x, y: ring.y, z: ring.z - 18 }, matVerm, matVermDark, matGold);

    const seal = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.6, 0.5, 20), matCorrupt);
    seal.position.set(SEAL_POS.x, SEAL_POS.y, SEAL_POS.z);
    seal.userData.placeholder = 'gb.seal-platform';
    this.scene.add(seal);

    const farTorii = pathAt(220);
    this.addToriiKit({ x: farTorii.x, y: farTorii.y, z: farTorii.z - 8 }, matVerm, matVermDark, matGold);

    for (let i = 0; i < 40; i++) {
      const sOff = 8 + (i * 5) % 210;
      const p = pathAt(sOff);
      const side = (i % 2 === 0 ? 1 : -1) * (8.5 + (i % 6) * 1.08);
      const ht = 9 + (i % 4);
      this.addTreeCard(
        { x: p.x + side, y: p.y, z: p.z + ((i % 3) - 1) * 1.2 },
        ht,
        i,
      );
    }
    for (let s = 20; s <= 210; s += 22) {
      const p = pathAt(s);
      this.addLantern({ x: p.x + 4.2, y: p.y, z: p.z }, matGold, matStoneDry);
      this.addLantern({ x: p.x - 4.2, y: p.y, z: p.z + 1.5 }, matGold, matStoneDry);
    }
    this.addLantern({ x: KEEPER_POS.x + 1.6, y: KEEPER_POS.y, z: KEEPER_POS.z + 1.2 }, matGold, matStoneDry);
    this.addShrineDressing(matVerm, matGold);
  }

  /** Visual kit only. Physics colliders are added separately in Simulation.startRun. */
  private addToriiKit(
    p: { x: number; y: number; z: number },
    _verm: THREE.Material,
    _vermDark: THREE.Material,
    _gold: THREE.Material,
  ): void {
    const g = new THREE.Group();
    g.position.set(p.x, p.y, p.z);
    g.userData.placeholder = 'gb.torii-kit';
    g.userData.kind = 'prop-torii';
    const h = 8.6;
    const aspect = 928 / 1208;
    const w = h * aspect;
    const mat = new THREE.MeshBasicMaterial({
      color: 0xc45a48,
      transparent: true,
      alphaTest: 0.18,
      side: THREE.DoubleSide,
      fog: true,
      depthWrite: true,
    });
    const card = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    card.name = 'prop-card';
    card.position.y = h * 0.5;
    card.userData.placeholder = 'gb.torii-kit';
    card.userData.kind = 'prop-torii';
    g.add(card);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.35, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4, depthWrite: false }),
    );
    shadow.name = 'prop-shadow';
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.08;
    shadow.userData.placeholder = 'gb.torii-kit';
    g.add(shadow);
    this.props.push(g);
    this.scene.add(g);
  }

  private addTreeCard(p: { x: number; y: number; z: number }, height: number, index: number): void {
    const g = new THREE.Group();
    g.position.set(p.x, p.y, p.z);
    g.userData.placeholder = 'gb.ground-boxes';
    g.userData.kind = 'prop-tree';
    g.userData.treeIndex = index;
    const w = 3.2;
    const mat = new THREE.MeshBasicMaterial({
      color: 0x24352c,
      transparent: true,
      alphaTest: 0.18,
      side: THREE.DoubleSide,
      fog: true,
      depthWrite: true,
    });
    const card = new THREE.Mesh(new THREE.PlaneGeometry(w, height), mat);
    card.name = 'prop-card';
    card.position.y = height * 0.5;
    card.userData.placeholder = 'gb.ground-boxes';
    card.userData.kind = 'prop-tree';
    g.add(card);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(Math.max(0.55, w * 0.32), 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4, depthWrite: false }),
    );
    shadow.name = 'prop-shadow';
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.08;
    shadow.userData.placeholder = 'gb.ground-boxes';
    g.add(shadow);
    this.props.push(g);
    this.scene.add(g);
  }

  private dressProps(): void {
    const trees = [1, 2, 3, 4]
      .map((n) => this.runtimeTex.get(`env.tree-${n}`))
      .filter((t): t is THREE.Texture => !!t);
    const torii = this.runtimeTex.get('env.torii-cutout') ?? this.runtimeTex.get('env.torii-ruin');
    for (const t of [...trees, torii]) {
      if (!t) continue;
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.anisotropy = Math.max(t.anisotropy, 8);
    }
    for (const obj of this.props) {
      const card = obj.getObjectByName('prop-card') as THREE.Mesh | undefined;
      if (!card) continue;
      const mat = card.material as THREE.MeshBasicMaterial;
      if (obj.userData.kind === 'prop-tree' && trees.length) {
        const idx = Number(obj.userData.treeIndex) || 0;
        mat.map = trees[idx % trees.length];
        mat.color.setHex(0xffffff);
        mat.needsUpdate = true;
      }
      if (obj.userData.kind === 'prop-torii' && torii) {
        mat.map = torii;
        mat.color.setHex(0xffffff);
        mat.transparent = true;
        mat.alphaTest = 0.18;
        mat.needsUpdate = true;
      }
    }
  }

  private makeEnvSky(tex: THREE.Texture): THREE.Group {
    const g = new THREE.Group();
    g.userData.placeholder = 'gb.backdrop';
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.max(tex.anisotropy, 16);
    tex.mapping = THREE.UVMapping;
    tex.needsUpdate = true;
    this.scene.background = new THREE.Color(0x1c2834);
    const geo = new THREE.SphereGeometry(420, 72, 56);
    geo.scale(-1, 1, 1);
    const uv = geo.attributes.uv;
    const pos = geo.attributes.position;
    for (let i = 0; i < uv.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const r = Math.hypot(x, y, z) || 1;
      const ny = y / r;
      const u = Math.atan2(x / r, z / r) / (Math.PI * 2) + 0.5;
      // Cylindrical: photo covers horizon→sky. Poles clamp to the image edges (no black void).
      const v = 1 - Math.max(0, Math.min(1, (ny + 0.18) / 1.12));
      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
    const sky = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        map: tex,
        fog: false,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    );
    sky.renderOrder = -20;
    sky.userData.placeholder = 'gb.backdrop';
    sky.rotation.y = Math.PI;
    g.add(sky);
    return g;
  }

  private addLantern(
    p: { x: number; y: number; z: number },
    gold: THREE.Material,
    stone: THREE.Material,
  ): void {
    const g = new THREE.Group();
    g.position.set(p.x, p.y, p.z);
    g.userData.placeholder = 'gb.lantern-prop';
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.55), stone);
    base.position.y = 0.09;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.7, 8), stone);
    pillar.position.y = 0.52;
    const chamber = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.32), gold);
    chamber.position.y = 1.05;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.22, 4), stone);
    roof.position.y = 1.32;
    roof.rotation.y = Math.PI / 4;
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.08), stone);
    cap.position.y = 1.46;
    for (const m of [base, pillar, chamber, roof, cap]) {
      m.castShadow = true;
      m.userData.placeholder = 'gb.lantern-prop';
      g.add(m);
    }
    const light = new THREE.PointLight(0xffd48a, 1.8, 9);
    light.position.set(0, 1.1, 0);
    g.add(light);
    this.scene.add(g);
  }

  private makeTitleStage(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'title-stage';
    g.visible = false;
    return g;
  }

  private makeRain(n: number, spread: number, len: number, opacity: number): THREE.LineSegments {
    const arr = new Float32Array(n * 6);
    const dx = len * 0.14;
    const dz = len * 0.05;
    for (let i = 0; i < n; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = Math.random() * 18;
      const z = (Math.random() - 0.5) * spread;
      const o = i * 6;
      arr[o] = x;
      arr[o + 1] = y;
      arr[o + 2] = z;
      arr[o + 3] = x + dx;
      arr[o + 4] = y - len;
      arr[o + 5] = z + dz;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const m = new THREE.LineBasicMaterial({
      color: 0x8aa8bc,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(geo, m);
    lines.frustumCulled = false;
    lines.userData.placeholder = 'gb.rain-points';
    lines.userData.streakLen = len;
    return lines;
  }

  private addShrineDressing(verm: THREE.Material, gold: THREE.Material): void {
    const wood = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.72, metalness: 0.08 });
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x2a3a28,
      roughness: 0.92,
      metalness: 0.04,
      transparent: true,
      opacity: 0.72,
    });
    const puddleTex = makePuddleTexture();
    const puddleMat = new THREE.MeshStandardMaterial({
      map: puddleTex,
      color: 0x6a88a0,
      roughness: 0.06,
      metalness: 0.78,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });
    for (let i = 0; i < 18; i++) {
      const p = pathAt(12 + i * 12);
      const hall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.1, 1.3), wood);
      hall.position.set(p.x + (i % 2 === 0 ? 6.2 : -6.2), p.y + 1.05, p.z);
      hall.userData.placeholder = 'gb.shrine-wood';
      hall.castShadow = true;
      this.scene.add(hall);
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.16, 0.22), verm);
      beam.position.set(hall.position.x, p.y + 2.2, p.z);
      beam.userData.placeholder = 'gb.torii-kit';
      this.scene.add(beam);
    }
    for (let i = 0; i < 22; i++) {
      const p = pathAt(10 + i * 10);
      const moss = new THREE.Mesh(new THREE.CircleGeometry(1.15 + (i % 3) * 0.25, 16), mossMat);
      moss.rotation.x = -Math.PI / 2;
      moss.position.set(p.x + ((i % 2) ? 2.4 : -2.6), p.y + 0.06, p.z + 0.4);
      moss.userData.placeholder = 'gb.moss-decal';
      this.scene.add(moss);
      if (i % 2 === 0) {
        const puddle = new THREE.Mesh(new THREE.CircleGeometry(0.85 + (i % 4) * 0.18, 18), puddleMat);
        puddle.rotation.x = -Math.PI / 2;
        puddle.position.set(p.x + ((i % 3) - 1) * 1.4, p.y + 0.07, p.z - 0.6);
        puddle.userData.placeholder = 'gb.ground-boxes';
        this.scene.add(puddle);
      }
    }
    for (const plaque of SHRINE_PLAQUES) {
      const p = pathAt(plaque.s);
      const tex = makePlaqueTexture(plaque.title, plaque.body);
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(1.15, 1.7),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.12 }),
      );
      board.position.set(p.x + 5.1, p.y + 1.35, p.z);
      board.userData.placeholder = 'gb.shrine-wood';
      this.scene.add(board);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.8, 0.14), wood);
      post.position.set(p.x + 5.1, p.y + 0.9, p.z + 0.08);
      post.userData.placeholder = 'gb.shrine-wood';
      this.scene.add(post);
    }
    for (const s of [28, 84, 148, 202]) {
      const p = pathAt(s);
      const scroll = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 2.2),
        new THREE.MeshStandardMaterial({ color: 0x6a5040, roughness: 0.6, metalness: 0.08 }),
      );
      scroll.position.set(p.x, p.y + 3.4, p.z - 2.2);
      scroll.userData.placeholder = 'gb.path-scroll';
      this.scene.add(scroll);
    }
    void gold;
  }

  sync(run: RunState): void {
    this.titleStage.visible = false;
    const ids = new Set<string>();
    const all: Combatant[] = [run.player, ...run.enemies, ...run.npcs];
    for (const c of all) {
      ids.add(c.id);
      let obj = this.actors.get(c.id);
      if (!obj) {
        obj = assembleHumanoid(c);
        this.actors.set(c.id, obj);
        this.scene.add(obj);
        this.dressActor(obj, c.kind === 'hio' && run.hioState === 'bound');
      } else if (c.kind === 'hio') {
        this.dressActor(obj, run.hioState === 'bound');
      }
      obj.position.set(c.pos.x, c.pos.y, c.pos.z);
      obj.rotation.y = c.yaw;
      const downedHio = c.kind === 'hio' && run.hioState === 'down';
      obj.visible = !c.dead || downedHio;
      obj.rotation.z = downedHio ? 1.15 : 0;
      obj.position.y = c.pos.y + (downedHio ? 0.15 : 0);
      this.applyAttackPose(obj, c);
      obj.traverse((o) => {
        if (o.userData.binding) o.visible = c.kind === 'hio' && run.hioState === 'bound';
      });
    }
    for (const [id, obj] of this.actors) {
      if (!ids.has(id)) {
        this.scene.remove(obj);
        this.actors.delete(id);
      }
    }

    this.syncExtra(run);
    this.vfx.sync(run);

    this.fallRain(this.rain, 0.18, 16);
    this.fallRain(this.rainNear, 0.24, 12);

    this.rain.position.set(run.player.pos.x, 0, run.player.pos.z);
    this.rainNear.position.set(run.player.pos.x, 0, run.player.pos.z);
  }


  private applyAttackPose(obj: THREE.Object3D, c: Combatant): void {
    const card = obj.getObjectByName('char-card') as THREE.Mesh | undefined;
    const atk = c.attack;
    const baseY = card ? (card.geometry as THREE.PlaneGeometry).parameters.height * 0.5 + 0.12 : 1.0;
    let twist = 0;
    let lean = 0;
    let bob = 0;
    let scale = 1;
    let swingVis = false;
    let muzzleVis = false;
    let swingAng = 0;
    if (atk && !c.dead) {
      const ranged = atk.defId === 'rin.secondary' || atk.defId === 'enemy.arrow' || atk.defId === 'boss.rain-arrow' || atk.shape === 'ray';
      const t = atk.elapsed;
      if (ranged) {
        if (atk.phase === 'telegraph') { lean = -0.12; bob = 0.06; scale = 1.03; muzzleVis = true; }
        else if (atk.phase === 'contact') { lean = 0.22; bob = 0.16; scale = 1.1; muzzleVis = true; twist = 0.08; }
        else if (atk.phase === 'result') { lean = 0.08; bob = 0.04; scale = 1.04; }
        else { lean = 0.03; }
      } else {
        const wind = Math.min(1, t / Math.max(1, atk.telegraphTicks));
        const slash = atk.phase === 'contact' ? Math.min(1, (t - atk.telegraphTicks) / Math.max(1, atk.contactTicks)) : 0;
        if (atk.phase === 'telegraph') {
          twist = -0.55 - wind * 0.35;
          lean = -0.18;
          scale = 1.02;
          swingVis = true;
          swingAng = -0.9 - wind * 0.5;
        } else if (atk.phase === 'contact') {
          twist = 0.85 + slash * 0.55;
          lean = 0.28;
          scale = 1.12;
          bob = 0.08;
          swingVis = true;
          swingAng = -0.2 + slash * 2.2;
        } else if (atk.phase === 'result') {
          twist = 0.35;
          lean = 0.1;
          scale = 1.05;
          swingVis = true;
          swingAng = 1.8;
        } else {
          twist = 0.08;
        }
      }
    }
    obj.userData.attackPose = atk && !c.dead
      ? { twist, lean, bob, scale }
      : { twist: 0, lean: 0, bob: 0, scale: 1 };
    if (card) {
      card.position.y = baseY;
      card.scale.setScalar(1);
    }
    let swing = obj.getObjectByName('atk-swing') as THREE.Mesh | undefined;
    if (!swing) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xb8f0ff,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      swing = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.85), mat);
      swing.name = 'atk-swing';
      swing.renderOrder = 5;
      obj.add(swing);
    }
    let muzzle = obj.getObjectByName('atk-muzzle') as THREE.Mesh | undefined;
    if (!muzzle) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      muzzle = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.55), mat);
      muzzle.name = 'atk-muzzle';
      muzzle.renderOrder = 5;
      obj.add(muzzle);
    }
    const mapSlash = this.runtimeTex.get('fx.slash');
    const mapSpark = this.runtimeTex.get('fx.spark') ?? this.runtimeTex.get('fx.impact');
    if (mapSlash && (swing.material as THREE.MeshBasicMaterial).map !== mapSlash) {
      (swing.material as THREE.MeshBasicMaterial).map = mapSlash;
      (swing.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
    if (mapSpark && (muzzle.material as THREE.MeshBasicMaterial).map !== mapSpark) {
      (muzzle.material as THREE.MeshBasicMaterial).map = mapSpark;
      (muzzle.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
    swing.visible = swingVis;
    if (swingVis) {
      swing.position.set(0.15, 1.15 + bob, -0.55);
      swing.rotation.set(0.1, 0, swingAng);
      (swing.material as THREE.MeshBasicMaterial).opacity = atk?.phase === 'contact' ? 0.95 : 0.55;
    }
    muzzle.visible = muzzleVis;
    if (muzzleVis) {
      muzzle.position.set(0.25, 1.25 + bob, -0.35);
      const pulse = 0.85 + 0.25 * Math.sin((atk?.elapsed ?? 0) * 0.8);
      muzzle.scale.setScalar(pulse);
      (muzzle.material as THREE.MeshBasicMaterial).opacity = atk?.phase === 'contact' ? 1 : 0.65;
    }
    const weapon = obj.userData.weapon as THREE.Object3D | undefined;
    if (weapon) {
      if (atk?.phase === 'telegraph') weapon.rotation.z = -0.55;
      else if (atk?.phase === 'contact') weapon.rotation.z = 1.15;
      else if (atk?.phase === 'result') weapon.rotation.z = 0.35;
      else weapon.rotation.z = 0;
    }
  }

  private fallRain(lines: THREE.LineSegments, speed: number, resetY: number): void {
    const pos = lines.geometry.getAttribute('position') as THREE.BufferAttribute;
    const len = Number(lines.userData.streakLen) || 1.2;
    const dx = len * 0.14;
    const dz = len * 0.05;
    for (let i = 0; i < pos.count; i += 2) {
      let y = pos.getY(i) - speed;
      if (y < 0.15) y = resetY * (0.65 + Math.random() * 0.35);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setXYZ(i, x, y, z);
      pos.setXYZ(i + 1, x + dx, y - len, z + dz);
    }
    pos.needsUpdate = true;
  }

  showTitle(): void {
    this.titleStage.visible = true;
  }

  private syncExtra(run: RunState): void {
    const live = new Set<string>();
    for (const n of run.nodes) {
      live.add(n.id);
      let obj = this.extras.get(n.id);
      if (!obj) {
        obj = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 1.4, 0.9),
          new THREE.MeshStandardMaterial({ color: 0x3a1030, emissive: 0x5a1848, emissiveIntensity: 0.6, roughness: 0.5 }),
        );
        obj.userData.placeholder = 'gb.corruption-node';
        this.extras.set(n.id, obj);
        this.scene.add(obj);
      }
      obj.position.set(n.pos.x, n.pos.y + 0.7, n.pos.z);
      obj.visible = !n.destroyed;
    }
    for (const l of run.lanterns) {
      live.add(l.id);
      let obj = this.extras.get(l.id);
      if (!obj) {
        obj = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 10, 8),
          new THREE.MeshStandardMaterial({
            color: 0xffd48a,
            emissive: 0xffb020,
            emissiveIntensity: 1.2,
            roughness: 0.25,
            metalness: 0.3,
          }),
        );
        obj.userData.placeholder = 'gb.lantern-prop';
        this.extras.set(l.id, obj);
        this.scene.add(obj);
      }
      obj.position.set(l.pos.x, l.pos.y + 1.1, l.pos.z);
      obj.visible = l.lit && l.hp > 0;
    }
    for (const h of run.hazards) {
      live.add(h.id);
      let obj = this.extras.get(h.id);
      if (!obj) {
        obj = new THREE.Mesh(
          new THREE.CircleGeometry(h.radius, 20),
          new THREE.MeshBasicMaterial({ color: 0x6a2088, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
        );
        obj.rotation.x = -Math.PI / 2;
        obj.userData.placeholder = 'gb.attack-vfx';
        this.extras.set(h.id, obj);
        this.scene.add(obj);
      }
      obj.position.set(h.pos.x, h.pos.y + 0.04, h.pos.z);
    }
    for (const [id, obj] of this.extras) {
      if (!live.has(id)) {
        this.scene.remove(obj);
        this.extras.delete(id);
      }
    }
  }
}

function makeWetGroundMaterial(): THREE.MeshStandardMaterial {
  const w = 64;
  const h = 64;
  const data = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const n = (Math.sin(x * 0.4) * Math.cos(y * 0.35) + Math.sin((x + y) * 0.18)) * 0.5 + 0.5;
      const wet = n > 0.62 ? 1 : 0;
      const shade = 28 + Math.floor(n * 22);
      data[i] = shade;
      data[i + 1] = shade + 6;
      data[i + 2] = shade + 18;
      data[i + 3] = 255;
      if (wet) {
        data[i] = 22;
        data[i + 1] = 38;
        data[i + 2] = 58;
      }
    }
  }
  const map = new THREE.DataTexture(data, w, h);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(3, 2);
  map.needsUpdate = true;
  map.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    color: 0x4a6078,
    map,
    roughness: 0.16,
    metalness: 0.42,
  });
}
