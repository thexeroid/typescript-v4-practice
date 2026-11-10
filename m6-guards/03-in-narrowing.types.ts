// Type-level checks for your stub — run by the test. No need to edit this file.
import { move } from './03-in-narrowing.ts';
move({ swim: () => 'a' });
// @ts-expect-error — a cat is none of these
move({ purr: () => 'a' });
