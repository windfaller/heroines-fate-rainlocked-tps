import './styles/main.css';
import { bootstrap, createBootSim } from './app/bootstrap.ts';
import { GameApp } from './app/GameApp.ts';

const host = document.getElementById('app');
if (!host) throw new Error('missing #app');

const sim = createBootSim();
const app = new GameApp(sim);
app.mount(host);

bootstrap(sim, { onStage: () => app.refreshUi() }).then((textures) => {
  app.applyRuntimeArt(textures);
  app.refreshUi();
  app.maybeQaPlay();
}).catch((err) => {
  host.textContent = `載入失敗：${err instanceof Error ? err.message : String(err)}`;
});
