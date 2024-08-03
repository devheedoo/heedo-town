import type { Task } from "@/types/Task";

/**
 * @param tasksToday
 * @returns 오늘 완료한 일들
 */
export function getTasksDoneToday(tasksToday: Task[]): Task[] {
  const tasksDoneToday = tasksToday.filter((t) => t.state === "done");
  return tasksDoneToday;
}

/**
 * @param tasksToday
 * @returns 오늘 미뤄진 일들
 */
export function getTasksDelayedToday(tasksToday: Task[]): Task[] {
  const tasksDelayedToday = tasksToday.filter((t) => t.state !== "done");
  return tasksDelayedToday;
}
