"use client";

import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";

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
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playVideo) {
      videoRef.current?.play().catch(() => { });
    }
  }, [playVideo]);

  if (playVideo) {
    return (
      <video
        ref={videoRef}
        src={item.videoUrl}
        controls
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlayVideo(true)}
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
        {/* <div className="flex h-8 w-8 items-center justify-center backdrop-blur-md bg-white/10"> */}
        <Play size={50} className="ml-1 text-white" fill="currentColor" />
        {/* </div> */}
      </div>
    </button>
  );
}

export default function MomentsSectionClient({ items }: Props) {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Section className="bg-white py-16 lg:py-20">
      <div className="mb-32">
        <h2 className="mt-2 uppercase text-gray type-h6 tracking-[73%] lg:tracking-[83%] text-center">
          Influencer Spotlight
        </h2>
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
                  className="absolute left-4 top-4 z-20 flex h-8 max-w-8 items-center overflow-hidden  backdrop-blur-xl bg-white/10  text-white no-underline transition-[max-width] duration-500 hover:max-w-50"
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
