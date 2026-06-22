"use client";

import { useState, useRef, useEffect } from "react";
import { Users, Minus, Plus } from "lucide-react";

interface GuestPickerProps {
    variant?: "light" | "dark";
    onChange?: (adults: number, children: number) => void;
}

export default function GuestPicker({ variant = "light", onChange }: GuestPickerProps) {
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
        document.addEventListener("mousedown", onOutsideClick);
        return () => document.removeEventListener("mousedown", onOutsideClick);
    }, []);

    const updateAdults = (val: number) => {
        const next = Math.min(10, Math.max(1, val));
        setAdults(next);
        onChange?.(next, children);
    };

    const updateChildren = (val: number) => {
        const next = Math.min(10, Math.max(0, val));
        setChildren(next);
        onChange?.(adults, next);
    };

    const total = adults + children;
    const label = total === 1 ? "1 Guest" : `${total} Guests`;

    const triggerClass =
        variant === "light"
            ? "border border-white/40 text-white rounded-md"
            : "border border-silver text-foreground";

    return (
        <div ref={ref} className="relative flex-1 min-w-45">
            {/* Trigger — matches DatePicker trigger exactly */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`flex h-10 w-full items-center px-4 text-sm cursor-pointer ${triggerClass}`}
            >
                <Users size={16} className="mr-2 shrink-0 opacity-70" />
                <span>{label}</span>
            </button>

            {/* Dropdown — matches DatePicker popup style */}
            {open && (
                <div className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-64 rounded-none bg-primary shadow-2xl border border-silver/60 p-4">

                    {/* Month-caption style header */}
                    <p className="flex items-center justify-center h-8 mb-3 font-bold text-accent text-sm uppercase tracking-widest">
                        Guests
                    </p>

                    {/* Adults row */}
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div>
                            <p className="text-sm font-semibold text-white">Adults</p>
                            <p className="text-xs text-white/50">Age 13+</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => updateAdults(adults - 1)}
                                disabled={adults <= 1}
                                className="flex h-7 w-7 items-center justify-center rounded text-white border border-white/30 hover:bg-soft-accent hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">
                                {adults}
                            </span>
                            <button
                                type="button"
                                onClick={() => updateAdults(adults + 1)}
                                disabled={adults >= 10}
                                className="flex h-7 w-7 items-center justify-center rounded text-white border border-white/30 hover:bg-soft-accent hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Children row */}
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div>
                            <p className="text-sm font-semibold text-white">Children</p>
                            <p className="text-xs text-white/50">Age 0–12</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => updateChildren(children - 1)}
                                disabled={children <= 0}
                                className="flex h-7 w-7 items-center justify-center rounded text-white border border-white/30 hover:bg-soft-accent hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">
                                {children}
                            </span>
                            <button
                                type="button"
                                onClick={() => updateChildren(children + 1)}
                                disabled={children >= 10}
                                className="flex h-7 w-7 items-center justify-center rounded text-white border border-white/30 hover:bg-soft-accent hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Done */}
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="mt-3 w-full h-9 bg-accent text-xs font-semibold uppercase tracking-widest text-white hover:opacity-90 transition cursor-pointer"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
