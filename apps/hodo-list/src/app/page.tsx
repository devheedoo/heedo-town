"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import type { KeyboardEvent } from "react";
import { useState } from "react";

import type { Task } from "@/types/Task";

const tasksAtom = atomWithStorage<Task[]>("tasks", []);

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useAtom(tasksAtom);

  function addTask() {
    if (newTaskTitle.trim().length === 0) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title: newTaskTitle,
      createdAt: new Date().valueOf(),
    };
    setTasks((tasks) => [newTask, ...tasks]);
    setNewTaskTitle("");
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
            placeholder="Note down your task!"
            className="input input-bordered peer w-full"
            value={newTaskTitle}
            required
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyUp={handleKeyUpAddButton}
          />
          <button
            className="btn btn-outline btn-success peer-invalid:btn-disabled"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <div id="list-container">
          {tasks.length === 0 && <span>No items...</span>}
          <ul className="flex flex-col gap-y-2">
            {tasks.map((t) => (
              <li className="flex items-center gap-2" key={t.id}>
                <label className="label cursor-pointer gap-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">{t.title}</span>
                  <span className="label-text font-extralight">
                    {format(t.createdAt, "d MMM yyyy")}
                  </span>
                </label>
                {/* <button className="btn btn-outline px-2.5">
                  <PencilIcon className="size-6" />
                </button> */}
                <button
                  className="btn btn-outline px-2.5"
                  onClick={() => removeTask(t.id)}
                >
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
