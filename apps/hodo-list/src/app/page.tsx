"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import { tasksTodayAtom } from "@/atoms/tasks-atom";
import { ArchiveModal } from "@/components/modals/archive-modal";
import { ChangeTitleModal } from "@/components/modals/change-title-modal";
import { ClosingTodayModal } from "@/components/modals/closing-today-modal";
import { ConfirmRemoveModal } from "@/components/modals/confirm-remove-modal";
import { EditAbilitiesModal } from "@/components/modals/edit-abilities-modal.tsx";
import type { Task } from "@/types/task.type";
import { showTodayTimeOrDate } from "@/utils/date-format";
import { useBoolean } from "@/utils/use-boolean";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const [
    isClosingTodayModalOpen,
    openClosingTodayModal,
    closeClosingTodayModal,
  ] = useBoolean(false);
  const [isArchiveModalOpen, openArchiveModal, closeArchiveModal] =
    useBoolean(false);
  const [isChangeTitleModalOpen, openChangeTitleModal, closeChangeTitleModal] =
    useBoolean(false);
  const [
    isConfirmRemoveModalOpen,
    openConfirmRemoveModal,
    closeConfirmRemoveModal,
  ] = useBoolean(false);
  const [
    isEditAbilitiesModalOpen,
    openEditAbilitiesModal,
    closeEditAbilitiesModal,
  ] = useBoolean(false); // TODO: change to false;

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
    openChangeTitleModal();
  }

  function handleClickRemoveButton(taskId: string) {
    setUpdatingTaskId(taskId);
    openConfirmRemoveModal();
  }

  return (
    <div>
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
      </div>

      <div className="mb-4 flex gap-x-2">
        <button className="btn" onClick={openClosingTodayModal}>
          하루 마무리하기
        </button>

        <button className="btn" onClick={openArchiveModal}>
          기록 되돌아보기
        </button>

        <button className="btn" onClick={openEditAbilitiesModal}>
          능력치 관리하기
        </button>
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

      {isChangeTitleModalOpen && updatingTaskId && (
        <ChangeTitleModal
          isOpen={isChangeTitleModalOpen}
          onClose={closeChangeTitleModal}
          taskId={updatingTaskId}
        />
      )}

      {isConfirmRemoveModalOpen && updatingTaskId && (
        <ConfirmRemoveModal
          isOpen={isConfirmRemoveModalOpen}
          onClose={closeConfirmRemoveModal}
          taskId={updatingTaskId}
        />
      )}

      {isClosingTodayModalOpen && (
        <ClosingTodayModal
          isOpen={isClosingTodayModalOpen}
          onClose={closeClosingTodayModal}
        />
      )}

      {isArchiveModalOpen && (
        <ArchiveModal isOpen={isArchiveModalOpen} onClose={closeArchiveModal} />
      )}

      {isEditAbilitiesModalOpen && (
        <EditAbilitiesModal
          isOpen={isEditAbilitiesModalOpen}
          onClose={closeEditAbilitiesModal}
        />
      )}
    </div>
  );
}
