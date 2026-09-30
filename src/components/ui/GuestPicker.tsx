"use client";

import { useState, useRef, useEffect } from "react";
import { Users, Minus, Plus } from "lucide-react";

interface GuestPickerProps {
  variant?: "light" | "dark";
  onChange?: (adults: number, children: number) => void;
}

const MAX_ADULTS = 2;
const MAX_CHILDREN = 3;

function Stepper({
  value,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
  decrementLabel,
  incrementLabel,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
  decrementLabel: string;
  incrementLabel: string;
}) {
  return (
    <div className="flex items-center justify-between w-24 border border-primary">
      <button
        type="button"
        onClick={onDecrement}
        disabled={!canDecrement}
        aria-label={decrementLabel}
        className="flex h-8 w-8 shrink-0 items-center justify-center text-primary hover:bg-solitude transition-colors disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
      >
        <Minus size={12} aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        aria-atomic="true"
        className="flex-1 text-center font-medium text-primary-dark"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label={incrementLabel}
        className="flex h-8 w-8 shrink-0 items-center justify-center text-primary hover:bg-solitude transition-colors disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
      >
        <Plus size={12} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function GuestPicker({
  variant = "light",
  onChange,
}: GuestPickerProps) {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const updateAdults = (val: number) => {
    const next = Math.min(MAX_ADULTS, Math.max(1, val));
    setAdults(next);
    onChange?.(next, children);
  };

  const updateChildren = (val: number) => {
    const next = Math.min(MAX_CHILDREN, Math.max(0, val));
    setChildren(next);
    onChange?.(adults, next);
  };

  const total = adults + children;
  const label = total === 1 ? "1 Guest" : `${total} Guests`;

  const triggerClass =
    variant === "light"
      ? "border border-white/40 text-white "
      : "border border-silver text-foreground";

  return (
    <div ref={ref} className="relative flex-1 min-w-45">
      {/* Trigger — matches DatePicker trigger exactly */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={label}
        className={`flex py-2 tracking-widest w-full items-center px-4 type-overline  cursor-pointer ${triggerClass}`}
      >
        <Users size={16} className="mr-2 shrink-0 opacity-70" />
        <span className="">{label}</span>
      </button>

      {/* Dropdown — matches DatePicker popup style */}
      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-72 rounded-none bg-white border-primary shadow-2xl border  type-body-sm p-4">
          <p className="pb-3 mb-3 font-medium text-center text-primary-dark uppercase tracking-widest border-b border-silver">
            Guests
          </p>

          {/* Adults row */}
          <div className="py-2 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium tracking-widest text-primary-dark uppercase">
                  Adults
                </p>
              </div>
              <Stepper
                value={adults}
                onDecrement={() => updateAdults(adults - 1)}
                onIncrement={() => updateAdults(adults + 1)}
                canDecrement={adults > 1}
                canIncrement={adults < MAX_ADULTS}
                decrementLabel="Remove adult"
                incrementLabel="Add adult"
              />
            </div>
            {adults >= MAX_ADULTS && (
              <p className="mt-1 text-[10px]  text-red-500">
                Max {MAX_ADULTS} adults for 1 room.
              </p>
            )}
          </div>

          {/* Children row */}
          <div className="py-2 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium  text-primary-dark uppercase">
                  Children
                </p>
                <p className="text-gray text-[10px]">0-17 Years</p>
              </div>
              <Stepper
                value={children}
                onDecrement={() => updateChildren(children - 1)}
                onIncrement={() => updateChildren(children + 1)}
                canDecrement={children > 0}
                canIncrement={children < MAX_CHILDREN}
                decrementLabel="Remove child"
                incrementLabel="Add child"
              />
            </div>
            {children >= MAX_CHILDREN && (
              <p className="mt-1 text-[10px]  text-red-500">
                Max {MAX_CHILDREN} children for 1 room.
              </p>
            )}
          </div>

          {/* Done */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full h-9 bg-primary  font-medium uppercase tracking-widest text-white hover:opacity-90 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
