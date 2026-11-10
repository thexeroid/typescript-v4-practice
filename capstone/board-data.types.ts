// Type-level checks for your stub — run by the test. No need to edit this file.
import type { Equal, Expect } from '../lib/type-utils.ts';
import { createStore, reducer, parseBoards, type Action, type Board, type Task } from './board-data.ts';
type _ = [Expect<Equal<Action['type'], 'addTask' | 'moveTask' | 'toggleSubtask' | 'deleteTask'>>, Expect<Equal<Task['subtasks'][number]['isCompleted'], boolean>>,
  Expect<Equal<Board['columns'][number]['tasks'], Task[]>>];
const boards: Board[] = parseBoards({});
const st = createStore(reducer, boards);
st.dispatch({ type: 'moveTask', board: 'b', task: 't', to: 'Done' });
const s: Board[] = st.getState();
// @ts-expect-error — toggleSubtask needs an index
st.dispatch({ type: 'toggleSubtask', board: 'b', task: 't' });
// @ts-expect-error — unknown action
st.dispatch({ type: 'archive', board: 'b' });
