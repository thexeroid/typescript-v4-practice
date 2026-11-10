// Only edit the spots marked ✏️. Run:  npm test -- m4-queries/03-typeof-as-const.test.js
// DRILL 3 — Types from values. Keep ONE source of truth (the values) and derive the types from them.
// Make themes and config literal + readonly, then derive:
//   Theme  = 'light' | 'dark' | 'contrast'     (from themes)
//   Config = the type of config;  Env = 'prod' (from config)
export const themes = ['light', 'dark', 'contrast']; // ✏️
export const config = { env: 'prod', retries: 3 }; // ✏️
export type Theme = unknown; // ✏️
export type Config = unknown; // ✏️
export type Env = unknown; // ✏️
