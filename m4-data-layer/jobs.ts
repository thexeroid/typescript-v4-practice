// M4 BOSS — A typed data layer for a job board.  Run: npm test -- m4-data-layer/jobs.test.js
// Rules (the checks): ONE root type, everything else derived (keyof / indexed access) · filters can't name fields
// that don't exist · zero `any`, zero `as` (except `as const`).
// The data lives in data.json next to this file. Look at it first.

// ✏️ STEP 1 — the ONE root type: the shape of the whole data.json file.
//   role: 'Frontend' | 'Backend' | 'Fullstack' · level: 'Junior' | 'Midweight' | 'Senior'
export type Data = {
  jobs: {
    id: number;
    company: string;
    position: string;
    role: "Frontend" | "Backend" | "Fullstack";
    level: "Junior" | "Midweight" | "Senior";
    languages: string[];
    tools: string[];
    isNew: boolean;
    featured: boolean;
    postedAt: string;
  }[];
}; // TODO

// ✏️ STEP 2 — derive, don't retype:
export type Job = Data["jobs"][number]; // TODO: one element of Data['jobs']
export type Role = Job["role"]; // TODO: Job's role
export type FilterKey = Extract<
  keyof Job,
  "role" | "level" | "languages" | "tools"
>; // TODO: only 'role' | 'level' | 'languages' | 'tools', and it must stay tied to Job's keys
export type Filters = Partial<Record<FilterKey & string, string>>;

function error(msg: string) {
  return new Error(msg);
}

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;
const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every((el) => typeof el === "string");
const isNumber = (x: unknown): x is number => typeof x === "number";
const isString = (x: unknown): x is string => typeof x === "string";
const isBoolean = (x: unknown): x is boolean => typeof x === "boolean";

// ✏️ STEP 3 — the door: turn unknown JSON into Data, or throw. Check every field of every job.
const isJob = (job: unknown): job is Job => {
  if (!isObject(job)) return false;

  const fieldChecks = {
    id: isNumber,
    company: isString,
    position: isString,
    role: (val: unknown) =>
      isString(val) && ["Frontend", "Backend", "Fullstack"].includes(val),
    level: (val: unknown) =>
      isString(val) && ["Junior", "Midweight", "Senior"].includes(val),
    languages: isStringArray,
    tools: isStringArray,
    isNew: isBoolean,
    featured: isBoolean,
    postedAt: isString,
  };

  for (const [key, checkFn] of Object.entries(fieldChecks)) {
    if (!(key in job) || !checkFn(job[key])) return false;
  }

  return true;
};

export function parseData(raw: unknown): Data {
  if (typeof raw !== "object" || raw === null)
    throw error("The input is not a valid object");

  if (!("jobs" in raw) || !Array.isArray(raw["jobs"])) {
    throw error("jobs field is not an array");
  }

  const jobs: unknown[] = raw.jobs;
  if (!jobs.every(isJob)) {
    throw error("Some job(s) are invalid");
  }

  return {
    jobs,
  };
}

// ✏️ STEP 4 — keep jobs matching EVERY filter. A string field must equal the value;
//   an array field (languages, tools) must include it. No filters → all jobs.
export function filterJobs(jobs: Job[], filters: Filters): Job[] {
  const filtersEntries = Object.entries(filters);

  return jobs.filter((job) => {
    for (const [filterKey, filterVal] of filtersEntries) {
      switch (filterKey) {
        case "role":
        case "level":
          if (filterVal !== job[filterKey]) return false;
          break;

        case "languages":
        case "tools":
          if (!job[filterKey].includes(filterVal)) return false;
          break;
      }
    }

    return true;
  });
}
