import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { KEEPER_POS, SEAL_POS } from '../../src/levels/rainboundShrine.ts';

describe('integration escort to result', () => {
  it('arriving at keeper and lighting lantern commits rewards once', () => {
    const sim = new Simulation({ seed: 12, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.completedObjectives = [
      'enterShrine','meetKeeper','clearStoneSteps','crossBridge','cleansePool','defendLanterns',
      'defeatRainErodedWarrior','exposeBindingCore','cutBindings','hioRescued',
    ];
    run.objective = 'escortHioToKeeper';
    run.bindingsCut = 3;
    run.hioState = 'rescued';
    run.checkpointId = 'escort';
    const hio = run.npcs.find((n) => n.kind === 'hio')!;
    hio.pos = { ...SEAL_POS };
    sim.debugTeleport(KEEPER_POS);
    hio.pos = { ...KEEPER_POS };
    for (let i = 0; i < 30; i++) sim.step(emptyInput());
    const input = emptyInput();
    input.interact = true;
    sim.step(input);
    expect(sim.state.phase).toBe('result');
    expect(run.rewardsCommitted).toBe(true);
    const clears = sim.state.meta.clearedMissions['rainbound-shrine'].clears;
    sim.step(input);
    expect(sim.state.meta.clearedMissions['rainbound-shrine'].clears).toBe(clears);
  });
});
