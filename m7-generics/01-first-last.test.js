import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '01-first-last.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('runtime (and typed)', async () => {
  assert.ok(typecheck(import.meta.url, '01-first-last.types.ts').ok, 'make the types pass first');
  const { first, last } = await load(import.meta.url, '01-first-last.ts');
  assert.equal(first([1, 2]), 1); assert.equal(last([1, 2]), 2); assert.equal(first([]), undefined);
});
