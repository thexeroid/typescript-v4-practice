// Only edit the spots marked ✏️. Run:  npm test -- m7-generics/01-first-last.test.js
// DRILL 1 — Your first generics. first(arr) and last(arr) return an element (or undefined for an empty array),
// and the return type follows the input: first([1, 2]) is number | undefined, first(['a']) is string | undefined.
// Accept readonly arrays too.
export function first(arr: any[]): any { // ✏️
  return arr[0];
}
export function last(arr: any[]): any { // ✏️
  return arr[arr.length - 1];
}
