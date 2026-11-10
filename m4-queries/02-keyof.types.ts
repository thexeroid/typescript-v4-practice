// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { getProp, pluck } from './02-keyof.ts';
const o = { a: 1, b: 'x' };
const b = getProp(o, 'b'); type _1 = Expect<Equal<typeof b, string>>;
const ages = pluck([{ age: 3, name: 'a' }], 'age'); type _2 = Expect<Equal<typeof ages, number[]>>;
// @ts-expect-error — not a key
getProp(o, 'zzz');
