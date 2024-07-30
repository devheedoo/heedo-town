import { atomWithStorage } from "jotai/utils";

import type { Task } from "@/types/Task";

export const tasksTodayAtom = atomWithStorage<Task[]>("tasks-today", []);

export const tasksYesterdayAtom = atomWithStorage<Task[]>(
  "tasks-yesterday",
  []
);
