import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, '03-typeof-as-const.types.ts');
  assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});
