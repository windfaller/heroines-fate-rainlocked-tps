import {
  BINDING_LINES,
  HIO_WAKE_SCENE,
  INTRO_LINES,
  KEEPER_SCENE,
  OBJECTIVE_LINES,
  type StoryLineDef,
} from '../../content/story.ts';
import type { ObjectiveId, RunState } from '../types.ts';

export interface StoryRuntime {
  queue: StoryLineDef[];
  active: StoryLineDef | null;
  elapsed: number;
  flags: string[];
  introLineIndex: number;
}

export function emptyStory(): StoryRuntime {
  return {
    queue: [],
    active: null,
    elapsed: 0,
    flags: [],
    introLineIndex: 0,
  };
}

export function isStoryBlocking(run: RunState | null | undefined): boolean {
  if (!run) return false;
  if (run.story.active?.blocking) return true;
  return run.story.queue.some((l) => l.blocking);
}

export function hasStoryFlag(run: RunState, id: string): boolean {
  return run.story.flags.includes(id);
}

export function markStoryFlag(run: RunState, id: string): boolean {
  if (run.story.flags.includes(id)) return false;
  run.story.flags.push(id);
  return true;
}

export function enqueueLine(run: RunState, line: StoryLineDef): boolean {
  if (run.story.flags.includes(line.id)) return false;
  markStoryFlag(run, line.id);
  if (!run.story.active) {
    run.story.active = line;
    run.story.elapsed = 0;
  } else if (line.blocking && !run.story.active.blocking) {
    run.story.queue.unshift(run.story.active);
    run.story.active = line;
    run.story.elapsed = 0;
  } else {
    run.story.queue.push(line);
  }
  return true;
}

export function enqueueScene(run: RunState, lines: StoryLineDef[]): number {
  let n = 0;
  for (const line of lines) {
    if (enqueueLine(run, line)) n += 1;
  }
  return n;
}

function onLineDismissed(run: RunState, line: StoryLineDef): void {
  if (line.id === 'story.keeper.3') {
    run.keeperTalked = true;
    markStoryFlag(run, 'story.keeper.talked');
  }
  if (line.id === 'story.hio.wake.3') {
    markStoryFlag(run, 'story.hio.wake');
  }
  if (line.id.startsWith('story.intro.')) {
    markStoryFlag(run, 'story.intro.seen');
  }
}

export function advanceStory(run: RunState): boolean {
  const cur = run.story.active;
  if (!cur) return false;
  onLineDismissed(run, cur);
  const next = run.story.queue.shift() ?? null;
  run.story.active = next;
  run.story.elapsed = 0;
  return true;
}

/** Skip remaining blocking lines (intro skip / scene skip). Non-blocking ink stays. */
export function skipBlockingStory(run: RunState): void {
  const pending = [run.story.active, ...run.story.queue].filter((l): l is StoryLineDef => !!l);
  const kept: StoryLineDef[] = [];
  for (const line of pending) {
    if (line.blocking) onLineDismissed(run, line);
    else kept.push(line);
  }
  run.story.queue = kept.slice(1);
  run.story.active = kept[0] ?? null;
  run.story.elapsed = 0;
}

export function tickStory(run: RunState): void {
  const a = run.story.active;
  if (!a) return;
  run.story.elapsed += 1;
  if (a.blocking && run.story.elapsed >= 210) {
    advanceStory(run);
    return;
  }
  if (!a.blocking && a.ttlTicks > 0 && run.story.elapsed >= a.ttlTicks) {
    advanceStory(run);
  }
}

export function pushObjectiveLine(run: RunState, id: ObjectiveId): void {
  const line = OBJECTIVE_LINES[id];
  if (line) enqueueLine(run, line);
}

export function startKeeperScene(run: RunState): boolean {
  if (run.keeperTalked || run.story.flags.includes('story.keeper.talked')) return false;
  if (run.story.flags.includes('story.keeper.1')) return false;
  return enqueueScene(run, KEEPER_SCENE) > 0;
}

export function pushBindingLine(run: RunState, cutIndex: number): void {
  const line = BINDING_LINES[cutIndex - 1];
  if (line) enqueueLine(run, line);
}

export function startHioWakeScene(run: RunState): boolean {
  if (run.story.flags.includes('story.hio.wake.1')) return false;
  return enqueueScene(run, HIO_WAKE_SCENE) > 0;
}

export function advanceIntro(run: RunState): 'continue' | 'done' {
  run.story.introLineIndex += 1;
  const line = INTRO_LINES[run.story.introLineIndex - 1];
  if (line) markStoryFlag(run, line.id);
  if (run.story.introLineIndex >= INTRO_LINES.length) {
    markStoryFlag(run, 'story.intro.seen');
    return 'done';
  }
  return 'continue';
}

export function skipIntroStory(run: RunState): void {
  run.story.introLineIndex = INTRO_LINES.length;
  for (const line of INTRO_LINES) markStoryFlag(run, line.id);
  markStoryFlag(run, 'story.intro.seen');
}

export function currentIntroLine(run: RunState): StoryLineDef | null {
  return INTRO_LINES[run.story.introLineIndex] ?? null;
}
