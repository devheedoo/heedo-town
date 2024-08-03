"use client";

import classNames from "classnames";
import { useAtom } from "jotai";

import { tasksTodayAtom, tasksYesterdayAtom } from "@/atoms/tasks-atom";
import { showTodayTimeOrDate } from "@/utils/date-format";
import { getTasksDelayedToday, getTasksDoneToday } from "@/utils/task-filters";

export type ClosingTodayModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const ClosingTodayModal = ({
  isOpen,
  onClose,
}: ClosingTodayModalProps) => {
  const [tasksToday, setTasksToday] = useAtom(tasksTodayAtom);
  const [, setTasksYesterday] = useAtom(tasksYesterdayAtom);

  /**
   * 오늘 한 일 마무리하기
   * - 어제 완료하지 않은 일들과 비교해서 오늘 완료한 일들 표시
   * - [기록 저장하기] 버튼 클릭 시: 오늘 한 일을 어제 한 일에 저장하고, 미뤄진 일들만 오늘 할 일로 저장
   */
  function closeToday() {
    const tasksDelayedToday = getTasksDelayedToday(tasksToday);

    setTasksYesterday(tasksToday);
    setTasksToday(tasksDelayedToday);
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
          {getTasksDoneToday(tasksToday).map((t) => (
            <li className="gap flex items-center" key={t.id}>
              <label className="label gap-x-2">
                <span className="label-text font-light">[완료]</span>
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
                closeToday();
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
