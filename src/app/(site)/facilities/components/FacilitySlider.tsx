"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, prev, next]);

  const normalizedImages = normalizeImages(images);
  const activeSrc = normalizedImages[selectedIndex];

  return (
    <div className="relative h-full w-full overflow-hidden group">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {normalizedImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`View larger image: ${name}`}
              className="relative flex-[0_0_100%] h-full cursor-zoom-in"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}`}
                alt={`${name} — image ${i + 1}`}
                fill
                className="object-cover"
                sizes={sizes}
                priority={i === 0}
              />
            </button>
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

      {lightboxOpen && activeSrc && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — enlarged image`}
          className="fixed inset-0 z-100 h-screen w-screen bg-black"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {normalizedImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${activeSrc}`}
            alt={`${name} — enlarged image`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>,
        document.body
      )}
    </div>
  );
}
