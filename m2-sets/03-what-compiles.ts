// Only edit the spots marked ✏️. Run:  npm test -- m2-sets/03-what-compiles.test.js
// DRILL 3 — Excess properties, tuples and literal types. Which snippets compile under strict TypeScript?
//   1  function f(c: { make: string }) {}  f({ make: 'a', color: 'red' });
//   2  function f(c: { make: string }) {}  const x = { make: 'a', color: 'red' };  f(x);
//   3  const car: { make: string } = { make: 'a', year: 1 };
//   4  let t: [number, string] = [1, 'a'];  t.push(2);
//   5  let t: readonly [number, string] = [1, 'a'];  t.push(2);
//   6  let t: [number, string] = [1, 'a', 2];
//   7  let n;  n = 4;  n = 'x';
//   8  const n = 4;  let m: 4 = n;  let k: 4 = 2 + 2;
export const answer: boolean[] = [/* ✏️ YOUR ANSWER: true = compiles, false = type error */];
