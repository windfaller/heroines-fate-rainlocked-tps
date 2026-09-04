import {
  BOSS_HP,
  BOSS_PHASE_RATIO,
  TICK_DT,
  TICK_HZ,
  type GamePhase,
  type GameState,
  type InputFrame,
  type RunState,
  type Combatant,
  type Vec3,
} from './types.ts';
import { SeededRng } from './rng.ts';
import { applyDamage, distXZ, grantIFrames, tickCombatantTimers } from './combat/damage.ts';
import { ATTACKS, attackForwardPoint, startAttack, tickAttack } from './combat/attacks.ts';
import { evaluateObjectives, completeObjective } from './mission/objectives.ts';
import { canCutBinding, cutBinding } from './mission/rescue.ts';
import { canReviveHio, isEscortFailed, reviveHio, tickEscort } from './mission/escort.ts';
import {
  advanceIntro,
  advanceStory,
  emptyStory,
  isStoryBlocking,
  pushObjectiveLine,
  skipBlockingStory,
  skipIntroStory,
  startKeeperScene,
  tickStory,
} from './mission/story.ts';
import { commitRewards } from './progression/rewards.ts';
import { defaultMeta, DEFAULT_SETTINGS } from './save/saveV1.ts';
import { migrateSave } from './save/migrate.ts';
import { makeRin, makeHio, makeKeeper } from '../content/characters.ts';
import { makeEnemy } from '../content/enemies.ts';
import { moduleMods, combineModuleMods } from '../content/martialModules.ts';
import { COOLDOWNS, DODGE_IFRAMES } from '../content/abilities.ts';
import {
  BOSS_CENTER,
  BRIDGE_GAPS,
  KEEPER_POS,
  PATH_LENGTH,
  RAINBOUND,
  SEAL_POS,
  SPAWN_POS,
  nearestPathS,
  pathAt,
} from '../levels/rainboundShrine.ts';
import type { IPhysicsWorld } from '../runtime/physics/IPhysicsWorld.ts';
import { SimplePhysicsWorld } from '../runtime/physics/SimplePhysics.ts';

export const emptyInput = (): InputFrame => ({
  moveX: 0, moveZ: 0, lookDeltaYaw: 0, lookDeltaPitch: 0,
  primary: false, secondary: false, dodge: false,
  ability1: false, ability2: false, ultimate: false,
  interact: false, lockOn: false, pause: false, confirm: false, cancel: false,
});

