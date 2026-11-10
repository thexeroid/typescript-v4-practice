// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import type { A, B, C, DD, E, F, G } from './01-inferred-types.ts';
let a = 6; const b = 6; const c = { n: 6 }; let d = [1, 'x']; const e = [1, 'x'] as const; let f = 'hi' as const;
const g = Math.random() > 0.5 ? 'yes' : 0;
type _ = [Expect<Equal<A, typeof a>>, Expect<Equal<B, typeof b>>, Expect<Equal<C, typeof c>>, Expect<Equal<DD, typeof d>>,
  Expect<Equal<E, typeof e>>, Expect<Equal<F, typeof f>>, Expect<Equal<G, typeof g>>];
