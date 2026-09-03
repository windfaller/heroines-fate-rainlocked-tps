# Audit Baseline — 群芳天命錄：雨鎖殘界

**Status vocabulary:** CONFIRMED_CURRENT | STALE_REFERENCE | UNKNOWN | BLOCKED  
**Audit window:** 2026-09-03 ~01:50–01:55 UTC (Taipei 09:50–09:55 UTC+8)  
**Auditor:** Grok Bot executor on shared Linux box  
**Target decision:** independent new project at `/workspace/heroines-fate-rainlocked-tps` (box path). Do not mutate reference repos.

---

## 1. Target folder

| Fact | Tag | Evidence |
| --- | --- | --- |
| `/Users/chi/Documents/3D賽車/heroines-fate-rainlocked-tps` did **not** exist at audit start | CONFIRMED_CURRENT | User-supplied audit facts for this run |
| This box path is the independent new project workspace | CONFIRMED_CURRENT | Destination `/workspace/heroines-fate-rainlocked-tps` created during Phase A |
| Mac local target folder was not re-listed from this box | UNKNOWN | Box has no Mac filesystem; Mac path is a host default, not this workspace |

---

## 2. Public preview (read-only)

| Item | Value | Tag |
| --- | --- | --- |
| URL | https://brave-orbit-velvet-flora.grok.me?debug=true | CONFIRMED_CURRENT |
| HTTP | 200 | CONFIRMED_CURRENT |
| HTML saved | `/workspace/audit/preview.html` | CONFIRMED_CURRENT |
| Title | 暮刃紀行 / TWILIGHT BLADE / 雨鎖山門 | CONFIRMED_CURRENT |
| Controls text | WASD 移動 · J 環身近戰 · L 射擊 · T 切換同向／反向 · Q／R／F 招式 · 解救緋緒並護送回入口 | CONFIRMED_CURRENT |
| Scripts | `/tb-app.js?v=73` (saved `/workspace/audit/tb-app.js`, 943493 bytes); `/assets/index-Bm5w5DxF.js` | CONFIRMED_CURRENT |
| Azure base in JS | https://gogoshared.z23.web.core.windows.net/games/twilight-blade | CONFIRMED_CURRENT |
| Sprite layout | idle n=4 cols=2 rows=2; walk n=12 cols=4 rows=3; attack n=6 cols=3 rows=2 | CONFIRMED_CURRENT |
| keeper.png path | present in JS | CONFIRMED_CURRENT |
| WebGL | present | CONFIRMED_CURRENT |
| webgpu count | 0 | CONFIRMED_CURRENT |
| glb/gltf/ktx2/rapier count | 0 | CONFIRMED_CURRENT |
| oscillator count | 4 | CONFIRMED_CURRENT |

Preview is a 2.5D/billboard prototype. It is **not** the 3D TPS target. Not used as source to copy.

---

## 3. Azure blob hosting (read-only)

| Item | Value | Tag |
| --- | --- | --- |
| Games root listing | 404 expected (static blob has no directory index) | CONFIRMED_CURRENT |
| README.txt | HTTP 200; body `twilight-blade assets 2026-09-02T11:41:24.887Z files=377` | CONFIRMED_CURRENT |
| `rin/full.png?v=61` | HTTP 200, `image/png`, 1346841 bytes, Last-Modified Wed, 02 Sep 2026 11:41:10 GMT | CONFIRMED_CURRENT |

Azure listing 404 is **not** proof blobs are missing. Individual URLs are the proof.

---

## 4. GitHub reference (READ-ONLY — do not modify)

| Item | Value | Tag |
| --- | --- | --- |
| Repo | windfaller/brave-orbit-velvet-flora | CONFIRMED_CURRENT |
| HEAD | `5499dbd95e7ab919e4d2be41359f62f3b519e871` | CONFIRMED_CURRENT |
| HEAD time | 2026-09-02T15:16:04Z | CONFIRMED_CURRENT |
| Package | app-builder-workspace Vite + React 19 + three 0.185.1 + R3F + drei + howler + tanstack | CONFIRMED_CURRENT |
| Tree total | 896 | CONFIRMED_CURRENT |
| public/assets | 463 | CONFIRMED_CURRENT |
| png / jpg / mp4 / glb | 272 / 185 / 46 / 0 | CONFIRMED_CURRENT |
| independent audio | 0 | CONFIRMED_CURRENT |
| LICENSE | only under `.grok/skills` | CONFIRMED_CURRENT |

**Do not reuse R3F as simulation owner.** New project uses vanilla Three.js + Rapier, optional React only for DOM UI (this graybox uses DOM, not React).

---

## 5. Local Mac reference (READ-ONLY — do not modify)

| Item | Value | Tag |
| --- | --- | --- |
| Path | `/Users/chi/Documents/3D賽車/twilight-blade-four-realms` | CONFIRMED_CURRENT (identity) |
| Branch / HEAD | main `3699798c0a1809c761bb54734fb7a4af1e48258d` | CONFIRMED_CURRENT |
| HEAD time | 2026-09-02T16:02:42+08:00 | CONFIRMED_CURRENT |
| Worktree | clean | CONFIRMED_CURRENT |
| Remote | chatgpt-team.site, not GitHub | CONFIRMED_CURRENT |
| Stack | vinext / Next 16 + React 19 + three ^0.185.1 + zustand; no Rapier; no LICENSE | CONFIRMED_CURRENT |
| public/assets counts | STALE_REFERENCE from snapshot ~642 files / 184 MiB | STALE_REFERENCE |

Mac filesystem was **not** re-counted from this box. Do not invent a new file count.

---

## 6. Snapshot drift

