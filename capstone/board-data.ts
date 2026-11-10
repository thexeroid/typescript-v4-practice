// Only edit the spots marked ✏️. Run:  npm test -- capstone/board-data.test.js
// CAPSTONE — The typed data layer of the Kanban app. ⏱ 120 min
// This is PIECE 2 of your resume capstone "Kanban task manager" (piece 1 is the board engine from JS: The Hard Parts).
// 1) Types: Subtask { title: string; isCompleted: boolean } · Task { title; description; status; subtasks: Subtask[] }
//    Column { name: string; tasks: Task[] } · Board { name: string; columns: Column[] }
// 2) parseBoards(data: unknown): Board[] — data looks like { boards: [...] } (the Frontend Mentor data.json shape).
//    Validate with guards; throw TypeError('bad board data') if anything is off, including a task whose status
//    doesn't equal the name of the column it sits in.
// 3) Action = { type: 'addTask'; board: string; column: string; task: Task }
//           | { type: 'moveTask'; board: string; task: string; to: string }          (task = its title; status follows the column)
//           | { type: 'toggleSubtask'; board: string; task: string; index: number }
//           | { type: 'deleteTask'; board: string; task: string }
// 4) reducer(boards: Board[], action: Action): Board[] — pure and immutable (never mutate the input). If the board,
//    column or task doesn't exist, return the SAME array. switch with an assertNever default.
// 5) createStore<S, A>(reduce, initial) → { getState, dispatch, subscribe(fn) → unsubscribe }. Notify only on change.
export type Subtask = unknown; // ✏️
export type Task = unknown; // ✏️
export type Column = unknown; // ✏️
export type Board = unknown; // ✏️
export type Action = unknown; // ✏️
export function parseBoards(data: unknown): Board[] { return []; } // ✏️
export function reducer(boards: Board[], action: Action): Board[] { return boards; } // ✏️
export function createStore(reduce: any, initial: any): any { return {}; } // ✏️
