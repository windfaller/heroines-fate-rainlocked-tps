import { Simulation, emptyInput } from '../domain/simulation.ts';
import { FixedStepLoop } from '../runtime/loop/FixedStepLoop.ts';
import { InputRouter } from '../runtime/input/InputRouter.ts';
import { RendererHost } from '../runtime/rendering/RendererHost.ts';
import { SceneComposer } from '../runtime/rendering/SceneComposer.ts';
import { TpsCameraRig } from '../runtime/camera/TpsCameraRig.ts';
import { AudioDirector } from '../runtime/audio/AudioDirector.ts';
import { installDiagnostics } from '../runtime/diagnostics/Diagnostics.ts';
import { GameUI } from '../presentation/ui.ts';
import { SAVE_KEY } from '../domain/save/saveV1.ts';
import { migrateSave } from '../domain/save/migrate.ts';
import { isStoryBlocking } from '../domain/mission/story.ts';
import type { GamePhase, InputFrame } from '../domain/types.ts';
import * as THREE from 'three';

/** Phases that still run the sim so pause/resume rising-edge stays reachable. */
const LIVE_PHASES: GamePhase[] = ['playing', 'rescue', 'escort', 'intro', 'paused'];
const PAUSABLE: GamePhase[] = ['playing', 'rescue', 'escort'];

export class GameApp {
  sim: Simulation;
  private loop: FixedStepLoop | null = null;
  private input: InputRouter | null = null;
  private renderer: RendererHost | null = null;
  private scene: SceneComposer | null = null;
  private camera: TpsCameraRig | null = null;
  private audio = new AudioDirector();
  private ui: GameUI | null = null;
  private lastInput: InputFrame = emptyInput();
  private hudAcc = 0;
  private hidden = false;
  private lastStoryUi = '';
  private lastShakeAtk = '';
  private lastShakeProj = '';

  constructor(sim: Simulation) {
    this.sim = sim;
  }

