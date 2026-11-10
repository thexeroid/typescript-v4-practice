// Only edit the spots marked ✏️. Run:  npm test -- m2-sets/01-inferred-types.test.js
// DRILL 1 — Predict inference. Write the type TypeScript infers for each declaration (hover in your editor to check AFTER guessing).
//   let a = 6;                       const b = 6;
//   const c = { n: 6 };              let d = [1, 'x'];
//   const e = [1, 'x'] as const;     let f = 'hi' as const;
//   const g = Math.random() > 0.5 ? 'yes' : 0;
export type A = number;
export type B = 6;
export type C = { n: number };
export type DD = (string | number)[];
export type E = readonly [1, 'x'];
export type F = 'hi';
export type G = 'yes' | 0;
