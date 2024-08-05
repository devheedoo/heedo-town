import { atomWithStorage } from "jotai/utils";

import type { TasksRecord } from "@/types/tasks-record.type";

export const tasksRecords = atomWithStorage<TasksRecord[]>("tasks-records", []);
