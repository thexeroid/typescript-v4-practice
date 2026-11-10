// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { listToDict, type Dict } from './02-list-to-dict.ts';
const d = listToDict([{ id: 'a', n: 1 }]); type _ = Expect<Equal<typeof d, Dict<{ id: string; n: number }>>>;
// @ts-expect-error — no id
listToDict([{ name: 'x' }]);
// @ts-expect-error — id must be a string
listToDict([{ id: 1 }]);
