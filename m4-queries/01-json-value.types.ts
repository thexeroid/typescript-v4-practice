// Type-level checks for your stub — run by the test. No need to edit this file.
import type { JSONValue } from './01-json-value.ts';
const ok: JSONValue[] = ['a', 1, true, null, [1, ['x', { y: null }]], { a: { b: [1, 2, { c: 'd' }] } }];
// @ts-expect-error
const f: JSONValue = () => 1;
// @ts-expect-error
const u: JSONValue = undefined;
// @ts-expect-error
const d: JSONValue = new Date();
// @ts-expect-error
const n: JSONValue = { a: { b: 10n } };
