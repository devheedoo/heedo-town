"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import { tasksTodayAtom } from "@/atoms/tasks-atom";
import { ChangeTitleModal } from "@/components/modals/change-title-modal";
import { ConfirmRemoveModal } from "@/components/modals/confirm-remove-modal";
import { ReportModal } from "@/components/modals/report-modal";
import type { Task } from "@/types/Task";
import { showTodayTimeOrDate } from "@/utils/date-format";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const [isOpenChangeTitleModal, setIsOpenChangeTitleModal] = useState(false);
  const [isOpenConfirmRemoveModal, setIsOpenConfirmRemoveModal] =
    useState(false);

  // TODO: LocalStorage 대신 로그인 후 데이터베이스 사용하기
  const [tasksToday, setTasksToday] = useAtom(tasksTodayAtom);

  // state
  function addTask() {
    if (newTaskTitle.trim().length === 0) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title: newTaskTitle,
      createdAt: new Date().valueOf(),
      state: "todo",
    };
    setTasksToday((tasks) => [newTask, ...tasks]);
    setNewTaskTitle("");
  }

  function updateTaskState(taskId: string) {
    const task = tasksToday.find((t) => t.id === taskId);
    if (!task) {
      return;
    }

    const taskUpdated: Task = {
      ...task,
      state: task.state === "todo" ? "done" : "todo",
    };
    const tasksUpdated = tasksToday
      .filter((t) => t.id !== taskId)
      .concat([taskUpdated]);
    tasksUpdated.sort((a, b) => b.createdAt - a.createdAt);
    setTasksToday(tasksUpdated);
  }

  // handler
  function handleKeyUpAddButton(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function handleClickTaskTitle(taskId: string) {
    setUpdatingTaskId(taskId);
    setIsOpenChangeTitleModal(true);
  }

  function handleClickRemoveButton(taskId: string) {
    setUpdatingTaskId(taskId);
    setIsOpenConfirmRemoveModal(true);
  }

  return (
    <div
      className={classNames(
        "flex min-h-screen items-center justify-center",
        "text-3xl font-extrabold uppercase text-green-700"
      )}
    >
      <div className="flex max-w-screen-lg flex-col items-center justify-center">
        <h1 className="m-4">Hodo List</h1>

        <div className="mb-4 flex gap-x-2">
          <input
            type="text"
            placeholder="할 일을 적어주세요."
            className="input input-bordered peer w-full placeholder:font-extralight"
            value={newTaskTitle}
            required
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyUp={handleKeyUpAddButton}
            autoFocus // !!! nonviable on webkit
            data-testid="task-input"
          />
          <button
            className="btn btn-outline btn-success peer-invalid:btn-disabled"
            onClick={addTask}
          >
            추가
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() =>
              (
                document.getElementById("report_modal") as HTMLDialogElement
              )?.showModal()
            }
          >
            하루 마무리하기
          </button>

          <ReportModal />
        </div>

        <div id="list-container">
          {tasksToday.length === 0 && <span>No items...</span>}
          <ul className="flex flex-col gap-y-2">
            {tasksToday.map((t) => (
              <li className="flex items-center gap-1.5" key={t.id}>
                <label className="label cursor-pointer gap-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    defaultChecked={t.state === "done"}
                    onClick={() => updateTaskState(t.id)}
                  />
                </label>

                <button
                  data-testid="task-title"
                  className="text-sm normal-case text-gray-200"
                  onClick={() => handleClickTaskTitle(t.id)}
                >
                  {t.title}
                </button>

                <span className="label-text font-extralight">
                  {showTodayTimeOrDate(t.createdAt)}
                </span>

                <button onClick={() => handleClickRemoveButton(t.id)}>
                  <XMarkIcon className="size-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpenChangeTitleModal && updatingTaskId && (
        <ChangeTitleModal
          isOpen={isOpenChangeTitleModal}
          onClose={() => setIsOpenChangeTitleModal(false)}
          taskId={updatingTaskId}
        />
      )}

      {isOpenConfirmRemoveModal && updatingTaskId && (
        <ConfirmRemoveModal
          isOpen={isOpenConfirmRemoveModal}
          onClose={() => setIsOpenConfirmRemoveModal(false)}
          taskId={updatingTaskId}
        />
      )}
    </div>
  );
}
