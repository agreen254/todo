"use client";

import { useState, useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import Link from "next/link";
import { BookCopy, Eye, MoreVertical, PenSquare, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Todo } from "@/utils/types";

const TodoCardContextMenu = ({ t }: { t: Todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-6 h-6 mx-2" />
          <span className="sr-only">open menu for more actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[120px] m-0 p-0 hover:ring-2 hover:ring-ring transition-all font-medium dark:font-semibold",
          t.isPinned && "hover:ring-teal-500 dark:hover:ring-teal-700"
        )}
      >
        <DropdownMenuLabel className="dark:font-bold font-semibold">More</DropdownMenuLabel>
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
            href={`/todo/edit/${t.id}`}
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
              setIsOpen(false);
            }}
            className="w-full flex justify-between p-0 m-0 text-base"
            disabled={t.isPinned}
          >
            Clone
            <BookCopy className="w-5 h-5" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => {
              dispatch({ cmd: "DELETE_TODO", toDelete: t });
            }}
            className="w-full flex justify-between p-0 m-0 text-base"
          >
            Delete
            <Trash2 className="w-5 h-5" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoCardContextMenu;
