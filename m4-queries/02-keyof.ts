// Only edit the spots marked ✏️. Run:  npm test -- m4-queries/02-keyof.test.js
// DRILL 2 — keyof and indexed access. getProp(obj, key) only accepts real keys of obj, and its return type is
// the type of that property: getProp({ a: 1, b: 'x' }, 'b') is a string; getProp(obj, 'zzz') is a compile error.
// pluck(list, key) does the same for every item: pluck(users, 'age') → number[].
export function getProp(obj: any, key: any): any { // ✏️ make it generic
  return obj[key];
}
export function pluck(list: any[], key: any): any[] { // ✏️ make it generic
  return list.map(item => item[key]);
}
