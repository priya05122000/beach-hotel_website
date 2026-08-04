"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const normalizeImages = (url?: string | string[] | null): string[] => {
  if (!url) return [];
  if (Array.isArray(url)) return url.filter(Boolean);
  try {
    const parsed = JSON.parse(url);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch {
    // url is a plain string, not JSON — fall through
  }
  return [url];
};

export default function FacilitySlider({
  images,
  name,
  sizes,
}: {
  images?: string | string[];
  name: string;
  sizes: string;
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
    <div className="relative h-full w-full overflow-hidden group">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {normalizedImages.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}`}
                alt={`${name} — image ${i + 1}`}
                fill
                className="object-cover"
                sizes={sizes}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {normalizedImages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
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
        </>
      )}
    </div>
  );
}
