import './styles/main.css';
import { bootstrap, createBootSim } from './app/bootstrap.ts';
import { GameApp } from './app/GameApp.ts';

const host = document.getElementById('app');
if (!host) throw new Error('missing #app');

const splash = document.getElementById('boot-splash');
const splashHint = splash?.querySelector('.hint');
const sim = createBootSim();
const app = new GameApp(sim);
app.mount(host);

function setSplash(text: string, pct?: number): void {
  if (splashHint) splashHint.textContent = text;
  const bar = splash?.querySelector('.bar > i') as HTMLElement | null;
  if (bar && typeof pct === 'number') {
    bar.style.width = `${Math.max(8, Math.round(pct * 100))}%`;
    bar.style.animation = 'none';
  }
}

let lastUi = 0;
bootstrap(sim, {
  onStage: (stage, done, total) => {
    const pct = total && total > 0 && typeof done === 'number' ? done / total : sim.state.loadProgress;
    if (stage === 'boot-parallel') setSplash('喚醒雨幕與物理…', 0.05);
    else if (stage.startsWith('runtime')) setSplash(`描繪霧林與立繪… ${Math.round(pct * 100)}％`, pct);
    else if (stage === 'ready') setSplash('雨鎖山門已開啟', 1);
    const now = performance.now();
    if (now - lastUi < 120 && done !== total) return;
    lastUi = now;
    app.refreshUi();
  },
}).then(({ textures, assets }) => {
  app.applyRuntimeArt(textures);
  app.refreshUi();
  if (splash) {
    splash.classList.add('gone');
    window.setTimeout(() => splash.remove(), 350);
  }
  app.maybeQaPlay();
  // Nice-to-have art after the title is interactive.
  window.setTimeout(() => {
    assets.loadDeferred().then(() => {
      app.applyRuntimeArt(assets.textures);
    }).catch(() => { /* ignore deferred failures */ });
  }, 400);
}).catch((err) => {
  if (splash) splash.remove();
  host.textContent = `載入失敗：${err instanceof Error ? err.message : String(err)}`;
});
