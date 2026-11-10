import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, typecheck } from '../lib/harness.js';

const task = (title, status, subtasks = []) => ({ title, description: '', status, subtasks });
const data = { boards: [{ name: 'Launch', columns: [
  { name: 'Todo', tasks: [task('Write copy', 'Todo', [{ title: 'Draft', isCompleted: false }, { title: 'Review', isCompleted: false }])] },
  { name: 'Doing', tasks: [] }, { name: 'Done', tasks: [task('Pick name', 'Done')] }] }] };
test('type checks (strict)', async () => {
  const r = typecheck(import.meta.url, 'board-data.types.ts'); assert.ok(r.ok, 'TypeScript errors:\n' + r.output);
});
test('parseBoards validates', async () => {
  const { parseBoards } = await load(import.meta.url, 'board-data.ts');
  assert.deepEqual(parseBoards(data), data.boards);
  const wrongStatus = { boards: [{ name: 'x', columns: [{ name: 'Todo', tasks: [task('a', 'Done')] }] }] };
  for (const bad of [null, {}, { boards: [{ name: 1, columns: [] }] }, wrongStatus, { boards: [{ name: 'x', columns: [{ name: 'Todo', tasks: [{ title: 'a' }] }] }] }])
    assert.throws(() => parseBoards(bad), TypeError);
});
test('reducer: add, move, toggle, delete — immutably', async () => {
  const { reducer } = await load(import.meta.url, 'board-data.ts');
  const start = structuredClone(data.boards), frozen = JSON.stringify(start);
  let s = reducer(start, { type: 'addTask', board: 'Launch', column: 'Doing', task: task('Build site', 'whatever') });
  assert.equal(s[0].columns[1].tasks[0].status, 'Doing');
  s = reducer(s, { type: 'moveTask', board: 'Launch', task: 'Write copy', to: 'Done' });
  assert.deepEqual(s[0].columns[2].tasks.map(t => [t.title, t.status]), [['Pick name', 'Done'], ['Write copy', 'Done']]);
  assert.equal(s[0].columns[0].tasks.length, 0);
  s = reducer(s, { type: 'toggleSubtask', board: 'Launch', task: 'Write copy', index: 1 });
  assert.equal(s[0].columns[2].tasks[1].subtasks[1].isCompleted, true);
  s = reducer(s, { type: 'deleteTask', board: 'Launch', task: 'Pick name' });
  assert.deepEqual(s[0].columns[2].tasks.map(t => t.title), ['Write copy']);
  assert.equal(JSON.stringify(start), frozen, 'the input must never be mutated');
});
test('unknown targets return the same array', async () => {
  const { reducer } = await load(import.meta.url, 'board-data.ts');
  const b = structuredClone(data.boards);
  assert.notEqual(reducer(b, { type: 'deleteTask', board: 'Launch', task: 'Pick name' }), b, 'a real change returns a new array');
  for (const a of [{ type: 'moveTask', board: 'Nope', task: 'Write copy', to: 'Done' }, { type: 'moveTask', board: 'Launch', task: 'Nope', to: 'Done' },
    { type: 'moveTask', board: 'Launch', task: 'Write copy', to: 'Nope' }, { type: 'toggleSubtask', board: 'Launch', task: 'Write copy', index: 9 },
    { type: 'addTask', board: 'Launch', column: 'Nope', task: task('x', 'x') }, { type: 'deleteTask', board: 'Launch', task: 'Nope' }])
    assert.equal(reducer(b, a), b, JSON.stringify(a));
});
test('generic store notifies only on change', async () => {
  const { createStore, reducer } = await load(import.meta.url, 'board-data.ts');
  const st = createStore(reducer, structuredClone(data.boards)); let n = 0;
  const off = st.subscribe(() => n++);
  st.dispatch({ type: 'deleteTask', board: 'Launch', task: 'Nope' }); st.dispatch({ type: 'deleteTask', board: 'Launch', task: 'Pick name' });
  off(); st.dispatch({ type: 'moveTask', board: 'Launch', task: 'Write copy', to: 'Doing' });
  assert.equal(n, 1); assert.equal(st.getState()[0].columns[1].tasks[0].title, 'Write copy');
});
