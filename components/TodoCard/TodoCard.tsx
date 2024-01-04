import dueAtString from "@/utils/dueAtString";
import outOfTen from "@/utils/outOfTen";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { ArrowUp, Calendar, Move } from "lucide-react";
import { Todo } from "@/utils/types";
import CardActions from "./TodoCardActions";
import TagBadge from "./TodoCardTagBadge";

export type Props = {
  t: Todo;
  className?: string;
};

const TodoCard = ({ t, className }: Props) => {
  return (
    <Card className={cn(className)}>
      <div
        className={cn(
          "flex justify-between items-center pt-5 mb-4 pb-[4px] px-5 rounded-t-md leading-8",
          t.isPinned && "bg-teal-500"
        )}
      >
        <h3 className="max-w-[calc(100%-30px)] line-clamp-1 text-xl md:text-2xl">
          {t.name}
        </h3>
        <CardActions t={t} />
      </div>
      <CardDescription className="px-5 mb-2 relative top-[-10px] line-clamp-1">
        {t.description}
      </CardDescription>
      <CardContent className="space-y-2">
        <p>
          <span>
            <Calendar className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Due Date: </span>
            <span className="font-semibold">{dueAtString(t.dueAt)}</span>
          </span>
        </p>
        <p>
          <span>
            <ArrowUp className="w-4 h-4 mr-2 inline-block" />
            <span className="text-muted-foreground">Priority: </span>
            <span className="font-semibold">{outOfTen(t.priority)}</span>
          </span>
        </p>
        <p>
          <span>
            <Move className="w-4 h-4 mr-2 inline-block" />
            <span className="text-muted-foreground">Complexity: </span>
            <span className="font-semibold">{outOfTen(t.complexity)}</span>
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-start">
        {t.tags?.map((tag) => (
          <TagBadge key={t.id + tag} tag={tag} />
        ))}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
