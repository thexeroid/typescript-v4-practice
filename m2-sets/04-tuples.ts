// Only edit the spots marked ✏️. Run:  npm test -- m2-sets/04-tuples.test.js
// DRILL 4 — Tuples. parseCarId('2002-Toyota-Corolla') → [2002, 'Toyota', 'Corolla'].
// Give it an explicit return type: a tuple of exactly [year: number, make: string, model: string].

type Car = [year: number, make: string, model: string];

// function isCar(arr: unknown[]): arr is Car {
//   if (
//     arr.length !== 3 ||
//     typeof arr[0] !== "number" ||
//     Number.isNaN(arr[0]) ||
//     typeof arr[1] !== "string" ||
//     arr[1].trim().length === 0 ||
//     typeof arr[2] !== "string" ||
//     arr[2].trim().length === 0
//   )
//     return false;
//
//   return true;
// }

function parseYear(year: string | undefined): number {
  if (typeof year === "undefined" || !/^\d{4}$/.test(year))
    throw new Error(`Invalid year: ${year}`);

  return Number(year);
}

function parseName(name: string | undefined): string {
  if (typeof name === "undefined" || !/^[A-Za-z0-9]+$/.test(name))
    throw new Error(`Invalid input: ${name}`);

  return name;
}

export function parseCarId(id: string): Car {
  // ✏️ YOUR CODE HERE
  const [year, make, model, ...rest] = id.split("-");

  if (rest.length) throw new Error("Invalid input specified...");
  return [parseYear(year), parseName(make), parseName(model)];
}
