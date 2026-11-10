// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { first, last } from './01-first-last.ts';
const a = first([1, 2]); const b = last(['x'] as const); const c = first<{ id: string }>([]);
type _ = [Expect<Equal<typeof a, number | undefined>>, Expect<Equal<typeof b, 'x' | undefined>>, Expect<Equal<typeof c, { id: string } | undefined>>];
