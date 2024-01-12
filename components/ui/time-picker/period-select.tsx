"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meridies } from "./time-picker-utils";

type Props = {
  meridiem: Meridies;
  setMeridiem: (m: Meridies) => void;
};

export function TimePeriodSelect({ meridiem, setMeridiem }: Props) {
  return (
    <div className="flex h-10 items-center">
      <Select
        defaultValue={meridiem}
        onValueChange={(value: Meridies) => setMeridiem(value)}
      >
        <SelectTrigger className="w-[65px] focus:bg-accent focus:text-accent-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

