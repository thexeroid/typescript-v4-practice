import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type vs interface', async () => {
  const { answer } = await load(import.meta.url, '04-type-or-interface.ts');
  assert.ok(!isTodo(answer), todoMsg);
  unveil('WyJ0eXBlIiwgImludGVyZmFjZSIsICJib3RoIiwgImJvdGgiLCAidHlwZSIsICJib3RoIiwgInR5cGUiXQ==').forEach((w, i) => assert.equal(answer[i], w, `ability ${i + 1}`));
});
