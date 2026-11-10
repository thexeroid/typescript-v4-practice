// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { store, type StoredUser } from './03-intersections.ts';
type _ = [Expect<Equal<StoredUser['id'], string>>, Expect<Equal<StoredUser['createdAt'], Date>>, Expect<Equal<StoredUser['name'], string>>];
const s = store({ name: 'a', email: 'b' }, 'x', new Date()); const d: Date = s.updatedAt;
