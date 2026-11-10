import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-asserts.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('runtime', async () => {
  const { assertIsDefined, greet } = await load(import.meta.url, '02-asserts.ts');
  assert.equal(greet('ana'), 'Hi ANA'); assert.throws(() => greet(null), /name is missing/);
  assert.doesNotThrow(() => assertIsDefined(0, 'x')); assert.throws(() => assertIsDefined(undefined, 'cfg'), /cfg is missing/);
});
