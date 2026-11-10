// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { isUser, parseUsers, type User } from './01-is-user.ts';
const v: unknown = JSON.parse('{}');
if (isUser(v)) { type _ = Expect<Equal<typeof v, User>>; }
const list: User[] = parseUsers('[]');
