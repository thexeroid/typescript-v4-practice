// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { describe, type Car } from './02-optional-props.ts';
type _ = [Expect<Equal<Car['chargeVoltage'], number | undefined>>, Expect<Equal<Car['year'], number>>, Expect<Equal<Car['make'], string>>];
describe({ make: 'Toyota', model: 'Corolla', year: 2002 });
// @ts-expect-error — year is required
describe({ make: 'Toyota', model: 'Corolla' });
