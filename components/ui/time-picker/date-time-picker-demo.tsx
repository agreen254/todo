"use client";

// adapted from https://github.com/openstatusHQ/time-picker
// to support 12 hour times

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Meridies } from "./time-picker-utils";
import { TimePicker } from "./time-picker-demo";
import { PeriodSelectorType } from "./time-picker-utils";

export function DateTimePicker() {
  const period: PeriodSelectorType = "12hours";
  const [date, setDate] = React.useState<Date>();
  const [meridiem, setMeridiem] = React.useState<Meridies>("AM");

  // add the AM or PM suffix
  const handleDate = () => {
    if (date) return new Date(`${format(date, "PP, HH:mm")} ${meridiem}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            `${format(date, "PP, HH:mm")} ${meridiem}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePicker
            setDate={setDate}
            date={date}
            period={period}
            meridiem={meridiem}
            setMeridiem={setMeridiem}
          />
        </div>
        <Button onClick={() => console.log(handleDate())}>Show Date</Button>
      </PopoverContent>
    </Popover>
  );
}
