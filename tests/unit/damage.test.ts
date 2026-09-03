import { describe, expect, it } from 'vitest';
import { applyDamage } from '../../src/domain/combat/damage.ts';
import { makeRin } from '../../src/content/characters.ts';
import { makeEnemy } from '../../src/content/enemies.ts';

describe('damage', () => {
  it('applies hp damage', () => {
    const e = makeEnemy('a', 'sword-soldier', { x: 0, y: 0, z: 0 });
    const r = applyDamage(e, { damage: 10, guardDamage: 5, poiseBreakTicks: 12, sourceId: 'p' });
    expect(r.applied).toBe(10);
    expect(e.hp).toBe(e.maxHp - 10);
    expect(e.guard).toBe(20);
    expect(r.killed).toBe(false);
  });
  it('kills at zero hp', () => {
    const e = makeEnemy('a', 'sword-soldier', { x: 0, y: 0, z: 0 });
    applyDamage(e, { damage: 999, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'p' });
    expect(e.dead).toBe(true);
    expect(e.hp).toBe(0);
  });
  it('skips dead targets', () => {
    const p = makeRin({ x: 0, y: 0, z: 0 });
    p.dead = true;
    const r = applyDamage(p, { damage: 10, guardDamage: 0, poiseBreakTicks: 0, sourceId: 'e' });
    expect(r.kind).toBe('dead');
    expect(r.applied).toBe(0);
  });
});
