"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
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
}

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 1,
    destination_name: "Discover Paradise",
    short_description: "Experience the beauty of pristine beaches and crystal clear waters.",
    image_url: "/home/hero-1.webp",
  },
  {
    id: 2,
    destination_name: "Coastal Escapes",
    short_description: "Unwind in nature's most breathtaking coastal destinations.",
    image_url: "/home/herobanner.webp",
  },
  {
    id: 3,
    destination_name: "Hidden Gems",
    short_description: "Explore secluded spots just moments from your doorstep.",
    image_url: "/home/hero-1.webp",
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
  if (url.startsWith("/") || url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`;
}

export default function NearbyHeroBanner({ destinations }: Props) {
  const slides: Slide[] = destinations.length > 0 ? destinations : FALLBACK_SLIDES;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const current = slides[selectedIndex];

  return (
    <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      {/* Slides */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => {
            const rawUrl = getFirstImage(
              Array.isArray(slide.image_url)
                ? (slide.image_url[0] ?? "")
                : (slide.image_url ?? "")
            );
            const src = resolveImageSrc(rawUrl);
            return (
              <div key={slide.id} className="relative flex-[0_0_100%] h-full">
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
        className="absolute inset-0 bg-linear-to-b from-black/20 via-black/0 to-black/60 pointer-events-none"
        style={{ zIndex: 5 }}
      />


      {/* Text content */}
      <div
        className="absolute px-6 md:left-40 lg:left-1/3 xl:right-1/3 bottom-20 sm:bottom-40 flex flex-col pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-xs sm:max-w-md">
          <h1 className="text-white type-display-sm leading-tight mb-4">
            {current?.destination_name}
          </h1>
          {current?.short_description && (
            <p className="text-white type-body max-w-md leading-relaxed">
              {current.short_description}
            </p>
          )}
          {current?.distance && (
            <span className="inline-block mt-4 text-accent tracking-widest uppercase">
              {current.distance} away
            </span>
          )}
        </div>
      </div>

      {/* Dot pagination */}
      <div
        className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
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
