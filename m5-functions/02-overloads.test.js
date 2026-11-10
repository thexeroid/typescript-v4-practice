import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-overloads.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('runtime (and typed)', async () => {
  assert.ok(typecheck(import.meta.url, '02-overloads.types.ts').ok, 'make the types pass first');
  const { format } = await load(import.meta.url, '02-overloads.ts');
  assert.equal(format(new Date('2024-03-09T12:00:00Z')), '2024-03-09'); assert.equal(format('42'), 42);
});
