import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

const snippets = ["interface Car { make: string }", "type Id = string;", "let n: number = 4;", "enum Dir { Up, Down }", "declare const VERSION: string;", "import type { Car } from './car.ts';", "function f(x: number): void {}", "abstract class Shape { abstract area(): number }"];
test('matches what the compiler really emits', async () => {
  const { answer } = await load(import.meta.url, '01-types-vanish.ts');
  assert.ok(!isTodo(answer), todoMsg);
  snippets.forEach((s, i) => {
    const out = emitted(s).replace(/[\s;]/g, '');
    assert.equal(answer[i], out ? 'kept' : 'gone', `line ${i + 1}: ${s}  →  ${JSON.stringify(emitted(s).trim())}`);
  });
});
