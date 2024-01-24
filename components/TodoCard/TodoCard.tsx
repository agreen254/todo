import parseDate from "@/utils/parseDate";
import outOfTen from "@/utils/outOfTen";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { ArrowUp, Calendar, Move } from "lucide-react";
import { Todo } from "@/utils/types";
import CardActions from "./TodoCardActions";
import DueDate from "./DueDate";
import TagBadge from "./TodoCardTagBadge";
import ProgressRing from "../ProgressRing";

export type Props = {
  t: Todo;
  className?: string;
};

const TodoCard = ({ t, className }: Props) => {
  const hasSubTasks = !!t.subTasks?.length;
  const progress = 100;

  const centerCircleText = () => {
    if (progress < 10) {
      return "left-[32px]";
    } else if (progress < 100) {
      return "left-[25px]";
    } else {
      return "left-[21px]";
    }
  };

  return (
    <Card
      className={cn(
        "hover:shadow-lg hover:shadow-slate-300 hover:ring-2 hover:ring-ring/60 dark:hover:ring-ring hover:dark:shadow-lg hover:dark:shadow-slate-800 transition-all",
        t.isPinned &&
          "hover:ring-teal-300 hover:border-teal-300 dark:hover:ring-teal-500 dark:hover:border-teal-500",
        className
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center pt-5 mb-4 pb-[4px] px-5 rounded-t-md leading-8 transition-colors",
          t.isPinned && "bg-teal-300 dark:bg-teal-500"
        )}
      >
        <h3 className="max-w-[calc(100%-30px)] line-clamp-1 text-xl md:text-2xl">
          {t.name}
        </h3>
        <CardActions t={t} />
      </div>
      <CardDescription className="px-5 mb-2 relative top-[-10px] line-clamp-1">
        {t.description || <span className="italic">no description</span>}
      </CardDescription>
      <CardContent className="flex justify-between items-center">
        <div className="space-y-3">
          <p className="pl-[24px] indent-[-24px]">
            <span>
              <Calendar className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
              <span className="text-muted-foreground">Due Date: </span>
              <span className="font-medium dark:font-semibold">
                <DueDate t={t} />
              </span>
            </span>
          </p>
          <p className="pl-[24px] indent-[-24px]">
            <span>
              <ArrowUp className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
              <span className="text-muted-foreground">Priority: </span>
              <span className="font-medium dark:font-semibold">
                {outOfTen(t.priority)}
              </span>
            </span>
          </p>
          <p className="pl-[24px] indent-[-24px]">
            <span>
              <Move className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
              <span className="text-muted-foreground">Complexity: </span>
              <span className="font-medium dark:font-semibold">
                {outOfTen(t.complexity)}
              </span>
            </span>
          </p>
          {t.isCompleted && (
            <p className="text-sm text-muted-foreground italic">
              Completed: {parseDate(t.completedAt).str}
            </p>
          )}
        </div>
        <div className="relative">
          <ProgressRing progress={progress} radius={40} />
          <span className={cn("absolute font-medium top-[28px]", centerCircleText())}>
            {progress}%
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-start">
        {t.tags.map((tag) => (
          <TagBadge key={t.id + tag} tag={tag}>{tag}</TagBadge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
