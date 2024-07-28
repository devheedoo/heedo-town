"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { format, isToday } from "date-fns";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import type { Task } from "@/types/Task";

const tasksAtom = atomWithStorage<Task[]>("tasks", []);
const oldTasksAtom = atomWithStorage<Task[]>("oldTasks", []);

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [oldTasks, setOldTasks] = useAtom(oldTasksAtom);

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
    setTasks((tasks) => [newTask, ...tasks]);
    setNewTaskTitle("");
  }

  function updateTaskState(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return;
    }

    const taskUpdated: Task = {
      ...task,
      state: task.state === "todo" ? "done" : "todo",
    };
    const tasksUpdated = tasks
      .filter((t) => t.id !== taskId)
      .concat([taskUpdated]);
    tasksUpdated.sort((a, b) => b.createdAt - a.createdAt);
    setTasks(tasksUpdated);
  }

  function removeTask(taskId: string) {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleKeyUpAddButton(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function formatDate(d: number) {
    if (isToday(d)) {
      return format(d, "HH:MM:ss");
    }
    return format(d, "d MMM yyyy");
  }

  function saveAsOldTasks() {
    setOldTasks(tasks);
  }

  function getRemovedTasks() {
    const oldTaskIds = oldTasks.map((t) => t.id);
    const currentTaskIds = tasks.map((t) => t.id);

    const removedTaskIds = oldTaskIds.filter(
      (taskId) => !currentTaskIds.includes(taskId)
    );

    const removedTasks = oldTasks.filter((t) => removedTaskIds.includes(t.id));
    return removedTasks;
  }

  function getAddedTasks() {
    const oldTaskIds = oldTasks.map((t) => t.id);
    const currentTaskIds = tasks.map((t) => t.id);

    const addedTaskIds = currentTaskIds.filter(
      (taskId) => !oldTaskIds.includes(taskId)
    );

    const addedTasks = tasks.filter((t) => addedTaskIds.includes(t.id));
    return addedTasks;
  }

  function getAddedTodoTasks() {
    const addedTasks = getAddedTasks();
    const addedTodoTasks = addedTasks.filter((t) => t.state === "todo");
    return addedTodoTasks;
  }

  function getAddedDoneTasks() {
    const addedTasks = getAddedTasks();
    const addedDoneTasks = addedTasks.filter((t) => t.state === "done");
    return addedDoneTasks;
  }

  function getKeptCurrentTasks() {
    const oldTaskIds = oldTasks.map((t) => t.id);
    const currentTaskIds = tasks.map((t) => t.id);

    const keptCurrentTaskIds = oldTaskIds.filter((taskId) =>
      currentTaskIds.includes(taskId)
    );

    const keptCurrentTasks = tasks.filter((t) =>
      keptCurrentTaskIds.includes(t.id)
    );
    return keptCurrentTasks;
  }

  function getUpdatedCurrentTasks() {
    const keptCurrentTasks = getKeptCurrentTasks();
    const updatedCurrentTasks = keptCurrentTasks
      .map((currentTask) => {
        const oldTask = oldTasks.find((t) => t.id === currentTask.id);
        if (oldTask !== undefined && oldTask.state !== currentTask.state) {
          return currentTask;
        }
        return null;
      })
      .filter((t) => t !== null);
    return updatedCurrentTasks;
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
                document.getElementById("my_modal_1") as HTMLDialogElement
              )?.showModal()
            }
          >
            하루 마무리하기
          </button>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">하루 마무리하기</h3>
              <p className="py-4">오늘의 성장을 기록할게요.</p>
              <ul className="flex flex-col gap-y-1">
                {getUpdatedCurrentTasks().map((t) => (
                  <li className="gap flex items-center" key={t.id}>
                    <label className="label gap-x-2">
                      <span className="label-text font-light">[완료]</span>
                      <span className="label-text">{t.title}</span>
                      <span className="label-text font-extralight">
                        {formatDate(t.createdAt)}
                      </span>
                    </label>
                  </li>
                ))}
                {getAddedDoneTasks().map((t) => (
                  <li className="gap flex items-center" key={t.id}>
                    <label className="label gap-x-2">
                      <span className="label-text font-light">[추가+완료]</span>
                      <span className="label-text">{t.title}</span>
                      <span className="label-text font-extralight">
                        {formatDate(t.createdAt)}
                      </span>
                    </label>
                  </li>
                ))}
                {getAddedTodoTasks().map((t) => (
                  <li className="gap flex items-center" key={t.id}>
                    <label className="label gap-x-2">
                      <span className="label-text font-light">[추가]</span>
                      <span className="label-text">{t.title}</span>
                      <span className="label-text font-extralight">
                        {formatDate(t.createdAt)}
                      </span>
                    </label>
                  </li>
                ))}
                {getRemovedTasks().map((t) => (
                  <li className="gap flex items-center" key={t.id}>
                    <label className="label gap-x-2">
                      <span className="label-text font-light">[취소]</span>
                      <span className="label-text">{t.title}</span>
                      <span className="label-text font-extralight">
                        {formatDate(t.createdAt)}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="modal-action">
                <form method="dialog" className="flex items-center gap-x-2">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-success" onClick={saveAsOldTasks}>
                    기록 저장하기
                  </button>
                  <button className="btn btn-outline btn-success">취소</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        <div id="list-container">
          {tasks.length === 0 && <span>No items...</span>}
          <ul className="flex flex-col gap-y-2">
            {tasks.map((t) => (
              <li className="gap flex items-center" key={t.id}>
                <label className="label cursor-pointer gap-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    defaultChecked={t.state === "done"}
                    onClick={() => updateTaskState(t.id)}
                  />
                  <span className="label-text">{t.title}</span>
                  <span className="label-text font-extralight">
                    {formatDate(t.createdAt)}
                  </span>
                </label>
                {/* <button className="btn btn-outline px-2.5">
                  <PencilIcon className="size-6" />
                </button> */}
                <button className="px-2.5" onClick={() => removeTask(t.id)}>
                  <XMarkIcon className="size-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
