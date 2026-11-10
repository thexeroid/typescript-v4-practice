// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { totalLength, firstLong } from './02-strict-on.ts';
type _ = [Expect<Equal<Parameters<typeof totalLength>[0], string[]>>, Expect<Equal<ReturnType<typeof totalLength>, number>>];
const s: string = firstLong([]);
