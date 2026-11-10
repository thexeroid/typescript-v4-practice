// Only edit the spots marked ✏️. Run:  npm test -- m6-guards/03-in-narrowing.test.js
// DRILL 3 — Narrow with `in`. move(pet) returns pet.swim(), pet.fly() or pet.run() depending on what the pet can do.
// Use the `in` operator for narrowing, and make the last branch an exhaustiveness check (const _: never = pet).
export interface Fish { swim(): string }
export interface Bird { fly(): string }
export interface Dog { run(): string }
export function move(pet: Fish | Bird | Dog): string {
  // ✏️ YOUR CODE HERE
  return '';
}
