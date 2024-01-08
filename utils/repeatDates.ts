import { DateTime } from "luxon";

export default function repeatDates(
  initialDueDate: string,
  finalDueDate: string,
  period: "monthly" | "weekly" | "daily"
) {
  const init = DateTime.fromISO(initialDueDate);
  const final = DateTime.fromISO(finalDueDate);
  if (!init || !final) return [];

  let currentDate = init;
  let dates = [currentDate];
  while (currentDate <= final) {
    if (period === "monthly") {
      currentDate = currentDate.plus({ months: 1 });
    } else if (period === "weekly") {
      currentDate = currentDate.plus({ weeks: 1 });
    } else {
      currentDate = currentDate.plus({ days: 1 });
    }
    dates.push(currentDate);
  }
  return dates;
}
