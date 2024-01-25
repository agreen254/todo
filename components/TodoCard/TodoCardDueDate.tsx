import { cn } from "@/utils/cn";
import parseDate from "@/utils/parseDate";
import { Todo } from "@/utils/types";

const TodoCardDueDate = ({ t }: { t: Todo }) => {
  const colors = {
    red: "text-red-600 dark:text-red-500 font-semibold",
    orange: "text-orange-400 dark:text-orange-500 font-semibold",
    foreground: "text-foreground-muted",
  };
  const parsed = parseDate(t.dueAt);
  const color = colors[parsed.color];

  return (
    <span
      className={cn(
        color,
        t.isCompleted &&
          "text-muted-foreground dark:text-muted-foreground line-through"
      )}
    >
      {parsed.str}
    </span>
  );
};

export default TodoCardDueDate;