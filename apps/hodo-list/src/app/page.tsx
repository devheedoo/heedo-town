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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button className="btn btn-outline px-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
