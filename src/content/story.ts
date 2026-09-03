import type { ObjectiveId } from '../domain/types.ts';

export type SpeakerId = 'keeper' | 'rin' | 'hio' | 'kuzuha' | 'narrator';

export interface StoryLineDef {
  id: string;
  speaker: SpeakerId;
  name: string;
  text: string;
  portrait: string;
  blocking: boolean;
  ttlTicks: number;
}

export const TITLE_LOGLINE = '雨把山門鎖死。凜踏入殘界，要一刀一刀割開緋緒的束縛。';

export const SPEAKER_NAME: Record<SpeakerId, string> = {
  keeper: '澄夜',
  rin: '凜',
  hio: '緋緒',
  kuzuha: '？',
  narrator: '',
};

export const PORTRAIT: Record<SpeakerId, string> = {
  keeper: './runtime-assets/ui/keeper.png',
  rin: './runtime-assets/ui/rin-portrait.jpg',
  hio: './runtime-assets/ui/hio.png',
  kuzuha: '',
  narrator: '',
};

export const INTRO_LINES: StoryLineDef[] = [
  {
    id: 'story.intro.1',
    speaker: 'keeper',
    name: '澄夜',
    text: '雨聲會吞沒弓弦。燈還亮著的時候，往山門深處走。',
    portrait: PORTRAIT.keeper,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.intro.2',
    speaker: 'keeper',
    name: '澄夜',
    text: '封印台在最裡。三條束縛未斷，她便醒不來。',
    portrait: PORTRAIT.keeper,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.intro.3',
    speaker: 'rin',
    name: '凜',
    text: '……我來割開。',
    portrait: PORTRAIT.rin,
    blocking: true,
    ttlTicks: 0,
  },
];

export const KEEPER_SCENE: StoryLineDef[] = [
  {
    id: 'story.keeper.1',
    speaker: 'keeper',
    name: '澄夜',
    text: '你來了。雨把參道鎖成一條路，別指望回頭。',
    portrait: PORTRAIT.keeper,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.keeper.2',
    speaker: 'keeper',
    name: '澄夜',
    text: '石階有伏兵。過橋時看腳下。命燈若滅，山門便不再認人。',
    portrait: PORTRAIT.keeper,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.keeper.3',
    speaker: 'rin',
    name: '凜',
    text: '我知道。',
    portrait: PORTRAIT.rin,
    blocking: true,
    ttlTicks: 0,
  },
];

export const BINDING_LINES: StoryLineDef[] = [
  {
    id: 'story.binding.1',
    speaker: 'rin',
    name: '凜',
    text: '第一刀。金線顫了一下。',
    portrait: PORTRAIT.rin,
    blocking: false,
    ttlTicks: 210,
  },
  {
    id: 'story.binding.2',
    speaker: 'hio',
    name: '緋緒',
    text: '……唔。',
    portrait: './runtime-assets/ui/hio-bound.png',
    blocking: false,
    ttlTicks: 210,
  },
  {
    id: 'story.binding.3',
    speaker: 'narrator',
    name: '',
    text: '第三刀。雨聲忽然遠了。',
    portrait: '',
    blocking: false,
    ttlTicks: 150,
  },
];

export const HIO_WAKE_SCENE: StoryLineDef[] = [
  {
    id: 'story.hio.wake.1',
    speaker: 'hio',
    name: '緋緒',
    text: '……凜？我還在雨裡嗎。',
    portrait: PORTRAIT.hio,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.hio.wake.2',
    speaker: 'rin',
    name: '凜',
    text: '還在。我帶你出去。',
    portrait: PORTRAIT.rin,
    blocking: true,
    ttlTicks: 0,
  },
  {
    id: 'story.hio.wake.3',
    speaker: 'hio',
    name: '緋緒',
    text: '好。走慢一點，也沒有關係。',
    portrait: PORTRAIT.hio,
    blocking: true,
    ttlTicks: 0,
  },
];

export const OBJECTIVE_LINES: Partial<Record<ObjectiveId, StoryLineDef>> = {
  meetKeeper: {
    id: 'story.objective.meetKeeper',
    speaker: 'rin',
    name: '凜',
    text: '燈火在前。先問燈守。',
    portrait: PORTRAIT.rin,
    blocking: false,
    ttlTicks: 240,
  },
  clearStoneSteps: {
    id: 'story.objective.clearStoneSteps',
    speaker: 'keeper',
    name: '澄夜',
    text: '石階不會讓你空手通過。',
    portrait: PORTRAIT.keeper,
    blocking: false,
    ttlTicks: 240,
  },
  crossBridge: {
    id: 'story.objective.crossBridge',
    speaker: 'rin',
    name: '凜',
    text: '橋斷了。步子要穩。',
    portrait: PORTRAIT.rin,
    blocking: false,
    ttlTicks: 240,
  },
  cleansePool: {
    id: 'story.objective.cleansePool',
    speaker: 'keeper',
    name: '澄夜',
    text: '洗心池已被咒水浸過。別站在紫霧裡。',
    portrait: PORTRAIT.keeper,
    blocking: false,
    ttlTicks: 240,
  },
  defendLanterns: {
    id: 'story.objective.defendLanterns',
    speaker: 'keeper',
    name: '澄夜',
    text: '守住那些燈。它們認得路。',
    portrait: PORTRAIT.keeper,
    blocking: false,
    ttlTicks: 240,
  },
  defeatRainErodedWarrior: {
    id: 'story.objective.defeatRainErodedWarrior',
    speaker: 'rin',
    name: '凜',
    text: '雨蝕武者……站在門前。',
    portrait: PORTRAIT.rin,
    blocking: false,
    ttlTicks: 260,
  },
  cutBindings: {
    id: 'story.objective.cutBindings',
    speaker: 'rin',
    name: '凜',
    text: '靠近她。一條一條割開。',
    portrait: PORTRAIT.rin,
    blocking: false,
    ttlTicks: 240,
  },
  escortHioToKeeper: {
    id: 'story.objective.escortHioToKeeper',
    speaker: 'hio',
    name: '緋緒',
    text: '我跟得上。別走太遠。',
    portrait: PORTRAIT.hio,
    blocking: false,
    ttlTicks: 240,
  },
  missionComplete: {
    id: 'story.objective.missionComplete',
    speaker: 'keeper',
    name: '澄夜',
    text: '點主燈。讓山門記得你們還在。',
    portrait: PORTRAIT.keeper,
    blocking: false,
    ttlTicks: 240,
  },
};

export const RESULT_CODA = [
  '雨還未停，山門卻鬆了一線。',
  '緋緒的燈重新亮了。據點的夜，暫時肯認人。',
  '林影深處，有人低聲喚了一句——葛葉。像是預告，又像是欠條。',
];

export const SHRINE_PLAQUES: { s: number; title: string; body: string }[] = [
  { s: 22, title: '雨鎖山門', body: '雨不停，門不開。過此者，只許向前。' },
  { s: 48, title: '燈守箴', body: '燈在，人在。燈滅，山不認路。' },
  { s: 118, title: '洗心', body: '池本澄明。咒水入後，心不可洗，只可渡。' },
  { s: 202, title: '封門', body: '武者立此，為雨所蝕，為命所役。' },
];
