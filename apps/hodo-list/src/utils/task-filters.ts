import type { Task } from "@/types/Task";

export type TaskFiltersParam = {
  tasksYesterday: Task[];
  tasksToday: Task[];
};

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 취소된 일들
 */
export function getTasksRemovedToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const taskIdsYesterday = tasksYesterday.map((t) => t.id);
  const taskIdsToday = tasksToday.map((t) => t.id);
  const taskIdsRemovedToday = taskIdsYesterday.filter(
    (taskId) => !taskIdsToday.includes(taskId)
  );

  const tasksRemovedToday = tasksYesterday.filter((t) =>
    taskIdsRemovedToday.includes(t.id)
  );
  return tasksRemovedToday;
}

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 추가된 일들
 */
export function getTasksAddedToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const taskIdsYesterday = tasksYesterday.map((t) => t.id);
  const taskIdsToday = tasksToday.map((t) => t.id);
  const taskIdsAddedToday = taskIdsToday.filter(
    (taskId) => !taskIdsYesterday.includes(taskId)
  );

  const tasksAddedToday = tasksToday.filter((t) =>
    taskIdsAddedToday.includes(t.id)
  );
  return tasksAddedToday;
}

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 추가한 todo 일들
 */
export function getTasksAddedTodoToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const tasksAddedToday = getTasksAddedToday({ tasksYesterday, tasksToday });
  const tasksAddedTodoToday = tasksAddedToday.filter((t) => t.state === "todo");
  return tasksAddedTodoToday;
}

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 추가한 done 일들
 */
export function getTasksAddedDoneToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const tasksAddedToday = getTasksAddedToday({ tasksYesterday, tasksToday });
  const tasksAddedDoneToday = tasksAddedToday.filter((t) => t.state === "done");
  return tasksAddedDoneToday;
}

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 변경이 없는 일들
 */
export function getTasksUnchangedToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const taskIdsYesterday = tasksYesterday.map((t) => t.id);
  const taskIdsToday = tasksToday.map((t) => t.id);
  const taskIdsUnchangedToday = taskIdsYesterday.filter((taskId) =>
    taskIdsToday.includes(taskId)
  );

  const tasksUnchangedToday = tasksToday.filter((t) =>
    taskIdsUnchangedToday.includes(t.id)
  );
  return tasksUnchangedToday;
}

/**
 * @param tasksYesterday
 * @param tasksToday
 * @returns 오늘 상태가 바뀐 일들
 */
export function getTasksStateChangedToday({
  tasksYesterday,
  tasksToday,
}: TaskFiltersParam) {
  const tasksUnchangedToday = getTasksUnchangedToday({
    tasksYesterday,
    tasksToday,
  });
  const updatedCurrentTasks = tasksUnchangedToday
    .map((taskToday) => {
      const taskYesterday = tasksYesterday.find((t) => t.id === taskToday.id);
      const isTaskStateChanged =
        taskYesterday !== undefined && taskYesterday.state !== taskToday.state;
      return isTaskStateChanged ? taskToday : null;
    })
    .filter((t) => t !== null);
  return updatedCurrentTasks;
}
