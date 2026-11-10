import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '03-intersections.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('store', async () => {
  const { store } = await load(import.meta.url, '03-intersections.ts');
  const now = new Date(0);
  assert.deepEqual(store({ name: 'Ana', email: 'a@x.io' }, 'u1', now), { name: 'Ana', email: 'a@x.io', id: 'u1', createdAt: now, updatedAt: now });
});
