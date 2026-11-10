import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '01-is-user.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

const good = { id: 1, name: 'Ana', email: 'a@x.io', tags: ['admin'] };
test('isUser', async () => {
  const { isUser } = await load(import.meta.url, '01-is-user.ts');
  assert.equal(isUser(good), true);
  for (const bad of [null, 5, 'x', [], { ...good, id: '1' }, { ...good, tags: [1] }, { ...good, tags: 'a' }, { id: 1, name: 'a', tags: [] }])
    assert.equal(isUser(bad), false, JSON.stringify(bad));
});
test('parseUsers', async () => {
  const { parseUsers } = await load(import.meta.url, '01-is-user.ts');
  assert.deepEqual(parseUsers(JSON.stringify([good, { id: 2 }, null])), [good]);
  assert.deepEqual(parseUsers('{oops'), []); assert.deepEqual(parseUsers('{"a":1}'), []);
});
