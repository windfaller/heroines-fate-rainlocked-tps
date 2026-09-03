import type { RunState } from '../types.ts';
import { distXZ } from '../combat/damage.ts';
import { completeObjective } from './objectives.ts';
import { pushBindingLine, startHioWakeScene } from './story.ts';

export function canCutBinding(run: RunState): boolean {
  if (run.bindingsCut >= 3) return false;
  if (run.objective !== 'cutBindings' && run.objective !== 'exposeBindingCore') return false;
  const hio = run.npcs.find((n) => n.kind === 'hio');
  if (!hio) return false;
  return distXZ(run.player.pos, hio.pos) <= 3.8;
}

export function cutBinding(run: RunState): boolean {
  if (!canCutBinding(run) && run.objective !== 'cutBindings' && run.objective !== 'exposeBindingCore') {
    return false;
  }
  const hio = run.npcs.find((n) => n.kind === 'hio');
  if (!hio) return false;
  if (distXZ(run.player.pos, hio.pos) > 4.2) return false;
  if (run.bindingsCut >= 3) return true;
  run.bindingsCut += 1;
  pushBindingLine(run, run.bindingsCut);
  run.pendingCues.push('binding-cut');
  if (run.bindingsCut >= 3) {
    run.hioState = 'rescued';
    if (run.objective === 'exposeBindingCore') completeObjective(run, 'exposeBindingCore');
    if (run.objective === 'cutBindings') completeObjective(run, 'cutBindings');
    if (run.objective === 'hioRescued') completeObjective(run, 'hioRescued');
    startHioWakeScene(run);
  }
  return true;
}
