import type { Simulation } from '../domain/simulation.ts';
import { MODULES, STARTER_MODULES } from '../content/martialModules.ts';
import { INTRO_LINES, RESULT_CODA, TITLE_LOGLINE } from '../content/story.ts';
import { computeRank } from '../domain/progression/rewards.ts';
import { OBJECTIVE_CHAIN } from '../domain/types.ts';
import { HIO_REVIVE_TICKS } from '../domain/mission/escort.ts';
import { isStoryBlocking } from '../domain/mission/story.ts';
import { KEEPER_POS } from '../levels/rainboundShrine.ts';
import { distXZ } from '../domain/combat/damage.ts';

const OBJ_LABEL: Record<string, string> = {
  enterShrine: '進入雨鎖山門',
  meetKeeper: '會見燈守澄夜',
  clearStoneSteps: '清除石階伏擊',
  crossBridge: '跨越斷橋',
  cleansePool: '淨化洗心池',
  defendLanterns: '守住命燈',
  defeatRainErodedWarrior: '擊敗雨蝕武者',
  exposeBindingCore: '顯露封印核心',
  cutBindings: '斬斷三條束縛',
  hioRescued: '解救緋緒',
  escortHioToKeeper: '護送緋緒返回據點',
  missionComplete: '點亮主燈，完成任務',
};

function stageZh(stage: string): string {
  if (stage === 'boot-ui' || stage === 'boot-parallel') return '喚醒雨幕與物理…';
  if (stage === 'physics-wasm') return '載入戰鬥物理…';
  if (stage === 'runtime-art') return '描繪霧林與立繪…';
  if (stage === 'ready') return '雨鎖山門已開啟';
  if (stage.startsWith('env.') || stage.startsWith('char.') || stage.startsWith('fx.')) return '描繪霧林與立繪…';
  return stage;
}

function actionHint(run: NonNullable<Simulation['state']['run']>): string {
  if (run.moduleChoiceOpen) return '戰鬥暫停　點卡片或按 1／2／3 選擇武學後才會繼續';
  if (isStoryBlocking(run)) return '點擊或按 E 繼續';
  if (run.hioState === 'down') return `靠近緋緒，按 E 扶起　${Math.max(0, Math.ceil((HIO_REVIVE_TICKS - run.hioDownTicks) / 60))} 秒`;
  switch (run.objective) {
    case 'enterShrine': return '沿參道向前走';
    case 'meetKeeper': return '走近澄夜，按 E 對話';
    case 'clearStoneSteps': return '先破近戰，再找高處弓手';
    case 'crossBridge': return '越過斷橋，影犬會從缺口撲來';
    case 'cleansePool': return '先打斷咒術師，避開紫霧';
    case 'defendLanterns': return '燈獵者會去砸燈　守你看得見的那盞';
    case 'defeatRainErodedWarrior': return '看清預兆再開刃';
    case 'exposeBindingCore':
    case 'cutBindings': return `靠近緋緒，按 E 斬斷束縛　${run.bindingsCut}/3`;
    case 'hioRescued': return '帶著緋緒沿參道撤回入口';
    case 'escortHioToKeeper': return '護送緋緒回到燈守據點　她倒下時按 E 扶起';
    case 'missionComplete': return '在入口按 E 點亮主燈';
    default: return '';
  }
}

export class GameUI {
  root: HTMLElement;
  juice: HTMLElement;
  private bootBuilt = false;
  constructor(
    private host: HTMLElement,
    private sim: Simulation,
    private onStart: () => void,
    private onPause: () => void = () => { this.sim.pause(); this.render(); },
  ) {
    this.root = document.createElement('div');
    this.root.id = 'ui-root';
    this.juice = document.createElement('div');
    this.juice.id = 'juice-layer';
    host.appendChild(this.root);
    host.appendChild(this.juice);
    this.render();
  }

