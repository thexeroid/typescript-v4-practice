// Only edit the spots marked ✏️. Run:  npm test -- m4-queries/04-indexed-access.test.js
// DRILL 4 — Pull types out of a big type instead of re-typing them.
// LineItem = the type of ONE element of Invoice['items'];  Currency = Invoice['currency'].
// invoiceTotal(inv) = sum of qty × unitPrice.
export interface Invoice {
  id: string;
  currency: "EUR" | "USD" | "GBP";
  items: { sku: string; qty: number; unitPrice: number }[];
}

export type LineItem = Invoice["items"][number]; // ✏️
export type Currency = Invoice["currency"]; // ✏️
export function invoiceTotal(inv: Invoice): number {
  // ✏️ YOUR CODE HERE
  return inv.items.reduce(
    (acc, { qty, unitPrice }) => acc + qty * unitPrice,
    0,
  );
}
