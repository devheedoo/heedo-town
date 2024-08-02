"use client";

import classNames from "classnames";
import { useAtom } from "jotai";

import { tasksTodayAtom, tasksYesterdayAtom } from "@/atoms/tasks-atom";
import { showTodayTimeOrDate } from "@/utils/date-format";
import {
  getTasksAddedDoneToday,
  getTasksAddedTodoToday,
  getTasksRemovedToday,
  getTasksStateChangedToday,
} from "@/utils/task-filters";

export type ClosingTodayModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const ClosingTodayModal = ({
  isOpen,
  onClose,
}: ClosingTodayModalProps) => {
  const [tasksToday] = useAtom(tasksTodayAtom);
  const [tasksYesterday, setTasksYesterday] = useAtom(tasksYesterdayAtom);

  function updateTasksYesterday() {
    setTasksYesterday(tasksToday);
  }

  return (
    <dialog
      id="closing_today_modal"
      className={classNames("modal", { "modal-open": isOpen })}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">하루 마무리하기</h3>
        <p className="py-4">오늘의 성장을 기록할게요.</p>
        <ul className="flex flex-col gap-y-1">
          {getTasksStateChangedToday({ tasksYesterday, tasksToday }).map(
            (t) => (
              <li className="gap flex items-center" key={t.id}>
                <label className="label gap-x-2">
                  <span className="label-text font-light">[완료]</span>
                  <span className="label-text">{t.title}</span>
                  <span className="label-text font-extralight">
                    {showTodayTimeOrDate(t.createdAt)}
                  </span>
                </label>
              </li>
            )
          )}
          {getTasksAddedDoneToday({ tasksYesterday, tasksToday }).map((t) => (
            <li className="gap flex items-center" key={t.id}>
              <label className="label gap-x-2">
                <span className="label-text font-light">[추가+완료]</span>
                <span className="label-text">{t.title}</span>
                <span className="label-text font-extralight">
                  {showTodayTimeOrDate(t.createdAt)}
                </span>
              </label>
            </li>
          ))}
          {getTasksAddedTodoToday({ tasksYesterday, tasksToday }).map((t) => (
            <li className="gap flex items-center" key={t.id}>
              <label className="label gap-x-2">
                <span className="label-text font-light">[추가]</span>
                <span className="label-text">{t.title}</span>
                <span className="label-text font-extralight">
                  {showTodayTimeOrDate(t.createdAt)}
                </span>
              </label>
            </li>
          ))}
          {getTasksRemovedToday({ tasksYesterday, tasksToday }).map((t) => (
            <li className="gap flex items-center" key={t.id}>
              <label className="label gap-x-2">
                <span className="label-text font-light">[취소]</span>
                <span className="label-text">{t.title}</span>
                <span className="label-text font-extralight">
                  {showTodayTimeOrDate(t.createdAt)}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="modal-action">
          <form method="dialog" className="flex items-center gap-x-2">
            <button
              className="btn btn-success"
              onClick={() => {
                updateTasksYesterday();
                onClose();
              }}
            >
              기록 저장하기
            </button>
            <button className="btn btn-outline btn-success" onClick={onClose}>
              취소
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
