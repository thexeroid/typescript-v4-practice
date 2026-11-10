// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';

import { createEmitter } from './01-typed-emitter.ts';
type Events = { answer: { questionId: number; choice: string }; theme: 'light' | 'dark' };
const e = createEmitter<Events>();
e.on('answer', a => { type _ = Expect<Equal<typeof a, { questionId: number; choice: string }>>; });
e.emit('theme', 'dark');
// @ts-expect-error — not a theme
e.emit('theme', 'blue');
// @ts-expect-error — no such event
e.on('nope', () => {});
