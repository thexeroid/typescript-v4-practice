import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('guard tells the truth', async () => {
  const { isPoint, lengthOf } = await load(import.meta.url, '04-lying-guard.ts');
  assert.equal(lengthOf({ x: 3, y: 4 }), 5);
  for (const v of [null, {}, { x: 1 }, { x: 1, y: '2' }, { x: NaN, y: 1 }, [3, 4]]) {
    assert.equal(isPoint(v), false, JSON.stringify(v)); assert.equal(lengthOf(v), 0);
  }
});
