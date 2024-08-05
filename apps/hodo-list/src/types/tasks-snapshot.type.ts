import type { Task } from "@/types/task.type";

export type TasksSnapshot = {
  timestamp: number; // 1722840496810
  tasks: Task[];
};

/**
 * 할 일 스냅샷 모음
 * - { [date: string // 1993-06-09]: TasksSnapshot }
 * - !!! 하루 마무리하기 기능을 같은 날짜에 두 번 누를 경우 덧씌워짐, 추후에 병합 기능 개발
 */
export type TasksSnapshots = Map<string, TasksSnapshot>;
