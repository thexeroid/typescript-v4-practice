// Only edit the spots marked ✏️. Run:  npm test -- m1-compiler/01-types-vanish.test.js
// DRILL 1 — Types vanish. When TypeScript becomes JavaScript, which lines leave ANY code behind?
// Answer 'gone' (nothing left at runtime) or 'kept' (some JavaScript remains) for each line:
//   1  interface Car { make: string }
//   2  type Id = string;
//   3  let n: number = 4;
//   4  enum Dir { Up, Down }
//   5  declare const VERSION: string;
//   6  import type { Car } from './car.ts';
//   7  function f(x: number): void {}
//   8  abstract class Shape { abstract area(): number }
export const answer: string[] = [/* ✏️ YOUR ANSWER: 8 × 'gone' | 'kept' */];
