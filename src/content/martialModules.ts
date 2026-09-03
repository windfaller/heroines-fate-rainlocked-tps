export type ModuleCategory = 'technique' | 'mind' | 'fate';

export interface MartialModule {
  id: string;
  name: string;
  category: ModuleCategory;
  starter: boolean;
  description: string;
}

export const MODULES: MartialModule[] = [
  { id: 'module.moon-return', name: '月返', category: 'technique', starter: true, description: '月刃回收強化下一擊近戰。' },
  { id: 'module.pin-rain', name: '雨釘', category: 'technique', starter: false, description: 'Q 控場時間延長。' },
  { id: 'module.arc-slash', name: '月弧', category: 'technique', starter: false, description: '近戰距離略增。' },
  { id: 'module.focus', name: '凝神', category: 'mind', starter: true, description: '精準射擊削韌提高。' },
  { id: 'module.iron-breath', name: '鐵息', category: 'mind', starter: false, description: '最大韌性提高。' },
  { id: 'module.mend-light', name: '回光', category: 'mind', starter: false, description: '互動時回復少量生命。' },
  { id: 'module.lantern-guard', name: '燈護', category: 'fate', starter: true, description: '命燈耐久與救援護盾增強。' },
  { id: 'module.rain-ward', name: '雨禦', category: 'fate', starter: false, description: '地面危害減傷。' },
  { id: 'module.fate-bond', name: '命契', category: 'fate', starter: false, description: '緋緒最大生命提高。' },
];

export const STARTER_MODULES = MODULES.filter((m) => m.starter);

export function moduleMods(id: string) {
  return {
    meleeBonus: id === 'module.moon-return' ? 4 : 0,
    meleeRange: id === 'module.arc-slash' ? 0.4 : 0,
    guardShotMul: id === 'module.focus' ? 1.4 : 1,
    maxGuardBonus: id === 'module.iron-breath' ? 15 : 0,
    interactHeal: id === 'module.mend-light' ? 8 : 0,
    lanternHpMul: id === 'module.lantern-guard' ? 1.5 : 1,
    hazardMul: id === 'module.rain-ward' ? 0.7 : 1,
    hioHpBonus: id === 'module.fate-bond' ? 25 : 0,
  };
}

export type ModuleMods = ReturnType<typeof moduleMods>;

export function combineModuleMods(ids: string[]): ModuleMods {
  const list = ids.map(moduleMods);
  return {
    meleeBonus: list.reduce((a, m) => a + m.meleeBonus, 0),
    meleeRange: list.reduce((a, m) => a + m.meleeRange, 0),
    guardShotMul: list.reduce((a, m) => a * m.guardShotMul, 1),
    maxGuardBonus: list.reduce((a, m) => a + m.maxGuardBonus, 0),
    interactHeal: list.reduce((a, m) => a + m.interactHeal, 0),
    lanternHpMul: list.reduce((a, m) => Math.max(a, m.lanternHpMul), 1),
    hazardMul: list.reduce((a, m) => a * m.hazardMul, 1),
    hioHpBonus: list.reduce((a, m) => a + m.hioHpBonus, 0),
  };
}

/** Deterministic 三選一: leftover starters first, then remaining catalogue. */
export function rollModuleChoices(owned: string[], count = 3): string[] {
  const have = new Set(owned);
  const starters = STARTER_MODULES.map((m) => m.id).filter((id) => !have.has(id));
  const rest = MODULES.map((m) => m.id).filter((id) => !have.has(id) && !starters.includes(id));
  return [...starters, ...rest].slice(0, count);
}
