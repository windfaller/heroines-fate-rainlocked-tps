import type { GamePhase } from '../domain/types.ts';

const ALLOWED: Record<GamePhase, GamePhase[]> = {
  loading: ['title', 'error'],
  title: ['loadout', 'loading'],
  loadout: ['intro', 'title'],
  intro: ['playing'],
  playing: ['paused', 'defeat', 'rescue', 'escort', 'result'],
  paused: ['playing', 'rescue', 'escort', 'title'],
  defeat: ['playing', 'escort', 'title', 'loadout'],
  rescue: ['paused', 'escort', 'defeat'],
  escort: ['paused', 'result', 'defeat'],
  result: ['title', 'loadout', 'intro'],
  error: ['loading', 'title'],
};

export function canTransition(from: GamePhase, to: GamePhase): boolean {
  return ALLOWED[from]?.includes(to) ?? false;
}
