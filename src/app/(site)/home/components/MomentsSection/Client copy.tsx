"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/src/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/src/components/common/Section";

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

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

function InstagramEmbed({ item }: { item: MomentItem }) {
  const embedSrc = item.reelUrl!
    .replace("/reels/", "/reel/")
    .replace(/\/+$/, "") + "/embed";

    
  return (
    <iframe
      src={embedSrc}
      title={item.title}
      className="absolute inset-0 h-full w-full border-0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
}

function UploadedVideo({ item }: { item: MomentItem }) {
  const [playVideo, setPlayVideo] = useState(false);

  if (playVideo) {
    return (
      <video
        src={item.videoUrl}
        controls
        autoPlay
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
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="flex h-12 w-12 items-center justify-center bg-white/90">
          <Play size={20} className="ml-1 text-primary-dark" fill="currentColor" />
        </div>
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
          <div
            key={item.id}
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
              {item.reelUrl ? (
                <InstagramEmbed item={item} />
              ) : (
                <UploadedVideo item={item} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
