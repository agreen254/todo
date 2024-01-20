"use client";

import * as React from "react";
import { TimePicker12Demo } from "./time-picker-12hour";

export function TimePicker12HourWrapper() {
  const [date, setDate] = React.useState<Date>();
  return <TimePicker12Demo setDate={setDate} date={date} />;
}
