export type GamePhase =
  | 'loading'
  | 'title'
  | 'loadout'
  | 'intro'
  | 'playing'
  | 'paused'
  | 'defeat'
  | 'rescue'
  | 'escort'
  | 'result'
  | 'error';

export type ObjectiveId =
  | 'enterShrine'
  | 'meetKeeper'
  | 'clearStoneSteps'
  | 'crossBridge'
  | 'cleansePool'
  | 'defendLanterns'
  | 'defeatRainErodedWarrior'
  | 'exposeBindingCore'
  | 'cutBindings'
  | 'hioRescued'
  | 'escortHioToKeeper'
  | 'missionComplete';

export const OBJECTIVE_CHAIN: ObjectiveId[] = [
  'enterShrine',
  'meetKeeper',
  'clearStoneSteps',
  'crossBridge',
  'cleansePool',
  'defendLanterns',
  'defeatRainErodedWarrior',
  'exposeBindingCore',
  'cutBindings',
  'hioRescued',
  'escortHioToKeeper',
  'missionComplete',
];

export type ActorKind =
  | 'player'
  | 'sword-soldier'
  | 'archer'
  | 'caster'
  | 'shadow-hound'
  | 'lantern-hunter'
  | 'boss'
  | 'hio'
  | 'keeper'
  | 'dummy';

export type AttackPhase = 'telegraph' | 'contact' | 'result' | 'recovery';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface AttackDef {
  id: string;
  telegraphTicks: number;
  contactTicks: number;
  resultTicks: number;
  recoveryTicks: number;
  shape: 'sphere' | 'cone' | 'ray' | 'box';
  range: number;
  radius: number;
  damage: number;
  guardDamage: number;
  poiseBreakTicks: number;
  iframeGrant?: number;
}

export interface AttackState {
  id: string;
  defId: string;
  phase: AttackPhase;
  elapsed: number;
  telegraphTicks: number;
  contactTicks: number;
  resultTicks: number;
  recoveryTicks: number;
  shape: AttackDef['shape'];
  range: number;
  radius: number;
  damage: number;
  guardDamage: number;
  poiseBreakTicks: number;
  hits: string[];
  ownerId: string;
}

export interface Combatant {
  id: string;
  kind: ActorKind;
  team: 'player' | 'enemy' | 'npc';
  pos: Vec3;
  yaw: number;
  hp: number;
  maxHp: number;
  guard: number;
  maxGuard: number;
  iFrames: number;
  damageCooldown: number;
  poiseBreakTimer: number;
  dead: boolean;
  attack: AttackState | null;
  stamina: number;
  maxStamina: number;
  radius: number;
  height: number;
  speed: number;
}

export interface Projectile {
  id: string;
  ownerId: string;
  team: 'player' | 'enemy';
  pos: Vec3;
  dir: Vec3;
  speed: number;
  damage: number;
  guardDamage: number;
  life: number;
  radius: number;
  hits: string[];
}

export interface Hazard {
  id: string;
  kind: 'puddle' | 'thunder' | 'corruption-wave';
  pos: Vec3;
  radius: number;
  damage: number;
  life: number;
  purified: boolean;
}

export interface LanternState {
  id: string;
  pos: Vec3;
  hp: number;
  maxHp: number;
  lit: boolean;
}

export interface RunStats {
  damageTaken: number;
  damageDealt: number;
  perfectDodges: number;
  comboMax: number;
  timeTicks: number;
  lanternsSaved: number;
}

export type HioState = 'bound' | 'rescued' | 'escorting' | 'safe' | 'down';

export interface RunState {
  seed: number;
  tick: number;
  missionId: 'rainbound-shrine';
  objective: ObjectiveId;
  completedObjectives: ObjectiveId[];
  player: Combatant;
  resolve: number;
  maxResolve: number;
  enemies: Combatant[];
  npcs: Combatant[];
  projectiles: Projectile[];
  hazards: Hazard[];
  lanterns: LanternState[];
  bindingsCut: number;
  hioState: HioState;
  hioHp: number;
  hioMaxHp: number;
  hioOutOfBoundsTicks: number;
  bossPhase: 0 | 1 | 2;
  bossTransitionDone: boolean;
  nodesDestroyed: number;
  nodes: { id: string; pos: Vec3; hp: number; destroyed: boolean }[];
  martialModule: string;
  inLevelModule: string | null;
  ownedModules: string[];
  pendingModuleChoices: string[];
  checkpointId: string;
  lastStablePos: Vec3;
  defeatCause: string | null;
  escortFailCause: string | null;
  rewardsCommitted: boolean;
  stats: RunStats;
  triggersFired: string[];
  encounterWaves: Record<string, number>;
  cameraYaw: number;
  cameraPitch: number;
  lockOnId: string | null;
  introTicks: number;
  ultimateLock: boolean;
  tutorialDummyAlive: boolean;
  casterPuddlesCleansed: boolean;
  summonedOnce: boolean;
  moduleChoiceOpen: boolean;
}

export interface Settings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  shake: number;
  sensitivity: number;
  invertY: boolean;
  reducedMotion: boolean;
}

export interface MissionRecord {
  bestRank: 'S' | 'A' | 'B' | 'C';
  bestTimeTicks: number;
  clears: number;
}

export interface MetaProgress {
  unlockedCharacters: string[];
  unlockedArchiveEntries: string[];
  seenStoryFlags: string[];
  unlockedModules: string[];
  clearedMissions: Record<string, MissionRecord>;
}

export interface GameState {
  schemaVersion: 1;
  phase: GamePhase;
  run: RunState | null;
  meta: MetaProgress;
  settings: Settings;
  loadStage: string;
  loadError: string | null;
  selectedModule: string;
}

export interface InputFrame {
  moveX: number;
  moveZ: number;
  lookDeltaYaw: number;
  lookDeltaPitch: number;
  primary: boolean;
  secondary: boolean;
  dodge: boolean;
  ability1: boolean;
  ability2: boolean;
  ultimate: boolean;
  interact: boolean;
  lockOn: boolean;
  pause: boolean;
  confirm: boolean;
  cancel: boolean;
}

export const TICK_HZ = 60;
export const TICK_DT = 1 / TICK_HZ;
export const PLAYER_HP = 100;
export const BOSS_HP = 800;
export const BOSS_PHASE_RATIO = 0.52;