  render(): void {
    const s = this.sim.state;
    const run = s.run;
    this.root.innerHTML = '';
    if (s.phase === 'loading' || s.phase === 'error') {
      const pct = Math.max(0, Math.min(1, s.loadProgress ?? 0));
      const stageLabel = stageZh(s.loadStage);
      if (s.phase === 'loading' && this.bootBuilt) {
        const stageEl = this.root.querySelector('.boot-stage');
        const pctEl = this.root.querySelector('.boot-pct');
        const fill = this.root.querySelector('.boot-bar > i') as HTMLElement | null;
        if (stageEl) stageEl.textContent = stageLabel;
        if (pctEl) pctEl.textContent = `${Math.round(pct * 100)}％`;
        if (fill) fill.style.width = `${Math.max(6, pct * 100)}%`;
        return;
      }
      this.bootBuilt = s.phase === 'loading';
      const wrap = this.overlay(
        s.phase === 'error' ? '載入失敗' : '群芳天命錄：雨鎖殘界',
        s.phase === 'error'
          ? [stageLabel, s.loadError ? `資產：${s.loadError}` : '', '請重試。']
          : ['雨鎖山門　·　操作凜　·　解救緋緒'],
        s.phase === 'error' ? [['重試', () => location.reload()]] : [],
        'boot-home',
      );
      wrap.style.backgroundImage = 'linear-gradient(180deg, rgba(6,12,16,0.4), rgba(6,12,16,0.88)), url(./runtime-assets/env/forest-far.jpg)';
      wrap.style.backgroundSize = 'cover';
      wrap.style.backgroundPosition = 'center 40%';
      if (s.phase === 'loading') {
        const stage = document.createElement('p');
        stage.className = 'boot-stage';
        stage.textContent = stageLabel;
        const pctP = document.createElement('p');
        pctP.className = 'boot-pct';
        pctP.textContent = `${Math.round(pct * 100)}％`;
        const bar = document.createElement('div');
        bar.className = 'boot-bar';
        bar.innerHTML = `<i style="width:${Math.max(6, pct * 100)}%"></i>`;
        wrap.appendChild(stage);
        wrap.appendChild(pctP);
        wrap.appendChild(bar);
      }
      return;
    }
    this.bootBuilt = false;
    if (s.phase === 'title') {
      const wrap = this.overlay('群芳天命錄：雨鎖殘界', [
        TITLE_LOGLINE,
        '雨鎖山門　·　操作凜　·　解救緋緒',
        'WASD 移動　滑鼠視角　J／左鍵 近戰　L／右鍵 自動瞄準射擊',
        'Shift 閃避　Q／R／F 招式　E 互動　Tab 鎖定　Esc 暫停',
      ], [['開始', () => { this.sim.setPhase('loadout'); this.render(); }]], 'title-home');
      const art = document.createElement('div');
      art.className = 'title-art';
      art.innerHTML = '<img src="./runtime-assets/ui/rin-portrait.jpg" alt="凜" /><img src="./runtime-assets/ui/keeper.png" alt="澄夜" /><img src="./runtime-assets/ui/hio.png" alt="緋緒" />';
      wrap.insertBefore(art, wrap.children[1]);
      const sheet = document.createElement('img');
      sheet.src = './runtime-assets/ui/rin-portrait.jpg';
      sheet.alt = '';
      sheet.className = 'title-sheet';
      wrap.appendChild(sheet);
      wrap.style.backgroundImage = 'linear-gradient(180deg, rgba(6,12,16,0.38), rgba(6,12,16,0.82)), url(./runtime-assets/env/forest-far.jpg)';
      wrap.style.backgroundSize = 'cover';
      wrap.style.backgroundPosition = 'center 40%';
      return;
    }
    if (s.phase === 'loadout') {
      const wrap = this.overlay('編成　凜', ['選擇起始武學模組：月返／凝神／燈護'], []);
      const portrait = document.createElement('img');
      portrait.src = './runtime-assets/ui/rin-portrait.jpg';
      portrait.alt = '凜';
      portrait.className = 'loadout-portrait';
      wrap.insertBefore(portrait, wrap.children[1]);
      const row = document.createElement('div');
      row.className = 'modules';
      for (const m of STARTER_MODULES) {
        const c = document.createElement('button');
        c.className = 'card' + (s.selectedModule === m.id ? ' selected' : '');
        c.innerHTML = `<strong>${m.name}</strong><span class="card-effect">${m.effect}</span><em>${m.description}</em>`;
        c.onclick = () => { this.sim.state.selectedModule = m.id; this.render(); };
        row.appendChild(c);
      }
      wrap.appendChild(row);
      const go = document.createElement('button');
      go.textContent = '進入雨鎖山門';
      go.onclick = () => this.onStart();
      wrap.appendChild(go);
      return;
    }
    if (s.phase === 'intro' && run) {
      this.introScene(run);
      return;
    }
    if (s.phase === 'paused') {
      this.overlay('暫停', ['遊戲時鐘與物理已凍結', 'Esc 或 繼續 恢復'], [
        ['繼續', () => { this.sim.resume(); this.render(); }],
        ['回標題', () => { this.sim.setPhase('title'); this.sim.state.run = null; this.render(); }],
      ]);
      return;
    }
    if (s.phase === 'defeat') {
      const cause = run?.defeatCause ?? run?.escortFailCause ?? '不明';
      const causeText = cause === 'hio-down'
        ? '緋緒倒下，未能及時扶起'
        : cause === 'escort-bounds'
          ? '護送距離過遠，雨把路吞了'
          : cause === 'player-hp' ? '凜力竭' : cause;
      this.overlay('戰敗', [
        causeText,
        `傷害承受：${run?.stats.damageTaken ?? 0}`,
      ], [
        ['從檢查點重試', () => { this.sim.retryCheckpoint(); this.render(); }],
        ['整關重開', () => { this.sim.restartMission(); this.render(); }],
        ['回標題', () => { this.sim.setPhase('title'); this.sim.state.run = null; this.render(); }],
      ]);
      return;
    }
    if (s.phase === 'result' && run) {
      const rank = computeRank(run);
      this.overlay('雨停一線', [
        ...RESULT_CODA,
        `評級 ${rank}　·　${(run.stats.timeTicks / 60).toFixed(0)} 秒　·　命燈 ${run.stats.lanternsSaved}/3　·　緋緒 HP ${run.hioHp}`,
        run.rewardsCommitted ? '已寫入解鎖：緋緒檔案、葛葉預告、新武學' : '',
      ], [
        ['再戰', () => { this.sim.restartMission(); this.render(); }],
        ['回標題', () => { this.sim.setPhase('title'); this.sim.state.run = null; this.render(); }],
      ], 'result-coda');
      return;
    }
    if (run && (s.phase === 'playing' || s.phase === 'rescue' || s.phase === 'escort')) {
      this.hud(run);
      this.storyOverlay(run);
    }
  }

