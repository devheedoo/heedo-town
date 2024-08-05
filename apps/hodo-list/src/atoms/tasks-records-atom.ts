import { atomWithStorage } from "jotai/utils";

import type { TasksRecord } from "@/types/tasks-record";

export const tasksRecords = atomWithStorage<TasksRecord[]>("tasks-records", []);
