import { format } from "date-fns";

import { ChatBubbleBottomCenterTextIcon } from "@/app/components/icons/chat-bubble-bottom-center-text-icon";
import { EllipsisHorizontalIcon } from "@/app/components/icons/ellipsis-horizontal-icon";
import { ListBulletIcon } from "@/app/components/icons/list-bullet-icon";
import { PaperClipIcon } from "@/app/components/icons/paper-clip-icon";
import { Card as CardType } from "@/app/types/card";

type CardProps = CardType;

export default function Card({
  title,
  subtitle,
  progressRate,
  progressColor,
  deadline,
  commentsCount,
  filesCount,
}: CardProps) {
  return (
    <article className="flex flex-col gap-y-4 rounded-xl bg-[#292B31] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold leading-none text-white">
            {title}
          </h4>
          {subtitle && (
            <span className="text-sm leading-none text-white/50">
              {subtitle}
            </span>
          )}
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
          <span className="text-sm leading-none text-white">
            {progressRate[0]}/{progressRate[1]}
          </span>
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-white/10">
          <div
            className="h-1 rounded-full"
            style={{
              width: `${(progressRate[0] / progressRate[1]) * 100}%`,
              backgroundColor: progressColor,
            }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-fit items-center justify-center rounded-2xl bg-white/10 px-4 py-2">
          <span className="text-sm leading-none text-[#989CAA]">
            {format(deadline || new Date(), "d MMM yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-x-3 text-sm leading-none text-white/50">
          <div className="flex items-center gap-x-1">
            <ChatBubbleBottomCenterTextIcon className="size-4" />
            <span>{commentsCount}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <PaperClipIcon className="size-4" />
            <span>{filesCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