  syncFloaters(items: { id: string; x: number; y: number; text: string; kind: string; k: number }[]): void {
    this.juice.innerHTML = items.map((f) => (
      `<span class="floater floater-${f.kind}" style="left:${f.x}px;top:${f.y - (1 - f.k) * 36}px;opacity:${Math.min(1, f.k * 1.4)}">${f.text}</span>`
    )).join('');
  }

  private introScene(run: NonNullable<Simulation['state']['run']>): void {
    const line = INTRO_LINES[run.story.introLineIndex] ?? INTRO_LINES[INTRO_LINES.length - 1]!;
    const wrap = document.createElement('div');
    wrap.className = 'overlay intro-scene';
    wrap.appendChild(this.dialogueCard(line.name, line.text, line.portrait, '點擊或按 E 繼續', () => {
      this.sim.advanceIntro();
      this.render();
    }));
    const skip = document.createElement('button');
    skip.textContent = '略過';
    skip.className = 'skip-btn';
    skip.onclick = (ev) => {
      ev.stopPropagation();
      this.sim.skipIntro();
      this.render();
    };
    wrap.appendChild(skip);
    this.root.appendChild(wrap);
  }

  private storyOverlay(run: NonNullable<Simulation['state']['run']>): void {
    const line = run.story.active;
    if (!line) return;
    if (line.blocking) {
      const dim = document.createElement('div');
      dim.className = 'overlay scene-dim';
      dim.appendChild(this.dialogueCard(line.name, line.text, line.portrait, '點擊或按 E 繼續', () => {
        this.sim.advanceStory();
        this.render();
      }));
      dim.addEventListener('click', (ev) => {
        if (ev.target !== dim) return;
        this.sim.advanceStory();
        this.render();
      });
      const skip = document.createElement('button');
      skip.textContent = '略過';
      skip.className = 'skip-btn';
      skip.onclick = (ev) => {
        ev.stopPropagation();
        this.sim.skipStory();
        this.render();
      };
      dim.appendChild(skip);
      this.root.appendChild(dim);
      return;
    }
    const box = document.createElement('div');
    box.className = 'ink-line';
    box.innerHTML = `${line.portrait ? `<img src="${line.portrait}" alt="${line.name}" />` : ''}<div><div class="speaker">${line.name}</div><p>${line.text}</p></div>`;
    this.root.appendChild(box);
  }

  private dialogueCard(name: string, text: string, portrait: string, hint: string, onAdvance: () => void): HTMLElement {
    const card = document.createElement('div');
    card.className = 'dialogue-card';
    card.innerHTML = `${portrait ? `<img src="${portrait}" alt="${name}" />` : ''}<div class="dialogue-body"><div class="speaker">${name}</div><p>${text}</p><div class="hint">${hint}</div></div>`;
    card.onclick = () => onAdvance();
    return card;
  }

  private overlay(title: string, lines: string[], actions: [string, () => void][], extraClass = ''): HTMLElement {
    const el = document.createElement('div');
    el.className = extraClass ? `overlay ${extraClass}` : 'overlay';
    el.innerHTML = `<h1>${title}</h1>` + lines.map((l) => `<p>${l}</p>`).join('');
    for (const [label, fn] of actions) {
      const b = document.createElement('button');
      b.textContent = label;
      b.onclick = fn;
      el.appendChild(b);
    }
    this.root.appendChild(el);
    return el;
  }

