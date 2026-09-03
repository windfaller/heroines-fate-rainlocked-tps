import { describe, expect, it } from 'vitest';
import { Simulation } from '../../src/domain/simulation.ts';
import { SEAL_POS } from '../../src/levels/rainboundShrine.ts';
import { cutBinding } from '../../src/domain/mission/rescue.ts';

describe('rescue', () => {
  it('three bindings set hio rescued', () => {
    const sim = new Simulation({ seed: 2, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.objective = 'cutBindings';
    run.completedObjectives = ['enterShrine','meetKeeper','clearStoneSteps','crossBridge','cleansePool','defendLanterns','defeatRainErodedWarrior','exposeBindingCore'];
    sim.debugTeleport(SEAL_POS);
    expect(cutBinding(run)).toBe(true);
    expect(cutBinding(run)).toBe(true);
    expect(cutBinding(run)).toBe(true);
    expect(run.bindingsCut).toBe(3);
    expect(run.hioState).toBe('rescued');
    sim.step();
    expect(run.completedObjectives).toContain('cutBindings');
  });
});
