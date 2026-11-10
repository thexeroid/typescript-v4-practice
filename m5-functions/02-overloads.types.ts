// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { format } from './02-overloads.ts';
const a = format(new Date()); const b = format('42');
type _ = [Expect<Equal<typeof a, string>>, Expect<Equal<typeof b, number>>];
// @ts-expect-error — numbers not accepted
format(5);
