import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '04-fetch-json.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

const fake = (status, body) => async () => ({ ok: status < 400, status, json: async () => body });
const isNums = x => Array.isArray(x) && x.every(n => typeof n === 'number');
test('returns the body when it passes the guard', async () => {
  const { fetchJson } = await load(import.meta.url, '04-fetch-json.ts');
  assert.deepEqual(await fetchJson('/n', isNums, fake(200, [1, 2])), [1, 2]);
});
test('errors', async () => {
  const { fetchJson } = await load(import.meta.url, '04-fetch-json.ts');
  await assert.rejects(fetchJson('/n', isNums, fake(404, null)), /HTTP 404/);
  await assert.rejects(fetchJson('/n', isNums, fake(200, ['x'])), TypeError);
});
