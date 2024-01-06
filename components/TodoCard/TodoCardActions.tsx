"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Todo } from "@/utils/types";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import {
  BookCopy,
  CheckCircle,
  Eye,
  MoreVertical,
  PenSquare,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const handleContextMenuDisplay = () => {
    return (
      <DropdownMenu open={popoverOpen} onOpenChange={setPopoverOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-6 h-6 mx-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "w-[120px] m-0 p-0 hover:ring-2 hover:ring-ring transition-all font-semibold",
            t.isPinned && "hover:ring-teal-500 dark:hover:ring-teal-700"
          )}
        >
          <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="rounded-none text-base py-0">
            <Link
              href={`/todo/view/${t.id}`}
              className="w-full flex justify-between py-3 my-0"
            >
              <span>View</span>
              <span>
                <Eye className="inline-block h-5 w-5" />
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-none text-base py-0">
            <Link
              href={`/todo/view/${t.id}`}
              className="w-full flex justify-between py-3 my-0"
            >
              <span>Edit</span>
              <span>
                <PenSquare className="inline-block ml-1 h-5 w-5" />
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-none py-0">
            <Button
              variant="ghost"
              onClick={() => {
                dispatch({ cmd: "CLONE_TODO", toClone: t });
                setPopoverOpen(false);
              }}
              className="w-full flex justify-between p-0 m-0 text-base font-semibold"
            >
              Clone
              <BookCopy className="w-5 h-5" />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => {
                dispatch({ cmd: "CLONE_TODO", toClone: t });
                setPopoverOpen(false);
              }}
              className="w-full flex justify-between p-0 m-0 text-base font-semibold"
            >
              Delete
              <Trash2 className="w-5 h-5" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
