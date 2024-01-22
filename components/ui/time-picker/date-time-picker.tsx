"use client";

import * as React from "react";
import { add, format, sub } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker12Demo } from "./time-picker-12hour";

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export function DateTimePicker({ date, setDate }: Props) {
  const yesterday = () => {
    return sub(Date(), { days: 1 });
  };

  const handleSelect = (d: Date | undefined) => {
    if (!d) return;
    if (!date) {
      setDate(d);
      return;
    }
    const diff = d.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDate = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PP p") : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          disabled={(d) => d < yesterday()}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePicker12Demo date={date} setDate={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
