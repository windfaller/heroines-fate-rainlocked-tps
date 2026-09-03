import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv from 'ajv/dist/2020.js';

describe('asset manifest schema', () => {
  it('validates docs/asset-manifest.json', () => {
    const schema = JSON.parse(readFileSync(resolve('docs/asset-manifest.schema.json'), 'utf8'));
    const manifest = JSON.parse(readFileSync(resolve('docs/asset-manifest.json'), 'utf8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const ok = validate(manifest);
    expect(validate.errors ?? []).toEqual([]);
    expect(ok).toBe(true);
    const ids = new Set<string>();
    for (const a of manifest.assets) {
      expect(ids.has(a.id)).toBe(false);
      ids.add(a.id);
      expect(a.sha256 === 'UNKNOWN' || /^[a-fA-F0-9]{64}$/.test(a.sha256)).toBe(true);
      expect(a.licenseOrTerms.length).toBeGreaterThan(0);
    }
  });
});
