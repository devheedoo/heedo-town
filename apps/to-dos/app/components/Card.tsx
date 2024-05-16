import { ChatBubbleBottomCenterTextIcon } from "./icons/ChatBubbleBottomCenterTextIcon";
import { EllipsisHorizontalIcon } from "./icons/EllipsisHorizontalIcon";
import { ListBulletIcon } from "./icons/ListBulletIcon";
import { PaperClipIcon } from "./icons/PaperClipIcon";

export default function Card() {
  return (
    <article className="flex flex-col gap-y-4 rounded-xl bg-[#292B31] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold leading-none text-white">
            Design new ui presentation
          </h4>
          <span className="text-sm leading-none text-white/50">
            Dribbble marketing
          </span>
        </div>
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-white">
          <EllipsisHorizontalIcon />
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1">
            <span className="size-4 text-white/50">
              <ListBulletIcon />
            </span>
            <span className="text-sm leading-none text-white/50">Progress</span>
          </div>
          <span className="text-sm leading-none text-white">7/10</span>
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-white/10">
          <div className="h-1 w-1/2 rounded-full bg-[#FFA048]"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-fit items-center justify-center rounded-2xl bg-white/10 px-4 py-2">
          <span className="text-sm leading-none text-[#989CAA]">
            24 Aug 2022
          </span>
        </div>
        <div className="flex items-center gap-x-3 text-sm leading-none text-white/50">
          <div className="flex items-center gap-x-1">
            <ChatBubbleBottomCenterTextIcon className="size-4" />
            <span>7</span>
          </div>
          <div className="flex items-center gap-x-1">
            <PaperClipIcon className="size-4" />
            <span>2</span>
          </div>
        </div>
      </div>
    </article>
  );
}
