import { readFileSync } from 'node:fs';
import Ajv from 'ajv/dist/2020.js';

const schema = JSON.parse(readFileSync('docs/asset-manifest.schema.json', 'utf8'));
const manifest = JSON.parse(readFileSync('docs/asset-manifest.json', 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
if (!validate(manifest)) {
  console.error(validate.errors);
  process.exit(1);
}
console.log('manifest ok', manifest.assets.length, 'assets');
