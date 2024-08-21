import { format, isToday } from "date-fns";

export function showTodayTimeOrDate(d: number) {
  if (isToday(d)) {
    return format(d, "HH:mm:ss");
  }
  return format(d, "d MMM yyyy");
}

/**
 * @param year
 * @param month
 * @param day
 * @returns YYYY-MM-DD
 */
export function formatToYYYYMMDD(year: number, month: number, day: number) {
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
}
