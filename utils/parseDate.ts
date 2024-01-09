import { differenceInCalendarDays, format, formatRelative } from "date-fns";

export default function parseDate(dueAt: string | undefined): string {
  if (!dueAt) return "N/A";
  const current = new Date();
  const due = new Date(dueAt);
  const diff = differenceInCalendarDays(current, due);

  if (Math.abs(diff) > 6) {
    return format(due, "PPp");
  } else {
    return formatRelative(dueAt, current);
  }
}
