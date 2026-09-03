import { describe, expect, it } from 'vitest';
import { migrateSave, parseStoredSave } from '../../src/domain/save/migrate.ts';

describe('save migration', () => {
  it('migrates v0 unlocked array', () => {
    const r = migrateSave({ version: 0, unlocked: ['character.rin.gameplay'] });
    expect(r.migrated).toBe(true);
    expect(r.save.version).toBe(1);
    expect(r.save.unlockedCharacters).toContain('character.rin.gameplay');
    expect(r.reason).toBe('migrated-v0');
  });
  it('corrupt json falls back', () => {
    const r = parseStoredSave('{not json');
    expect(r.migrated).toBe(true);
    expect(r.save.version).toBe(1);
    expect(r.reason).toBe('corrupt-json');
  });
  it('missing uses defaults', () => {
    const r = parseStoredSave(null);
    expect(r.save.settings.masterVolume).toBeGreaterThan(0);
  });
});
