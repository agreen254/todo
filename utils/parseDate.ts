import { differenceInCalendarDays, format, formatRelative } from "date-fns";

export default function parseDate(dueAt: string | undefined): {
  str: string;
  color: "orange" | "red" | "foreground";
} {
  if (!dueAt) return { str: "N/A", color: "foreground" };
  const current = new Date();
  const due = new Date(dueAt);
  const diff = differenceInCalendarDays(due, current);

  if (Math.abs(diff) > 6) {
    return { str: format(due, "PPp"), color: "foreground" };
  } else {
    if (diff < 1) {
      return { str: formatRelative(dueAt, current), color: "red" };
    } else if (diff <= 3) {
      return { str: formatRelative(dueAt, current), color: "orange" };
    } else {
      return { str: formatRelative(dueAt, current), color: "foreground" };
    }
  }
}
