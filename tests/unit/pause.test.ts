import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { makeEnemy } from '../../src/content/enemies.ts';
import { isEscapeKey } from '../../src/runtime/input/InputRouter.ts';

function pauseInput(down: boolean) {
  const f = emptyInput();
  f.pause = down;
  return f;
}

describe('pause freeze', () => {
  it('pause() freezes tick, player HP, and enemy attack; resume continues', () => {
    const sim = new Simulation({ seed: 11, allowDebug: true });
    sim.finishLoading();
    sim.startRun('module.moon-return');
    sim.skipIntro();
    const run = sim.state.run!;
    const foe = makeEnemy('pause-foe', 'sword-soldier', {
      x: run.player.pos.x + 1.4,
      y: run.player.pos.y,
      z: run.player.pos.z,
    });
    run.enemies.push(foe);

    for (let i = 0; i < 30 && !foe.attack; i++) sim.step(emptyInput());
    expect(foe.attack).not.toBeNull();
    expect(sim.state.phase).toBe('playing');

    const tick = run.tick;
    const hp = run.player.hp;
    const guard = run.player.guard;
    const elapsed = foe.attack!.elapsed;
    const phase = foe.attack!.phase;
    const pos = { ...run.player.pos };

    sim.pause();
    expect(sim.state.phase).toBe('paused');

    for (let i = 0; i < 120; i++) sim.step(emptyInput());
    expect(sim.state.phase).toBe('paused');
    expect(run.tick).toBe(tick);
    expect(run.stats.timeTicks).toBe(tick);
    expect(run.player.hp).toBe(hp);
    expect(run.player.guard).toBe(guard);
    expect(run.player.pos.x).toBe(pos.x);
    expect(run.player.pos.z).toBe(pos.z);
    expect(foe.attack?.elapsed).toBe(elapsed);
    expect(foe.attack?.phase).toBe(phase);

    sim.resume();
    expect(sim.state.phase).toBe('playing');
    for (let i = 0; i < 12; i++) sim.step(emptyInput());
    expect(run.tick).toBe(tick + 12);
    expect(foe.attack === null || foe.attack.elapsed !== elapsed).toBe(true);
  });

  it('held Escape does not immediately resume; only a rising edge does', () => {
    const sim = new Simulation({ seed: 12, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;

    sim.step(pauseInput(true));
    expect(sim.state.phase).toBe('paused');
    const tick = run.tick;

    for (let i = 0; i < 40; i++) sim.step(pauseInput(true));
    expect(sim.state.phase).toBe('paused');
    expect(run.tick).toBe(tick);

    sim.step(pauseInput(false));
    expect(sim.state.phase).toBe('paused');

    sim.step(pauseInput(true));
    expect(sim.state.phase).toBe('playing');
    sim.step(emptyInput());
    expect(run.tick).toBe(tick + 1);
  });

  it('pause() while Escape is still down does not bounce back to playing', () => {
    const sim = new Simulation({ seed: 13, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    sim.skipIntro();
    const run = sim.state.run!;
    const tick = run.tick;

    sim.pause();
    for (let i = 0; i < 20; i++) sim.step(pauseInput(true));
    expect(sim.state.phase).toBe('paused');
    expect(run.tick).toBe(tick);
  });
});

describe('isEscapeKey', () => {
  it('accepts code Escape, key Escape, and key Esc', () => {
    expect(isEscapeKey({ code: 'Escape', key: '' })).toBe(true);
    expect(isEscapeKey({ code: '', key: 'Escape' })).toBe(true);
    expect(isEscapeKey({ code: '', key: 'Esc' })).toBe(true);
    expect(isEscapeKey({ code: 'KeyA', key: 'a' })).toBe(false);
  });
});