  private hud(run: NonNullable<Simulation['state']['run']>): void {
    const hud = document.createElement('div');
    hud.className = 'hud';
    const hp = Math.max(0, run.player.hp / run.player.maxHp * 100);
    const gd = Math.max(0, run.player.guard / run.player.maxGuard * 100);
    const rs = Math.max(0, run.resolve / run.maxResolve * 100);
    const boss = run.enemies.find((e) => e.kind === 'boss' && !e.dead);
    const down = run.hioState === 'down';
    const party = run.hioState === 'bound'
      ? `<div class="hud-party"><img src="./runtime-assets/ui/hio-bound.png" alt="緋緒" /><span>緋緒　封印中　${run.bindingsCut}/3</span></div>`
      : down
        ? `<div class="hud-party down"><img src="./runtime-assets/ui/hio.png" alt="緋緒" /><span>倒下　按 E 扶起　${Math.max(0, Math.ceil((HIO_REVIVE_TICKS - run.hioDownTicks) / 60))}s</span></div>`
        : run.hioState === 'escorting' || run.hioState === 'rescued'
          ? `<div class="hud-party"><img src="./runtime-assets/ui/hio.png" alt="緋緒" /><span>護送　HP ${run.hioHp}</span></div>`
          : '';
    const lanterns = run.objective === 'defendLanterns'
      ? `<div class="hud-lanterns">${run.lanterns.map((l) => {
          const pct = Math.max(0, l.hp / l.maxHp * 100);
          return `<div class="lamp ${l.lit && l.hp > 0 ? 'lit' : 'dead'}"><span>命燈</span><div class="bar"><span style="width:${pct}%"></span></div></div>`;
        }).join('')}</div>`
      : '';
    const nearKeeper = run.objective === 'meetKeeper' && distXZ(run.player.pos, KEEPER_POS) < 4.5;
    hud.innerHTML = `
      ${boss ? `<div class="hud-boss"><div class="boss-name">雨蝕武者　階段 ${run.bossPhase}</div><div class="bar bossbar"><span style="width:${boss.hp / boss.maxHp * 100}%"></span></div></div>` : ''}
      <div class="hud-obj">
        <div class="obj-kicker">當前目標</div>
        <div class="objective">${OBJ_LABEL[run.objective] ?? run.objective}${run.objective === 'cutBindings' ? `　${run.bindingsCut}/3` : ''}</div>
        <div class="action-toast">${nearKeeper ? '按 E 與澄夜對話' : actionHint(run)}</div>
      </div>
      <div class="hud-pause"><button type="button" class="pause-btn">暫停</button></div>
      <div class="hud-player">
        <img class="hud-face" src="./runtime-assets/ui/rin-portrait.jpg" alt="凜" />
        <div class="hud-bars">
          <div class="hud-name">凜</div>
          <div class="bar-row"><span>HP</span><div class="bar"><span style="width:${hp}%"></span></div><b>${Math.ceil(run.player.hp)}</b></div>
          <div class="bar-row"><span>韌性</span><div class="bar guard"><span style="width:${gd}%"></span></div><b>${Math.ceil(run.player.guard)}</b></div>
          <div class="bar-row"><span>決意</span><div class="bar resolve"><span style="width:${rs}%"></span></div><b>${Math.ceil(run.resolve)}</b></div>
        </div>
      </div>
      ${party}
      ${lanterns}
      <div class="hud-dock">
        <span><k>J</k>近戰</span><span><k>L</k>自動瞄準</span><span><k>⇧</k>閃避</span>
        <span><k>Q</k>控場</span><span><k>R</k>轉位</span><span><k>F</k>奧義</span><span><k>E</k>互動</span>
      </div>
      <div class="debug">${import.meta.env.DEV ? `tick ${run.tick}  obj ${run.objective}  phase ${this.sim.state.phase}` : ''}</div>
    `;
    this.root.appendChild(hud);
    const pauseBtn = hud.querySelector('.pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.onPause();
      });
    }
    if (run.moduleChoiceOpen) this.modulePicker(run);
    void OBJECTIVE_CHAIN;
  }

  private modulePicker(run: NonNullable<Simulation['state']['run']>): void {
    const el = document.createElement('div');
    el.className = 'overlay picker';
    el.innerHTML = '<h1>三選一　武學</h1><p>擇一模組。戰鬥已暫停。按 1／2／3 或點選卡片。</p>';
    const row = document.createElement('div');
    row.className = 'modules';
    run.pendingModuleChoices.forEach((id, i) => {
      const m = MODULES.find((x) => x.id === id);
      if (!m) return;
      const c = document.createElement('button');
      c.className = 'card';
      c.innerHTML = `<strong>${i + 1}　${m.name}</strong><span class="card-effect">${m.effect}</span><em>${m.description}</em>`;
      c.onclick = () => {
        this.sim.pickInLevelModule(m.id);
        this.render();
      };
      row.appendChild(c);
    });
    el.appendChild(row);
    this.root.appendChild(el);
  }
}
