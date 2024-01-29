"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Power } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Todo } from "@/utils/types";
import TodoViewer from "../TodoViewer";

type Props = {
  t: Todo | undefined;
};

const PowerModeDialog = ({ t }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-[min(45vw,180px)] px-2 lg:px-5 py-6 text-lg font-medium dark:font-semibold rounded-xl hover:shadow-md hover:dark:shadow-slate-800"
          disabled={!t}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Power className={cn("w-6 h-6 mr-2", isHovered && "text-teal-500")} />
          Power Mode
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[768px] md:mt-0 min-h-[50vh+8rem] max-h-[90vh] overflow-y-auto">
        <div className="font-semibold text-3xl text-white dark:text-foreground flex items-center justify-center py-4">
          <span>P</span>
          <span className="inline-block">
            <Power className="w-6 h-6" strokeWidth={4} />
          </span>
          <span>WER M</span>
          <span>
            <Power className="w-6 h-6" strokeWidth={4} />
          </span>
          <span>DE</span>
        </div>
        <div className="min-h-[50vh]">
          {t && <TodoViewer t={t} mode={"power"} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PowerModeDialog;
