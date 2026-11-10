// Only edit the spots marked ✏️. Run:  npm test -- m6-guards/01-is-user.test.js
// DRILL 1 — Guard data you don't control. isUser(x: unknown): x is User — check EVERY field and its type.
// parseUsers(json) parses a JSON string and keeps only the valid users (bad JSON → []).
export interface User { id: number; name: string; email: string; tags: string[] }
export function isUser(x: unknown) /* ✏️ x is User */ {
  // ✏️ YOUR CODE HERE
  return false;
}
export function parseUsers(json: string): User[] {
  // ✏️ YOUR CODE HERE
  return [];
}
