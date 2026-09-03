import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { assembleHumanoid, countMeshes, placeholderIdFor } from '../../src/runtime/rendering/grayboxHumanoid.ts';
import { makeRin, makeHio } from '../../src/content/characters.ts';
import { makeEnemy } from '../../src/content/enemies.ts';

function bounds(obj: THREE.Object3D) {
  obj.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(obj);
}

describe('graybox assembled humanoids', () => {
  it('Rin is a multi-mesh humanoid grounded at feet, ~1.69m, labeled graybox', () => {
    const g = assembleHumanoid(makeRin({ x: 0, y: 0, z: 0 }));
    expect(countMeshes(g)).toBeGreaterThanOrEqual(12);
    expect(g.userData.placeholder).toBe('gb.player.humanoid');
    const box = bounds(g);
    expect(box.min.y).toBeGreaterThan(-0.06);
    expect(box.min.y).toBeLessThan(0.08);
    expect(box.max.y).toBeGreaterThan(1.55);
    expect(box.max.y).toBeLessThan(1.95);
  });

  it('Hio is gold-labeled and shorter than Rin; boss is larger; enemies are filthy-purple humanoids', () => {
    const rin = assembleHumanoid(makeRin({ x: 0, y: 0, z: 0 }));
    const hio = assembleHumanoid(makeHio({ x: 0, y: 0, z: 0 }));
    const boss = assembleHumanoid(makeEnemy('boss-rain-eroded', 'boss', { x: 0, y: 0, z: 0 }));
    const grunt = assembleHumanoid(makeEnemy('e1', 'sword-soldier', { x: 0, y: 0, z: 0 }));
    expect(placeholderIdFor('hio')).toBe('gb.hio.humanoid');
    expect(hio.userData.placeholder).toBe('gb.hio.humanoid');
    expect(boss.userData.placeholder).toBe('gb.boss.humanoid');
    expect(countMeshes(grunt)).toBeGreaterThanOrEqual(12);
    expect(bounds(boss).max.y).toBeGreaterThan(bounds(rin).max.y + 0.3);
    expect(bounds(hio).max.y).toBeLessThan(bounds(rin).max.y + 0.05);
  });

  it('shadow-hound is a multi-mesh quadruped still labeled graybox', () => {
    const h = assembleHumanoid(makeEnemy('h1', 'shadow-hound', { x: 0, y: 0, z: 0 }));
    expect(countMeshes(h)).toBeGreaterThanOrEqual(8);
    expect(h.userData.placeholder).toBe('gb.shadow-hound.assembled');
    expect(bounds(h).min.y).toBeGreaterThan(-0.06);
  });
});
