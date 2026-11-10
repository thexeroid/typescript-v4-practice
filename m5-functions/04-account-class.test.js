import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '04-account-class.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('behaviour', async () => {
  const { Account } = await load(import.meta.url, '04-account-class.ts');
  const a = new Account('Ana', '1234', 50);
  a.deposit(25); assert.equal(a.balance, 75);
  assert.throws(() => a.deposit(0), RangeError); assert.throws(() => a.withdraw(5, '0000'), /bad pin/);
  assert.throws(() => a.withdraw(500, '1234'), RangeError); a.withdraw(70, '1234'); assert.equal(a.balance, 5);
  assert.equal(a.owner, 'Ana');
});
test('#balance is truly private, pin only by convention', async () => {
  const { Account } = await load(import.meta.url, '04-account-class.ts');
  const a = new Account('Ana', '1234', 50);
  assert.deepEqual(Object.keys(a).sort(), ['owner', 'pin']);
});
