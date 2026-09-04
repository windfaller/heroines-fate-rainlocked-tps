import { describe, expect, it } from 'vitest';
import { ATTACKS } from '../../src/domain/combat/attacks.ts';
import { telegraphKindFor } from '../../src/runtime/rendering/AttackVfx.ts';

describe('attack telegraphs', () => {
  it('does not use a single ring for every skill', () => {
    const kinds = Object.values(ATTACKS).map((d) => telegraphKindFor(d.id, d.shape));
    const unique = new Set(kinds);
    expect(unique.size).toBeGreaterThanOrEqual(5);
    expect(telegraphKindFor('rin.primary.1', 'sphere')).toBe('crescent');
    expect(telegraphKindFor('rin.secondary', 'ray')).toBe('bolt');
    expect(telegraphKindFor('rin.q', 'sphere')).toBe('ring');
    expect(telegraphKindFor('rin.f', 'sphere')).toBe('column');
    expect(telegraphKindFor('boss.triple1', 'cone')).toBe('wedge');
    expect(telegraphKindFor('boss.chop', 'box')).toBe('slab');
  });
});
