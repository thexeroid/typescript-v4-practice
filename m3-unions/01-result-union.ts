// Only edit the spots marked ✏️. Run:  npm test -- m3-unions/01-result-union.test.js
// DRILL 1 — A fetch result as a discriminated union, rendered with an exhaustive switch.
// FetchResult is one of: { status: 'loading' } | { status: 'ok'; data: string[] } | { status: 'error'; message: string }
// render: 'Loading…' | 'Got 2: a, b' | 'Error: boom'. The default branch must call assertNever (so a new status
// added later becomes a compile error).
export type FetchResult =
  | { status: "loading" }
  | { status: "ok"; data: string[] }
  | { status: "error"; message: string }; // ✏️

export function assertNever(x: never): never {
  throw new Error("Unexpected: " + JSON.stringify(x));
}
export function render(r: FetchResult): string {
  // ✏️ YOUR CODE HERE (switch on r.status)
  switch (r.status) {
    case "loading":
      return "Loading…";
    case "ok":
      return `Got ${r.data.length}: ${r.data.join(", ")}`;
    case "error":
      return `Error: ${r.message}`;
    default:
      return assertNever(r);
  }
}
