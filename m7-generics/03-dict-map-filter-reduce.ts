// Only edit the spots marked ✏️. Run:  npm test -- m7-generics/03-dict-map-filter-reduce.test.js
// DRILL 3 — Array's map / filter / reduce, but for dictionaries (the course exercise, with your own fruit).
// mapDict(dict, (value, key) => newValue)       → a new Dict of the new values
// filterDict(dict, (value, key) => boolean)     → a new Dict with only the kept entries
// reduceDict(dict, (acc, value, key) => acc, initial) → the final accumulator
// All three are generic: types flow from the inputs and the callbacks.
export interface Dict<T> { [k: string]: T }
export function mapDict(...args: any[]): any {} // ✏️
export function filterDict(...args: any[]): any {} // ✏️
export function reduceDict(...args: any[]): any {} // ✏️
