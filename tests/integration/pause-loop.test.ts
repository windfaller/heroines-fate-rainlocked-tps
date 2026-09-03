import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { makeEnemy } from '../../src/content/enemies.ts';
import type { GamePhase, InputFrame } from '../../src/domain/types.ts';

const LIVE: GamePhase[] = ['playing', 'rescue', 'escort', 'intro', 'paused'];

/** Mirrors GameApp: step while paused so resume is reachable; never resume on a held key. */
function appTick(sim: Simulation, input: InputFrame): void {
  const phase = sim.state.phase;
  if (LIVE.includes(phase)) sim.step(input);
}

describe('GameApp-style pause loop', () => {
  it('start, skip intro, pause — further ticks do not change HP / tick / enemy attack', () => {
    const sim = new Simulation({ seed: 20260903, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    const foe = makeEnemy('loop-foe', 'sword-soldier', {
      x: run.player.pos.x + 1.3,
      y: run.player.pos.y,
      z: run.player.pos.z,
    });
    run.enemies.push(foe);
    for (let i = 0; i < 24 && !foe.attack; i++) appTick(sim, emptyInput());
    expect(foe.attack).not.toBeNull();

    const held: InputFrame = { ...emptyInput(), pause: true };
    appTick(sim, held);
    expect(sim.state.phase).toBe('paused');
    const tick = run.tick;
    const hp = run.player.hp;
    const elapsed = foe.attack!.elapsed;

    for (let i = 0; i < 90; i++) appTick(sim, held);
    expect(sim.state.phase).toBe('paused');
    expect(run.tick).toBe(tick);
    expect(run.player.hp).toBe(hp);
    expect(foe.attack?.elapsed).toBe(elapsed);

    appTick(sim, emptyInput());
    expect(sim.state.phase).toBe('paused');
    appTick(sim, held);
    expect(sim.state.phase).toBe('playing');
    appTick(sim, emptyInput());
    expect(run.tick).toBeGreaterThan(tick);
  });
});
