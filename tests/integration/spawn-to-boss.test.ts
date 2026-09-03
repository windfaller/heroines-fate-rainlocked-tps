import { describe, expect, it } from 'vitest';
import { Simulation } from '../../src/domain/simulation.ts';
import { pathAt } from '../../src/levels/rainboundShrine.ts';

function killNonBoss(sim: Simulation): void {
  const run = sim.state.run!;
  for (const e of run.enemies) {
    if (e.kind !== 'boss' && !e.dead) {
      e.hp = 0;
      e.dead = true;
    }
  }
}

function flushChoice(sim: Simulation): void {
  const run = sim.state.run;
  if (run?.moduleChoiceOpen && run.pendingModuleChoices[0]) {
    sim.pickInLevelModule(run.pendingModuleChoices[0]);
  }
}

function visit(sim: Simulation, s: number): void {
  flushChoice(sim);
  sim.debugTeleport(pathAt(s));
  sim.step();
  for (let i = 0; i < 8; i++) {
    killNonBoss(sim);
    sim.step();
    flushChoice(sim);
  }
}

describe('integration spawn to boss', () => {
  it('seeded run reaches boss objective', () => {
    const sim = new Simulation({ seed: 20260903, allowDebug: true });
    sim.finishLoading();
    sim.startRun('module.moon-return');
    sim.skipIntro();
    visit(sim, 24);
    visit(sim, 45);
    visit(sim, 56);
    visit(sim, 68);
    visit(sim, 84);
    visit(sim, 108);
    visit(sim, 120);
    visit(sim, 136);
    visit(sim, 168);
    visit(sim, 188);
    const snap = sim.snapshot();
    expect(snap.completedObjectives).toContain('defendLanterns');
    expect(snap.objective).toBe('defeatRainErodedWarrior');
    expect(sim.state.run!.enemies.some((e) => e.kind === 'boss' && !e.dead)).toBe(true);
  });
});
