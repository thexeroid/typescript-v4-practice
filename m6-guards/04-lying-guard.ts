// Only edit the spots marked ✏️. Run:  npm test -- m6-guards/04-lying-guard.test.js
// DRILL 4 — A guard that lies. This guard says "yes" for ANY object, so TypeScript trusts it and
// lengthOf({}) crashes at runtime (or returns NaN). Fix the guard: x is a Point only if it is a non-null object
// whose x and y are both finite numbers.
export interface Point { x: number; y: number }
export function isPoint(x: unknown): x is Point {
  return typeof x === 'object'; // ✏️ fix this line
}
export function lengthOf(v: unknown): number {
  return isPoint(v) ? Math.hypot(v.x, v.y) : 0;
}