| Drift | Tag |
| --- | --- |
| Planning snapshot `public/assets` 398 vs live GitHub tree 463 | STALE_REFERENCE |
| Snapshot 19 mp4 vs live 46 | STALE_REFERENCE |
| Local four-realms vs GitHub are different lineages | STALE_REFERENCE |
| Azure README files=377 vs GitHub public/assets 463 — 21-file (or larger) gap not itemized | UNKNOWN |

---

## 7. Licenses / rights

| Topic | Tag |
| --- | --- |
| All art / audio licenses, authors, redistribution terms | UNKNOWN |
| Production hosting / provider / base path / accounts | UNKNOWN |
| Physical mobile | UNKNOWN |
| Safari / Firefox support | UNKNOWN |
| 3D masters, rigs, motion clips | UNKNOWN |

**BLOCKED:** no Origin namespace so cloud `new_repo` failed; do not deploy; do not buy assets.

---

## 8. Keep / reprocess / replace / not-in-slice

| Family | Decision | Notes |
| --- | --- | --- |
| Character portraits / full-body PNG | reprocess candidate for 2.5D UI only | Rights UNKNOWN; not combat actors |
| Directional sprites | reference only | Replace with 3D skinned models |
| Enemy sprites | concept | Same |
| Environment images | concept / texture source | Same |
| Gallery MP4 | not-in-slice critical path | Lazy archive only if licensed |
| WebAudio oscillators | wiring only | 4 oscillators observed in preview JS |
| Procedural primitives | graybox only | Ledger every primitive |
| GLB / Rapier / KTX2 | must-source | Count 0 in preview JS and GitHub tree |

---

## 9. Target tech (this project)

Independent Vite + TypeScript + Three.js + `@dimforge/rapier3d-compat` + Vitest.  
Simulation is pure TS. Rapier owns character controller / colliders. Renderer interpolates. React is **not** the simulation owner (not used in this graybox).

Pinned versions are recorded at install time in `docs/decision-log.md` and the lockfile.

---

## 10. What this audit did **not** do

- Did not clone or write to GitHub `windfaller/brave-orbit-velvet-flora`.
- Did not touch `/Users/chi/Documents/3D賽車/twilight-blade-four-realms`.
- Did not recount Mac `public/assets`.
- Did not deploy.
- Did not purchase assets.

## 10. Live preview + Azure file probes (follow-up 09:53–09:56 Taipei)

Source: `docs/preview-azure-audit.md`. Headed playthrough still NOT TESTED.

CONFIRMED_CURRENT additions:
- Live preview document title is `暮刃紀行：雨鎖山門`. New independent game title remains ASSUMED `群芳天命錄：雨鎖殘界`.
- Preview is a hydrated title/menu for a playable 2.5D slice, not a marketing landing page.
- `tb-app.js` uses `THREE.WebGLRenderer`, Sprite x14, Mesh x126, PlaneGeometry billboards. **No GLTFLoader.** R3F/drei/howler in package.json have 0 hits in shipped bundle.
- Linked `/__grok/manifest.webmanifest` HTTP 404; `https://grok.com/grok-app-builder/extensions.js` HTTP 429.
- Azure GET with `Origin: https://brave-orbit-velvet-flora.grok.me` on env JPEG returns 206 + `Access-Control-Allow-Origin: *`.
- Representative Azure objects HTTP 200 (sizes in preview-azure-audit): shrine-pass.jpg, forest-far/mid, path-ahead, stone/wood/vermilion/moss/cobble/bark, victory/defeat, cedar/pine/maple/mist, torii-ruin, komainu, jizo; keeper.png; hio-k / hio-bound-k; soldier.png, boss1.png; rin idle/walk/attack sheets; rin/shino full.png; seven portraits; gallery mp4s including rin_intro.mp4 and hio_story.mp4.
- Guessed GLB/mp3 paths 404 (not linked by live JS).
- `?debug=true` unlocks full 7-blade roster without writing save.
- Public sibling `windfaller/twilight-blade-rainbound-shrine` last push 2026-08-25 is STALE_REFERENCE vs grok.me 2026-09-03.

NOT TESTED: clicking 踏入山門, WASD in-stage, FPS, DevTools after WebGL start.

## 11. Headed preview playthrough (2026-09-03 ~10:03 Taipei)

Source: box browser at `https://brave-orbit-velvet-flora.grok.me/?debug=true`. Screenshot: `docs/qa/preview-title-1280x800.png`.

CONFIRMED_CURRENT:
- Title screen matches copy. Buttons: 踏入山門, 操作說明, 鑑賞模式, 解鎖與紀錄, 設定.
- 踏入山門 opens 7-portrait select (凜 default: 月影劍脈, 月輪太刀, HP 560). 確認出發 → loading `載入素材 1/25` → playable scene ~15s.
- WASD moves; J melee flash; Z camera rotate. One WebGL canvas.
- Player/NPCs are camera-facing sprite billboards; lanterns/torii are 3D and reproject. Zero `.glb` requests; ~80 raster requests.
- Console: `PCFSoftShadowMap has been deprecated` (once); `Texture marked for update but no image data found` (24+). No console.error.
- Resource timing: no 4xx/5xx, no Azure URLs in this session (assets may be cached or same-origin proxied — UNKNOWN vs earlier Azure 200s). Zero glb.
- HUD overlap at ~1042×632; billboards clip through 3D lantern/torii when rotating.

NOT TESTED / UNKNOWN:
- Encounter, Boss 雨蝕武者, rope/緋緒 rescue, escort, gallery UI, 844×390, FPS.

This does not change the new-project stack decision: independent true-3D TPS, not this 2.5D prototype.
