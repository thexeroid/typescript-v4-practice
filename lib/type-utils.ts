// Type-level test helpers. Expect<Equal<A, B>> fails to compile unless A and B are exactly the same type.
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export type Expect<T extends true> = T;
