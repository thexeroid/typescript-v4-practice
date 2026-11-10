// Only edit the spots marked ✏️. Run:  npm test -- m2-sets/02-optional-props.test.js
// DRILL 2 — Optional properties. Model a car where chargeVoltage is optional (only electric cars have it).
// describe(car) → '2021 Tesla Model 3 (EV, 240V)' for electric, '2002 Toyota Corolla' otherwise.
export interface Car {
  // ✏️ make, model, year, and an OPTIONAL chargeVoltage (number)
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}
export function describe(car: Car): string {
  // ✏️ YOUR CODE HERE
  const base = `${car.year} ${car.make} ${car.model}`;
  return car.chargeVoltage !== undefined
    ? `${base} (EV, ${car.chargeVoltage}V)`
    : base;
}
