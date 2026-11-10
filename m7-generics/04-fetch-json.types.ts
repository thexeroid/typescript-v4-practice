// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { fetchJson } from './04-fetch-json.ts';
const isNums = (x: unknown): x is number[] => Array.isArray(x);
async function demo() { const v = await fetchJson('/n', isNums); type _ = Expect<Equal<typeof v, number[]>>; }
