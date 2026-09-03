import { describe, expect, it } from 'vitest';
import { applyDamage } from '../../src/domain/combat/damage.ts';
import { makeEnemy } from '../../src/content/enemies.ts';
import { startAttack } from '../../src/domain/combat/attacks.ts';

describe('poise / guard break', () => {
  it('breaks poise when guard reaches 0', () => {
    const e = makeEnemy('b', 'sword-soldier', { x: 0, y: 0, z: 0 });
    startAttack(e, 'enemy.slash');
    const r = applyDamage(e, { damage: 4, guardDamage: 25, poiseBreakTicks: 36, sourceId: 'p' });
    expect(r.poiseBroken).toBe(true);
    expect(e.guard).toBe(0);
    expect(e.poiseBreakTimer).toBe(36);
    expect(e.attack).toBeNull();
  });
});
