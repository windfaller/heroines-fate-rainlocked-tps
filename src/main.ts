import './styles/main.css';
import { bootstrap, createBootSim } from './app/bootstrap.ts';
import { GameApp } from './app/GameApp.ts';

const host = document.getElementById('app');
if (!host) throw new Error('missing #app');

const splash = document.getElementById('boot-splash');
const sim = createBootSim();
const app = new GameApp(sim);
app.mount(host);

let lastUi = 0;
bootstrap(sim, {
  onStage: (_stage, done, total) => {
    const now = performance.now();
    if (now - lastUi < 80 && done !== total) return;
    lastUi = now;
    app.refreshUi();
  },
}).then((textures) => {
  app.applyRuntimeArt(textures);
  app.refreshUi();
  if (splash) {
    splash.classList.add('gone');
    window.setTimeout(() => splash.remove(), 400);
  }
  app.maybeQaPlay();
}).catch((err) => {
  if (splash) splash.remove();
  host.textContent = `載入失敗：${err instanceof Error ? err.message : String(err)}`;
});
