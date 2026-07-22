"use client";

import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";
import Eyebrow from "@/src/components/common/Eyebrow";

gsap.registerPlugin(ScrollTrigger);

export interface MomentItem {
  id: string;
  title: string;
  description?: string;
  reelUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface Props {
  items: MomentItem[];
}

function UploadedVideo({ item }: { item: MomentItem }) {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) {
      videoRef.current?.play().catch(() => { });
    }
  }, [started]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  };

  if (started) {
    return (
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute inset-0 h-full w-full cursor-pointer"
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.thumbnailUrl || "/placeholder-video.jpg"}
          preload="auto"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            <Pause size={50} className="text-cream opacity-0 transition-opacity duration-200 hover:opacity-100" fill="currentColor" />
          ) : (
            <Play size={50} className="ml-1 text-cream" fill="currentColor" />
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStarted(true)}
      aria-label="Play video"
      className="absolute inset-0 h-full w-full cursor-pointer"
    >
      <Image
        src={item.thumbnailUrl || "/placeholder-video.jpg"}
        alt={item.title || "Video thumbnail"}
        fill
        className="object-cover object-center"
        sizes="(max-width:640px) 100vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center ">
        <Play size={50} className="ml-1 text-cream" fill="currentColor" />
      </div>
    </button>
  );
}

export default function MomentsSectionClient({ items }: Props) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Skip the decorative parallax on small screens — it's extra
      // scroll-driven work that competes with everything else animating
      // at once, and isn't worth the main-thread cost at mobile sizes.
      gsap.matchMedia().add("(min-width: 768px)", () => {
        containerRefs.current.forEach((container, i) => {
          const inner = innerRefs.current[i];

          if (!container || !inner) return;

          gsap.fromTo(
            inner,
            { y: -32 },
            {
              y: 32,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Section className=" py-16 lg:py-20">
      <div className="mb-32">
        <Eyebrow align="center" className="mt-2 text-gray">
          Influencer Spotlight
        </Eyebrow>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5 items-end">
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-col w-full group">
            <div
              ref={(el) => {
                containerRefs.current[i] = el;
              }}
              className="relative w-full overflow-hidden h-80 sm:h-96 lg:h-112"
            >
              <div
                ref={(el) => {
                  innerRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <UploadedVideo item={item} />
              </div>

              {item.reelUrl && (
                <a
                  href={item.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-4 top-4 z-20 flex h-8 max-w-8 items-center overflow-hidden  backdrop-blur-xl bg-primary-dark/10  text-white no-underline transition-[max-width] duration-500 hover:max-w-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <Image src="/icons/instagram.svg" alt="View on Instagram" width={15} height={15} />
                  </span>
                  <span className="whitespace-nowrap pr-4 text-xs">View On Instagram</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
