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
import type { GamePhase, InputFrame } from '../domain/types.ts';

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
        this.hudAcc += 1;
        const ph = this.sim.state.phase;
        if (this.hudAcc % 6 === 0 && (ph === 'playing' || ph === 'rescue' || ph === 'escort')) {
          this.ui?.render();
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
    const uiOwns = ['title', 'loadout', 'intro', 'paused', 'defeat', 'result', 'loading', 'error'].includes(this.sim.state.phase)
      || !!run?.moduleChoiceOpen;
    this.input?.setUiOwns(uiOwns);
    if (run) {
      this.scene.sync(run);
      const aiming = this.lastInput.secondary;
      this.camera.update(run, this.sim.physics, aiming, this.sim.state.settings.reducedMotion ? 1 : 0);
      const atk = run.player.attack;
      if (atk?.phase === 'contact') this.camera.addShake(atk.defId === 'rin.secondary' ? 0.22 : 0.38);
      if (run.projectiles.some((pr) => pr.team === 'player')) this.camera.addShake(0.05);
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
