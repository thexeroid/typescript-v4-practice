import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '04-indexed-access.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('total', async () => {
  const { invoiceTotal } = await load(import.meta.url, '04-indexed-access.ts');
  assert.equal(invoiceTotal({ id: 'i', currency: 'EUR', items: [{ sku: 'a', qty: 2, unitPrice: 5 }, { sku: 'b', qty: 1, unitPrice: 3 }] }), 13);
});
