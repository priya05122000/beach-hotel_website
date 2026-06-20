"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GuestPicker from "@/src/components/ui/GuestPicker";
import CenterSection from "@/src/components/common/CenterSection";
import { typography } from "@/src/lib/typography";
import Link from "next/link";
import type { Banner } from "@/src/types";
import DatePicker from "@/src/components/ui/DatePicker";

interface HeroBannerProps {
  slides: Banner[];
}

export default function HeroBanner({ slides }: HeroBannerProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <section className="relative h-screen">
        <div className="relative h-screen overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide) => (
              <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative h-full w-full">
                  <Image
                    unoptimized
                    src={`${BASE_URL}/uploads/${slide.image_url}`}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            aria-label="Previous Slide"
            className="absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white cursor-pointer"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            aria-label="Next Slide"
            className="absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-white cursor-pointer"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Hero Booking Form */}
          <div className="absolute bottom-10 left-1/2 z-20 w-full -translate-x-1/2">
            <CenterSection>
              <form
                className="flex flex-wrap items-center justify-center gap-2 bg-primary/14 p-4 backdrop-blur-xl rounded-[14px]"
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
                <div className="flex h-10 flex-1 rounded-md min-w-45 items-center border border-white/40 px-4 text-white">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="w-full bg-transparent outline-none placeholder:text-white/60 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="h-10 bg-accent px-8 text-sm font-normal uppercase text-primary transition hover:opacity-90 cursor-pointer rounded-md"
                >
                  Book Now
                </button>
              </form>
            </CenterSection>
          </div>
        </div>
      </section>

      {/* Bottom Content */}
      <div className="flex h-[40vh] items-center justify-center bg-primary px-4 text-white relative">
        <div className="pointer-events-none absolute bottom-0 sm:-bottom-2 lg:-bottom-4 xl:-bottom-6">
          <Image
            src="/home/thebeach_hotel.png"
            alt="The Beach Hotel"
            width={1920}
            height={1200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="z-0 text-center">
          <h1 className={`${typography.textTwoXl} font-bold uppercase`}>
            The Beach Hotel
          </h1>

          <p className="mt-2 text-sm max-w-80 text-white font-extralight">
            Erumanayakkanpatti Beach Road, Kanyakumari 629702, India
          </p>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="mt-2 flex items-center justify-center gap-4">
              <Link
                href="/about-us"
                className="flex h-10 w-40 items-center justify-center rounded-md bg-accent px-6 text-sm font-normal uppercase text-primary shadow-lg"
              >
                About Us
              </Link>

              <Link
                href="tel:+911234567890"
                className="flex h-10 w-40 items-center justify-center rounded-md bg-white px-6 text-sm font-normal text-primary shadow-lg"
              >
                +91 12345 67890
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
