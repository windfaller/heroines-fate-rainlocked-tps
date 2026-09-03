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
  for (let i = 0; i < 16; i++) {
    const run = sim.state.run;
    if (!run) return;
    if (sim.state.phase === 'intro') {
      tap(sim, { confirm: true });
      continue;
    }
    if (!isStoryBlocking(run)) return;
    tap(sim, { confirm: true });
  }
}

export function talkKeeper(sim: Simulation): void {
  tap(sim, { interact: true });
  flushStory(sim);
}
