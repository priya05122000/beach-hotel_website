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
        // "relative" is required — react-day-picker's own .rdp-root rule
        // sets position:relative so the nav toolbar (position:absolute,
        // top-0) anchors to this padded box. Our classNames override
        // replaces that default class entirely, so without re-adding it
        // here, nav falls through to the next positioned ancestor (the
        // popup wrapper in DatePicker.tsx) and renders above/outside the
        // month caption instead of centered within it.
        root: "relative p-3 sm:p-4 select-none  type-body-sm font-arizona-light!",
        // react-day-picker's own CSS caps .rdp-months at max-width:
        // fit-content, which shrink-wraps the whole grid (and month_caption
        // inside it) to intrinsic content width instead of the card's full
        // width. Force it (and its descendants) to stretch instead.
        months: "w-full max-w-none",
        month: "w-full",
        month_grid: "w-full",

        month_caption:
          "flex items-center justify-center  h-7 mb-3  font-medium text-primary uppercase tracking-widest ",

        // top must match root's own padding (p-3/sm:p-4) — nav is absolute
        // so top-0 alone ignores root's padding entirely and starts 12px
        // (mobile) / 16px (sm+) above where month_caption's row actually
        // begins, poking the buttons out above the caption bar.
        nav: "absolute  top-3 sm:top-4 left-3 right-3 sm:left-4  sm:right-4 flex items-center justify-between   pointer-events-none",
        button_previous:
          "pointer-events-auto flex   h-7 sm:w-7  rounded text-primary items-center justify-center cursor-pointer aria-disabled:text-primary/20 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
        button_next:
          "pointer-events-auto flex   h-7 sm:w-7  rounded text-primary items-center justify-center cursor-pointer aria-disabled:text-primary/20 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",

        weeks: "",
        weekdays: "flex mb-1 text-primary ",
        weekday:
          "flex-1 text-center text-[11px] font-medium text-primary uppercase tracking-wide py-1",

        week: "flex",
        day: "flex-1 flex items-center justify-center p-0",
        day_button:
          "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[11px] text-primary transition-colors cursor-pointer hover:bg-solitude hover:text-primary-dark hover:font-medium",

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