function vec(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

function spawnFromWave(run: RunState, waveId: string): void {
  const wave = RAINBOUND.waves.find((w) => w.id === waveId);
  if (!wave) return;
  if (run.encounterWaves[waveId]) return;
  run.encounterWaves[waveId] = run.tick;
  for (const e of wave.enemies) {
    if (run.enemies.some((x) => x.id === e.id)) continue;
    const p = pathAt(e.s);
    p.x += e.offsetX;
    run.enemies.push(makeEnemy(e.id, e.kind as Combatant['kind'], p));
  }
}

export class Simulation {
  state: GameState;
  rng: SeededRng;
  physics: IPhysicsWorld;
  allowDebug: boolean;
  private cd = { dodge: 0, q: 0, r: 0, f: 0, primaryChain: 0, combo: 0 };
  private primaryStep = 0;
  private prev: InputFrame = emptyInput();
  private events: { type: string; at: number; data?: unknown }[] = [];

  constructor(opts?: { seed?: number; physics?: IPhysicsWorld; allowDebug?: boolean; saved?: unknown }) {
    const seed = opts?.seed ?? 20260903;
    this.rng = new SeededRng(seed);
    this.physics = opts?.physics ?? new SimplePhysicsWorld();
    this.allowDebug = opts?.allowDebug ?? true;
    const migrated = migrateSave(opts?.saved ?? null);
    this.state = {
      schemaVersion: 1,
      phase: 'loading',
      run: null,
      meta: {
        ...defaultMeta(),
        unlockedCharacters: migrated.save.unlockedCharacters,
        unlockedArchiveEntries: migrated.save.unlockedArchiveEntries,
        seenStoryFlags: migrated.save.seenStoryFlags,
        unlockedModules: migrated.save.unlockedModules ?? defaultMeta().unlockedModules,
        clearedMissions: migrated.save.clearedMissions,
      },
      settings: migrated.save.settings ?? { ...DEFAULT_SETTINGS },
      loadStage: 'boot-ui',
      loadProgress: 0,
      loadError: null,
      selectedModule: 'module.moon-return',
    };
  }

  setPhase(phase: GamePhase): void {
    this.state.phase = phase;
  }

  finishLoading(): void {
    if (this.state.phase === 'loading' || this.state.phase === 'error') {
      this.state.loadStage = 'ready';
      this.state.phase = 'title';
    }
  }

  failLoading(stage: string, id: string): void {
    this.state.phase = 'error';
    this.state.loadError = `${stage}:${id}`;
  }

  startRun(moduleId?: string): void {
    const mid = moduleId ?? this.state.selectedModule;
    this.state.selectedModule = mid;
    const mods = moduleMods(mid);
    const player = makeRin(SPAWN_POS, mods.maxGuardBonus);
    const hio = makeHio(SEAL_POS, mods.hioHpBonus);
    const keeper = makeKeeper(KEEPER_POS);
    const lanternHp = Math.round(80 * mods.lanternHpMul);
    const run: RunState = {
      seed: this.rng.seed,
      tick: 0,
      missionId: 'rainbound-shrine',
      objective: 'enterShrine',
      completedObjectives: [],
      player,
      resolve: 0,
      maxResolve: 100,
      enemies: [makeEnemy('tut-dummy', 'dummy', pathAt(22))],
      npcs: [hio, keeper],
      projectiles: [],
      hazards: [],
      lanterns: [0, 1, 2].map((i) => {
        const p = pathAt(148);
        p.x += (i - 1) * 5;
        return { id: `lantern-${i}`, pos: p, hp: lanternHp, maxHp: lanternHp, lit: true };
      }),
      bindingsCut: 0,
      hioState: 'bound',
      hioHp: hio.hp,
      hioMaxHp: hio.maxHp,
      hioOutOfBoundsTicks: 0,
      bossPhase: 1,
      bossTransitionDone: false,
      nodesDestroyed: 0,
      nodes: [-8, 0, 8].map((x, i) => ({
        id: `node-${i}`,
        pos: { x: BOSS_CENTER.x + x, y: BOSS_CENTER.y, z: BOSS_CENTER.z - 4 },
        hp: 40,
        destroyed: false,
      })),
      martialModule: mid,
      inLevelModule: null,
      ownedModules: [mid],
      pendingModuleChoices: [],
      checkpointId: 'spawn',
      lastStablePos: { ...SPAWN_POS },
      defeatCause: null,
      escortFailCause: null,
      rewardsCommitted: false,
      stats: { damageTaken: 0, damageDealt: 0, perfectDodges: 0, comboMax: 0, timeTicks: 0, lanternsSaved: 0 },
      triggersFired: [],
      encounterWaves: {},
      cameraYaw: 0,
      cameraPitch: 0.18,
      lockOnId: null,
      introTicks: 10 * 60,
      ultimateLock: false,
      tutorialDummyAlive: true,
      casterPuddlesCleansed: false,
      summonedOnce: false,
      moduleChoiceOpen: false,
      story: emptyStory(),
      keeperTalked: false,
      hitstopTicks: 0,
      juiceTick: 0,
      combatFloaters: [],
      hioDownTicks: 0,
      pendingCues: [],
    };
    this.state.run = run;
    this.physics.reset();
    // Path-following slabs match visual ground boxes in SceneComposer (BoxGeometry 12.5×0.45×8.2).
    const half = { x: 6.25, y: 0.225, z: 4.1 };
    for (let s = 0; s <= PATH_LENGTH; s += 4) {
      if (BRIDGE_GAPS.some((g) => Math.abs(s - g.s) < g.width)) continue;
      const p = pathAt(s);
      this.physics.addStaticBox(`path-${s}`, { x: p.x, y: p.y - 0.2, z: p.z }, half);
    }
    // Low kill/under floor so bridge gaps still drop the player without a flat y=0.5 override.
    this.physics.addStaticBox('kill-floor', { x: 0, y: -8, z: -110 }, { x: 120, y: 0.5, z: 280 });
    // Torii / trees are cutout props only — solid posts were trapping the player.
    this.cd = { dodge: 0, q: 0, r: 0, f: 0, primaryChain: 0, combo: 0 };
    this.primaryStep = 0;
    this.state.phase = 'intro';
  }

  skipIntro(): void {
    if (!this.state.run) return;
    this.state.run.introTicks = 0;
    skipIntroStory(this.state.run);
    if (this.state.phase === 'intro') this.state.phase = 'playing';
    pushObjectiveLine(this.state.run, this.state.run.objective);
  }

  advanceIntro(): boolean {
    const run = this.state.run;
    if (!run || this.state.phase !== 'intro') return false;
    if (advanceIntro(run) === 'done') {
      this.skipIntro();
      return true;
    }
    return true;
  }

  advanceStory(): boolean {
    const run = this.state.run;
    if (!run) return false;
    if (this.state.phase === 'intro') return this.advanceIntro();
    return advanceStory(run);
  }

  skipStory(): void {
    const run = this.state.run;
    if (!run) return;
    if (this.state.phase === 'intro') {
      this.skipIntro();
      return;
    }
    skipBlockingStory(run);
  }

  pushCue(id: string): void {
    const run = this.state.run;
    if (!run) return;
    run.pendingCues.push(id);
  }

  pause(): void {
    if (this.state.phase === 'playing' || this.state.phase === 'rescue' || this.state.phase === 'escort') {
      this.state.phase = 'paused';
      // Treat pause as already held so a still-down Escape cannot rising-edge resume next step.
      this.prev = { ...this.prev, pause: true };
    }
  }

  resume(): void {
    if (this.state.phase === 'paused' && this.state.run) {
      const obj = this.state.run.objective;
      if (obj === 'cutBindings' || obj === 'exposeBindingCore') this.state.phase = 'rescue';
      else if (obj === 'escortHioToKeeper' || obj === 'hioRescued') this.state.phase = 'escort';
      else this.state.phase = 'playing';
    }
  }

  restartMission(): void {
    this.startRun(this.state.selectedModule);
    this.skipIntro();
  }

  retryCheckpoint(): void {
    const run = this.state.run;
    if (!run) return;
    const cp = RAINBOUND.checkpoints.find((c) => c.id === run.checkpointId) ?? { id: 'spawn', pos: SPAWN_POS };
    run.player.hp = run.player.maxHp;
    run.player.dead = false;
    run.player.guard = run.player.maxGuard;
    run.player.pos = { ...cp.pos };
    run.player.attack = null;
    run.defeatCause = null;
    run.escortFailCause = null;
    if (run.checkpointId === 'escort' || run.checkpointId === 'rescue') {
      const boss = run.enemies.find((e) => e.kind === 'boss');
      if (boss) {
        boss.dead = true;
        boss.hp = 0;
      }
    }
    if (run.checkpointId === 'escort') {
      run.hioState = 'rescued';
      run.bindingsCut = 3;
      const hio = run.npcs.find((n) => n.kind === 'hio');
      if (hio) {
        hio.dead = false;
        hio.hp = hio.maxHp;
        hio.pos = { ...SEAL_POS };
      }
      run.hioHp = run.hioMaxHp;
      run.enemies = run.enemies.filter((e) => e.kind === 'boss' || !e.id.startsWith('esc-'));
      delete run.encounterWaves['escort-w1'];
      delete run.encounterWaves['escort-w2'];
    }
    this.state.phase = run.checkpointId === 'escort' ? 'escort' : 'playing';
  }

  step(input: InputFrame = emptyInput()): void {
    const phase = this.state.phase;
    if (phase === 'loading' || phase === 'title' || phase === 'loadout' || phase === 'result' || phase === 'error') {
      this.prev = input;
      return;
    }
    if (phase === 'paused') {
      if (input.pause && !this.prev.pause) this.resume();
      this.prev = input;
      return;
    }
    const run = this.state.run;
    if (!run) return;

    if (phase === 'intro') {
      run.introTicks -= 1;
      if (input.cancel && !this.prev.cancel) this.skipIntro();
      else if ((input.confirm && !this.prev.confirm) || (input.interact && !this.prev.interact)) {
        this.advanceIntro();
      } else if (run.introTicks <= 0) this.skipIntro();
      this.prev = input;
      return;
    }

    if (run.moduleChoiceOpen) {
      this.prev = input;
      return;
    }

    if (isStoryBlocking(run)) {
      run.juiceTick += 1;
      tickStory(run);
      if ((input.confirm && !this.prev.confirm) || (input.interact && !this.prev.interact)) {
        advanceStory(run);
      } else if (input.cancel && !this.prev.cancel) {
        skipBlockingStory(run);
      }
      if (run.keeperTalked && run.objective === 'meetKeeper') evaluateObjectives(run);
      this.syncPhase(run);
      this.prev = input;
      return;
    }

    if (input.pause && !this.prev.pause) {
      this.pause();
      this.prev = input;
      return;
    }

    if (run.hitstopTicks > 0) {
      run.hitstopTicks -= 1;
      run.juiceTick += 1;
      this.tickFloaters(run);
      this.prev = input;
      return;
    }

    run.tick += 1;
    run.stats.timeTicks += 1;
    run.juiceTick += 1;
    this.tickCooldowns();
    this.tickLook(run, input);
    this.tickPlayer(run, input);
    this.tickTriggers(run);
    this.tickWaves(run);
    this.tickEnemies(run);
    this.tickProjectiles(run);
    this.tickHazards(run);
    this.tickBoss(run);
    this.tickRescueInteract(run, input);
    if (run.hioState === 'rescued' || run.hioState === 'escorting' || run.hioState === 'down') tickEscort(run);
    const prevObj = run.objective;
    evaluateObjectives(run);
    if (run.objective !== prevObj) pushObjectiveLine(run, run.objective);
    tickStory(run);
    this.tickFloaters(run);
    this.syncPhase(run);
    this.checkFail(run);
    this.prev = input;
  }

  advanceTime(ms: number): void {
    const ticks = Math.max(0, Math.round((ms / 1000) * TICK_HZ));
    for (let i = 0; i < ticks; i++) this.step(emptyInput());
  }

  setSeed(seed: number): void {
    this.rng.setSeed(seed);
    if (this.state.run) this.state.run.seed = seed >>> 0;
  }

  snapshot() {
    const run = this.state.run;
    return {
      schemaVersion: this.state.schemaVersion,
      phase: this.state.phase,
      tick: run?.tick ?? 0,
      seed: run?.seed ?? this.rng.seed,
      objective: run?.objective ?? null,
      completedObjectives: run?.completedObjectives ?? [],
      player: run
        ? { hp: run.player.hp, maxHp: run.player.maxHp, guard: run.player.guard, pos: { ...run.player.pos }, iFrames: run.player.iFrames, dead: run.player.dead }
        : null,
      enemies: (run?.enemies ?? []).map((e) => ({ id: e.id, kind: e.kind, hp: e.hp, dead: e.dead, pos: { ...e.pos }, attackPhase: e.attack?.phase ?? null })),
      npc: (run?.npcs ?? []).map((n) => ({ id: n.id, kind: n.kind, hp: n.hp, pos: { ...n.pos } })),
      bindingsCut: run?.bindingsCut ?? 0,
      hioState: run?.hioState ?? null,
      bossPhase: run?.bossPhase ?? 0,
      nodesDestroyed: run?.nodesDestroyed ?? 0,
      lanterns: run?.lanterns ?? [],
      entityCounts: {
        enemies: run?.enemies.length ?? 0,
        projectiles: run?.projectiles.length ?? 0,
        hazards: run?.hazards.length ?? 0,
      },
      checkpointId: run?.checkpointId ?? null,
      rewardsCommitted: run?.rewardsCommitted ?? false,
      loadStage: this.state.loadStage,
      selectedModule: this.state.selectedModule,
      moduleChoiceOpen: run?.moduleChoiceOpen ?? false,
      ownedModules: run?.ownedModules ?? [],
      pendingModuleChoices: run?.pendingModuleChoices ?? [],
      storyFlags: run?.story.flags ?? [],
      keeperTalked: run?.keeperTalked ?? false,
      storyBlocking: isStoryBlocking(run),
      hitstopTicks: run?.hitstopTicks ?? 0,
      floaterCount: run?.combatFloaters.length ?? 0,
      hioDownTicks: run?.hioDownTicks ?? 0,
    };
  }

  /** Test/dev only. */
  debugTeleport(pos: Vec3): void {
    if (!this.allowDebug || !this.state.run) return;
    this.state.run.player.pos = { ...pos };
    this.state.run.lastStablePos = { ...pos };
  }

  debugKill(id: string): void {
    if (!this.allowDebug || !this.state.run) return;
    const e = this.state.run.enemies.find((x) => x.id === id);
    if (e) {
      e.hp = 0;
      e.dead = true;
    }
  }

  debugDamage(id: string, amount: number): void {
    if (!this.allowDebug || !this.state.run) return;
    const t = this.state.run.enemies.find((x) => x.id === id) ?? (this.state.run.player.id === id ? this.state.run.player : null);
    if (!t) return;
    applyDamage(t, { damage: amount, guardDamage: amount, poiseBreakTicks: 20, sourceId: 'debug' });
  }

  private tickCooldowns(): void {
    for (const k of Object.keys(this.cd) as (keyof typeof this.cd)[]) {
      if (this.cd[k] > 0) this.cd[k] -= 1;
    }
  }

  private tickLook(run: RunState, input: InputFrame): void {
    run.cameraYaw += input.lookDeltaYaw;
    run.cameraPitch = Math.max(-0.12, Math.min(0.38, run.cameraPitch + input.lookDeltaPitch));
    const living = run.enemies.filter((e) => !e.dead);
    if (input.lockOn && !this.prev.lockOn) {
      if (run.lockOnId) run.lockOnId = null;
      else {
        let best: Combatant | null = null;
        let bestD = 28;
        for (const e of living) {
          const d = distXZ(run.player.pos, e.pos);
          if (d < bestD) {
            bestD = d;
            best = e;
          }
        }
        run.lockOnId = best?.id ?? null;
      }
    }
    if (run.lockOnId) {
      const t = living.find((e) => e.id === run.lockOnId);
      if (!t) run.lockOnId = null;
      else {
        run.player.yaw = Math.atan2(t.pos.x - run.player.pos.x, -(t.pos.z - run.player.pos.z));
      }
    }
  }

  private tickPlayer(run: RunState, input: InputFrame): void {
    const p = run.player;
    tickCombatantTimers(p);
    tickAttack(p);
    if (p.dead) return;
    if (p.poiseBreakTimer > 0) return;

    const yaw = run.cameraYaw;
    const fx = Math.sin(yaw);
    const fz = -Math.cos(yaw);
    const rx = Math.cos(yaw);
    const rz = Math.sin(yaw);
    let mx = fx * input.moveZ + rx * input.moveX;
    let mz = fz * input.moveZ + rz * input.moveX;
    const mag = Math.hypot(mx, mz);
    if (mag > 1) {
      mx /= mag;
      mz /= mag;
    }
    const attacking = p.attack && p.attack.phase !== 'recovery';
    const speed = attacking ? p.speed * 0.35 : p.speed;
    const wish = vec(p.pos.x + mx * speed * TICK_DT, p.pos.y, p.pos.z + mz * speed * TICK_DT);
    const moved = this.physics.moveCharacter(p.id, p.pos, wish, p.radius, p.height);
    let pos = moved.pos;
    let grounded = moved.grounded;
    const wishDist = Math.hypot(wish.x - p.pos.x, wish.z - p.pos.z);
    const got = Math.hypot(pos.x - p.pos.x, pos.z - p.pos.z);
    if (wishDist > 0.04 && got < wishDist * 0.2) {
      const slideX = this.physics.moveCharacter(p.id, p.pos, vec(wish.x, p.pos.y, p.pos.z), p.radius, p.height);
      const slideZ = this.physics.moveCharacter(p.id, p.pos, vec(p.pos.x, p.pos.y, wish.z), p.radius, p.height);
      const gx = Math.hypot(slideX.pos.x - p.pos.x, slideX.pos.z - p.pos.z);
      const gz = Math.hypot(slideZ.pos.x - p.pos.x, slideZ.pos.z - p.pos.z);
      if (gx >= gz && gx > got) { pos = slideX.pos; grounded = slideX.grounded; }
      else if (gz > got) { pos = slideZ.pos; grounded = slideZ.grounded; }
    }
    p.pos = pos;
    if (grounded) {
      const nearS = nearestPathS(p.pos);
      const inGap = BRIDGE_GAPS.some((g) => Math.abs(nearS - g.s) < g.width * 0.5);
      if (!inGap) {
        const pathY = pathAt(nearS).y;
        // Visual tile top ≈ pathAt(s).y + 0.025 (center p.y-0.2, half-height 0.225).
        const targetY = pathY + 0.025;
        const dx = p.pos.x - pathAt(nearS).x;
        const dz = p.pos.z - pathAt(nearS).z;
        if (dx * dx + dz * dz < 7 * 7) {
          p.pos.y += (targetY - p.pos.y) * 0.45;
        }
      }
      run.lastStablePos = { ...p.pos };
    }
    if (moved.fell) {
      p.pos = { ...run.lastStablePos };
      applyDamage(p, { damage: 8, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'fall' });
      run.stats.damageTaken += 8;
    }
    if (mag > 0.1 && !run.lockOnId) p.yaw = Math.atan2(mx, -mz);

    const faceMoveOrCam = (): void => {
      if (run.lockOnId) return;
      p.yaw = mag > 0.1 ? Math.atan2(mx, -mz) : run.cameraYaw;
    };

    if (input.dodge && !this.prev.dodge && this.cd.dodge <= 0 && p.stamina >= 25) {
      this.cd.dodge = COOLDOWNS.dodge;
      p.stamina -= 25;
      grantIFrames(p, DODGE_IFRAMES.end);
      const dx = mag > 0.1 ? mx : Math.sin(p.yaw);
      const dz = mag > 0.1 ? mz : -Math.cos(p.yaw);
      const dodgeWish = vec(p.pos.x + dx * 2.4, p.pos.y, p.pos.z + dz * 2.4);
      const dodged = this.physics.moveCharacter(p.id, p.pos, dodgeWish, p.radius, p.height);
      p.pos = dodged.pos;
      if (dodged.grounded) run.lastStablePos = { ...p.pos };
      run.stats.perfectDodges += 1;
      run.resolve = Math.min(run.maxResolve, run.resolve + 6);
    }

    if (input.primary && !this.prev.primary && !p.attack) {
      faceMoveOrCam();
      if (this.cd.primaryChain <= 0) this.primaryStep = 0;
      const ids = ['rin.primary.1', 'rin.primary.2', 'rin.primary.3'] as const;
      startAttack(p, ids[this.primaryStep] ?? 'rin.primary.1');
      this.primaryStep = (this.primaryStep + 1) % 3;
      this.cd.primaryChain = COOLDOWNS.primaryChainWindow;
      run.pendingCues.push('slash');
    }
    if (input.secondary && !this.prev.secondary && !p.attack) {
      const target = this.findAutoAimTarget(run);
      if (target) this.aimPlayerAt(run, target);
      else faceMoveOrCam();
      startAttack(p, 'rin.secondary');
      this.firePlayerShot(run);
    }
    if (input.ability1 && !this.prev.ability1 && this.cd.q <= 0 && !p.attack) {
      faceMoveOrCam();
      this.cd.q = COOLDOWNS.q;
      startAttack(p, 'rin.q');
    }
    if (input.ability2 && !this.prev.ability2 && this.cd.r <= 0 && !p.attack) {
      faceMoveOrCam();
      this.cd.r = COOLDOWNS.r;
      startAttack(p, 'rin.r');
      {
        const leap = vec(p.pos.x + Math.sin(p.yaw) * 5, p.pos.y, p.pos.z - Math.cos(p.yaw) * 5);
        const landed = this.physics.moveCharacter(p.id, p.pos, leap, p.radius, p.height);
        p.pos = landed.pos;
        if (landed.grounded) run.lastStablePos = { ...p.pos };
      }
      grantIFrames(p, 8);
    }
    if (input.ultimate && !this.prev.ultimate && this.cd.f <= 0 && run.resolve >= 80 && !p.attack) {
      faceMoveOrCam();
      this.cd.f = COOLDOWNS.f;
      run.resolve = 0;
      startAttack(p, 'rin.f');
    }

    this.resolvePlayerContact(run);

    const s = nearestPathS(p.pos);
    for (const g of BRIDGE_GAPS) {
      if (Math.abs(s - g.s) < g.width * 0.5 && p.pos.y < pathAt(g.s).y - 0.4) {
        p.pos = { ...run.lastStablePos };
        applyDamage(p, { damage: 8, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'fall' });
        run.stats.damageTaken += 8;
      }
    }
  }

  private findAutoAimTarget(run: RunState, maxRange = 30): { id: string; pos: { x: number; y: number; z: number }; radius: number } | null {
    const p = run.player;
    const camYaw = run.lockOnId ? p.yaw : run.cameraYaw;
    const fx = Math.sin(camYaw);
    const fz = -Math.cos(camYaw);
    let best: { id: string; pos: { x: number; y: number; z: number }; radius: number } | null = null;
    let bestScore = Infinity;
    for (const e of run.enemies) {
      if (e.dead) continue;
      const dx = e.pos.x - p.pos.x;
      const dz = e.pos.z - p.pos.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.5 || d > maxRange) continue;
      const ndx = dx / d;
      const ndz = dz / d;
      const facing = ndx * fx + ndz * fz;
      // Only auto-aim inside a forward cone; never snap to targets beside/behind the camera.
      if (facing < 0.55) continue;
      const score = d * (2.2 - facing);
      if (score < bestScore) {
        bestScore = score;
        best = e;
      }
    }
    if (run.lockOnId) {
      const locked = run.enemies.find((e) => e.id === run.lockOnId && !e.dead);
      if (locked) {
        const dx = locked.pos.x - p.pos.x;
        const dz = locked.pos.z - p.pos.z;
        const d = Math.hypot(dx, dz) || 1;
        const facing = (dx / d) * fx + (dz / d) * fz;
        if (facing >= 0.35 && d <= maxRange) return locked;
      }
    }
    return best;
  }

  private aimPlayerAt(run: RunState, target: { pos: { x: number; y: number; z: number } }): void {
    const p = run.player;
    const dx = target.pos.x - p.pos.x;
    const dz = target.pos.z - p.pos.z;
    if (Math.hypot(dx, dz) < 0.05) return;
    p.yaw = Math.atan2(dx, -dz);
  }

  private firePlayerShot(run: RunState): void {
    const p = run.player;
    const mods = combineModuleMods(run.ownedModules);
    const target = this.findAutoAimTarget(run);
    if (target) this.aimPlayerAt(run, target);
    const dir = { x: Math.sin(p.yaw), y: 0, z: -Math.cos(p.yaw) };
    if (target) {
      const dx = target.pos.x - p.pos.x;
      const dy = (target.pos.y + 1.15) - (p.pos.y + 1.25);
      const dz = target.pos.z - p.pos.z;
      const len = Math.hypot(dx, dy, dz) || 1;
      dir.x = dx / len;
      dir.y = dy / len;
      dir.z = dz / len;
    }
    run.projectiles.push({
      id: `proj-p-${run.tick}`,
      ownerId: p.id,
      team: 'player',
      pos: { x: p.pos.x + dir.x * 0.55, y: p.pos.y + 1.25, z: p.pos.z + dir.z * 0.55 },
      dir,
      speed: 48,
      damage: 10 + mods.meleeBonus * 0.25,
      guardDamage: 18 * mods.guardShotMul,
      life: 90,
      radius: 0.22,
      hits: [],
    });
    run.pendingCues.push('shot');
  }

  private resolvePlayerContact(run: RunState): void {
    const p = run.player;
    const atk = p.attack;
    if (!atk || atk.phase !== 'contact') return;
    // Ranged shots deal damage via projectiles only — the beam telegraph must not freefire.
    if (atk.shape === 'ray' || atk.defId === 'rin.secondary') return;
    const mods = combineModuleMods(run.ownedModules);
    const center = atk.shape === 'sphere' && atk.range === 0
      ? p.pos
      : attackForwardPoint(p, Math.max(0.6, atk.range * 0.6));
    const r = atk.radius + mods.meleeRange;
    for (const e of run.enemies) {
      if (e.dead) continue;
      if (atk.hits.includes(e.id)) continue;
      if (distXZ(center, e.pos) <= r + e.radius) {
        const res = applyDamage(e, {
          damage: atk.damage + mods.meleeBonus,
          guardDamage: atk.guardDamage,
          poiseBreakTicks: atk.poiseBreakTicks,
          sourceId: p.id,
        });
        atk.hits.push(e.id);
        run.stats.damageDealt += res.applied;
        if (res.applied > 0) {
          run.resolve = Math.min(run.maxResolve, run.resolve + 3);
          this.noteHit(run, e.pos, res.applied, res.poiseBroken, true);
        }
      }
    }
    for (const n of run.nodes) {
      if (n.destroyed) continue;
      if (distXZ(center, n.pos) <= r + 0.8) {
        n.hp -= atk.damage;
        atk.hits.push(n.id);
        if (n.hp <= 0) {
          n.destroyed = true;
          run.nodesDestroyed += 1;
        }
      }
    }
  }

  private tickTriggers(run: RunState): void {
    const along = nearestPathS(run.player.pos);
    for (const t of RAINBOUND.triggers) {
      if (run.triggersFired.includes(t.id)) continue;
      const ts = nearestPathS(t.pos);
      const alongHit = /^(s\d|enc-)/.test(t.id) && Math.abs(along - ts) <= 12;
      if (distXZ(run.player.pos, t.pos) <= t.radius || alongHit) {
        run.triggersFired.push(t.id);
      }
    }
  }

  private tickWaves(run: RunState): void {
    const fired = new Set(run.triggersFired);
    for (const w of RAINBOUND.waves) {
      if (!fired.has(w.triggerId)) continue;
      if (w.id.startsWith('escort') && run.hioState !== 'escorting' && run.hioState !== 'rescued') continue;
      spawnFromWave(run, w.id);
    }
    if (run.enemies.filter((e) => e.id.startsWith('enc-a') && !e.dead).length === 0
      && run.enemies.some((e) => e.id.startsWith('enc-a'))) {
      if (fired.has('s3-stairs')) spawnFromWave(run, 'wave-enc-a-2');
    }
    if (run.enemies.filter((e) => e.id.startsWith('enc-b') && e.kind !== 'archer' && !e.dead).length === 0
      && run.enemies.some((e) => e.id === 'enc-b-caster' && e.dead)) {
      spawnFromWave(run, 'wave-enc-b-2');
    }
  }

  private tickEnemies(run: RunState): void {
    const p = run.player;
    let meleeBusy = 0;
    for (const e of run.enemies) {
      if (e.dead) continue;
      tickCombatantTimers(e);
      tickAttack(e);
      if (e.kind === 'dummy') continue;
      if (e.poiseBreakTimer > 0) continue;
      const d = distXZ(e.pos, p.pos);
      e.yaw = Math.atan2(p.pos.x - e.pos.x, -(p.pos.z - e.pos.z));
      const melee = e.kind === 'sword-soldier' || e.kind === 'lantern-hunter' || e.kind === 'shadow-hound' || e.kind === 'boss';
      if (melee && d < 3.2) meleeBusy += 1;
      if (e.kind === 'boss') continue;

      if (e.kind === 'sword-soldier') {
        if (d > 1.7 && meleeBusy <= 2) this.steer(e, p.pos);
        if (d < 2.1 && !e.attack) startAttack(e, 'enemy.slash');
      } else if (e.kind === 'lantern-hunter') {
        if (d < 2.4 && !e.attack) startAttack(e, 'elite.chain');
      } else if (e.kind === 'shadow-hound') {
        if (d > 2.5) this.steer(e, p.pos);
        if (d < 6 && !e.attack) startAttack(e, 'hound.dash');
      } else if (e.kind === 'archer') {
        if (d < 10) this.steer(e, vec(e.pos.x - (p.pos.x - e.pos.x), e.pos.y, e.pos.z - (p.pos.z - e.pos.z)));
        if (d < 28 && !e.attack) {
          startAttack(e, 'enemy.arrow');
        }
        if (e.attack?.phase === 'contact' && !e.attack.hits.includes('shot')) {
          e.attack.hits.push('shot');
          this.enemyShot(run, e);
        }
      } else if (e.kind === 'caster') {
        if (d < 8) this.steer(e, vec(e.pos.x - (p.pos.x - e.pos.x), e.pos.y, e.pos.z - (p.pos.z - e.pos.z)));
        if (!e.attack) startAttack(e, 'enemy.cast');
        if (e.attack?.phase === 'contact' && !e.attack.hits.includes('puddle')) {
          e.attack.hits.push('puddle');
          run.hazards.push({
            id: `puddle-${run.tick}`,
            kind: 'puddle',
            pos: { ...p.pos },
            radius: 2.4,
            damage: 4,
            life: 240,
            purified: false,
          });
        }
      }

      this.enemyContact(run, e);

      if (e.kind === 'lantern-hunter') {
        let prey = run.lanterns.find((l) => l.lit && l.hp > 0);
        let preyD = prey ? distXZ(e.pos, prey.pos) : 99;
        for (const l of run.lanterns) {
          if (!l.lit || l.hp <= 0) continue;
          const ld = distXZ(e.pos, l.pos);
          if (ld < preyD) {
            prey = l;
            preyD = ld;
          }
        }
        if (prey && preyD > 1.4) this.steer(e, prey.pos);
        if (prey && preyD < 2.6 && run.tick % 20 === 0) {
          prey.hp -= 6;
          run.pendingCues.push('lantern-hit');
          if (prey.hp <= 0) prey.lit = false;
        }
      }
    }
    if (run.hioState === 'escorting') {
      const hio = run.npcs.find((n) => n.kind === 'hio');
      if (hio && !hio.dead) {
        for (const e of run.enemies) {
          if (e.dead || e.kind === 'boss') continue;
          if (e.attack?.phase === 'contact' && distXZ(e.pos, hio.pos) < 2.0 && !e.attack.hits.includes(hio.id)) {
            e.attack.hits.push(hio.id);
            applyDamage(hio, { damage: 8, guardDamage: 4, poiseBreakTicks: 10, sourceId: e.id });
            run.hioHp = hio.hp;
            if (hio.dead || hio.hp <= 0) {
              run.hioState = 'down';
              run.hioDownTicks = 0;
            }
          }
        }
      }
    }
  }

  private steer(e: Combatant, target: Vec3): void {
    const d = distXZ(e.pos, target);
    if (d < 0.2) return;
    const nx = (target.x - e.pos.x) / d;
    const nz = (target.z - e.pos.z) / d;
    e.pos.x += nx * e.speed * TICK_DT;
    e.pos.z += nz * e.speed * TICK_DT;
  }

  private enemyShot(run: RunState, e: Combatant): void {
    const dir = { x: Math.sin(e.yaw), y: 0, z: -Math.cos(e.yaw) };
    run.projectiles.push({
      id: `proj-e-${e.id}-${run.tick}`,
      ownerId: e.id,
      team: 'enemy',
      pos: { x: e.pos.x, y: e.pos.y + 1.2, z: e.pos.z },
      dir,
      speed: 22,
      damage: 10,
      guardDamage: 6,
      life: 90,
      radius: 0.2,
      hits: [],
    });
  }

  private enemyContact(run: RunState, e: Combatant): void {
    const atk = e.attack;
    if (!atk || atk.phase !== 'contact') return;
    const p = run.player;
    if (atk.hits.includes(p.id)) return;
    const center = attackForwardPoint(e, Math.max(0.5, atk.range * 0.5));
    if (distXZ(center, p.pos) <= atk.radius + p.radius) {
      const wasIframe = p.iFrames > 0;
      const res = applyDamage(p, {
        damage: atk.damage,
        guardDamage: atk.guardDamage,
        poiseBreakTicks: atk.poiseBreakTicks,
        sourceId: e.id,
      });
      atk.hits.push(p.id);
      if (res.applied > 0) {
        run.stats.damageTaken += res.applied;
        this.noteHit(run, p.pos, res.applied, res.poiseBroken, false);
      }
      if (wasIframe) run.stats.perfectDodges += 1;
    }
  }

  private tickProjectiles(run: RunState): void {
    const next = [];
    for (const pr of run.projectiles) {
      pr.life -= 1;
      pr.pos.x += pr.dir.x * pr.speed * TICK_DT;
      pr.pos.y += pr.dir.y * pr.speed * TICK_DT;
      pr.pos.z += pr.dir.z * pr.speed * TICK_DT;
      if (pr.life <= 0) continue;
      const targets = pr.team === 'player'
        ? run.enemies.filter((e) => !e.dead)
        : [run.player];
      let hit = false;
      for (const t of targets) {
        if (pr.hits.includes(t.id)) continue;
        if (distXZ(pr.pos, t.pos) <= pr.radius + t.radius) {
          const res = applyDamage(t, {
            damage: pr.damage,
            guardDamage: pr.guardDamage,
            poiseBreakTicks: 16,
            sourceId: pr.ownerId,
          });
          pr.hits.push(t.id);
          if (pr.team === 'player') run.stats.damageDealt += res.applied;
          else if (res.applied > 0) run.stats.damageTaken += res.applied;
          if (res.applied > 0) this.noteHit(run, t.pos, res.applied, res.poiseBroken, pr.team === 'player');
          hit = true;
        }
      }
      if (!hit) next.push(pr);
    }
    run.projectiles = next.slice(-48);
  }

  private tickHazards(run: RunState): void {
    const mods = combineModuleMods(run.ownedModules);
    for (const h of run.hazards) {
      h.life -= 1;
      if (h.purified || h.life <= 0) continue;
      if (distXZ(run.player.pos, h.pos) <= h.radius && run.tick % 20 === 0) {
        const res = applyDamage(run.player, {
          damage: Math.round(h.damage * mods.hazardMul),
          guardDamage: 2,
          poiseBreakTicks: 0,
          sourceId: h.id,
        });
        run.stats.damageTaken += res.applied;
      }
    }
    run.hazards = run.hazards.filter((h) => h.life > 0 && !h.purified);
  }

  private tickBoss(run: RunState): void {
    const boss = run.enemies.find((e) => e.kind === 'boss');
    if (!boss || boss.dead) return;
    if (!run.bossTransitionDone && boss.hp <= BOSS_HP * BOSS_PHASE_RATIO) {
      run.bossPhase = 2;
      run.bossTransitionDone = true;
      grantIFrames(boss, 90);
      boss.attack = null;
      this.emit('boss-phase-2');
    }
    if (boss.poiseBreakTimer > 0 || boss.iFrames > 40) return;
    if (boss.attack) {
      this.enemyContact(run, boss);
      return;
    }
    const cycle = run.bossPhase === 1
      ? ['boss.triple1', 'boss.triple2', 'boss.triple3', 'boss.chop', 'boss.rain-arrow']
      : ['boss.clone-cut', 'boss.wave', 'boss.thunder', 'boss.triple3'];
    const idx = Math.floor(run.tick / 90) % cycle.length;
    startAttack(boss, cycle[idx]!);
    if (run.bossPhase === 1 && !run.summonedOnce && boss.hp < BOSS_HP * 0.7) {
      run.summonedOnce = true;
      run.enemies.push(makeEnemy('boss-summon-1', 'sword-soldier', { x: boss.pos.x + 3, y: boss.pos.y, z: boss.pos.z }));
    }
  }

  private tickRescueInteract(run: RunState, input: InputFrame): void {
    if (!(input.interact && !this.prev.interact)) return;
    const mods = combineModuleMods(run.ownedModules);
    if (mods.interactHeal && run.player.hp < run.player.maxHp) {
      run.player.hp = Math.min(run.player.maxHp, run.player.hp + mods.interactHeal);
    }
    if (run.objective === 'meetKeeper' && !run.keeperTalked && distXZ(run.player.pos, KEEPER_POS) < 4.5) {
      if (startKeeperScene(run)) {
        run.pendingCues.push('keeper');
        return;
      }
    }
    if (run.hioState === 'down' && canReviveHio(run)) {
      reviveHio(run);
      return;
    }
    if (run.objective === 'exposeBindingCore' || run.objective === 'cutBindings') {
      if (canCutBinding(run) || distXZ(run.player.pos, SEAL_POS) < 2.8) {
        cutBinding(run);
      }
    }
    if (run.objective === 'escortHioToKeeper' || run.objective === 'missionComplete' || run.triggersFired.includes('escort-arrive')) {
      if (distXZ(run.player.pos, KEEPER_POS) < 8 && run.hioState !== 'down') {
        if (!run.triggersFired.includes('light-main-lantern')) {
          run.triggersFired.push('light-main-lantern');
          run.pendingCues.push('lantern');
        }
        evaluateObjectives(run);
        if (run.completedObjectives.includes('escortHioToKeeper') || run.objective === 'missionComplete') {
          completeObjective(run, 'missionComplete');
          this.finishMission(run);
        }
      }
    }
  }

  private finishMission(run: RunState): void {
    commitRewards(this.state.meta, run);
    this.state.phase = 'result';
  }

  private syncPhase(run: RunState): void {
    if (this.state.phase === 'result' || this.state.phase === 'defeat') return;
    if (run.objective === 'cutBindings' || run.objective === 'exposeBindingCore') {
      this.state.phase = 'rescue';
    } else if (run.objective === 'hioRescued' || run.objective === 'escortHioToKeeper') {
      this.state.phase = 'escort';
    } else if (run.objective === 'missionComplete') {
      this.finishMission(run);
    } else if (this.state.phase !== 'paused') {
      this.state.phase = 'playing';
    }
  }

  private checkFail(run: RunState): void {
    if (run.player.dead || run.player.hp <= 0) {
      run.player.dead = true;
      run.defeatCause = run.defeatCause ?? 'player-hp';
      this.state.phase = 'defeat';
    }
    if (isEscortFailed(run) && this.state.phase !== 'defeat') {
      this.state.phase = 'defeat';
      run.defeatCause = run.escortFailCause;
    }
  }

  pickInLevelModule(id: string): boolean {
    const run = this.state.run;
    if (!run || !run.moduleChoiceOpen) return false;
    if (!run.pendingModuleChoices.includes(id)) return false;
    if (run.ownedModules.includes(id)) return false;
    run.ownedModules.push(id);
    run.inLevelModule = id;
    run.moduleChoiceOpen = false;
    run.pendingModuleChoices = [];
    const mods = moduleMods(id);
    run.player.maxGuard += mods.maxGuardBonus;
    run.player.guard = Math.min(run.player.maxGuard, run.player.guard + mods.maxGuardBonus);
    if (mods.hioHpBonus) {
      run.hioMaxHp += mods.hioHpBonus;
      run.hioHp += mods.hioHpBonus;
      const hio = run.npcs.find((n) => n.kind === 'hio');
      if (hio) {
        hio.maxHp += mods.hioHpBonus;
        hio.hp += mods.hioHpBonus;
      }
    }
    if (mods.lanternHpMul > 1) {
      for (const l of run.lanterns) {
        const extra = Math.round(l.maxHp * (mods.lanternHpMul - 1));
        l.maxHp += extra;
        l.hp += extra;
      }
    }
    this.emit('module-picked', id);
    return true;
  }

  private noteHit(run: RunState, pos: Vec3, amount: number, poiseBroken: boolean, fromPlayer: boolean): void {
    const life = 48;
    run.combatFloaters.push({
      id: `floater-${run.juiceTick}-${run.combatFloaters.length}`,
      pos: { x: pos.x, y: pos.y + 1.55, z: pos.z },
      text: String(amount),
      kind: 'damage',
      born: run.juiceTick,
      life,
    });
    if (poiseBroken) {
      run.combatFloaters.push({
        id: `floater-poise-${run.juiceTick}-${run.combatFloaters.length}`,
        pos: { x: pos.x + 0.25, y: pos.y + 1.85, z: pos.z },
        text: '韌破',
        kind: 'poise',
        born: run.juiceTick,
        life: 54,
      });
    }
    if (fromPlayer) {
      run.hitstopTicks = Math.max(run.hitstopTicks, amount >= 18 ? 3 : 2);
      run.pendingCues.push('hit');
    } else {
      run.pendingCues.push('hurt');
    }
    if (run.combatFloaters.length > 24) run.combatFloaters.splice(0, run.combatFloaters.length - 24);
  }

  private tickFloaters(run: RunState): void {
    run.combatFloaters = run.combatFloaters.filter((f) => run.juiceTick - f.born < f.life);
  }

  private emit(type: string, data?: unknown): void {
    this.events.push({ type, at: this.state.run?.tick ?? 0, data });
    if (this.events.length > 64) this.events.shift();
  }
}
