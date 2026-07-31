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

export default function DestinationImageSlider({
  images,
  name,
}: {
  images: string | string[] | undefined;
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
    <div className="relative w-full lg:w-90 xl:w-118 aspect-4/3 overflow-hidden group">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {normalizedImages.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}`}
                alt={`${name} — image ${i + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 52vw"
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
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
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
