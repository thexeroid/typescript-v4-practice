// M3 BOSS — Typed UI states for a search box.
// Run: npm test -- m3-search-states/search.test.js
// Checks: a never-based exhaustiveness check · no optional fields faking states · adding a state breaks the build.

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "success"; query: string; results: string[] }
  | { status: "error"; query: string; message: string }
  // ✏️ STEP 3 (later): add { status: 'empty'; query: string } — a search that found nothing
  | { status: "empty"; query: string };

export type SearchEvent =
  | { type: "typed"; query: string } // user typed → start loading (empty text → back to idle)
  | { type: "ok"; results: string[] } // server answered
  | { type: "fail"; message: string }; // server failed

export function assertNever(x: never): never {
  throw new Error("Unexpected: " + JSON.stringify(x));
}

// ✏️ STEP 1 — one message per state:
//   idle    → 'Type to search'
//   loading → 'Searching "cat"…'
//   success → '2 results for "cat": a, b'
//   error   → 'Error for "cat": boom'
export function render(s: SearchState): string {
  // TODO: switch on s.status, default → assertNever(s)
  switch (s.status) {
    case "idle":
      return "Type to search";
    case "loading":
      return `Searching "${s.query}"…`;
    case "success":
      return `${s.results.length} results for "${s.query}": ${s.results.join(", ")}`;
    case "error":
      return `Error for "${s.query}": ${s.message}`;
    case "empty":
      return `No results for "${s.query}"`;
    default:
      return assertNever(s);
  }
}

// ✏️ STEP 2 — the rules (any other event in a state → return s unchanged):
//   any state + typed('')   → idle
//   any state + typed(q)    → loading(q)
//   loading   + ok(r)       → success (keep the query)
//   loading   + fail(m)     → error   (keep the query)
export function next(s: SearchState, e: SearchEvent): SearchState {
  // TODO
  if (e.type === "typed") {
    return e.query === ""
      ? { status: "idle" }
      : { status: "loading", query: e.query };
  }

  if (s.status === "loading") {
    if (e.type === "ok")
      return e.results.length > 0
        ? { status: "success", results: e.results, query: s.query }
        : { status: "empty", query: s.query };
    if (e.type === "fail")
      return { status: "error", message: e.message, query: s.query };
  }
  return s;
}
