// Only edit the spots marked ✏️. Run:  npm test -- m5-functions/01-typed-emitter.test.js
// DRILL 1 — A typed event emitter. createEmitter<Events>() returns { on, emit }:
//   on(name, handler) — handler receives exactly the payload type of that event; returns an unsubscribe function
//   emit(name, payload) — payload must match the event
// With Events = { answer: { questionId: number; choice: string }; theme: 'light' | 'dark' },
// emit('theme', 'blue') must be a compile error.
export function createEmitter<E>() {
  // ✏️ YOUR CODE HERE — type on/emit with K extends keyof E and E[K]
  return {
    on(name: any, handler: any) { return () => {}; },
    emit(name: any, payload: any) {},
  };
}
