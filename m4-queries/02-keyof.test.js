import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-keyof.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('runtime (and typed)', async () => {
  assert.ok(typecheck(import.meta.url, '02-keyof.types.ts').ok, 'make the types pass first');
  const { getProp, pluck } = await load(import.meta.url, '02-keyof.ts');
  assert.equal(getProp({ a: 1, b: 'x' }, 'b'), 'x');
  assert.deepEqual(pluck([{ age: 3 }, { age: 5 }], 'age'), [3, 5]);
});
