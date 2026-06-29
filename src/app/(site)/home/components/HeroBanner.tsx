"use client";

import { useState } from "react";
import Image from "next/image";
import GuestPicker from "@/src/components/ui/GuestPicker";
import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import Link from "next/link";
import type { Banner } from "@/src/types";
import DatePicker from "@/src/components/ui/DatePicker";


export default function HeroBanner() {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  return (
    <>
      <section className="relative h-screen">
        <div className="relative h-screen overflow-hidden" >
          <div className="flex h-full">
            <div className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-full w-full">
                <Image
                  unoptimized
                  src="/home/herobanner.jpg"
                  alt="Hero Banner"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Hero Booking Form */}
          <div className="absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2">
            <CenterSection>
              <form
                className="flex flex-wrap items-center justify-center gap-2 bg-primary/14 p-4 backdrop-blur-xl "
                onSubmit={(e) => e.preventDefault()}
              >
                <DatePicker
                  value={checkIn}
                  onChange={(date) => {
                    setCheckIn(date);
                    if (date && checkOut && date >= checkOut) setCheckOut(undefined);
                  }}
                  placeholder="Check In"
                  disabled={{ before: new Date() }}
                  variant="light"
                />

                <DatePicker
                  value={checkOut}
                  onChange={setCheckOut}
                  placeholder="Check Out"
                  disabled={{ before: checkIn ?? new Date() }}
                  defaultMonth={checkIn}
                  variant="light"
                />

                {/* Guests */}
                <GuestPicker variant="light" />

                {/* Promo Code */}
                <div className="flex h-10 flex-1  min-w-45 items-center border border-white/40 px-4 text-white">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="w-full bg-transparent outline-none placeholder:text-white/60 text-sm"
                  />
                </div>

                {/* <button
                  type="submit"
                  className="h-10  px-8  font-normal uppercase text-primary transition hover:opacity-90 cursor-pointer shadow-[0px_4px_4px_0px_#00000040]"
                >
                  Book Now
                </button> */}

                <div className="  bg-linear-to-b from-primary via-accent/76 to-primary  shadow-[0px_4px_4px_0px_#00000040]
                             group
                    relative
                    overflow-hidden
                    p-px
                    bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
                    bg-size-[250%]
                    bg-left
                    duration-1000
                    transition-all
                    hover:bg-right
                            ">
                  <div className="relative w-full bg-ivory h-auto transition-all duration-300  flex items-center justify-center">
                    <button
                      type="submit"
                      className="h-10  px-8  font-normal uppercase text-primary transition hover:opacity-90 cursor-pointer shadow-[0px_4px_4px_0px_#00000040]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </CenterSection>
          </div>
        </div>
      </section>

    </>
  );
}
