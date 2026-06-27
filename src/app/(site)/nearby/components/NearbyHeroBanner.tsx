"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import type { NearbyDestination } from "@/src/types";

import "swiper/css";
import "swiper/css/effect-fade";

interface NearbyHeroBannerProps {
  destinations: NearbyDestination[];
}

const getImageSrc = (img?: string | string[] | null): string => {
  const fallback = "/home/hero-1.webp";
  if (!img) return fallback;
  const raw = Array.isArray(img) ? img[0] : img;
  if (!raw) return fallback;
  const s = String(raw).trim();
  if (!s) return fallback;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${s.replace(/^\/+/, "")}`;
};

const FALLBACK_SLIDES = [
  {
    id: 1,
    destination_name: "Discover Paradise",
    short_description:
      "Experience the beauty of pristine beaches and crystal clear waters.",
    image_url: "/home/hero-1.webp",
  },
  {
    id: 2,
    destination_name: "Coastal Escapes",
    short_description:
      "Unwind in nature's most breathtaking coastal destinations.",
    image_url: "/home/herobanner.jpg",
  },
  {
    id: 3,
    destination_name: "Hidden Gems",
    short_description:
      "Explore secluded spots just moments from your doorstep.",
    image_url: "/home/hero-1.webp",
  },
];

export default function NearbyHeroBanner({
  destinations,
}: NearbyHeroBannerProps) {
  const slides = destinations.length > 0 ? destinations : FALLBACK_SLIDES;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const scrollTo = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        grabCursor={true}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, background: "black" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <Image
              src={getImageSrc(slide.image_url)}
              alt={slide.destination_name}
              fill
              priority={index === 0}
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/0 to-black/60" />
            <div className="absolute px-6 md:left-40 lg:left-1/3 xl:right-1/3 bottom-20 sm:bottom-40 z-10 flex flex-col">
              <div className="max-w-xs sm:max-w-md">
                <p className="text-white/70 uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 font-arizona-sans-regular">
                  Nearby Destinations
                </p>
                <h1 className="text-white font-arizona-flare-regular font-normal leading-tight mb-4">
                  {slide.destination_name}
                </h1>
                {slide.short_description && (
                  <p className="text-white/80 max-w-md leading-relaxed">
                    {slide.short_description}
                  </p>
                )}
                {"distance" in slide &&
                  (slide as NearbyDestination).distance && (
                    <span className="inline-block mt-4 text-accent text-sm font-arizona-sans-regular tracking-widest uppercase">
                      {(slide as NearbyDestination).distance} away
                    </span>
                  )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dot pagination */}
      <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
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
