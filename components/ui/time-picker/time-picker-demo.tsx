"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePeriodSelect } from "./period-select";
import { TimePickerInput } from "./time-picker-input";
import { Meridies, PeriodSelectorType } from "./time-picker-utils";

interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period: PeriodSelectorType;
  meridiem: Meridies;
  setMeridiem: (m: Meridies) => void;
}

export function TimePicker({
  date,
  setDate,
  period,
  meridiem,
  setMeridiem,
}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="sr-only">
          Hour
        </Label>
        <TimePickerInput
          picker={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          id="hours"
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="sr-only">
          Minute
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      {period === "12hours" && (
        <TimePeriodSelect meridiem={meridiem} setMeridiem={setMeridiem} />
      )}
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
