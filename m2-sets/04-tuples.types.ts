// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { parseCarId } from './04-tuples.ts';
type _ = Expect<Equal<ReturnType<typeof parseCarId>, [number, string, string]>>;
const [y, m] = parseCarId('2002-Toyota-Corolla'); const yy: number = y; const mm: string = m;
