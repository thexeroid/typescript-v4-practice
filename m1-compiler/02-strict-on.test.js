import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-strict-on.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('behaviour', async () => {
  const { totalLength, firstLong } = await load(import.meta.url, '02-strict-on.ts');
  assert.equal(totalLength(['ab', 'c']), 3); assert.equal(totalLength([]), 0);
  assert.equal(firstLong(['a', 'hello']), 'HELLO'); assert.equal(firstLong(['a']), '');
});