  mount(host: HTMLElement): void {
    host.innerHTML = '';
    host.id = 'game-root';
    const canvas = document.createElement('canvas');
    canvas.id = 'c';
    host.appendChild(canvas);

    this.renderer = new RendererHost(canvas);
    this.scene = new SceneComposer();
    const tex = (window as unknown as { __RUNTIME_TEX__?: Map<string, import('three').Texture> }).__RUNTIME_TEX__;
    if (tex) this.scene.applyRuntimeArt(tex);
    this.camera = new TpsCameraRig();
    this.input = new InputRouter(canvas, () => this.requestPause());
    this.input.sensitivity = this.sim.state.settings.sensitivity;
    this.input.invertY = this.sim.state.settings.invertY;

    this.ui = new GameUI(host, this.sim, () => this.beginRun(), () => this.requestPause());
    installDiagnostics(this.sim, this.renderer, this.camera, this.audio);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.hidden = true;
        if (PAUSABLE.includes(this.sim.state.phase)) {
          this.sim.pause();
          this.forceUi();
        }
        this.audio.pause();
      } else {
        this.hidden = false;
        this.loop?.freezeClock();
        this.audio.resume();
        this.ui?.render();
      }
    });

    this.loop = new FixedStepLoop(
      () => {
        if (this.hidden) return;
        const prevPhase = this.sim.state.phase;
        this.lastInput = this.input!.sample();
        // Step while paused so Esc rising-edge can resume. Never `if (pause && paused) resume`
        // while the key is still held — Simulation uses prev.pause for the edge.
        if (LIVE_PHASES.includes(prevPhase)) this.sim.step(this.lastInput);
        if (this.sim.state.phase !== prevPhase && (this.sim.state.phase === 'paused' || prevPhase === 'paused')) {
          this.forceUi();
          if (this.sim.state.phase === 'paused') this.releasePointerLock();
        }
      },
      (_alpha, _now) => {
        this.draw();
        this.drainCues();
        this.projectFloaters();
        this.hudAcc += 1;
        const ph = this.sim.state.phase;
        const run = this.sim.state.run;
        const lineId = ph === 'intro'
          ? 'intro-' + String(run?.story.introLineIndex ?? 0)
          : run?.moduleChoiceOpen
            ? `pick-${(run.pendingModuleChoices ?? []).join(',')}`
            : (run?.story.active?.id ?? '');
        const overlayBusy = isStoryBlocking(run) || ph === 'intro' || !!run?.moduleChoiceOpen;
        if (overlayBusy) {
          if (lineId !== this.lastStoryUi) {
            this.lastStoryUi = lineId;
            this.releasePointerLock();
            this.ui?.render();
          }
        } else {
          if (this.lastStoryUi !== '') {
            this.lastStoryUi = '';
            this.ui?.render();
          } else if (this.hudAcc % 6 === 0 && (ph === 'playing' || ph === 'rescue' || ph === 'escort')) {
            this.ui?.render();
          }
        }
      },
    );
    this.loop.start();
    this.ui.render();

    window.addEventListener('keydown', (e) => {
      const run = this.sim.state.run;
      if (!run?.moduleChoiceOpen) return;
      const idx = e.code === 'Digit1' || e.code === 'Numpad1' ? 0
        : e.code === 'Digit2' || e.code === 'Numpad2' ? 1
        : e.code === 'Digit3' || e.code === 'Numpad3' ? 2
        : -1;
      const id = idx >= 0 ? run.pendingModuleChoices[idx] : undefined;
      if (id) {
        this.sim.pickInLevelModule(id);
        this.ui?.render();
      }
    });
  }

  private requestPause(): void {
    if (!PAUSABLE.includes(this.sim.state.phase)) return;
    this.sim.pause();
    this.releasePointerLock();
    this.forceUi();
  }

  private forceUi(): void {
    this.ui?.render();
  }

  private releasePointerLock(): void {
    if (typeof document === 'undefined') return;
    if (document.pointerLockElement) {
      try {
        document.exitPointerLock();
      } catch {
        /* ignore */
      }
    }
  }

  private beginRun(): void {
    this.audio.unlock();
    this.audio.cue('start', 330, 0.12);
    this.sim.startRun(this.sim.state.selectedModule);
    this.camera?.resize(window.innerWidth, window.innerHeight);
    this.ui?.render();
  }

  private draw(): void {
    const run = this.sim.state.run;
    if (!this.renderer || !this.scene || !this.camera) return;
    this.camera.resize(window.innerWidth, window.innerHeight);
    const overlayLock = isStoryBlocking(run) || !!run?.moduleChoiceOpen;
    const uiOwns = ['title', 'loadout', 'intro', 'paused', 'defeat', 'result', 'loading', 'error'].includes(this.sim.state.phase)
      || !!run?.moduleChoiceOpen
      || isStoryBlocking(run);
    this.input?.setUiOwns(uiOwns);
    if (overlayLock) this.releasePointerLock();
    if (run) {
      this.scene.sync(run);
      const aiming = this.lastInput.secondary;
      this.camera.update(run, this.sim.physics, aiming, this.sim.state.settings.reducedMotion ? 1 : 0);
      const shakeMul = this.sim.state.settings.reducedMotion ? 0 : (this.sim.state.settings.shake ?? 0.5);
      const atk = run.player.attack;
      if (atk?.phase === 'contact') {
        const pulseKey = `${atk.id}-contact`;
        if (this.lastShakeAtk !== pulseKey) {
          this.lastShakeAtk = pulseKey;
          this.camera.addShake((atk.defId === 'rin.secondary' ? 0.07 : 0.12) * shakeMul);
        }
      } else {
        this.lastShakeAtk = '';
      }
      const playerProj = run.projectiles.find((pr) => pr.team === 'player');
      if (playerProj) {
        if (playerProj.id !== this.lastShakeProj) {
          this.lastShakeProj = playerProj.id;
          this.camera.addShake(0.025 * shakeMul);
        }
      } else {
        this.lastShakeProj = '';
      }
    } else {
      this.scene.showTitle();
      const look = this.scene.titleLookAt();
      this.camera.camera.position.copy(look.from);
      this.camera.camera.lookAt(look.at);
      this.camera.camera.updateProjectionMatrix();
    }
    this.scene.billboardActors(this.camera.camera);
    this.renderer.renderer.render(this.scene.scene, this.camera.camera);
    if (this.sim.state.phase === 'result' && this.sim.state.run?.rewardsCommitted) {
      this.persistSave();
    }
  }


  refreshUi(): void {
    this.ui?.render();
  }

  applyRuntimeArt(textures: Map<string, import('three').Texture>): void {
    this.scene?.applyRuntimeArt(textures);
  }

  maybeQaPlay(): void {
    if (this.sim.state.phase === 'loading' || this.sim.state.phase === 'error') return;
    const qa = new URLSearchParams(location.search).get('qa');
    if (qa === 'play') {
      this.beginRun();
      this.sim.skipIntro();
      this.ui?.render();
    }
  }

  private drainCues(): void {
    const run = this.sim.state.run;
    if (!run || !run.pendingCues.length) return;
    const cues = run.pendingCues.splice(0, run.pendingCues.length);
    for (const id of cues) this.audio.play(id);
  }

  private projectFloaters(): void {
    const run = this.sim.state.run;
    if (!run || !this.camera || !this.ui) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const v = new THREE.Vector3();
    const items = [];
    for (const f of run.combatFloaters) {
      v.set(f.pos.x, f.pos.y, f.pos.z).project(this.camera.camera);
      if (v.z < -1 || v.z > 1) continue;
      const k = 1 - (run.juiceTick - f.born) / f.life;
      items.push({
        id: f.id,
        x: (v.x * 0.5 + 0.5) * w,
        y: (-v.y * 0.5 + 0.5) * h,
        text: f.text,
        kind: f.kind,
        k,
      });
    }
    this.ui.syncFloaters(items);
  }

  private persistSave(): void {
    const meta = this.sim.state.meta;
    const payload = {
      version: 1 as const,
      settings: this.sim.state.settings,
      clearedMissions: meta.clearedMissions,
      unlockedCharacters: meta.unlockedCharacters,
      unlockedArchiveEntries: meta.unlockedArchiveEntries,
      seenStoryFlags: meta.seenStoryFlags,
      unlockedModules: meta.unlockedModules,
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
  }
}

export function loadSavedRaw(): unknown {
  try {
    return migrateSave(localStorage.getItem(SAVE_KEY)).save;
  } catch {
    return null;
  }
}
