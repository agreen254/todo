import { Power } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const PowerModeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[min(40vw,180px)] px-5 py-8 text-lg font-medium dark:font-semibold rounded-full hover:shadow-md hover:scale-[1.05] hover:translate-y-[-4px] hover:dark:shadow-slate-800 transition-all">
          <Power className="w-6 h-6 mr-2" />
          Power Mode
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4">
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
        <div className="h-[50vh]"></div>
      </DialogContent>
    </Dialog>
  );
};

export default PowerModeDialog;
