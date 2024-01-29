"use client";

import * as React from "react";
import { TimePickerTwelve } from "./time-picker-12hour";

export function TimePicker12HourWrapper() {
  const [date, setDate] = React.useState<Date>();
  return <TimePickerTwelve setDate={setDate} date={date} />;
}
