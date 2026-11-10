import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

const snippets = ["function f(c: { make: string }) {}\nf({ make: 'a', color: 'red' });", "function f(c: { make: string }) {}\nconst x = { make: 'a', color: 'red' };\nf(x);", "const car: { make: string } = { make: 'a', year: 1 };", "let t: [number, string] = [1, 'a'];\nt.push(2);", "let t: readonly [number, string] = [1, 'a'];\nt.push(2);", "let t: [number, string] = [1, 'a', 2];", "let n;\nn = 4;\nn = 'x';", "const n = 4;\nlet m: 4 = n;\nlet k: 4 = 2 + 2;"];
test('matches the real compiler', async () => {
  const { answer } = await load(import.meta.url, '03-what-compiles.ts');
  assert.ok(!isTodo(answer), todoMsg);
  snippets.forEach((s, i) => assert.equal(answer[i], compiles(s), `snippet ${i + 1}:\n${s}`));
});
