import type { MetaProgress, RunState } from '../types.ts';

export type Rank = 'S' | 'A' | 'B' | 'C';

export function computeRank(run: RunState): Rank {
  let score = 100;
  score -= Math.min(40, run.stats.damageTaken * 0.4);
  score -= Math.min(20, run.stats.timeTicks / 60 / 18);
  score += run.stats.lanternsSaved * 6;
  score += Math.min(15, run.hioHp / run.hioMaxHp * 15);
  score += Math.min(10, run.stats.perfectDodges);
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 55) return 'B';
  return 'C';
}

export const FIRST_CLEAR_UNLOCKS = {
  characters: ['character.rin.gameplay'],
  archive: ['archive.hio.rescue', 'archive.boss.rain-eroded', 'archive.region.rainbound', 'archive.rin', 'archive.kuzuha.teaser'],
  modules: ['module.pin-rain', 'module.iron-breath'],
  flags: ['story.rainbound.cleared', 'story.kuzuha.teaser'],
};

/** Reward commit is idempotent. Replay/result skip/reload must not stack. */
export function commitRewards(meta: MetaProgress, run: RunState): { rank: Rank; firstClear: boolean } {
  if (run.rewardsCommitted) {
    const rec = meta.clearedMissions[run.missionId];
    return { rank: rec?.bestRank ?? computeRank(run), firstClear: false };
  }
  run.rewardsCommitted = true;
  const rank = computeRank(run);
  const prev = meta.clearedMissions[run.missionId];
  const firstClear = !prev;
  const rankOrder = { C: 0, B: 1, A: 2, S: 3 };
  const bestRank = prev && rankOrder[prev.bestRank] > rankOrder[rank] ? prev.bestRank : rank;
  const bestTime = prev ? Math.min(prev.bestTimeTicks, run.stats.timeTicks) : run.stats.timeTicks;
  meta.clearedMissions[run.missionId] = {
    bestRank,
    bestTimeTicks: bestTime,
    clears: (prev?.clears ?? 0) + 1,
  };
  const add = (arr: string[], id: string) => {
    if (!arr.includes(id)) arr.push(id);
  };
  add(meta.unlockedCharacters, 'character.rin.gameplay');
  for (const a of FIRST_CLEAR_UNLOCKS.archive) add(meta.unlockedArchiveEntries, a);
  for (const m of FIRST_CLEAR_UNLOCKS.modules) add(meta.unlockedModules, m);
  for (const f of FIRST_CLEAR_UNLOCKS.flags) add(meta.seenStoryFlags, f);
  return { rank, firstClear };
}
