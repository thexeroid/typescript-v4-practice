// Only edit the spots marked ✏️. Run:  npm test -- m5-functions/02-overloads.test.js
// DRILL 2 — Overloads. format(date) → 'YYYY-MM-DD' (a string); format(numericString) → a number ('42' → 42).
// Write two overload signatures so the CALLER gets the exact return type, then one implementation.
// format(5) must not compile.
export function format(value: any): any { // ✏️ overload signatures above this, typed implementation here
  return value instanceof Date ? value.toISOString().slice(0, 10) : Number(value);
}
