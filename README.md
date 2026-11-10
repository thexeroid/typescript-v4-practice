# Hands-on workspace — TypeScript Fundamentals, v4

Every drill = a `.ts` stub you edit + a test that **type-checks it in strict mode** (`tsc`) and **runs it** (Node strips the types).
Some drills also have a `.types.ts` file with type-level checks (`Expect<Equal<…>>`, `@ts-expect-error`) — don't edit those.

    cd ~/Documents/Systems/learning-app/workspaces/typescript-v4
    npm test            # everything
    npm run m7          # only mission 7 (generics)
    npm run watch       # re-run on save

Needs Node 22.18+. The tests use the TypeScript compiler from `../../web/node_modules` (or run `npm install` here).
Stuck? `.solutions/` has reference answers — try first, peek second.
