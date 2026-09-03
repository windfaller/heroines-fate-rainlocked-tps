# Phase B QA log

Date: 2026-09-03 02:14 UTC (10:14 Taipei UTC+8)
Agent: Grok Bot executor on Linux box
Repo path: /workspace/heroines-fate-rainlocked-tps
Branch/SHA: not a git repo
Dirty: n/a (new workspace)
App base: ./
Asset base: /runtime-assets/
Local served URL: http://127.0.0.1:4173/
Deployed route: not deployed (BLOCKED)
Browser: NOT TESTED (no interactive play session)
Device: Linux box (kernel 6.12), Node v20.19.2
Renderer: WebGL2 intended; Rapier WASM chunk in production bundle
Seed used in tests: 20260903 / 1 / 2 / 3 / 11 / 12

## Commands

| Command | Exit | Result |
| --- | ---: | --- |
| ./node_modules/.bin/vitest run | 0 | 13 files, 18 tests passed, 0 failed. Duration ~1.01s |
| ./node_modules/.bin/tsc --noEmit | 0 | clean |
| ./node_modules/.bin/vite build | 0 | dist/ produced in 2.34s |
| vite preview :4173 | running | HTTP 200 text/html |

Package install: the environment rejected the package-manager CLI. Top-level and transitive packages were fetched as registry tarballs and extracted into node_modules. Exact versions: docs/installed-versions.json and package.json.

Top-level pins:
- three 0.185.1
- @dimforge/rapier3d-compat 0.14.0
- typescript 5.8.3
- vite 6.3.5
- vitest 3.2.4
- ajv 8.17.1
- @types/three 0.175.0

## Tests (18 passed)

Unit: damage, i-frames, poise break, win/lose, rescue 3 bindings, escort fail/retry, rewards idempotent, save v0 migrate + corrupt JSON.
Schema: asset-manifest validates; rainbound 11 sections unique IDs.
Integration: spawn→boss, boss phase 52%→rescue cuts, escort→result no duplicate rewards.

Playwright: not added. Browser smoke: NOT TESTED.

## Production build

dist/assets/index-*.js ~572 kB, rapier.es-*.js ~2.0 MB.
window.__GAME_DIAGNOSTICS__ snapshot/rendererInfo remain. Mutating helpers are gated with import.meta.env.DEV when installing the window API. Simulation.debug* methods still exist on the class for Vitest.

## Play

Local preview http://127.0.0.1:4173/ returns 200. Full loop in a real browser: NOT TESTED.

## Assembled-box playability pass (2026-09-03 02:26 UTC / 10:26 Taipei)

vitest 24/24 (was 18). tsc clean. vite build ok. Preview http://127.0.0.1:4173/ reused.

Screenshots (headless Chrome SwiftShader, not a human GPU playtest):
- docs/qa/title-1440x900.png
- docs/qa/play-1440x900.png
- docs/qa/title-844x390.png
- docs/qa/play-844x390.png

Visual: FAILED. Assembled boxes remain graybox.
`?qa=play` skips to playing for stills only.


## Esc pause fix (2026-09-03 02:33 UTC / 10:33 Taipei)

Headed playtest at http://127.0.0.1:4173/ previously **FAILED**: Esc produced no 暫停 overlay, simulation kept running, enemy kept dealing damage. Real Esc and synthetic `KeyboardEvent` both failed.

Causes (verified in code, now fixed):
1. Pointer lock — browser consumes Esc to exit lock, so Escape often never stayed in `InputRouter.keys`. `pointerlockchange` now calls `sim.pause()` when lock is lost during playing/rescue/escort.
2. `InputRouter` stored `e.code` only; `keys.has('Escape')` missed events with only `e.key === 'Escape'` / `'Esc'`. Both are recorded.
3. `GameApp` only `sim.step`ed playing/rescue/escort/intro, then `else if (lastInput.pause && phase==='paused') resume` — a held Escape immediately unpaused. Loop now steps while paused; resume is **rising-edge only** (`input.pause && !prev.pause`). `pause()` latches `prev.pause` so pointer-lock Esc cannot bounce.
4. HUD rendered every 6 frames — `ui.render()` is forced immediately on enter/leave paused.
5. HUD **暫停** button added (reachable without Esc). Overlay **繼續** / Esc rising-edge resume.
6. While paused, `Simulation.step` returns before clock/physics/combat; player HP, tick, and enemy attack elapsed stay frozen.

### Test evidence (this pass)

| Command | Exit | Result |
| --- | ---: | --- |
| ./node_modules/.bin/tsc --noEmit | 0 | clean |
| ./node_modules/.bin/vitest run | 0 | 18 files, **29 tests passed**, 0 failed. Duration ~1.27s |
| ./node_modules/.bin/vite build | 0 | dist/ in 2.06s (`index-CVIHMncK.js` ~594 kB) |
| vite preview :4173 | reused | HTTP 200 text/html, serves new hashed bundle |

New tests:
- `tests/unit/pause.test.ts` (4): start run, skip intro, `pause()` — 120 further steps do not change player HP / tick / enemy attack elapsed; resume continues. Held Escape does not resume; only a rising edge does. `pause()` while Escape still down does not bounce. `isEscapeKey` accepts code/key/`Esc`.
- `tests/integration/pause-loop.test.ts` (1): GameApp-style live-phase loop (includes `paused`) freezes combat while pause is held, then rising-edge resume.

Previous 24 tests remain green (now 29 total).

Visual gate: still **FAILED**. Assembled boxes remain graybox. Not a human GPU playtest. Do not deploy.
