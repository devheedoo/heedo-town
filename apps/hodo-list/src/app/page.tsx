import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export default function Home() {
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
          />
          <button className="btn btn-outline btn-success">Add</button>
        </div>
        <div id="list-container">
          <ul className="flex flex-col gap-y-2">
            {new Array(10).fill(0).map((_, index) => (
              <li className="flex items-center gap-2" key={index}>
                <label className="label cursor-pointer gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">
                    Read the book (at leat 5 pages)
                  </span>
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
