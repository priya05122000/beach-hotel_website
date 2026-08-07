"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import CenterSection from "@/src/components/common/CenterSection";
import DatePicker from "@/src/components/ui/DatePicker";
import GuestPicker from "@/src/components/ui/GuestPicker";

const BOOKING_URL = "https://devnew.skyhms.in/booking_next/booking/";

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
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

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
        <div className="absolute inset-x-0 bottom-10 z-20 w-full">
          <CenterSection>
            <form
              action={BOOKING_URL}
              method="get"
              target="_blank"
              className="flex flex-wrap items-center justify-center gap-2 bg-primary/14 p-4 backdrop-blur-xl transform-gpu"
              style={{ WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)" }}
            >
              <input type="hidden" name="bkgfrmdt" value={checkIn ? format(checkIn, "dd-MM-yyyy") : ""} />
              <input type="hidden" name="bkgtodt" value={checkOut ? format(checkOut, "dd-MM-yyyy") : ""} />
              <input type="hidden" name="bkgadultc" value={adults} />
              <input type="hidden" name="bkgchildc" value={children} />

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
              <GuestPicker
                variant="light"
                onChange={(nextAdults, nextChildren) => {
                  setAdults(nextAdults);
                  setChildren(nextChildren);
                }}
              />

              {/* Promo Code */}
              <div className="flex py-2 min-w-45 flex-1 items-center border border-white/40 px-4 text-white">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="w-full bg-transparent type-overline tracking-widest uppercase outline-none placeholder:text-white/60"
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
                    className="cursor-pointer type-overline px-4 font-normal  text-primary-dark transition-opacity hover:opacity-90  py-2 text-[11px] font-arizona-flare-regular uppercase tracking-[3px] "
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