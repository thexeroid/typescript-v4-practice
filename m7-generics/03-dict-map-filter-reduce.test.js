import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '03-dict-map-filter-reduce.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

const fruit = { kiwi: { color: 'green', grams: 75 }, plum: { color: 'purple', grams: 66 }, mango: { color: 'orange', grams: 200 } };
test('mapDict', async () => {
  const { mapDict } = await load(import.meta.url, '03-dict-map-filter-reduce.ts');
  assert.deepEqual(mapDict(fruit, (f, name) => `${name}:${f.grams}`), { kiwi: 'kiwi:75', plum: 'plum:66', mango: 'mango:200' });
});
test('filterDict', async () => {
  const { filterDict } = await load(import.meta.url, '03-dict-map-filter-reduce.ts');
  assert.deepEqual(Object.keys(filterDict(fruit, f => f.grams < 100)), ['kiwi', 'plum']);
});
test('reduceDict', async () => {
  const { reduceDict } = await load(import.meta.url, '03-dict-map-filter-reduce.ts');
  assert.equal(reduceDict(fruit, (sum, f) => sum + f.grams, 0), 341);
});
