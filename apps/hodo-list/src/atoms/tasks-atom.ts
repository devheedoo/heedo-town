import { atomWithStorage } from "jotai/utils";

import type { Task } from "@/types/task.type";

/**
 * 유저가 실시간으로 보고 있는 할 일들
 */
export const tasksTodayAtom = atomWithStorage<Task[]>("tasks-today", []);

/**
 * 하루 마무리하기 기능을 위해 비교 척도가 되는 어제 기준 할 일들
 */
export const tasksYesterdayAtom = atomWithStorage<Task[]>(
  "tasks-yesterday",
  []
);
