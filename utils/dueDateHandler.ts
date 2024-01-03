import { DateTime } from "luxon";

export default function dueDateHandler(dueAt: DateTime | undefined) {
  if (typeof dueAt === "undefined") return "N/A";

  const remaining = dueAt
    .diff(DateTime.now(), ["days", "hours", "minutes"])
    .toObject();
  //   return remaining.days;

  return remaining.toLocaleString({
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }); //=> 'Thu, Apr 20, 11:27 AM'

  //   if (remaining.hours! < 0) {
  //     return "OVERDUE";
  //   } else if (remaining < 24) {
  //     return `${remaining} hours`;
  //   } else if (remaining < 48) {
  //     return `${Math.floor(remaining / 24)} day`;
  //   } else {
  //     return `${Math.floor(remaining / 24)} days`;
  //   }
}
