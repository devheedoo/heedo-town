import { format, isToday } from "date-fns";

export function showTodayTimeOrDate(d: number) {
  if (isToday(d)) {
    return format(d, "HH:MM:ss");
  }
  return format(d, "d MMM yyyy");
}
