import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '01-typed-emitter.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('on / emit / unsubscribe', async () => {
  const { createEmitter } = await load(import.meta.url, '01-typed-emitter.ts');
  const e = createEmitter(); const got = [];
  const off = e.on('theme', t => got.push(t)); e.on('answer', a => got.push(a.choice));
  e.emit('theme', 'dark'); e.emit('answer', { questionId: 1, choice: 'B' }); off(); e.emit('theme', 'light');
  assert.deepEqual(got, ['dark', 'B']);
});
