# Progress & Final Report — assembled-box playability pass (not M2 visual)

## Executive outcome

- Current milestone: M1 playable graybox + a visual/playability pass toward M2. **M2 visual benchmark is not passed.**
- Overall status: NOT a release. Source/static tests PASSED (24/24). Production build PASSED. Preview HTTP 200. **Visual FAILED** (assembled boxes are still graybox). Deployment BLOCKED.
- Playable route: /workspace/heroines-fate-rainlocked-tps served at http://127.0.0.1:4173/
- Source SHA/build ID: not a git repo; vite build 2026-09-03 02:26 UTC (10:26 Taipei UTC+8)
- Local served route: http://127.0.0.1:4173/ (reused; process restarted to pick up new dist)
- Deployed route: none
- One-sentence player-visible result: Traditional-Chinese title/loadout/HUD of 雨鎖山門 with assembled-box 凜/緋緒 (not capsules, not billboards), vermilion torii kit, wet-ground material, per-skill telegraphs, and an in-level 三選一 picker — still not art-complete.

## What changed this pass

| File/system | Change | Why | Evidence |
| --- | --- | --- | --- |
| src/runtime/rendering/grayboxHumanoid.ts | Multi-mesh humanoids (torso/head/limbs/weapon), feet at y=0, Y-up, ~1.69m Rin | Replace capsules | tests/unit/humanoid.test.ts |
| src/runtime/rendering/SceneComposer.ts | Vermilion torii kit, wet MeshStandard ground, emissive lanterns, title staging | Readable shrine graybox | docs/qa/title-1440x900.png |
| src/runtime/rendering/AttackVfx.ts | Distinct telegraph kinds + hit flashes | Not one ring per skill | tests/unit/telegraph.test.ts |
| src/presentation/ui.ts + simulation | In-level 三選一 picker UI; combat frozen until pick | Was a hidden flag | tests/unit/module-picker.test.ts |
| Rapier | Unchanged browser path; extra static boxes for torii posts only (visuals not colliders) | Keep colliders separate | PhysicsWorld.ts untouched besides startRun boxes |
| docs/qa/*.png | 1440×900 and 844×390 title + play | Requested captures | docs/qa/ |

## Audit delta

- Independent project only. twilight-blade / GitHub not touched.
- Licenses: UNKNOWN. No Azure PNGs in combat. No asset purchases.

## Playthrough evidence

### Successful path

`title → loadout → intro → playing → … → result` still simulated in Vitest (teleport/kill driver). Headless Chrome screenshots cover title and first playing seconds only (`?qa=play` skip-intro helper). Full WASD loop in a human browser: NOT TESTED this pass.

- Date: 2026-09-03 02:26 UTC (10:26 Taipei)
- Screenshots: docs/qa/title-1440x900.png, docs/qa/play-1440x900.png, docs/qa/title-844x390.png, docs/qa/play-844x390.png
- Human browser: NOT TESTED (headless SwiftShader only)

### Failure/restart path

Unchanged unit coverage (HP 0 → defeat; escort fail/retry). Browser NOT TESTED.

## Visual benchmark

| Required state | Desktop 1440×900 | 844×390 | Defects | Evidence |
| --- | --- | --- | --- | --- |
| Title/loading | CAPTURED | CAPTURED | CSS overlay; assembled-box staging; night still very dark | docs/qa/title-*.png |
| Loadout | NOT TESTED | NOT TESTED | no 3D turntable GLB | placeholder ledger |
| Normal combat | CAPTURED idle play | CAPTURED idle play | assembled boxes, not skinned GLB; ground sheen weak in SwiftShader | docs/qa/play-*.png |
| Core action | NOT TESTED in browser | NOT TESTED | telegraphs exist in code, not shown in idle shots | AttackVfx |
| Boss/high intensity | NOT TESTED | NOT TESTED | larger assembled boss, no GLB | unit humanoid |
| Rescue/escort | NOT TESTED | NOT TESTED | gold Hio humanoid | title staging |
| Result | NOT TESTED | NOT TESTED | DOM overlay | rewards test PASSED |

**Visual verdict: FAILED.** Assembled boxes / kit primitives are still graybox. Do not treat this as M2 art-complete.

## Performance/loading

Browser FPS/loading NOT TESTED beyond headless capture. Production JS+Rapier chunk still large (~2.6 MB uncompressed JS). Rapier remains a separate chunk (`rapier.es-*.js`).

## Quality gates

```
Source/static: PASSED — vitest 24/24, tsc 0
Production build: PASSED — vite build exit 0
Local desktop full loop: NOT TESTED
Player fail/restart: PASSED (unit/integration only)
Escort fail/retry: PASSED (unit only)
Visual/art benchmark: FAILED — assembled boxes still graybox
Asset integration: FAILED — no GLB, licenses UNKNOWN
Audio/VFX: FAILED — oscillator + procedural telegraphs
Mobile-width visual: CAPTURED stills only (844×390), not a playtest
Physical mobile: NOT TESTED
Performance/loading: NOT TESTED
Browser/fallback: headless Chrome only
Console/network/base path: preview HTTP 200
Deployment: BLOCKED — no authorization
Live deployed full loop: BLOCKED
```

## Tests run

| Command/test | Result | Count/time | Notes/log |
| --- | --- | --- | --- |
| vitest run | PASSED | 16 files, 24 tests, ~1.2s | +humanoid +telegraph +module-picker |
| tsc --noEmit | PASSED | exit 0 | |
| vite build | PASSED | exit 0, ~2.2s | dist/ |
| vite preview :4173 | PASSED | HTTP 200 | http://127.0.0.1:4173/ |
| Playwright | NOT TESTED | skipped | CDP UI automation blocked; used headless --screenshot |

## Known limitations

- Assembled box characters are **not** final art (docs/placeholder-ledger.md).
- Wet ground material is Standard roughness/metalness on path boxes; night lighting + SwiftShader still reads very dark.
- Torii kit is still primitives (posts/lintels/plaque), not a hero mesh.
- Attack telegraphs are procedural meshes, not authored VFX.
- In-level 三選一 freezes the sim until a pick; integration tests auto-pick.
- Touch/gamepad not implemented.
- Rapier WASM in browser; Vitest uses SimplePhysicsWorld.
- Audio is oscillator wiring only.
- `?qa=play` auto-starts and skips intro for still captures only.
- No git history.

## Unknown/not tested

- Licenses, 3D masters, Safari/Firefox, physical mobile, production hosting.
- Actual WASD feel, camera occlusion quality, FPS, WebGL2 on real GPU.
- Module picker layout on a physical phone.

## Blockers needing user authority

- Action required: licensed 3D/audio source for a real M2 visual pass; Origin namespace / deploy authorization.
- Exact scope/cost/risk: buying assets or deploying is forbidden until authorized.
- Safe work already completed: independent graybox + assembled-box pass + tests + local preview stills.

## Next prioritized work (remaining M2 gaps)

1. Real skinned GLB + PBR for 凜 (and at least one enemy) with authored idle/walk/melee — assembled boxes do not count.
2. Hero torii / wet-stone kit / stone lantern meshes; rain streaks + ripples; licensed audio.
3. Human play of http://127.0.0.1:4173/ (title → result, fail, escort retry) on a real GPU.
4. Show telegraphs in a captured combat beat; HUD/icon pass.
5. Playwright/Chromium smoke if a computer-use path is allowed.
