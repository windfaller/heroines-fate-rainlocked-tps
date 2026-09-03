import type { Vec3 } from '../domain/types.ts';

export interface LevelSection {
  id: string;
  name: string;
  s0: number;
  s1: number;
  function: string;
}

export interface SpawnWave {
  id: string;
  sectionId: string;
  triggerId: string;
  enemies: { kind: string; id: string; s: number; offsetX: number }[];
}

export interface TriggerVolume {
  id: string;
  pos: Vec3;
  radius: number;
}

export interface CheckpointDef {
  id: string;
  pos: Vec3;
}

export interface MissionLevel {
  id: string;
  version: number;
  title: string;
  theme: string;
  estimatedDuration: string;
  sections: LevelSection[];
  waves: SpawnWave[];
  triggers: TriggerVolume[];
  checkpoints: CheckpointDef[];
  interactables: { id: string; pos: Vec3; kind: string }[];
  rewards: string[];
  assetGroups: string[];
}
