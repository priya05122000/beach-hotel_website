"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

// react-day-picker (+ its date-fns/lucide sub-imports) is a sizeable bundle
// that's only needed once the calendar popup is actually opened — defer it
// out of the initial page JS instead of shipping it on every load.
const DatePickerCalendar = dynamic(() => import("./DatePickerCalendar"), {
  ssr: false,
});

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
      ? "border border-white/40 text-white  tracking-widest"
      : "border border-silver text-foreground";

  return (
    <div ref={ref} className="relative flex-1 min-w-45">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={value ? `${placeholder}: ${format(value, "dd MMM yyyy")}` : placeholder}
        className={`flex  py-2 w-full items-center px-4  type-caption cursor-pointer ${triggerClass}`}
      >
        <CalendarDays size={16} className="mr-2 shrink-0 opacity-70" />
        <span className={value ? "" : "opacity-60 type-caption uppercase"}>
          {value ? format(value, "dd MMM yyyy") : placeholder}
        </span>
      </button>

      {/* Calendar popup — opens above the trigger */}
      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-72 rounded-none bg-primary shadow-2xl border border-silver/60">
          <DatePickerCalendar
            value={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            disabled={disabled}
            defaultMonth={defaultMonth}
          />
        </div>
      )}
    </div>
  );
}
