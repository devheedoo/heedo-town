export default function Home() {
  return (
    <div id="board-wrapper" className="absolute inset-0">
      <div id="board-main-content" className="flex flex-col">
        <div
          id="board-header"
          className="inline-flex h-14 bg-gray-300 p-[12px_10px_12px_16px]"
        >
          <div className="flex min-h-8">
            <h1 className="h-8 leading-8">Tasks</h1>
            <button className="h-8 p-1.5 leading-5">favorite</button>
          </div>
          <div className="ml-auto flex min-h-8">
            <span className="h-8 text-base leading-8">filters</span>
          </div>
        </div>

        <div id="board-canvas" className="grow">
          <ol id="lists">
            <li id="list-wrapper">To do</li>
            <li id="list-wrapper">Doing</li>
            <li id="list-wrapper">Done</li>
            <li id="list-add-button">Add another list</li>
          </ol>
        </div>
      </div>

      <div id="board-menu">{/* optional rendering area */}</div>
    </div>
  );
}
