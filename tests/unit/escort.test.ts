import { describe, expect, it } from 'vitest';
import { Simulation } from '../../src/domain/simulation.ts';
import { applyDamage } from '../../src/domain/combat/damage.ts';
import { pathAt } from '../../src/levels/rainboundShrine.ts';

describe('escort', () => {
  it('hio down fails escort without requiring boss rematch', () => {
    const sim = new Simulation({ seed: 3, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    sim.debugTeleport(pathAt(188));
    sim.step();
    const run = sim.state.run!;
    const boss = run.enemies.find((e) => e.kind === 'boss');
    if (boss) {
      boss.hp = 0;
      boss.dead = true;
    }
    run.objective = 'escortHioToKeeper';
    run.hioState = 'escorting';
    run.bindingsCut = 3;
    run.checkpointId = 'escort';
    const hio = run.npcs.find((n) => n.kind === 'hio')!;
    applyDamage(hio, { damage: 999, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'e' });
    sim.step();
    expect(sim.state.phase).toBe('defeat');
    expect(run.escortFailCause).toBe('hio-down');
    sim.retryCheckpoint();
    expect(sim.state.run!.enemies.find((e) => e.kind === 'boss')?.dead).toBe(true);
    expect(sim.state.phase).toBe('escort');
  });
});
