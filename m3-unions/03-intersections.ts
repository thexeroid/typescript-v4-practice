// Only edit the spots marked ✏️. Run:  npm test -- m3-unions/03-intersections.test.js
// DRILL 3 — Intersections. StoredUser = User & WithId & WithTimestamps.
// store(user, id, now) returns a StoredUser with createdAt and updatedAt both = now.
export interface User { name: string; email: string }
export type WithId = { id: string };
export type WithTimestamps = { createdAt: Date; updatedAt: Date };
export type StoredUser = User & WithId & WithTimestamps;
export function store(user: User, id: string, now: Date): StoredUser {
  return {
    ...user,
    id,
    createdAt: now,
    updatedAt: now,
  };
}
