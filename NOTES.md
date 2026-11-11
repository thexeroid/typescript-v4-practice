# TypeScript golden nuggets

Short, in my own words. One line per idea.

## M1 · The compiler

- Types exist only while building. At runtime it's plain JS.
- `tsc` = type checker **+** converter (`.ts` → `.js`). More than a linter.
- `.d.ts` = types-only file. Packages ship `.js` + `.d.ts` so editors know what's inside.
- Plain-JS packages get types from `@types/<name>`.
- `target` = transpiling: rewrites modern syntax (class, async, `?.`) with older syntax. **Not** polyfills.
- `strict` = one switch, ~8 extra checks. Big two: null/undefined checks, no *implicit* `any`.
- Explicit `any` is still allowed under strict → prefer `unknown`, ban `any` with ESLint.
- Strict turns runtime surprises into editor errors.

### Gone vs kept (after compile)
- **Gone** (type-only): `interface`, `type`, `declare`, `import type`, `abstract` members
- **Kept** (real JS): `let`, `function`, `class`, **`enum`** (becomes an object!)

### Gotchas
- `.find()` returns `undefined` (not `null`) when nothing matches.
- `let total;` then `total += x` → `NaN`. TS flags "might be undefined", not the NaN itself.
- One-liner fallback: `list.find(f)?.toUpperCase() ?? ''`
- `tsconfig.json` → `"strict": true` means strict is on.

### M1 boss · typed CLI
- `"types": ["node"]` → load Node built-ins (`process`, `fs`). TS 6+ no longer loads them automatically.
- `nodenext` = check imports with Node's real rules (needs `.js` in relative imports). Bundler projects → `esnext` + `moduleResolution: bundler`.
- Relative paths resolve from the **current terminal folder** (`process.cwd()`), not the script's folder.
- ES modules have no `__dirname` → `import.meta.dirname`.
- `process.argv` = [node, script, ...what you typed] → `const [file] = process.argv.slice(2)`.
- `JSON.parse` returns `any` → write `const x: unknown = JSON.parse(...)` so TS **forces** a check.
- Type guard: `function isItem(x: unknown): x is Item` → when it returns true, TS treats x as Item.
- Use `"name" in x` (TS understands it), not `x.hasOwnProperty("name")` (TS ignores it).
- `arr.every(isItem)` narrows the whole array to `Item[]`.
- Hand-written guards for every schema = lots of work → real projects use **Zod** (check + type from one schema).
- JSON has real numbers: `2` → number, `"2"` → string.

## M2 · Types as sets of values

- A type = a **set** of allowed values. `number` = all numbers; `6` = just {6} (a *literal type*).
- `const` locks the **variable**, not the contents:
  - primitive: `const b = 6` → `6`; `let a = 6` → `number`
  - object/array: `const c = { n: 6 }` → `{ n: number }` (because `c.n = 7` is allowed)
- Arrays infer a union of what's inside: `[1, 'x']` → `(string | number)[]`
- `as const` locks the contents too: `[1, 'x'] as const` → `readonly [1, 'x']` (literal + fixed length + readonly)
- `as const` is on the **value**, so it beats `let`: `let f = 'hi' as const` → `'hi'`
- Ternary: `const` → `'yes' | 0`; `let` → `string | number`
- Union of literals = enum without runtime code: `type Dir = 'up' | 'down'` (gone after compile)
- Optional prop: `chargeVoltage?: number` → type is `number | undefined`, so check before use.
- Template trap: `${false && 'x'}` prints **"false"** → use a ternary `${ok ? 'x' : ''}`.
- Elite habit: check first, then build. Do not build strings or values you might throw away.

### let / const / readonly / as const
- Two separate questions: **Q1** can the *variable* point elsewhere? (`let` yes, `const` no). **Q2** can the *contents* change? (normal yes, `readonly` / `as const` no).
- `readonly` goes on a **type** (params, interfaces): "I won't change it", values stay general.
- `as const` goes on a **value**: readonly + exact literal values, deeply.
- `let x = [1, 2] as const` ≡ `let x: readonly [1, 2] = [1, 2]`. `as const` just saves typing.
- Annotation present → TS uses it (the value only has to fit). No annotation → TS infers from the value.
- `let x: readonly number[] = [1, 2] as const` → the `as const` is pointless; the annotation wins.

