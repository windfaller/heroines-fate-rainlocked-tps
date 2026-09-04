import { emptyInput, Simulation } from '../../src/domain/simulation.ts';
import { isStoryBlocking } from '../../src/domain/mission/story.ts';
import type { InputFrame } from '../../src/domain/types.ts';

export function tap(sim: Simulation, patch: Partial<InputFrame> = {}): void {
  const a = emptyInput();
  Object.assign(a, patch);
  sim.step(a);
  sim.step(emptyInput());
}

export function flushStory(sim: Simulation): void {
  for (let i = 0; i < 32; i++) {
    const run = sim.state.run;
    if (!run) return;
    if (sim.state.phase === 'intro') {
      tap(sim, { confirm: true });
      continue;
    }
    if (!run.story.active && run.story.queue.length === 0) return;
    if (isStoryBlocking(run)) {
      tap(sim, { confirm: true });
      continue;
    }
    // Skip ink banners immediately in tests.
    if (run.story.active) {
      sim.advanceStory();
      continue;
    }
    return;
  }
}

export function talkKeeper(sim: Simulation): void {
  tap(sim, { interact: true });
  flushStory(sim);
}
