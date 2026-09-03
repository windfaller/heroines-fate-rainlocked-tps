/** Oscillator wiring only. Does not pass the final audio gate. Placeholder gb.oscillator-sfx. */
export class AudioDirector {
  private ctx: AudioContext | null = null;
  private unlocked = false;
  muted = false;
  master = 0.4;
  status = 'silent-until-gesture';

  unlock(): void {
    if (this.unlocked) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) {
      this.status = 'unavailable';
      return;
    }
    this.ctx = new AC();
    this.unlocked = true;
    this.status = 'oscillator-placeholder';
  }

  cue(id: string, freq = 440, dur = 0.08): void {
    if (this.muted || !this.ctx || !this.unlocked) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.value = freq;
    g.gain.value = this.master * 0.07;
    o.connect(g);
    g.connect(this.ctx.destination);
    o.start();
    o.stop(this.ctx.currentTime + dur);
    void id;
  }

  pause(): void {
    this.ctx?.suspend();
  }
  resume(): void {
    this.ctx?.resume();
  }
}
