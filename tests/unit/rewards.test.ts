import { describe, expect, it } from 'vitest';
import { commitRewards, computeRank } from '../../src/domain/progression/rewards.ts';
import { defaultMeta } from '../../src/domain/save/saveV1.ts';
import { Simulation } from '../../src/domain/simulation.ts';

describe('rewards', () => {
  it('commit is idempotent', () => {
    const sim = new Simulation({ seed: 4, allowDebug: true });
    sim.finishLoading();
    sim.startRun();
    const run = sim.state.run!;
    run.stats.lanternsSaved = 3;
    run.hioHp = 80;
    const meta = defaultMeta();
    const a = commitRewards(meta, run);
    const b = commitRewards(meta, run);
    expect(a.firstClear).toBe(true);
    expect(b.firstClear).toBe(false);
    expect(meta.clearedMissions['rainbound-shrine'].clears).toBe(1);
    expect(meta.unlockedArchiveEntries).toContain('archive.kuzuha.teaser');
    expect(['S','A','B','C']).toContain(computeRank(run));
  });
});
