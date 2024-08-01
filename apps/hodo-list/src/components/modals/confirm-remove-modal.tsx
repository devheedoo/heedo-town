import classNames from "classnames";
import { useAtom } from "jotai";

import { tasksTodayAtom } from "@/atoms/tasks-atom";

export const ConfirmRemoveModal = ({
  taskIdRemoved,
  isOpen,
  onClose,
}: {
  taskIdRemoved: string;
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const [tasksToday, setTasksToday] = useAtom(tasksTodayAtom);

  function removeTask() {
    const updatedTasks = tasksToday.filter((t) => t.id !== taskIdRemoved);
    setTasksToday(updatedTasks);
  }

  return (
    <dialog
      id="confirm_remove_modal"
      className={classNames("modal", { "modal-open": isOpen })}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">할 일 삭제</h3>
        <p className="py-4">정말로 삭제하시겠습니까?</p>
        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success"
              onClick={() => {
                removeTask();
                onClose();
              }}
            >
              삭제하기
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
