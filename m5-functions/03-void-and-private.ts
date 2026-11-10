// Only edit the spots marked ✏️. Run:  npm test -- m5-functions/03-void-and-private.test.js
// DRILL 3 — void and privacy. Which snippets compile under strict TypeScript?
//   1  const f: () => void = () => 42;
//   2  function g(): void { return 42; }
//   3  const arr: number[] = [];  [1, 2].forEach(n => arr.push(n));
//   4  function h(cb: () => void) { const r = cb(); const n: number = r; }
//   5  class A { private x = 1 }  new A().x
//   6  class A { #x = 1 }  (new A() as any).x
export const answer: boolean[] = [/* ✏️ YOUR ANSWER: true = compiles */];
// And at RUNTIME (plain JS after types vanish): can outside code read a `private` field? a `#private` field?
export const privateReadableAtRuntime: boolean | undefined = undefined; // ✏️
export const hashPrivateReadableAtRuntime: boolean | undefined = undefined; // ✏️
