import { add, differenceInDays } from "date-fns";

export default function repeatDates(
  initialDueDate: string,
  finalDueDate: string,
  period: "monthly" | "weekly" | "daily"
) {
  const init = new Date(initialDueDate);
  const final = new Date(finalDueDate);
  if (!init || !final) return [];

  let currentDate = init;
  let dates: Date[] = [currentDate];
  while (1) {
    if (period === "monthly") {
      currentDate = add(currentDate, { months: 1 });
    } else if (period === "weekly") {
      currentDate = add(currentDate, { weeks: 1 });
    } else {
      currentDate = add(currentDate, { days: 1 });
    }
    if (differenceInDays(currentDate, final) <= 0) dates.push(currentDate);
    else break;
  }
  return dates;
}
