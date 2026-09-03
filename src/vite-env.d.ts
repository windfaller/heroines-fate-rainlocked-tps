/// <reference types="vite/client" />

interface Window {
  __GAME_DIAGNOSTICS__?: {
    snapshot: () => unknown;
    rendererInfo: () => unknown;
    advanceTime?: (ms: number) => void;
    setSeed?: (seed: number) => void;
    setDebugView?: (kind: string, enabled: boolean) => void;
  };
}
