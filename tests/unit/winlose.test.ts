import { describe, expect, it } from 'vitest';
import { Simulation } from '../../src/domain/simulation.ts';
import { applyDamage } from '../../src/domain/combat/damage.ts';

describe('win / lose', () => {
  it('player hp 0 enters defeat', () => {
    const sim = new Simulation({ seed: 1, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const p = sim.state.run!.player;
    applyDamage(p, { damage: 999, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'e' });
    sim.step();
    expect(sim.state.phase).toBe('defeat');
    expect(sim.state.run!.defeatCause).toBe('player-hp');
  });
});
