import { OBJECTIVE_CHAIN, type ObjectiveId, type RunState } from '../types.ts';
import { rollModuleChoices } from '../../content/martialModules.ts';

function openEncounterPick(run: RunState): void {
  const choices = rollModuleChoices(run.ownedModules);
  if (choices.length === 0) return;
  run.pendingModuleChoices = choices;
  run.moduleChoiceOpen = true;
}

export function tryAdvanceObjective(run: RunState, next: ObjectiveId): boolean {
  const i = OBJECTIVE_CHAIN.indexOf(run.objective);
  const j = OBJECTIVE_CHAIN.indexOf(next);
  if (j !== i + 1) return false;
  if (run.completedObjectives.includes(run.objective)) {
    run.objective = next;
    return true;
  }
  run.completedObjectives.push(run.objective);
  run.objective = next;
  return true;
}

/** Idempotent: completing an already-complete objective is a no-op. */
export function completeObjective(run: RunState, id: ObjectiveId): boolean {
  const i = OBJECTIVE_CHAIN.indexOf(id);
  const cur = OBJECTIVE_CHAIN.indexOf(run.objective);
  if (i < 0) return false;
  if (i < cur) return true;
  if (i !== cur) return false;
  if (!run.completedObjectives.includes(id)) {
    run.completedObjectives.push(id);
  }
  const next = OBJECTIVE_CHAIN[i + 1];
  if (next) run.objective = next;
  return true;
}

export function isObjectiveDone(run: RunState, id: ObjectiveId): boolean {
  return run.completedObjectives.includes(id) || OBJECTIVE_CHAIN.indexOf(run.objective) > OBJECTIVE_CHAIN.indexOf(id);
}

export function evaluateObjectives(run: RunState): void {
  const livingEnemies = () => run.enemies.filter((e) => !e.dead && e.kind !== 'dummy');
  const ofKind = (k: string) => livingEnemies().filter((e) => e.kind === k);

  if (run.objective === 'enterShrine') {
    completeObjective(run, 'enterShrine');
  }

  if (run.objective === 'meetKeeper' && run.triggersFired.includes('s2-keeper')) {
    completeObjective(run, 'meetKeeper');
    run.checkpointId = 'keeper';
  }

  if (run.objective === 'clearStoneSteps') {
    const aAlive = ofKind('sword-soldier').filter((e) => e.id.startsWith('enc-a')).length
      + ofKind('archer').filter((e) => e.id.startsWith('enc-a')).length;
    const aAny = run.enemies.some((e) => e.id.startsWith('enc-a'));
    if (aAny && run.enemies.filter((e) => e.id.startsWith('enc-a') && !e.dead).length === 0) {
      completeObjective(run, 'clearStoneSteps');
      openEncounterPick(run);
    }
  }

  if (run.objective === 'crossBridge' && run.triggersFired.includes('s5-pool')) {
    completeObjective(run, 'crossBridge');
  }

  if (run.objective === 'cleansePool') {
    const bAlive = run.enemies.filter((e) => e.id.startsWith('enc-b') && !e.dead).length;
    const bAny = run.enemies.some((e) => e.id.startsWith('enc-b'));
    if (bAny && bAlive === 0) {
      run.casterPuddlesCleansed = true;
      completeObjective(run, 'cleansePool');
      openEncounterPick(run);
    }
  }

  if (run.objective === 'defendLanterns') {
    const eliteDead = run.enemies.some((e) => e.kind === 'lantern-hunter' && e.dead);
    const lit = run.lanterns.filter((l) => l.lit && l.hp > 0).length;
    const spawned = run.enemies.some((e) => e.kind === 'lantern-hunter');
    if (spawned && eliteDead && lit >= 1) {
      run.stats.lanternsSaved = lit;
      completeObjective(run, 'defendLanterns');
      run.checkpointId = 'inner-path';
      openEncounterPick(run);
    }
  }

  if (run.objective === 'defeatRainErodedWarrior') {
    const boss = run.enemies.find((e) => e.kind === 'boss');
    if (boss && boss.dead) {
      completeObjective(run, 'defeatRainErodedWarrior');
      run.checkpointId = 'rescue';
    }
  }

  if (run.objective === 'exposeBindingCore') {
    completeObjective(run, 'exposeBindingCore');
  }

  if (run.objective === 'cutBindings' && run.bindingsCut >= 3) {
    completeObjective(run, 'cutBindings');
  }

  if (run.objective === 'hioRescued' && run.bindingsCut >= 3) {
    run.hioState = 'rescued';
    completeObjective(run, 'hioRescued');
    run.checkpointId = 'escort';
  }

  if (run.objective === 'escortHioToKeeper') {
    if (run.hioState === 'safe' || run.triggersFired.includes('escort-arrive')) {
      run.hioState = 'safe';
      completeObjective(run, 'escortHioToKeeper');
    }
  }

  if (run.objective === 'missionComplete' && run.triggersFired.includes('light-main-lantern')) {
    completeObjective(run, 'missionComplete');
  }
}
