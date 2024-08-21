import type { Task } from "@/types/task.type";

/** YYYY-MM-DD 형식의 10글자 문자열 */
export type DateString = string;

export type TasksSnapshot = {
  // 하루 마무리하기 기능을 같은 날짜에 두 번 누를 경우 덧씌워짐, 추후에 병합 기능 개발
  timestamp: number; // 하루 마무리하기 날짜, 1722840496810
  tasks: Task[];
};
