"use client";

import cn from "classnames";
import { format, getDaysInMonth, isToday, startOfMonth } from "date-fns";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { tasksSnapshotsAtom } from "@/atoms/tasks-snapshots-atom";
import { formatToYYYYMMDD, showTodayTimeOrDate } from "@/utils/date-format";

const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export default function Archives() {
  const tasksSnapshots = useAtomValue(tasksSnapshotsAtom);

  const today = new Date();

  // month count, not index
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(
    formatToYYYYMMDD(year, month, today.getDate())
  );
  const archivedDate = tasksSnapshots.get(selectedDate)?.timestamp ?? "";
  const archivedTasks = tasksSnapshots.get(selectedDate)?.tasks ?? [];

  // derived states from selected month
  const startDateOfMonth = formatToYYYYMMDD(year, month, 1);
  const startDayOfMonth = startOfMonth(startDateOfMonth).getDay();
  const daysInMonth = getDaysInMonth(startDateOfMonth);

  // 2nd derived states from selected month
  const has5WeeksInMonth = startDayOfMonth + daysInMonth <= 35;
  const has6WeeksInMonth = startDayOfMonth + daysInMonth > 35;

  function handleClickPrevButton() {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function handleClickNextButton() {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handleClickArchive(date: string) {
    setSelectedDate(date);
  }

  return (
    <div className="max-w-screen-md bg-gray-200 p-2 text-sm text-black">
      <div className="mb-2 flex h-6 items-center justify-between">
        <button onClick={handleClickPrevButton}>PREV</button>
        <h3 className="text-lg">
          {year}. {month}.
        </h3>
        <button onClick={handleClickNextButton}>NEXT</button>
      </div>

      <div className="mb-2 flex h-6 w-full items-center justify-around p-2">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>

      <div
        className={cn(
          "grid grid-cols-7 gap-1 rounded-md border border-black p-2 font-medium",
          {
            "grid-rows-5": has5WeeksInMonth,
            "grid-rows-6": has6WeeksInMonth,
          }
        )}
      >
        {/* days of last month */}
        {Array.from(Array(startDayOfMonth).keys()).map((i) => (
          <button key={i}></button>
        ))}

        {/* days of current month */}
        {Array.from(Array(daysInMonth).keys()).map((i) => {
          const dayOfWeek = (i + startDayOfMonth) % 7;
          const isWeekend = [DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(
            dayOfWeek
          );

          const thisDate = formatToYYYYMMDD(year, month, i + 1);
          const isTodayDate = isToday(thisDate);
          const hasArchive = Array.from(tasksSnapshots.keys()).includes(
            thisDate
          );
          const isSelected = format(selectedDate, "yyyy-MM-dd") === thisDate;

          return (
            <button
              key={i}
              data-yyyymmdd={thisDate}
              className={cn(
                "flex h-10 w-8 flex-col items-center gap-y-2.5 rounded-lg pt-1 hover:bg-green-100",
                {
                  "text-gray-400": isWeekend,
                  "pointer-events-none": !hasArchive,
                  "bg-green-200": isSelected,
                }
              )}
              onClick={() => handleClickArchive(thisDate)}
            >
              {/* Day with green circle if today */}
              <div className="relative">
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full",
                    { "bg-green-600": isTodayDate }
                  )}
                ></div>
                <div
                  className={cn("relative leading-none", {
                    "text-white": isTodayDate,
                  })}
                >
                  {i + 1}
                </div>
              </div>

              {/* Green dot if has archive */}
              <div
                className={cn("size-1.5 rounded-full", {
                  "bg-green-600": hasArchive,
                })}
              ></div>
            </button>
          );
        })}
      </div>

      {/* Archived tasks */}
      <div id="list-container" className="bg-gray-500">
        {archivedTasks.length === 0 && <span>기록 없음</span>}
        <ul className="flex flex-col gap-y-2">
          {archivedTasks.map((t) => (
            <li
              className="flex items-center gap-1.5"
              key={`${archivedDate}-${t.id}`}
            >
              <label className="label cursor-pointer gap-x-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  defaultChecked={t.state === "done"}
                  disabled
                />
              </label>

              <button
                data-testid="task-title"
                className="text-sm normal-case text-gray-200"
              >
                {t.title}
              </button>

              <span className="label-text font-extralight">
                {showTodayTimeOrDate(t.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
