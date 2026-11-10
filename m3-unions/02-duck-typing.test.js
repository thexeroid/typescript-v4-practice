import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-duck-typing.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('sums areas', async () => {
  const { totalArea, Square, Circle } = await load(import.meta.url, '02-duck-typing.ts');
  assert.ok(Math.abs(totalArea([new Square(2), new Circle(1)]) - (4 + Math.PI)) < 1e-9);
  assert.equal(totalArea([{ area: () => 5 }]), 5);
});
