import classNames from "classnames";
import { useAtom } from "jotai";
import { useState } from "react";

import { tasksTodayAtom } from "@/atoms/tasks-atom";
import type { Task } from "@/types/task.type";

export type ChangeTitleModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  taskId: string;
};

export const ChangeTitleModal = ({
  isOpen,
  onClose,
  taskId,
}: ChangeTitleModalProps) => {
  const [tasksToday, setTasksToday] = useAtom(tasksTodayAtom);

  const updatingTask = tasksToday.find((t) => t.id === taskId);
  const [newTaskTitle, setNewTaskTitle] = useState(updatingTask?.title ?? "");

  function updateTaskTitle() {
    const task = tasksToday.find((t) => t.id === taskId);
    if (!task) {
      return;
    }

    const taskUpdated: Task = {
      ...task,
      title: newTaskTitle,
    };
    const tasksUpdated = tasksToday
      .filter((t) => t.id !== taskId)
      .concat([taskUpdated]);
    tasksUpdated.sort((a, b) => b.createdAt - a.createdAt);
    setTasksToday(tasksUpdated);
  }

  return (
    <dialog
      id="change_title_modal"
      className={classNames("modal", { "modal-open": isOpen })}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">할 일 변경</h3>
        <p className="py-4">할 일을 입력해주세요.</p>

        <input
          type="text"
          className="input input-bordered w-full max-w-xs font-medium text-gray-200"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          autoFocus
          value={newTaskTitle}
        />

        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success"
              onClick={() => {
                updateTaskTitle();
                onClose();
              }}
            >
              변경하기
            </button>
            <button className="btn btn-outline btn-success" onClick={onClose}>
              취소하기
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
