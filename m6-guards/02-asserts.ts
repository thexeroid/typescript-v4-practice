// Only edit the spots marked ✏️. Run:  npm test -- m6-guards/02-asserts.test.js
// DRILL 2 — Assertion functions. assertIsDefined(v, label) throws Error(`${label} is missing`) for null/undefined,
// and tells TypeScript that AFTER the call v is no longer null/undefined (asserts v is NonNullable<T>).
// Then use it in greet(): no `if`, no `!`.
export function assertIsDefined<T>(v: T, label: string) /* ✏️ asserts … */ {
  // ✏️ YOUR CODE HERE
}
export function greet(name: string | null | undefined): string {
  // ✏️ call assertIsDefined, then return `Hi ${name.toUpperCase()}`
  return '';
}
