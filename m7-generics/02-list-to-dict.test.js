import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-list-to-dict.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('runtime', async () => {
  const { listToDict } = await load(import.meta.url, '02-list-to-dict.ts');
  assert.deepEqual(listToDict([{ id: 'a', n: 1 }, { id: 'b', n: 2 }]), { a: { id: 'a', n: 1 }, b: { id: 'b', n: 2 } });
});