### Excess properties & tuples (the 3 laws)
- Law 1: shape is enough. Extra props are fine (structural typing).
- Law 2: TS checks assignments and arguments, not what methods do.
- Law 3: TS isn't 100% safe on purpose (practical bouncer).
- Exception: a **fresh literal** (written right in the call/assignment) with extra props → error (typo catcher, since TS 1.6).
- `[number, string]` tuple: `.push(2)` compiles (a known hole); `readonly` tuple has no `.push` at all.
- Tuple **length is part of the type**: `[1, 'a', 2]` doesn't fit `[number, string]` (fresh or not).
- `let n;` with no value = **evolving type**: TS follows each assignment. Still safe (it knows the type at every line), but elite habit: annotate `let n: number;`.
- TS doesn't do math on types: `2 + 2` is `number`, not `4`.

### 🧭 How TS decides a type (the flowchart)
1. Did **I write** a type (`: number`)? → that's the type. The value only has to fit. (`const z: number = 5` → `number`, NOT `5`)
2. Else, `const` + primitive? → exact value (`5`, `'hi'`)
3. Else (`let`, objects, arrays) → wide (`number`, `string | number`, `number[]`). `as const` on the value → exact + readonly.
- `let y = cond ? 1 : 'one'` → `string | number` (let widens). `const` → `1 | 'one'`.
- Always ask first: **annotation? let or const?**
- Two views per line: 🛠️ what TS allows (dev time) vs ▶️ what JS does (runtime). Bugs live in the gap.
- Rapid fire 1: 11/13 → misses retried ✅
- `str.split('-')` → **all strings**. TS converts nothing: `Number(x)` is my job.
- ⚠️ A type guard (`x is Car`) is a **promise TS trusts blindly**. If it checks without converting, TS believes a lie. Guards **check**; parsers **check + convert**.
- `Number('')` is `0`, not NaN. Empty parts slip through `isNaN` checks.
- Validate the raw text **before** coercing (`/^\d{4}$/.test(y)`), then `Number(y)`. Coercion hides bad input (`"" → 0`).
- `Number()` trims spaces; empty → **0**: `''`, `'   '`, `'\n'`, `'00'` → 0. Also `'0x10'` → 16, `'1e3'` → 1000, `'12px'` → NaN. After coercing, the info is gone.
- 🔒 **Validation rule: allowlist, not denylist.** Define what's valid (year = 4 digits; make = non-empty), reject everything else. That's where to stop, not by chasing weird inputs.
- Only coerce what must be a number; keep the rest as strings (`'00'` as a model is fine).
- **Parse, don't validate:** one small parser per field (`parseYear`, `parseName`) that checks + converts together. One source of truth per rule.
- IDs/machine data → strict, no trimming. Human-typed form input → trim, be forgiving. Pick one rule and write it down.
- Regex: `^` = start, `$` = end. `[A-z]` is a bug (it includes `[ \ ] ^ _` and backtick) → use `[A-Za-z]`.
- `const [a, b, c, ...rest] = s.split('-')` → `rest.length` catches extra parts.
- Don't comment out dead code. Delete it; git remembers.

### M2 boss · phone book
- Object type: `type Contact = { phone: string; email?: string }`
- Dictionary with any keys: `Record<string, Contact>` (same as `{ [name: string]: Contact }`). A lookup gives `Contact | undefined`.
- Guards are for **unknown** data at the boundary (JSON, input). Already-typed data only needs an `undefined` check. Check once at the door 🚪
- "No result" → return `undefined`, not fake values (`'none'`, `-1`, `''`). It forces callers to handle it: `emailOf(b, n) ?? 'no email'`.
- `as` = "trust me, TS" ❌. An annotation = "check me, TS" ✅. `{} as Record<…>` → `reduce((acc: T, …) => …, {})` or `reduce<T>(…)`.
- TS forgets that a key came from `Object.keys` → the lookup is still `| undefined`. Use `Object.entries` to get `[key, value]` pairs.
- `Object.entries` is slightly slower (an array per pair), but negligible. Clear code first; optimize after measuring.
- Functional vs loop = style. Pick what reads clearest. A loop is fine when tracking several things at once.
- Destructure tuples for readability: `([who]) => …`, `(sum, [, minutes]) => …`

## M3 · Unions and intersections

- **Discriminated union:** several object shapes that share one literal field (`status`). Check that field → TS narrows to the right shape (`r.data` exists only in `'ok'`).
- `switch (r.status)` + `default: return assertNever(r)` → if someone adds a new status later, it's a **compile error** until it's handled. Exhaustiveness for free.
- `assertNever(x: never)`: in `default`, `r` is `never` only if every case is covered.
- Never hard-code values the data already carries (`Error: ${r.message}`, not `'Error: boom'`). Tests with one example can't catch it.
- `…` (one character) ≠ `...` (three dots). Copy exact strings from the spec.
