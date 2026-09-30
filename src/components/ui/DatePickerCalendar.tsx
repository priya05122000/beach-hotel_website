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
              ...(disabled.before !== undefined
                ? { before: disabled.before }
                : {}),
              ...(disabled.after !== undefined
                ? { after: disabled.after }
                : {}),
            } as import("react-day-picker").Matcher)
          : undefined
      }
      defaultMonth={defaultMonth ?? value ?? new Date()}
      startMonth={disabled?.before}
      endMonth={disabled?.after}
      formatters={{
        formatWeekdayName: (date) =>
          date.toLocaleDateString("en-US", { weekday: "narrow" }),
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          ),
      }}
      classNames={{
        root: "p-3 sm:p-4 select-none type-body-sm font-arizona-light!",

        month_caption:
          "flex items-center justify-center h-8 mb-3  font-medium text-primary   uppercase tracking-widest",

        nav: "absolute top-0 left-3 right-3 sm:left-4  sm:right-4 flex items-center justify-between pointer-events-none",
        button_previous:
          "pointer-events-auto flex h-6 w-6 sm:h-7 sm:w-7  rounded text-primary items-center justify-center cursor-pointer aria-disabled:text-primary/20 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
        button_next:
          "pointer-events-auto flex h-6 w-6 sm:h-7 sm:w-7  rounded text-primary items-center justify-center cursor-pointer aria-disabled:text-primary/20 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",

        weeks: "",
        weekdays: "flex mb-1 text-primary ",
        weekday:
          "flex-1 text-center text-[11px] font-medium text-primary uppercase tracking-wide py-1",

        week: "flex",
        day: "flex-1 flex items-center justify-center p-0",
        day_button:
          "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[11px] text-primary  transition-colors cursor-pointer hover:bg-solitude hover:text-primary-dark hover:font-medium",

        selected:
          "[&>button]:bg-primary! [&>button]:text-white! [&>button]:font-medium! [&>button]:hover:bg-primary! [&>button]:hover:text-white!",
        // Only highlight today's date before anything has been picked yet —
        // once a real selection exists, today shouldn't compete with it.
        today: value
          ? ""
          : "[&>button]:bg-silver/50 [&>button]:text-primary-dark",
        disabled:
          "[&>button]:text-primary/20 [&>button]:cursor-not-allowed [&>button]:pointer-events-none",
        outside: "[&>button]:opacity-30",
      }}
    />
  );
}
