"use client";

import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";

interface DatePickerCalendarProps {
  value?: Date;
  onSelect: (date: Date | undefined) => void;
  disabled?: { before?: Date; after?: Date };
  defaultMonth?: Date;
}

export default function DatePickerCalendar({
  value,
  onSelect,
  disabled,
  defaultMonth,
}: DatePickerCalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={value}
      onSelect={onSelect}
      disabled={
        disabled
          ? ({
            ...(disabled.before !== undefined ? { before: disabled.before } : {}),
            ...(disabled.after !== undefined ? { after: disabled.after } : {}),
          } as import("react-day-picker").Matcher)
          : undefined
      }
      defaultMonth={defaultMonth ?? value ?? new Date()}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          ),
      }}
      classNames={{
        root: "p-3 sm:p-4 select-none type-overline",

        month_caption:
          "flex items-center justify-center h-8 mb-3 font-bold text-accent   uppercase tracking-widest",

        nav: "absolute top-0 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none",
        button_previous:
          "pointer-events-auto flex h-6 w-6 sm:h-7 sm:w-7 rounded text-white items-center justify-center hover:bg-soft-accent hover:text-accent transition-colors cursor-pointer",
        button_next:
          "pointer-events-auto flex h-6 w-6 sm:h-7 sm:w-7 rounded text-white items-center justify-center hover:bg-soft-accent hover:text-accent transition-colors cursor-pointer",

        weeks: "",
        weekdays: "flex mb-1 text-white",
        weekday:
          "flex-1 text-center text-[11px] font-semibold text-white uppercase tracking-wide py-1",

        week: "flex",
        day: "flex-1 flex items-center justify-center p-0",
        day_button:
          "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center  text-white rounded transition-colors cursor-pointer hover:bg-soft-accent hover:text-primary-dark hover:font-bold",

        selected: "[&>button]:bg-accent! [&>button]:text-white! [&>button]:rounded",
        today: "[&>button]:font-bold [&>button]:text-accent",
        disabled: "[&>button]:opacity-25 [&>button]:cursor-not-allowed [&>button]:pointer-events-none",
        outside: "[&>button]:opacity-30",
      }}
    />
  );
}
