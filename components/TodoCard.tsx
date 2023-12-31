import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { DateTime } from "luxon";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle, MoreHorizontal, Pin, PinOff } from "lucide-react";
import { Todo } from "@/utils/todoTypes";
import Link from "next/link";

export type Props = {
  t: Todo;
  className?: string;
};

const TodoCard = ({ t, className }: Props) => {
  const { dispatch } = useContext(TodoContext);

  // const timeRemaining = t.dueAt.diff(DateTime.now(), "days");
  // const handleDueColor = () => {
  //   if (timeRemaining.days > 5) {
  //     return "text-green-500";
  //   } else if (timeRemaining.days > 1) {
  //     return "text-orange-500";
  //   } else {
  //     return "text-red-500";
  //   }
  // };

  const handleCompleteButton = () => {
    if (t.isCompleted) {
      return (
        <Button
          onClick={() => dispatch({ actionName: "REVERT_TODO", toRevert: t })}
        >
          Revert
        </Button>
      );
    } else {
      return (
        <Button
          className="hover:text-green-400/90"
          onClick={() =>
            dispatch({ actionName: "COMPLETE_TODO", toComplete: t })
          }
        >
          Complete
        </Button>
      );
    }
  };

  const handlePinButton = () => {
    if (t.isCompleted) return;
    if (t.isPinned) {
      return (
        <Button
          onClick={() => dispatch({ actionName: "UNPIN_TODO", toUnpin: t })}
        >
          Unpin
        </Button>
      );
    } else {
      return (
        <Button onClick={() => dispatch({ actionName: "PIN_TODO", toPin: t })}>
          Pin
        </Button>
      );
    }
  };

  const handlePinIcon = () => {
    return t.isPinned ? (
      <PinOff className="w-4 h-4" />
    ) : (
      <Pin className="w-4 h-4" />
    );
  };

  return (
    <Card className={cn("relative pt-0", className)}>
      <div className={cn("h-8 my-2 mx-2 flex justify-end items-center", t.isPinned && "bg-teal-500")}>
        {handlePinIcon()}
        <CheckCircle
          className={cn(
            "w-4 h-4",
            t.isCompleted && "text-green-500"
          )}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Link href={`/todo/edit/${t.id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Link href={`/todo/view/${t.id}`}>
              <Button variant="outline">View</Button>
            </Link>
            <Link href={`/todo/clone/${t.id}`}>
              <Button variant="outline">Clone</Button>
            </Link>
          </PopoverContent>
        </Popover>
      </div>
      <CardHeader className="pt-0">
        <CardTitle>{t.name}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>due date goes here</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => dispatch({ actionName: "DELETE_TODO", toDelete: t })}
          className="hover:text-red-300/90"
        >
          Delete
        </Button>
        <Link href={`/todo/edit/${t.id}`}>
          <Button>Edit</Button>
        </Link>
        {handlePinButton()}
        {handleCompleteButton()}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
