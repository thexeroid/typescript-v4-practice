// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { totalArea, Square, Circle } from './02-duck-typing.ts';
totalArea([new Square(2), new Circle(1), { area: () => 5 }]);
// @ts-expect-error — no area method
totalArea([{ side: 2 }]);
