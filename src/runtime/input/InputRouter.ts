import { emptyInput, type Simulation } from '../../domain/simulation.ts';
import type { InputFrame } from '../../domain/types.ts';

const BINDINGS: Record<string, keyof InputFrame | 'move'> = {};

/** True when the event is Escape, whether the browser set `code`, `key`, or the short `Esc` label. */
export function isEscapeKey(e: { code?: string; key?: string }): boolean {
  return e.code === 'Escape' || e.key === 'Escape' || e.key === 'Esc';
}

export type PointerLockLostHandler = () => void;

export class InputRouter {
  private keys = new Set<string>();
  private lookX = 0;
  private lookY = 0;
  private pointerLocked = false;
  private uiOwns = false;
  sensitivity = 1;
  invertY = false;
  private onPointerLockLost: PointerLockLostHandler | null;

  constructor(private canvas: HTMLElement, onPointerLockLost?: PointerLockLostHandler) {
    this.onPointerLockLost = onPointerLockLost ?? null;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.clear);
    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('pointerlockchange', this.onPointerLockChange);
  }

  setUiOwns(v: boolean): void {
    if (v && !this.uiOwns) this.clear();
    this.uiOwns = v;
  }

  sample(): InputFrame {
    const f = emptyInput();
    const pause = this.escapeHeld();
    // Pause/cancel must remain reachable under overlays (paused menu, pointer-lock Esc).
    f.pause = pause;
    f.cancel = pause;
    if (this.uiOwns) return f;
    const up = this.keys.has('KeyW') || this.keys.has('ArrowUp');
    const dn = this.keys.has('KeyS') || this.keys.has('ArrowDown');
    const lf = this.keys.has('KeyA') || this.keys.has('ArrowLeft');
    const rt = this.keys.has('KeyD') || this.keys.has('ArrowRight');
    f.moveZ = (up ? 1 : 0) + (dn ? -1 : 0);
    f.moveX = (rt ? 1 : 0) + (lf ? -1 : 0);
    f.lookDeltaYaw = this.lookX * 0.0022 * this.sensitivity;
    f.lookDeltaPitch = this.lookY * 0.0022 * this.sensitivity * (this.invertY ? 1 : -1);
    this.lookX = 0;
    this.lookY = 0;
    f.primary = this.keys.has('KeyJ') || this.keys.has('Mouse0');
    f.secondary = this.keys.has('KeyL') || this.keys.has('Mouse2');
    f.dodge = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    f.ability1 = this.keys.has('KeyQ');
    f.ability2 = this.keys.has('KeyR');
    f.ultimate = this.keys.has('KeyF');
    f.interact = this.keys.has('KeyE');
    f.lockOn = this.keys.has('Tab');
    f.confirm = this.keys.has('Enter') || this.keys.has('Space');
    return f;
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.clear);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('pointerlockchange', this.onPointerLockChange);
  }

  private escapeHeld(): boolean {
    return this.keys.has('Escape') || this.keys.has('Esc');
  }

  private rememberEscape(e: KeyboardEvent, down: boolean): void {
    if (!isEscapeKey(e)) return;
    if (down) {
      this.keys.add('Escape');
      this.keys.add('Esc');
    } else {
      this.keys.delete('Escape');
      this.keys.delete('Esc');
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      if (!this.uiOwns) e.preventDefault();
    }
    if (e.code) this.keys.add(e.code);
    this.rememberEscape(e, true);
  };
  private onKeyUp = (e: KeyboardEvent) => {
    if (e.code) this.keys.delete(e.code);
    this.rememberEscape(e, false);
  };
  private onMouseDown = (e: MouseEvent) => {
    if (this.uiOwns) return;
    this.keys.add(`Mouse${e.button}`);
    if (!this.pointerLocked && e.button === 0) this.canvas.requestPointerLock();
  };
  private onMouseUp = (e: MouseEvent) => {
    this.keys.delete(`Mouse${e.button}`);
  };
  private onMouseMove = (e: MouseEvent) => {
    if (!this.pointerLocked) return;
    this.lookX += e.movementX;
    this.lookY += e.movementY;
  };
  private onPointerLockChange = () => {
    const locked = document.pointerLockElement === this.canvas;
    const lost = this.pointerLocked && !locked;
    this.pointerLocked = locked;
    if (lost) this.onPointerLockLost?.();
  };
  private clear = () => {
    this.keys.clear();
    this.lookX = 0;
    this.lookY = 0;
  };
}

void BINDINGS;
void (0 as unknown as Simulation);
