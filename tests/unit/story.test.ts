import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { KEEPER_POS, SEAL_POS } from '../../src/levels/rainboundShrine.ts';
import { cutBinding } from '../../src/domain/mission/rescue.ts';
import { isStoryBlocking } from '../../src/domain/mission/story.ts';
import { INTRO_LINES, TITLE_LOGLINE } from '../../src/content/story.ts';
import { flushStory, tap, talkKeeper } from '../helpers/play.ts';

describe('story beats', () => {
  it('has a poetic title logline and advancing intro lines', () => {
    expect(TITLE_LOGLINE).toContain('雨');
    expect(TITLE_LOGLINE).toContain('凜');
    expect(INTRO_LINES.length).toBeGreaterThanOrEqual(2);
    const sim = new Simulation({ seed: 21, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    expect(sim.state.phase).toBe('intro');
    expect(sim.state.run!.story.introLineIndex).toBe(0);
    tap(sim, { confirm: true });
    expect(sim.state.phase).toBe('intro');
    expect(sim.state.run!.story.introLineIndex).toBe(1);
    tap(sim, { confirm: true });
    tap(sim, { confirm: true });
    expect(sim.state.phase).toBe('playing');
    expect(sim.state.run!.story.flags).toContain('story.intro.seen');
  });

  it('skip intro still jumps to playing and records the flag', () => {
    const sim = new Simulation({ seed: 22, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    expect(sim.state.phase).toBe('playing');
    expect(sim.state.run!.story.flags).toContain('story.intro.seen');
  });

  it('meetKeeper only completes after talking to 澄夜', () => {
    const sim = new Simulation({ seed: 23, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    sim.debugTeleport(KEEPER_POS);
    sim.step(emptyInput());
    expect(sim.state.run!.objective).toBe('meetKeeper');
    expect(sim.state.run!.keeperTalked).toBe(false);
    talkKeeper(sim);
    expect(sim.state.run!.keeperTalked).toBe(true);
    expect(sim.state.run!.story.flags).toContain('story.keeper.talked');
    expect(sim.state.run!.completedObjectives).toContain('meetKeeper');
    expect(isStoryBlocking(sim.state.run)).toBe(false);
  });

  it('objective change and each binding cut push story flags; 3/3 starts wake beat', () => {
    const sim = new Simulation({ seed: 24, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    sim.debugTeleport(KEEPER_POS);
    sim.step();
    talkKeeper(sim);
    expect(run.story.flags).toContain('story.objective.meetKeeper');
    run.objective = 'cutBindings';
    run.completedObjectives = [
      'enterShrine', 'meetKeeper', 'clearStoneSteps', 'crossBridge', 'cleansePool',
      'defendLanterns', 'defeatRainErodedWarrior', 'exposeBindingCore',
    ];
    sim.debugTeleport(SEAL_POS);
    expect(cutBinding(run)).toBe(true);
    expect(run.story.flags).toContain('story.binding.1');
    expect(cutBinding(run)).toBe(true);
    expect(run.story.flags).toContain('story.binding.2');
    expect(cutBinding(run)).toBe(true);
    expect(run.story.flags).toContain('story.binding.3');
    expect(run.story.flags).toContain('story.hio.wake.1');
    expect(isStoryBlocking(run)).toBe(true);
    expect(run.hioState).toBe('rescued');
    flushStory(sim);
    expect(run.story.flags).toContain('story.hio.wake');
    expect(isStoryBlocking(run)).toBe(false);
  });

  it('auto-advances a blocking line after 210 ticks without input', () => {
    const sim = new Simulation({ seed: 25, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    sim.debugTeleport(KEEPER_POS);
    sim.step(emptyInput());
    tap(sim, { interact: true });
    expect(isStoryBlocking(sim.state.run)).toBe(true);
    const first = sim.state.run!.story.active?.id;
    expect(first).toBeTruthy();
    for (let i = 0; i < 210; i++) sim.step(emptyInput());
    expect(sim.state.run!.story.active?.id).not.toBe(first);
  });
});
