import type { MissionLevel } from './schema.ts';
import { OBJECTIVE_CHAIN } from '../domain/types.ts';

export interface LevelIssue {
  code: string;
  message: string;
}

export function validateLevel(level: MissionLevel): LevelIssue[] {
  const issues: LevelIssue[] = [];
  const ids = new Set<string>();
  const take = (id: string, where: string) => {
    if (ids.has(id)) issues.push({ code: 'duplicate-id', message: `${where}:${id}` });
    ids.add(id);
  };
  take(level.id, 'level');
  for (const s of level.sections) take(s.id, 'section');
  for (const w of level.waves) {
    take(w.id, 'wave');
    for (const e of w.enemies) take(e.id, 'enemy');
  }
  for (const t of level.triggers) take(t.id, 'trigger');
  for (const c of level.checkpoints) take(c.id, 'checkpoint');
  for (const i of level.interactables) take(i.id, 'interact');

  const triggerIds = new Set(level.triggers.map((t) => t.id));
  for (const w of level.waves) {
    if (!triggerIds.has(w.triggerId)) {
      issues.push({ code: 'missing-trigger', message: `wave ${w.id} trigger ${w.triggerId}` });
    }
  }
  if (OBJECTIVE_CHAIN.length < 2) {
    issues.push({ code: 'empty-objectives', message: 'objective chain too short' });
  }
  const sectionIds = new Set(level.sections.map((s) => s.id));
  for (const w of level.waves) {
    if (!sectionIds.has(w.sectionId)) {
      issues.push({ code: 'missing-section', message: `wave ${w.id} section ${w.sectionId}` });
    }
  }
  return issues;
}
