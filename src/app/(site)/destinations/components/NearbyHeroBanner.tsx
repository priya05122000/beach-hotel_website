"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { MapPin } from "lucide-react";
import PillLinkButton from "@/src/components/common/PillLinkButton";
import type { NearbyDestination } from "@/src/types";

interface Props {
  destinations: NearbyDestination[];
}

interface Slide {
  id: string | number;
  destination_name: string;
  short_description?: string;
  image_url?: string | string[];
  distance?: string;
  show_distance?: boolean;
  ticket_booking_link?: string;
}

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 1,
    destination_name: "Paradise Nearby",
    short_description:
      "Experience the beauty of pristine beaches and crystal clear waters.",
    image_url: "/home/hero-1.webp",
    show_distance: true,
  },
  {
    id: 2,
    destination_name: "Coastal Escapes",
    short_description:
      "Relax in nature's most striking coastal destinations.",
    image_url: "/home/herobanner.webp",
    show_distance: true,
  },
  {
    id: 3,
    destination_name: "Local Favourites",
    short_description:
      "Secluded spots just moments from your doorstep.",
    image_url: "/home/hero-1.webp",
    show_distance: true,
  },
];

function getFirstImage(imageUrl: string): string {
  try {
    const parsed = JSON.parse(imageUrl);
    return Array.isArray(parsed) ? parsed[0] : imageUrl;
  } catch {
    return imageUrl;
  }
}

function resolveImageSrc(url: string): string {
  if (!url) return "/home/hero-1.webp";

  if (url.startsWith("/") || url.startsWith("http")) {
    return url;
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`;
}

export default function NearbyHeroBanner({ destinations }: Props) {
  // console.log("Destinations:", destinations);
  // console.log(
  //   "Show Distance:",
  //   destinations.filter((item) => item.show_distance === true)
  // );

  const filteredDestinations = destinations.filter(
    (item: any) => item.show_distance === true
  );

  const slides: Slide[] =
    filteredDestinations.length > 0
      ? filteredDestinations
      : destinations.length === 0
        ? FALLBACK_SLIDES
        : [];

  if (slides.length === 0) {
    return null;
  }

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        // This carousel fills the whole viewport, so `stopOnMouseEnter`
        // would pause autoplay almost permanently — the cursor is nearly
        // always somewhere over it whenever the page is in view.
        stopOnMouseEnter: false,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const current = slides[selectedIndex];

  return (
    <div className="relative w-full h-[70vh] sm:h-screen overflow-hidden">
      {/* Slides */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => {
            const rawUrl = getFirstImage(
              Array.isArray(slide.image_url)
                ? slide.image_url[0] ?? ""
                : slide.image_url ?? ""
            );

            const src = resolveImageSrc(rawUrl);

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full"
              >
                <Image
                  src={src}
                  alt={slide.destination_name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/20 via-black/0 to-black/80 pointer-events-none"
        style={{ zIndex: 5 }}
      />

      {/* ── Mobile (<lg): everything stacked in one centered column so the
          distance/content/book-tickets blocks never overlap ── */}
      <div
        className="lg:hidden absolute inset-x-0 bottom-16 px-6 flex flex-col items-center text-center gap-3 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {current?.distance && (
          <div className="flex flex-col items-center">
            <span className="text-white type-body-sm tracking-widest mb-2">
              {current.distance} Away
            </span>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="w-px h-6 bg-white/50 mb-1" />
            <MapPin size={40} className="text-ivory" strokeWidth={1} />
          </div>
        )}

        <div className="max-w-xs">
          <h1 className="text-white type-display-sm leading-tight mb-2">
            {current.destination_name}
          </h1>

          {current.short_description && (
            <p className="text-white type-body-sm leading-relaxed line-clamp-3">
              {current.short_description}
            </p>
          )}
        </div>

        {current.ticket_booking_link && (
          <PillLinkButton
            href={current.ticket_booking_link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto border border-white text-white w-fit"
          >
            Book Tickets
          </PillLinkButton>
        )}
      </div>

      {/* ── Desktop (lg+): distance / content / book-tickets as separate,
          independently positioned blocks ── */}
      {current?.distance && (
        <div
          className="hidden lg:flex absolute px-6 left-10 bottom-10 flex-col items-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <span className="text-white text-center type-body-sm  tracking-widest mb-2">
            {current.distance} Away
          </span>

          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="w-px h-8 bg-white/50 mb-1" />

          <MapPin
            size={56}
            className="text-ivory"
            strokeWidth={1}
          />
        </div>
      )}

      <div
        className="hidden lg:flex absolute px-6 lg:left-1/3 xl:right-1/3 bottom-40 flex-col pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-xs sm:max-w-md">
          <h1 className="text-white type-display-sm leading-tight mb-4">
            {current.destination_name}
          </h1>

          {current.short_description && (
            <p className="text-white type-body max-w-md leading-relaxed">
              {current.short_description}
            </p>
          )}
        </div>
      </div>

      {current.ticket_booking_link && (
        <div
          className="hidden lg:block absolute px-6 right-10 bottom-10 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <PillLinkButton
            href={current.ticket_booking_link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto border border-white text-white w-fit"
          >
            Book Tickets
          </PillLinkButton>
        </div>
      )}

      {/* Dot Pagination */}
      <div
        className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Go to slide: ${slide.destination_name}`}
            onClick={() => scrollTo(index)}
            className="group relative flex items-center justify-center cursor-pointer"
          >
            <span
              className="block rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: index === selectedIndex ? "28px" : "8px",
                height: "8px",
                backgroundColor:
                  index === selectedIndex
                    ? "var(--color-accent, #FFC13B)"
                    : "rgba(255,255,255,0.5)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}