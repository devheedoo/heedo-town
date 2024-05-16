import { PropsWithChildren } from "react";
import { PlusIcon } from "./icons/PlusIcon";

export default function List({ children }: PropsWithChildren) {
  return (
    <section className="m-4 flex w-96 flex-col gap-y-4 rounded-xl bg-[#24262C] p-4">
      <div className="flex items-center justify-between">
        <h3 className="leading-none text-white/50">To do(4)</h3>
        <div className="flex items-center gap-x-1.5">
          <div className="flex size-4 items-center justify-center rounded-full bg-white/10">
            <PlusIcon className="size-2.5 text-white/50" />
          </div>
          <span className="text-sm font-semibold leading-none text-white">
            Add new task
          </span>
        </div>
      </div>
      {children}
    </section>
  );
}
