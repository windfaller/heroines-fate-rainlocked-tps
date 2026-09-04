/** Oscillator / noise pads only. Does not pass the final audio gate. Placeholder gb.oscillator-sfx. */

type CueKind = 'tone' | 'noise' | 'pad';

interface CueSpec {
  kind: CueKind;
  freq: number;
  dur: number;
  vol: number;
  type?: OscillatorType;
  freq2?: number;
}

const CUES: Record<string, CueSpec> = {
  start: { kind: 'pad', freq: 196, dur: 0.55, vol: 0.06, type: 'sine', freq2: 247 },
  keeper: { kind: 'pad', freq: 220, dur: 0.42, vol: 0.05, type: 'sine', freq2: 330 },
  hit: { kind: 'tone', freq: 620, dur: 0.07, vol: 0.09, type: 'square' },
  shot: { kind: 'tone', freq: 880, dur: 0.05, vol: 0.07, type: 'triangle' },
  slash: { kind: 'tone', freq: 240, dur: 0.08, vol: 0.08, type: 'sawtooth' },
  hurt: { kind: 'tone', freq: 180, dur: 0.1, vol: 0.07, type: 'sawtooth' },
  'binding-cut': { kind: 'tone', freq: 740, dur: 0.16, vol: 0.07, type: 'triangle' },
  lantern: { kind: 'pad', freq: 392, dur: 0.28, vol: 0.05, type: 'sine', freq2: 588 },
  'lantern-hit': { kind: 'tone', freq: 160, dur: 0.09, vol: 0.06, type: 'square' },
  revive: { kind: 'pad', freq: 262, dur: 0.32, vol: 0.05, type: 'sine', freq2: 392 },
  rain: { kind: 'noise', freq: 0, dur: 1.8, vol: 0.035 },
};

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
    this.play('rain');
  }

  cue(id: string, freq = 440, dur = 0.08): void {
    if (CUES[id]) {
      this.play(id);
      return;
    }
    this.tone(freq, dur, 0.07, 'sine');
    void id;
  }

  play(id: string): void {
    if (this.muted || !this.ctx || !this.unlocked) return;
    const spec = CUES[id];
    if (!spec) {
      this.tone(440, 0.06, 0.05, 'sine');
      return;
    }
    if (spec.kind === 'noise') this.noise(spec.dur, spec.vol);
    else if (spec.kind === 'pad') this.pad(spec.freq, spec.freq2 ?? spec.freq * 1.5, spec.dur, spec.vol);
    else this.tone(spec.freq, spec.dur, spec.vol, spec.type ?? 'sine');
  }

  pause(): void {
    this.ctx?.suspend();
  }
  resume(): void {
    this.ctx?.resume();
  }

  private now(): number {
    return this.ctx?.currentTime ?? 0;
  }

  private dest(gain: GainNode): void {
    if (!this.ctx) return;
    gain.connect(this.ctx.destination);
  }

  private tone(freq: number, dur: number, vol: number, type: OscillatorType): void {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(this.master * vol, this.now());
    g.gain.exponentialRampToValueAtTime(0.0001, this.now() + dur);
    o.connect(g);
    this.dest(g);
    o.start();
    o.stop(this.now() + dur);
  }

  private pad(a: number, b: number, dur: number, vol: number): void {
    this.tone(a, dur, vol, 'sine');
    this.tone(b, dur * 0.9, vol * 0.7, 'sine');
  }

  private noise(dur: number, vol: number): void {
    if (!this.ctx) return;
    const n = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 900;
    const g = this.ctx.createGain();
    g.gain.value = this.master * vol;
    src.connect(f);
    f.connect(g);
    this.dest(g);
    src.start();
  }
}
