// Type-level checks for your stub — run by the test. No need to edit this file.
import { Account } from './04-account-class.ts';
const a = new Account('Ana', '1234', 50);
const o: string = a.owner; const b: number = a.balance;
// @ts-expect-error — private
a.pin;
// @ts-expect-error — readonly
a.owner = 'x';
// @ts-expect-error — getter only
a.balance = 5;
