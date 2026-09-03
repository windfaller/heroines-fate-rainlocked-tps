import { describe, expect, it } from 'vitest';
import { applyDamage, grantIFrames } from '../../src/domain/combat/damage.ts';
import { makeRin } from '../../src/content/characters.ts';

describe('i-frames', () => {
  it('blocks damage while invulnerable', () => {
    const p = makeRin({ x: 0, y: 0, z: 0 });
    grantIFrames(p, 12);
    const r = applyDamage(p, { damage: 40, guardDamage: 10, poiseBreakTicks: 8, sourceId: 'e' });
    expect(r.kind).toBe('iframe');
    expect(p.hp).toBe(100);
  });
  it('damage cooldown prevents multi-hit', () => {
    const p = makeRin({ x: 0, y: 0, z: 0 });
    applyDamage(p, { damage: 10, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'e' });
    const r = applyDamage(p, { damage: 10, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'e' });
    expect(r.kind).toBe('cooldown');
    expect(p.hp).toBe(90);
  });
});
