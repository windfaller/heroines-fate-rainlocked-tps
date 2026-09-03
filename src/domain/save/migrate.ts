import { defaultSave, isSaveV1, type SaveV1, DEFAULT_SETTINGS } from './saveV1.ts';
import type { Settings } from '../types.ts';

export interface MigrationResult {
  save: SaveV1;
  reason: string | null;
  migrated: boolean;
}

function coerceSettings(raw: unknown): Settings {
  const s = (raw && typeof raw === 'object' ? raw : {}) as Partial<Settings>;
  return {
    masterVolume: num(s.masterVolume, DEFAULT_SETTINGS.masterVolume),
    musicVolume: num(s.musicVolume, DEFAULT_SETTINGS.musicVolume),
    sfxVolume: num(s.sfxVolume, DEFAULT_SETTINGS.sfxVolume),
    shake: num(s.shake, DEFAULT_SETTINGS.shake),
    sensitivity: num(s.sensitivity, DEFAULT_SETTINGS.sensitivity),
    invertY: Boolean(s.invertY),
    reducedMotion: Boolean(s.reducedMotion),
  };
}

function num(v: unknown, d: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : d;
}

function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
}

/** Pure migration. v0 { unlocked } or corrupt/missing → SaveV1 defaults. */
export function migrateSave(raw: unknown): MigrationResult {
  if (raw === null || raw === undefined) {
    return { save: defaultSave(), reason: 'missing', migrated: true };
  }
  if (typeof raw === 'string') {
    try {
      return migrateSave(JSON.parse(raw));
    } catch {
      return { save: defaultSave(), reason: 'corrupt-json', migrated: true };
    }
  }
  if (typeof raw !== 'object') {
    return { save: defaultSave(), reason: 'corrupt-type', migrated: true };
  }
  const o = raw as Record<string, unknown>;
  if (o.version === 0 || (o.version === undefined && Array.isArray(o.unlocked))) {
    const save = defaultSave();
    save.unlockedCharacters = strArr(o.unlocked).length
      ? strArr(o.unlocked)
      : save.unlockedCharacters;
    save.settings = coerceSettings(o.settings);
    return { save, reason: 'migrated-v0', migrated: true };
  }
  if (!isSaveV1(raw)) {
    return { save: defaultSave(), reason: 'corrupt-schema', migrated: true };
  }
  const save: SaveV1 = {
    version: 1,
    settings: coerceSettings(o.settings),
    clearedMissions: (o.clearedMissions && typeof o.clearedMissions === 'object'
      ? o.clearedMissions
      : {}) as SaveV1['clearedMissions'],
    unlockedCharacters: strArr(o.unlockedCharacters),
    unlockedArchiveEntries: strArr(o.unlockedArchiveEntries),
    seenStoryFlags: strArr(o.seenStoryFlags),
    unlockedModules: strArr(o.unlockedModules),
  };
  if (save.unlockedCharacters.length === 0) {
    save.unlockedCharacters = defaultSave().unlockedCharacters;
  }
  if (!save.unlockedModules || save.unlockedModules.length === 0) {
    save.unlockedModules = defaultSave().unlockedModules;
  }
  return { save, reason: null, migrated: false };
}

export function parseStoredSave(text: string | null): MigrationResult {
  if (text === null || text === '') {
    return migrateSave(null);
  }
  return migrateSave(text);
}
