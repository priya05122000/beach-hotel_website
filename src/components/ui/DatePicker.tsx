"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: { before?: Date; after?: Date };
  defaultMonth?: Date;
  /** "light" = white border on dark bg (hero), "dark" = dark border on white bg */
  variant?: "light" | "dark";
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  disabled,
  defaultMonth,
  variant = "light",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  const triggerClass =
    variant === "light"
      ? "border border-white/40 text-white "
      : "border border-silver text-foreground";

  return (
    <div ref={ref} className="relative flex-1 min-w-45">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 w-full items-center px-4  type-caption cursor-pointer ${triggerClass}`}
      >
        <CalendarDays size={16} className="mr-2 shrink-0 opacity-70" />
        <span className={value ? "" : "opacity-60 type-caption uppercase"}>
          {value ? format(value, "dd MMM yyyy") : placeholder}
        </span>
      </button>

      {/* Calendar popup â€” opens above the trigger */}
      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-72 rounded-none bg-primary shadow-2xl border border-silver/60">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
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
              root: "p-4 select-none type-caption",

              month_caption:
                "flex items-center justify-center h-8 mb-3 font-bold text-accent   uppercase tracking-widest",

              nav: "absolute top-0 left-4 right-4 flex items-center justify-between pointer-events-none",
              button_previous:
                "pointer-events-auto flex h-7 w-7 rounded text-white items-center justify-center hover:bg-soft-accent hover:text-accent transition-colors cursor-pointer",
              button_next:
                "pointer-events-auto flex h-7 w-7 rounded text-white items-center justify-center hover:bg-soft-accent hover:text-accent transition-colors cursor-pointer",

              weeks: "",
              weekdays: "flex mb-1 text-white",
              weekday:
                "flex-1 text-center text-[11px] font-semibold text-white uppercase tracking-wide py-1",

              week: "flex",
              day: "flex-1 flex items-center justify-center p-0",
              day_button:
                "w-9 h-9 flex items-center justify-center  text-white rounded transition-colors cursor-pointer hover:bg-soft-accent hover:text-primary-dark hover:font-bold",

              selected: "[&>button]:bg-accent! [&>button]:text-white! [&>button]:rounded",
              today: "[&>button]:font-bold [&>button]:text-accent",
              disabled: "[&>button]:opacity-25 [&>button]:cursor-not-allowed [&>button]:pointer-events-none",
              outside: "[&>button]:opacity-30",
            }}
          />
        </div>
      )}
    </div>
  );
}
