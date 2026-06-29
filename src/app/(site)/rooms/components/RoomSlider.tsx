"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const normalizeImages = (url?: string | string[] | null): string[] => {
  if (!url) return [];
  if (Array.isArray(url)) return url;
  try {
    const parsed = JSON.parse(url);
    if (Array.isArray(parsed)) return parsed;
  } catch { }
  return [url];
};

export default function RoomSlider({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const normalizedImages = normalizeImages(images);

  return (
    <div className="relative w-full overflow-hidden group">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {normalizedImages.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] aspect-4/3">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}`}
                alt={`${name} — image ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {normalizedImages.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="block rounded-full transition-all duration-400"
            style={{
              width: i === selectedIndex ? "20px" : "6px",
              height: "6px",
              backgroundColor:
                i === selectedIndex ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
