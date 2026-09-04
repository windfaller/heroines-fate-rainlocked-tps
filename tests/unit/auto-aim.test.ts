import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { makeEnemy } from '../../src/content/enemies.ts';

describe('ranged auto-aim', () => {
  it('faces and fires toward a forward-cone enemy when shooting', () => {
    const sim = new Simulation({ seed: 41, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.player.pos = { x: 0, y: 0, z: 0 };
    run.player.yaw = 0;
    run.cameraYaw = 0;
    const foe = makeEnemy('aim-foe', 'sword-soldier', { x: 1.2, y: 0, z: -5 });
    run.enemies.push(foe);
    const before = run.projectiles.length;
    const input = emptyInput();
    input.secondary = true;
    sim.step(input);
    expect(run.projectiles.length).toBe(before + 1);
    const pr = run.projectiles[run.projectiles.length - 1]!;
    expect(pr.team).toBe('player');
    expect(pr.dir.z).toBeLessThan(-0.7);
    expect(pr.dir.x).toBeGreaterThan(0.1);
  });

  it('does not freefire contact damage from the ranged telegraph', () => {
    const sim = new Simulation({ seed: 42, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.player.pos = { x: 0, y: 0, z: 0 };
    run.player.yaw = 0;
    run.cameraYaw = 0;
    // Off to the side — outside auto-aim cone, near the old laser volume.
    const foe = makeEnemy('side-foe', 'sword-soldier', { x: 3.5, y: 0, z: -0.2 });
    const hp = foe.hp;
    run.enemies.push(foe);
    const input = emptyInput();
    input.secondary = true;
    sim.step(input);
    for (let i = 0; i < 20; i++) sim.step(emptyInput());
    expect(foe.hp).toBe(hp);
    expect(run.stats.damageDealt).toBe(0);
  });
});
