import { DateTime } from "luxon";

export default function dueAtString(dueAt: string | undefined): string {
  if (!dueAt) return "N/A";

  const dt = DateTime.fromISO(dueAt);
  return dt.toLocaleString({
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
