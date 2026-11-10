import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '02-optional-props.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});

test('describe', async () => {
  const { describe } = await load(import.meta.url, '02-optional-props.ts');
  assert.equal(describe({ make: 'Tesla', model: 'Model 3', year: 2021, chargeVoltage: 240 }), '2021 Tesla Model 3 (EV, 240V)');
  assert.equal(describe({ make: 'Toyota', model: 'Corolla', year: 2002 }), '2002 Toyota Corolla');
});
