// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { mapDict, filterDict, reduceDict, type Dict } from './03-dict-map-filter-reduce.ts';
const fruit: Dict<{ color: string; grams: number }> = {};
const kg = mapDict(fruit, f => f.grams / 1000); type _1 = Expect<Equal<typeof kg, Dict<number>>>;
const light = filterDict(fruit, f => f.grams < 100); type _2 = Expect<Equal<typeof light, Dict<{ color: string; grams: number }>>>;
const names = reduceDict(fruit, (acc: string[], _f, k) => [...acc, k], []); type _3 = Expect<Equal<typeof names, string[]>>;
