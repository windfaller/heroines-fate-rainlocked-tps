# Decision log

Times are UTC with Taipei (UTC+8) in parentheses.

## D001 Independent new project path

- Date: 2026-09-03 01:50-01:55 UTC (09:50-09:55 Taipei)
- Decision: Create the new project at /workspace/heroines-fate-rainlocked-tps on this Linux box.
- Do not mutate the Mac four-realms tree, the private reference repo, or clones of those.
- Evidence: Mac target folder did not exist at audit start (CONFIRMED_CURRENT). Origin new_repo BLOCKED (no namespace).

## D002 Stack

- Vite + TypeScript + Three.js + Rapier compat + Vitest.
- Simulation is pure TypeScript. DOM UI is vanilla. React is not used.
- Do not reuse R3F as simulation owner.
- Pinned versions recorded after package install in the lockfile and docs/qa/phase-b.md.

## D003 Graybox primitives are labeled, not final art

- Phase B uses procedural meshes. Every primitive is on docs/placeholder-ledger.md.
- Visual/art benchmark remains FAILED or NOT TESTED until Phase C.
- 3D masters UNKNOWN. Buying assets BLOCKED.

## D004 Physics split

- Domain steps through IPhysicsWorld.
- Vitest uses SimplePhysicsWorld (deterministic AABB/capsule, no WASM).
- Browser GameApp initializes Rapier WASM and uses kinematic character controller plus mesh/collider split.
- Not a stack switch: runtime still Rapier.

## D005 Production strips mutating diagnostics

- snapshot() and rendererInfo() may remain.
- advanceTime, setSeed, setDebugView, teleports, kill-all only when import.meta.env.DEV is true.

## D006 Save commits only at mission result

- Checkpoints are session-only.
- SaveV1 writes settings plus cleared mission / unlocks / archive only on result commit.

## D007 No deploy, no spend, no secrets

- Local vite preview of dist only.
- Deployment BLOCKED until user authorization.

## D008 Names

- ASSUMED title: 群芳天命錄：雨鎖殘界
- Area 雨鎖山門; player 凜; rescue 緋緒; boss 雨蝕武者; keeper 澄夜; teaser 葛葉
- English project id: heroines-fate-rainlocked-tps

## D009 Assembled-box pass is not an M2 visual pass

- Date: 2026-09-03 02:20-02:26 UTC (10:20-10:26 Taipei)
- Decision: Replace capsules with multi-mesh graybox humanoids, a vermilion torii kit, wet Standard materials, per-skill telegraphs, and an in-level 三選一 UI.
- Visual gate stays FAILED. No GLB, no purchased assets, no Azure PNGs as billboards.
- Colliders stay explicit Rapier/static boxes; visual meshes are not physics.
- Evidence: docs/placeholder-ledger.md, docs/qa/title-1440x900.png, vitest 24/24.
