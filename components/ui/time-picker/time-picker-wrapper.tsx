"use client";

import * as React from "react";
import { TimePicker } from "./time-picker-demo";
import { Meridies, PeriodSelectorType } from "./time-picker-utils";

export function TimePickerForm() {
  // 12 hour clock or 24 hour clock
  const period = "12hours";

  const [date, setDate] = React.useState<Date>();
  const [meridiem, setMeridiem] = React.useState<Meridies>("AM");

  return (
    <TimePicker
      setDate={setDate}
      date={date}
      period={period}
      meridiem={meridiem}
      setMeridiem={setMeridiem}
    />
  );
}
