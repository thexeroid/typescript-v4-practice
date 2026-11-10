// Only edit the spots marked ✏️. Run:  npm test -- m1-compiler/02-strict-on.test.js
// DRILL 2 — Strict mode on. This file was written as loose JavaScript. Under "strict" it has type errors:
// an implicit any, a variable that starts undefined, and a value that may be undefined.
// Add types and handle the missing cases so it compiles AND behaves:
//   totalLength(['ab', 'c']) → 3        firstLong(['a', 'hello']) → 'HELLO'     firstLong(['a']) → ''
export function totalLength(words: string[]) {
  let total = 0;
  for (const w of words) total += w.length;
  return total;
}
export function firstLong(list: string[]): string {
  return list.find(s => s.length > 3)?.toUpperCase() ?? '';
}
