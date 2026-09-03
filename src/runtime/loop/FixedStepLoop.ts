import { TICK_DT } from '../../domain/types.ts';

const MAX_FRAME_DELTA = 0.22;
const MAX_STEPS = 5;

export class FixedStepLoop {
  private acc = 0;
  private last = 0;
  private raf = 0;
  private running = false;
  constructor(
    private simulate: (dt: number) => void,
    private render: (alpha: number, now: number) => void,
  ) {}

  start(): void {
    this.running = true;
    this.last = performance.now();
    const tick = (now: number) => {
      if (!this.running) return;
      let dt = (now - this.last) / 1000;
      this.last = now;
      if (dt > MAX_FRAME_DELTA) dt = MAX_FRAME_DELTA;
      this.acc += dt;
      let steps = 0;
      while (this.acc >= TICK_DT && steps < MAX_STEPS) {
        this.simulate(TICK_DT);
        this.acc -= TICK_DT;
        steps += 1;
      }
      if (steps === MAX_STEPS) this.acc = 0;
      this.render(this.acc / TICK_DT, now);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  freezeClock(): void {
    this.last = performance.now();
    this.acc = 0;
  }
}
