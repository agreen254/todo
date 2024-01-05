"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { CheckCircle, MoreVertical, Pin, PinOff } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Todo } from "@/utils/types";

// pass the handler as a reference so we can invoke it later
const CardActions = ({ t }: { t: Todo }) => {
  const {
    state: { pinned },
    dispatch,
  } = useContext(TodoContext);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePinDisplay = () => {
    return t.isPinned ? (
      <Button
        variant="ghost"
        size="icon"
        disabled={t.isCompleted}
        onClick={() => dispatch({ cmd: "UNPIN_TODO", toUnpin: t })}
      >
        <PinOff className="w-6 h-6" />
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch({ cmd: "PIN_TODO", toPin: t })}
        disabled={pinned.length >= 3 || t.isCompleted}
      >
        <Pin className="w-6 h-6" />
      </Button>
    );
  };

  const handleCompleteDisplay = () => {
    function handleCompleteClick() {
      if (t.isCompleted) {
        dispatch({ cmd: "REVERT_TODO", toRevert: t });
      } else {
        dispatch({ cmd: "COMPLETE_TODO", toComplete: t });
      }
    }

    return (
      <Button variant="ghost" size="icon" onClick={() => handleCompleteClick()}>
        <CheckCircle
          className={cn("w-6 h-6 mx-2", t.isCompleted && "text-green-500")}
        />
      </Button>
    );
  };

  // TODO: close popover when an item is cloned
  const handleContextMenuDisplay = () => {
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-6 h-6 mx-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] m-0 p-0 rounded-md hover:ring-2 hover:ring-ring transition-all">
          <div className={cn("flex flex-col justify-center")}>
            <Link
              href={`/todo/view/${t.id}`}
              className="w-full rounded-t-md py-3 px-5 text-center dark:hover:bg-primary/50 hover:bg-primary/30 focus:outline-primary"
            >
              View
            </Link>
            <Link
              href={`/todo/edit/${t.id}`}
              className="w-full py-3 px-5 text-center dark:hover:bg-primary/50 hover:bg-primary/30 focus:outline-primary"
            >
              Edit
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                dispatch({ cmd: "CLONE_TODO", toClone: t });
                setPopoverOpen(false);
              }}
              className="w-full py-[24px] px-5 rounded-none text-center dark:hover:bg-primary/50 hover:bg-primary/30 focus-visible:ring-offset-0 focus-visible:ring-primary"
            >
              Clone
            </Button>
            <Button
              variant="ghost"
              className="w-full py-[24px] px-5 rounded-t-none rounded-b-md text-center dark:hover:bg-destructive/50 hover:bg-destructive/30 focus-visible:ring-offset-0 focus-visible:ring-primary text-base"
              onClick={() => dispatch({ cmd: "DELETE_TODO", toDelete: t })}
            >
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <span className="flex justify-end">
      <span>{handlePinDisplay()}</span>
      <span>{handleCompleteDisplay()}</span>
      <span>{handleContextMenuDisplay()}</span>
    </span>
  );
};

export default CardActions;
