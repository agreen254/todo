"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { Power } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Todo } from "@/utils/types";
import TodoViewer from "../TodoViewer";

const PowerModeDialog = ({ t }: { t: Todo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-[min(45vw,180px)] px-2 lg:px-5 py-6 text-lg font-medium dark:font-semibold rounded-xl hover:shadow-md hover:dark:shadow-slate-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Power className={cn("w-6 h-6 mr-2", isHovered && "text-teal-500")} />
          Power Mode
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[768px] mt-6 md:mt-0">
        <div className="font-semibold text-3xl text-white dark:text-foreground flex items-center justify-center aria-hidden translate-y-[-8rem] py-4 rounded-full bg-primary mx-4">
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
          <TodoViewer t={t} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PowerModeDialog;
