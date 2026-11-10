import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, isTodo, todoMsg, unveil, typecheck, compiles, emitted } from '../lib/harness.js';

const snippets = ["const f: () => void = () => 42;", "function g(): void { return 42; }", "const arr: number[] = [];\n[1, 2].forEach(n => arr.push(n));", "function h(cb: () => void) { const r = cb(); const n: number = r; }", "class A { private x = 1 }\nconst a = new A();\na.x;", "class A { #x = 1 }\nconst a = new A();\n(a as any).x;"];
test('matches the real compiler', async () => {
  const { answer } = await load(import.meta.url, '03-void-and-private.ts');
  assert.ok(!isTodo(answer), todoMsg);
  snippets.forEach((s, i) => assert.equal(answer[i], compiles(s), `snippet ${i + 1}:\n${s}`));
});
test('runtime privacy', async () => {
  const m = await load(import.meta.url, '03-void-and-private.ts');
  class P { constructor() { this.x = 1; } } // what "private x" becomes
  class H { #x = 1; }
  assert.equal(m.privateReadableAtRuntime, new P().x === 1);
  assert.equal(m.hashPrivateReadableAtRuntime, new H().x === 1);
});
