// Only edit the spots marked ✏️. Run:  npm test -- m7-generics/02-list-to-dict.test.js
// DRILL 2 — listToDict(list): turn a list of records into a dictionary keyed by their id.
// Constrain T so it must have id: string — no extra "how to get the id" parameter needed.
export interface Dict<T> { [k: string]: T }
export function listToDict(list: any[]): Dict<any> { // ✏️ generic + constraint
  // ✏️ YOUR CODE HERE
  return {};
}
