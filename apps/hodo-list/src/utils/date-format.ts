import { format, isToday } from "date-fns";

export function showTodayTimeOrDate(d: number) {
  if (isToday(d)) {
    return format(d, "HH:mm:ss");
  }
  return format(d, "d MMM yyyy");
}
