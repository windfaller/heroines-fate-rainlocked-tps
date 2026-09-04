import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { makeEnemy } from '../../src/content/enemies.ts';

describe('ranged auto-aim', () => {
  it('faces and fires toward the nearest enemy when shooting', () => {
    const sim = new Simulation({ seed: 41, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    run.player.pos = { x: 0, y: 0, z: 0 };
    run.player.yaw = 0;
    run.cameraYaw = 0;
    const foe = makeEnemy('aim-foe', 'sword-soldier', { x: 4, y: 0, z: -1 });
    run.enemies.push(foe);
    const before = run.projectiles.length;
    const input = emptyInput();
    input.secondary = true;
    sim.step(input);
    expect(run.projectiles.length).toBe(before + 1);
    const pr = run.projectiles[run.projectiles.length - 1]!;
    expect(pr.team).toBe('player');
    // Should lean toward +X (enemy side), not only straight -Z.
    expect(pr.dir.x).toBeGreaterThan(0.3);
    expect(Math.abs(run.player.yaw - Math.atan2(4, 1))).toBeLessThan(0.2);
  });
});
