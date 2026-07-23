"use client";

import { memo, useState } from "react";
import Image from "next/image";

import CenterSection from "@/src/components/common/CenterSection";
import DatePicker from "@/src/components/ui/DatePicker";
import GuestPicker from "@/src/components/ui/GuestPicker";

// Static — never depends on the booking form's date/guest state, so it's
// split into its own memoized component to avoid re-rendering (and
// recreating the fill Image element) on every date selection.
const HeroBackgroundImage = memo(function HeroBackgroundImage() {
  return (
    <Image
      src="/banner/home.webp"
      alt="Hero Banner"
      fill
      preload
      fetchPriority="high"
      sizes="100vw"
      className="object-cover"
    />
  );
});

export default function HeroBanner() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const handleCheckIn = (date: Date | undefined) => {
    setCheckIn(date);

    if (date && checkOut && date >= checkOut) {
      setCheckOut(undefined);
    }
  };

  return (
    <section className="relative h-[90vh] sm:h-screen">
      {/* Background Image */}
      <div className="relative h-full overflow-hidden">
        <HeroBackgroundImage />

        {/* Hotel name — page h1 */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pb-32 sm:pb-20 pointer-events-none">
          <h1 className="text-white text-center font-light tracking-[0.35em] uppercase type-display-md">
            The Beach Hotel
          </h1>
          <p className="text-white/60 type-body tracking-[0.45em] uppercase mt-3">
            Kanyakumari, India
          </p>
        </div> */}

        {/* Booking Form */}
        <div className="absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2">
          <CenterSection>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-wrap items-center justify-center gap-2 bg-primary/14 p-4 backdrop-blur-xl"
            >
              {/* Check In */}
              <DatePicker
                value={checkIn}
                onChange={handleCheckIn}
                placeholder="Check In"
                disabled={{ before: new Date() }}
                variant="light"
              />

              {/* Check Out */}
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
              <div className="flex py-2 min-w-45 flex-1 items-center border border-white/40 px-4 text-white">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="w-full bg-transparent type-caption tracking-widest uppercase outline-none placeholder:text-white/60"
                />
              </div>

              {/* Book Button */}
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  bg-linear-to-b
                  from-primary
                  via-accent/76
                  to-primary
                  p-px
                  shadow-[0px_4px_4px_0px_#00000040]
                  bg-[linear-gradient(to_right,#012644,#FF992AC2,#012644,#012644,#FF992AC2,#012644)]
                  bg-size-[250%]
                  bg-left
                  transition-all
                  duration-1000
                  hover:bg-right

                "
              >
                <div className="flex h-full items-center justify-center bg-ivory">
                  <button
                    type="submit"
                    className="cursor-pointer type-caption px-4 font-normal  text-primary-dark transition-opacity hover:opacity-90  py-2 text-[11px] font-arizona-flare-regular uppercase tracking-[3px] "
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
  );
}