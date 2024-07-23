"use client";

import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("가나다");
  const [tasks, setTasks] = useState<string[]>([]);

  function addTask() {
    setTasks((tasks) => [task, ...tasks]);
    setTask("");
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
            className="input input-bordered w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-outline btn-success" onClick={addTask}>
            Add
          </button>
        </div>

        <div id="list-container">
          {tasks.length === 0 && <span>No items...</span>}
          <ul className="flex flex-col gap-y-2">
            {tasks.map((t, index) => (
              <li className="flex items-center gap-2" key={index}>
                <label className="label cursor-pointer gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">{t}</span>
                </label>
                <button className="btn btn-outline px-2.5">
                  <PencilIcon className="size-6" />
                </button>
                <button className="btn btn-outline px-2.5">
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
