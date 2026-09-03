import { describe, expect, it } from 'vitest';
import { Simulation, emptyInput } from '../../src/domain/simulation.ts';
import { rollModuleChoices } from '../../src/content/martialModules.ts';
import { pathAt } from '../../src/levels/rainboundShrine.ts';
import { talkKeeper } from '../helpers/play.ts';

describe('in-level 三選一 module picker', () => {
  it('offers leftover starters first then freezes combat until a pick', () => {
    const sim = new Simulation({ seed: 3, allowDebug: true });
    sim.finishLoading();
    sim.startRun('module.moon-return');
    sim.skipIntro();
    const run = sim.state.run!;
    const offered = rollModuleChoices(run.ownedModules);
    expect(offered).toHaveLength(3);
    expect(offered).toContain('module.focus');
    expect(offered).toContain('module.lantern-guard');
    expect(offered).not.toContain('module.moon-return');

    run.moduleChoiceOpen = true;
    run.pendingModuleChoices = offered;
    const tick = run.tick;
    const pos = { ...run.player.pos };
    const input = emptyInput();
    input.moveZ = 1;
    input.primary = true;
    sim.step(input);
    expect(run.tick).toBe(tick);
    expect(run.player.pos.z).toBe(pos.z);
    expect(run.player.attack).toBeNull();

    expect(sim.pickInLevelModule(offered[0]!)).toBe(true);
    expect(run.moduleChoiceOpen).toBe(false);
    expect(run.ownedModules).toContain(offered[0]!);
    expect(run.inLevelModule).toBe(offered[0]!);
    sim.step(emptyInput());
    expect(run.tick).toBe(tick + 1);
  });

  it('opens a 三選一 after the stone-steps encounter is cleared', () => {
    const sim = new Simulation({ seed: 4, allowDebug: true });
    sim.finishLoading();
    sim.startRun('module.moon-return');
    sim.skipIntro();
    sim.debugTeleport(pathAt(45));
    sim.step();
    talkKeeper(sim);
    sim.debugTeleport(pathAt(56));
    sim.step();
    sim.debugTeleport(pathAt(68));
    sim.step();
    const run = sim.state.run!;
    for (let i = 0; i < 10; i++) {
      for (const e of run.enemies) {
        if (e.id.startsWith('enc-a') && !e.dead) {
          e.hp = 0;
          e.dead = true;
        }
      }
      sim.step();
      if (run.moduleChoiceOpen) break;
    }
    expect(run.moduleChoiceOpen).toBe(true);
    expect(run.pendingModuleChoices).toHaveLength(3);
    expect(run.completedObjectives).toContain('clearStoneSteps');
  });
});
