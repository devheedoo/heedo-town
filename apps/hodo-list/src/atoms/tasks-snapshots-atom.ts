import type { TasksSnapshots } from "@/types/tasks-snapshot.type";
import { mapAtomWithLocalStorage } from "@/utils/map-atom-with-local-storage";

/**
 * 기록 조회를 위한 매일 하루 마무리하기 누를 때 할 일 스냅샷들
 * - 한 번 생성한 후 변경이 일어나지 않고 조회에 집중된 기능이므로 조회에 최적화된 Map 타입
 */
export const tasksSnapshotsAtom = mapAtomWithLocalStorage<TasksSnapshots>(
  "tasks-snapshots",
  new Map()
);
