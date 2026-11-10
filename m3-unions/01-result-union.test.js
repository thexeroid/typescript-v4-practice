import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '01-result-union.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('render', async () => {
  const { render } = await load(import.meta.url, '01-result-union.ts');
  assert.equal(render({ status: 'loading' }), 'Loading…');
  assert.equal(render({ status: 'ok', data: ['a', 'b'] }), 'Got 2: a, b');
  assert.equal(render({ status: 'error', message: 'boom' }), 'Error: boom');
});
