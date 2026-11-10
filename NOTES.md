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
