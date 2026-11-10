import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '04-tuples.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('parses', async () => {
  const { parseCarId } = await load(import.meta.url, '04-tuples.ts');
  assert.deepEqual(parseCarId('2002-Toyota-Corolla'), [2002, 'Toyota', 'Corolla']);
});
