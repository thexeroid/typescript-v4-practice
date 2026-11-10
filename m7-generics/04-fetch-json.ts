// Only edit the spots marked ✏️. Run:  npm test -- m7-generics/04-fetch-json.test.js
// DRILL 4 — A typed fetch. fetchJson(url, guard, fetchImpl = fetch) → Promise<T> where T comes from the guard.
//   • response not ok → throw Error(`HTTP ${status}`)
//   • body fails the guard → throw TypeError('unexpected shape')
// (fetchImpl is injectable so the tests can fake the network.)
type FetchLike = (url: string) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;
export async function fetchJson(url: string, guard: (x: unknown) => boolean, fetchImpl: FetchLike = fetch): Promise<unknown> { // ✏️ generic
  // ✏️ YOUR CODE HERE
}
