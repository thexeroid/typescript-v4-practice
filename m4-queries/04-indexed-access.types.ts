// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import type { LineItem, Currency } from './04-indexed-access.ts';
type _ = [Expect<Equal<LineItem, { sku: string; qty: number; unitPrice: number }>>, Expect<Equal<Currency, 'EUR' | 'USD' | 'GBP'>>];
