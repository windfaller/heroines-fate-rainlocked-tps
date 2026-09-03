import { describe, expect, it } from 'vitest';
import { Simulation } from '../../src/domain/simulation.ts';
import { BOSS_HP, BOSS_PHASE_RATIO } from '../../src/domain/types.ts';
import { pathAt, SEAL_POS } from '../../src/levels/rainboundShrine.ts';
import { cutBinding } from '../../src/domain/mission/rescue.ts';

describe('integration boss to rescue', () => {
  it('phase transition then defeat then three cuts', () => {
    const sim = new Simulation({ seed: 11, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.completedObjectives = [
      'enterShrine','meetKeeper','clearStoneSteps','crossBridge','cleansePool','defendLanterns',
    ];
    run.objective = 'defeatRainErodedWarrior';
    sim.debugTeleport(pathAt(188));
    sim.step();
    const boss = run.enemies.find((e) => e.kind === 'boss')!;
    boss.hp = Math.floor(BOSS_HP * BOSS_PHASE_RATIO) - 1;
    sim.step();
    expect(run.bossPhase).toBe(2);
    expect(run.bossTransitionDone).toBe(true);
    boss.iFrames = 0;
    boss.hp = 0;
    boss.dead = true;
    sim.step();
    expect(run.completedObjectives).toContain('defeatRainErodedWarrior');
    sim.debugTeleport(SEAL_POS);
    sim.step();
    cutBinding(run);
    cutBinding(run);
    cutBinding(run);
    sim.step();
    expect(run.bindingsCut).toBe(3);
    expect(run.hioState).toBe('rescued');
  });
});
