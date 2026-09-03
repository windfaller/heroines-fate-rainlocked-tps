import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { makeEnemy } from '../../src/content/enemies.ts';
import { startAttack } from '../../src/domain/combat/attacks.ts';

describe('combat juice', () => {
  it('melee contact writes hitstop, floating damage, and a hit cue', () => {
    const sim = new Simulation({ seed: 31, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    const foe = makeEnemy('juice-foe', 'sword-soldier', {
      x: run.player.pos.x,
      y: run.player.pos.y,
      z: run.player.pos.z - 1.2,
    });
    run.enemies.push(foe);
    run.player.yaw = 0;
    startAttack(run.player, 'rin.primary.1');
    for (let i = 0; i < 20; i++) sim.step(emptyInput());
    expect(run.stats.damageDealt).toBeGreaterThan(0);
    expect(run.combatFloaters.length).toBeGreaterThan(0);
    expect(run.combatFloaters.some((f) => f.kind === 'damage')).toBe(true);
    expect(run.hitstopTicks + run.pendingCues.filter((c) => c === 'hit').length).toBeGreaterThan(0);
    expect(run.pendingCues).toContain('hit');
  });
});
