// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { render, type FetchResult } from './01-result-union.ts';
type _ = Expect<Equal<FetchResult['status'], 'loading' | 'ok' | 'error'>>;
render({ status: 'ok', data: [] });
// @ts-expect-error — ok needs data
render({ status: 'ok' });
// @ts-expect-error — unknown status
render({ status: 'done' });
