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
  setMeridiem: (m: Meridies) => void;
};

export function TimePeriodSelect({ setMeridiem }: Props) {
  return (
    <div className="flex h-10 items-center">
      <Select
        defaultValue="AM"
        onValueChange={(value: Meridies) => setMeridiem(value)}
      >
        <SelectTrigger className="w-[65px]">
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
