import type { MetaProgress, MissionRecord, Settings } from '../types.ts';

export const SAVE_KEY = 'heroines-fate-rainlocked-tps.save.v1';

export interface SaveV1 {
  version: 1;
  settings: Settings;
  clearedMissions: Record<string, MissionRecord>;
  unlockedCharacters: string[];
  unlockedArchiveEntries: string[];
  seenStoryFlags: string[];
  unlockedModules?: string[];
}

export const DEFAULT_SETTINGS: Settings = {
  masterVolume: 0.8,
  musicVolume: 0.6,
  sfxVolume: 0.8,
  shake: 0.5,
  sensitivity: 1,
  invertY: false,
  reducedMotion: false,
};

export function defaultMeta(): MetaProgress {
  return {
    unlockedCharacters: ['character.rin.gameplay'],
    unlockedArchiveEntries: [],
    seenStoryFlags: [],
    unlockedModules: ['module.moon-return', 'module.focus', 'module.lantern-guard'],
    clearedMissions: {},
  };
}

export function defaultSave(): SaveV1 {
  const meta = defaultMeta();
  return {
    version: 1,
    settings: { ...DEFAULT_SETTINGS },
    clearedMissions: {},
    unlockedCharacters: [...meta.unlockedCharacters],
    unlockedArchiveEntries: [],
    seenStoryFlags: [],
    unlockedModules: [...meta.unlockedModules],
  };
}

export function isSaveV1(raw: unknown): raw is SaveV1 {
  if (!raw || typeof raw !== 'object') return false;
  const o = raw as Record<string, unknown>;
  return o.version === 1 && typeof o.settings === 'object' && o.settings !== null;
}
