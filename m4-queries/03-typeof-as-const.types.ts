// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { config, type Theme, type Config, type Env } from './03-typeof-as-const.ts';
type _ = [Expect<Equal<Theme, 'light' | 'dark' | 'contrast'>>, Expect<Equal<Env, 'prod'>>, Expect<Equal<Config['retries'], 3>>];
// @ts-expect-error — readonly
config.retries = 4;
