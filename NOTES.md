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
