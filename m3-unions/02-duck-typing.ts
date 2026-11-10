// Only edit the spots marked ✏️. Run:  npm test -- m3-unions/02-duck-typing.test.js
// DRILL 2 — Structural typing ("if it has the shape, it fits"). Write an interface HasArea with area(): number,
// totalArea(shapes) that sums them, and two classes Square(side) and Circle(r) that do NOT say "implements".
// totalArea([new Square(2), new Circle(1)]) → 4 + π. A plain object { area: () => 5 } must be accepted too.
export interface HasArea {} // ✏️
export function totalArea(shapes: HasArea[]): number {
  // ✏️ YOUR CODE HERE
  return 0;
}
export class Square {} // ✏️
export class Circle {} // ✏️
