import { PropsWithChildren } from "react";
import { PlusIcon } from "./icons/PlusIcon";

interface ListProps extends PropsWithChildren {
  title: string;
  itemsCount: number;
  handleClickAddNewTaskButton?: () => void;
}

export default function List({
  title,
  itemsCount,
  handleClickAddNewTaskButton,
  children,
}: ListProps) {
  return (
    <section className="flex h-fit max-h-full w-96 min-w-96 flex-col gap-y-4 rounded-xl bg-[#24262C] p-4">
      <div className="flex items-center justify-between">
        <h3 className="leading-none text-white/50">
          {title} ({itemsCount})
        </h3>
        <button
          className="flex items-center gap-x-1.5 p-1"
          onClick={handleClickAddNewTaskButton}
        >
          <div className="flex size-4 items-center justify-center rounded-full bg-white/10">
            <PlusIcon className="size-2.5 text-white/50" />
          </div>
          <span className="text-sm font-semibold leading-none text-white">
            Add new task
          </span>
        </button>
      </div>

      <div className="flex max-h-full min-h-0 flex-col gap-y-4 overflow-y-auto">
        {children}
      </div>
    </section>
  );
}
