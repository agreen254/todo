import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Actions, Todo } from "@/utils/todoTypes";

type Props = {
  t: Todo;
  handleDelete: (action: Actions) => void;
};

const ContextMenu = ({ t, handleDelete }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="px-0 py-0 w-10 h-8 mr-2">
          <MoreVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] m-0 p-0 rounded-md">
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
          <Link
            href={`/todo/clone/${t.id}`}
            className="w-full py-3 px-5 text-center dark:hover:bg-primary/50 hover:bg-primary/30 focus:outline-primary"
          >
            Clone
          </Link>
          <Button
            variant="ghost"
            className="w-full py-[24px] px-5 rounded-t-none rounded-b-md text-center dark:hover:bg-destructive/50 hover:bg-destructive/30 focus-visible:outline-red-300 dark:focus:outline-destructive text-base"
            onClick={() =>
              handleDelete({ actionName: "DELETE_TODO", toDelete: t })
            }
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
