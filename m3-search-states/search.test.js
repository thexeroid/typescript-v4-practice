import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, typecheck } from '../lib/harness.js';

test('type checks (strict)', () => { const r = typecheck(import.meta.url, 'search.ts'); assert.ok(r.ok, 'TypeScript errors:\n' + r.output); });

test('render', async () => {
  const { render } = await load(import.meta.url, 'search.ts');
  assert.equal(render({ status: 'idle' }), 'Type to search');
  assert.equal(render({ status: 'loading', query: 'cat' }), 'Searching "cat"…');
  assert.equal(render({ status: 'success', query: 'cat', results: ['a', 'b'] }), '2 results for "cat": a, b');
  assert.equal(render({ status: 'error', query: 'cat', message: 'boom' }), 'Error for "cat": boom');
});

test('next', async () => {
  const { next } = await load(import.meta.url, 'search.ts');
  const idle = { status: 'idle' }, loading = { status: 'loading', query: 'cat' };
  assert.deepEqual(next(idle, { type: 'typed', query: 'cat' }), loading);
  assert.deepEqual(next(loading, { type: 'typed', query: '' }), idle);
  assert.deepEqual(next(loading, { type: 'ok', results: ['a'] }), { status: 'success', query: 'cat', results: ['a'] });
  assert.deepEqual(next(loading, { type: 'fail', message: 'boom' }), { status: 'error', query: 'cat', message: 'boom' });
  assert.deepEqual(next(idle, { type: 'ok', results: ['a'] }), idle, 'ok while idle is ignored');
  const done = { status: 'success', query: 'cat', results: ['a'] };
  assert.deepEqual(next(done, { type: 'fail', message: 'x' }), done, 'fail after success is ignored');
  assert.deepEqual(next(done, { type: 'typed', query: 'dog' }), { status: 'loading', query: 'dog' });
});
