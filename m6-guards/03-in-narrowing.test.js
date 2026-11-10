import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict) and moves', async () => {
  const r = typecheck(import.meta.url, '03-in-narrowing.types.ts'); assert.ok(r.ok, r.output);
  const { move } = await load(import.meta.url, '03-in-narrowing.ts');
  assert.deepEqual([{ swim: () => 'splash' }, { fly: () => 'flap' }, { run: () => 'zoom' }].map(move), ['splash', 'flap', 'zoom']);
});
test('uses never for exhaustiveness', async () => {
  const fs = await import('node:fs'); const { fileURLToPath } = await import('node:url'); const path = await import('node:path');
  const dir = path.dirname(fileURLToPath(import.meta.url)); const root = path.join(dir, '..');
  const file = process.env.SOLUTIONS ? path.join(root, '.solutions', path.relative(root, dir), '03-in-narrowing.ts') : path.join(dir, '03-in-narrowing.ts');
  assert.match(fs.readFileSync(file, 'utf8').replace(/\/\/.*$/gm, ''), /:\s*never\s*=/);
});
