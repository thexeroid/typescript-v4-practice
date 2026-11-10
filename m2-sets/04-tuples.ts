// Only edit the spots marked ✏️. Run:  npm test -- m2-sets/04-tuples.test.js
// DRILL 4 — Tuples. parseCarId('2002-Toyota-Corolla') → [2002, 'Toyota', 'Corolla'].
// Give it an explicit return type: a tuple of exactly [year: number, make: string, model: string].

type Car = [year: number, make: string, model: string];

function isCar(arr: unknown[]): arr is Car {
  if (
    arr.length < 3 ||
    typeof arr[0] !== "number" ||
    (typeof arr[0] === "number" && Number.isNaN(arr[0])) ||
    typeof arr[1] !== "string" ||
    typeof arr[2] !== "string"
  )
    return false;

  return true;
}

export function parseCarId(id: string): Car {
  // ✏️ YOUR CODE HERE
  const raw: unknown[] = id.split("-");
  if (raw.length > 0) raw[0] = Number(raw[0]);

  if (!isCar(raw)) throw new Error("Invalid input specified...");

  return raw;
}
