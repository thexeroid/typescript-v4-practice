// Only edit the spots marked ✏️. Run:  npm test -- m5-functions/04-account-class.test.js
// DRILL 4 — Classes with parameter properties and real privacy.
// new Account(owner, pin, opening): owner is public readonly, pin is TS-private — declare BOTH as parameter properties
// (constructor(public readonly owner: string, private pin: string, …)). The balance lives in a #balance field.
//   deposit(n) — throws RangeError unless n > 0;  withdraw(n, pin) — throws Error('bad pin') or RangeError('insufficient')
//   get balance() — read-only from outside
export class Account {
  // ✏️ YOUR CODE HERE
  constructor(owner: string, pin: string, opening: number) {}
}
