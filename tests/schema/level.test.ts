import { describe, expect, it } from 'vitest';
import { validateLevel } from '../../src/levels/validate.ts';
import { RAINBOUND } from '../../src/levels/rainboundShrine.ts';
import { OBJECTIVE_CHAIN } from '../../src/domain/types.ts';

describe('level schema', () => {
  it('rainbound shrine has 11 sections and valid ids', () => {
    expect(RAINBOUND.sections).toHaveLength(11);
    expect(validateLevel(RAINBOUND)).toEqual([]);
    expect(OBJECTIVE_CHAIN[0]).toBe('enterShrine');
    expect(OBJECTIVE_CHAIN.at(-1)).toBe('missionComplete');
  });
});
