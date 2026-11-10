// Test helpers. load(): imports YOUR stub next to the test, or the reference solution when SOLUTIONS=1
// (used only to prove every test is correct before you start).
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export async function load(testUrl, file) {
  const dir = dirname(fileURLToPath(testUrl));
  const target = process.env.SOLUTIONS ? join(ROOT, '.solutions', relative(ROOT, dir), file) : join(dir, file);
  return import(pathToFileURL(target).href + '?t=' + Date.now());
}

// Runs fn while capturing console.log output (as strings joined by spaces).
export function captureLogs(fn) {
  const logs = []; const orig = console.log;
  console.log = (...a) => logs.push(a.map(String).join(' '));
  try { fn(); } finally { console.log = orig; }
  return logs;
}
export async function captureLogsAsync(fn, waitMs = 60) {
  const logs = []; const orig = console.log;
  console.log = (...a) => logs.push(a.map(String).join(' '));
  try { await fn(); await new Promise(r => setTimeout(r, waitMs)); } finally { console.log = orig; }
  return logs;
}
export const isTodo = v => v === undefined || (Array.isArray(v) && v.length === 0) || v === 'TODO';
export const todoMsg = 'Not attempted yet — fill in the TODO in the stub file.';

// Source text of the file the test is checking (yours, or the reference when SOLUTIONS=1) — for "no class / no new" style rules.
import { readFileSync } from 'node:fs';
export function sourceOf(testUrl, file) {
  const dir = dirname(fileURLToPath(testUrl));
  return readFileSync(process.env.SOLUTIONS ? join(ROOT, '.solutions', relative(ROOT, dir), file) : join(dir, file), 'utf8');
}
// Expected answers that cannot be computed by running code are stored base64 so they don't spoil you at a glance.
export const unveil = s => JSON.parse(Buffer.from(s, 'base64').toString('utf8'));
// Runs a snippet in a fresh sloppy-mode realm: returns its completion value, or the error name if it throws.
import vm from 'node:vm';
export function outcome(code) {
  try { return vm.runInNewContext(code, {}); } catch (e) { return e && e.constructor && e.constructor.name; }
}

// ---- TypeScript helpers ----
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { stripTypeScriptTypes } from 'node:module';
const TSC = [join(ROOT, 'node_modules/.bin/tsc'), join(ROOT, '../../web/node_modules/.bin/tsc')].find(existsSync);
const TSC_FLAGS = ['--noEmit', '--strict', '--target', 'es2022', '--lib', 'es2022,dom', '--module', 'nodenext', '--moduleResolution', 'nodenext',
  '--allowImportingTsExtensions', '--skipLibCheck'];
function runTsc(file) {
  if (!TSC) return { ok: false, output: 'TypeScript compiler not found — run `npm install` in this folder.' };
  try { execFileSync(TSC, [...TSC_FLAGS, file], { encoding: 'utf8', cwd: ROOT }); return { ok: true, output: '' }; }
  catch (e) { return { ok: false, output: String(e.stdout || e.message).replace(new RegExp(ROOT + '/', 'g'), '') }; }
}
// Type-checks a .types.ts file next to the test (it imports your stub), in strict mode.
export function typecheck(testUrl, file) {
  const dir = dirname(fileURLToPath(testUrl));
  return runTsc(process.env.SOLUTIONS ? join(ROOT, '.solutions', relative(ROOT, dir), file) : join(dir, file));
}
// Does this standalone snippet compile under strict TypeScript? (true = compiles, false = a type error)
export function compiles(code) {
  const d = mkdtempSync(join(tmpdir(), 'ts-snip-')), f = join(d, 'snippet.ts');
  writeFileSync(f, 'export {};\n' + code); return runTsc(f).ok;
}
// What is left after TypeScript is turned into JavaScript ('transform' mode also handles enums).
export const emitted = code => stripTypeScriptTypes(code, { mode: 'transform' });
