// Type-level checks for your stub — run by the test. No need to edit this file.
import { assertIsDefined } from './02-asserts.ts';
declare const maybe: string | null;
assertIsDefined(maybe, 'maybe');
const sure: string = maybe;
