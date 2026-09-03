# Placeholder ledger (Phase B graybox + assembled-box pass)

Every interim primitive. None of these may silently become final art.
Assembled box humanoids and kit pieces are **still graybox**. Visual gate remains FAILED until licensed GLB/PBR characters exist.

| ID | Use | Owner | Replacement | Gate |
| --- | --- | --- | --- | --- |
| gb.player.humanoid | 凜 assembled boxes (torso/head/limbs/weapon), cyan-white, ~1.69m, feet at y=0 | grayboxHumanoid | character.rin.gameplay LOD0/1 skinned GLB | M2 visual |
| gb.hio.humanoid | 緋緒 assembled boxes, gold | grayboxHumanoid | hio gameplay/rescue GLB | M3 |
| gb.keeper.humanoid | 澄夜 assembled boxes + lantern staff | grayboxHumanoid | NPC kit | M3 |
| gb.sword-soldier.humanoid | 刀兵 filthy-purple multi-mesh | grayboxHumanoid | enemy sword-soldier GLB | M3 |
| gb.archer.humanoid | 弓手 filthy-purple + bow | grayboxHumanoid | enemy archer GLB | M3 |
| gb.caster.humanoid | 咒術師 filthy-purple + orb staff | grayboxHumanoid | enemy caster GLB | M3 |
| gb.shadow-hound.assembled | 影犬 quadruped boxes, filthy-purple | grayboxHumanoid | enemy hound GLB | M3 |
| gb.lantern-hunter.humanoid | elite 燈獵者 taller filthy-purple + chain lantern | grayboxHumanoid | elite GLB | M3 |
| gb.boss.humanoid | 雨蝕武者 larger filthy-purple + odachi | grayboxHumanoid | boss skinned GLB + clips | M3 |
| gb.dummy.humanoid | tutorial dummy wood-gray | grayboxHumanoid | training dummy mesh | M3 |
| gb.ground-boxes | path platforms; MeshStandard wet (roughness~0.16, metalness~0.42) | SceneComposer | modular wet-stone kit | M2/M3 |
| gb.torii-kit | 外鳥居 posts + kasagi/shimaki/nuki + plaque (visual only; Rapier post boxes separate) | SceneComposer | vermilion torii hero mesh | M2 |
| gb.lantern-prop | stone base/pillar/roof + emissive gold chamber + PointLight | SceneComposer | stone lantern 1.2-1.8m | M2 |
| gb.bridge-planks | 斷橋 boxes with two gaps | SceneComposer | broken-bridge kit | M3 |
| gb.pool-disc | 洗心池 flat cylinder (wetter metalness) | SceneComposer | wet pool + corruption film | M3 |
| gb.arena-ring | 封門廣場 ring boxes | SceneComposer | sealed-gate plaza | M3 |
| gb.corruption-node | three destructible boxes | SceneComposer | corruption node mesh | M3 |
| gb.seal-platform | 封印台 box | SceneComposer | seal dais | M3 |
| gb.binding-beams | three gold bars on 緋緒 | grayboxHumanoid | rope/seal VFX | M3 |
| gb.rain-points | point-sprite rain | SceneComposer | rain streaks + ripples | M2 |
| gb.attack-vfx | per-skill telegraphs (crescent/ray/ring/column/wedge/disc/slab/streak/hexburst) + hit flashes | AttackVfx | authored VFX | M2 |
| gb.oscillator-sfx | AudioDirector wiring cues | AudioDirector | licensed cue sheet | M2 audio |
| gb.ui-css | HUD/title CSS shapes, no emoji icons; in-level 三選一 is CSS cards | presentation | icon set + brand font | M2 |

Retired IDs (do not reuse as if they were final): gb.player.capsule, gb.hio.capsule, gb.keeper.capsule, gb.sword-soldier, gb.archer, gb.caster, gb.shadow-hound, gb.lantern-hunter, gb.boss, gb.torii, gb.attack-disc.

Replacement status: none sourced. Licenses UNKNOWN. No Azure PNGs used as combat billboards. No purchased assets.

## Azure runtime-art (wired 2026-09-03, license UNKNOWN)

Copied into `public/runtime-assets/` and used as **UI 2.5D + environment maps only**. Combat actors stay assembled-box 3D meshes. `rin-idle-sheet.png` is title/loadout 2.5D only — never a combat billboard.

| ID | File | Use |
| --- | --- | --- |
| ui.rin-full | ui/rin-full.png | title overlay |
| ui.rin-portrait | ui/rin-portrait.jpg | loadout + HUD |
| ui.keeper | ui/keeper.png | title + intro |
| ui.hio | ui/hio.png | title + escort HUD |
| ui.hio-bound | ui/hio-bound.png | intro + bound HUD |
| ui.rin-idle-sheet | ui/rin-idle-sheet.png | unused in combat; reserved title 2.5D |
| env.stone | env/stone.jpg | wet/stone ground map |
| env.vermilion | env/vermilion.jpg | torii kit map |
| env.wood | env/wood.jpg | lantern/arena map |
| env.forest-far | env/forest-far.jpg | backdrop plane |
| env.forest-mid | env/forest-mid.jpg | mid backdrop |
| env.torii-ruin | env/torii-ruin.png | decorative plane |
| env.moss | env/moss.jpg | loaded, reserved |
| env.path-ahead | env/path-ahead.jpg | loaded, reserved |

Visual gate remains FAILED (no skinned GLB).

Combat actors keep assembled-box meshes in the graph (tests/physics) but hide those boxes when keyed PNG cards are dressed: `char.rin` / soldier / archer / mage / hound / elite / boss. Cards Y-billboard to the TPS camera so 敵我 show Azure art. License UNKNOWN. Still not skinned GLB — visual gate FAILED.
