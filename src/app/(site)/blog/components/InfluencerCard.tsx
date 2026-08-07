"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import type { Reel } from "@/src/types";
import { Button } from "@/src/components/common/button";
import SubHeading from "@/src/components/common/SubHeading";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface Props {
  reel: Reel;
  videoRefs: React.RefObject<(HTMLVideoElement | null)[]>;
  index: number;
}

export default function InfluencerCard({ reel, videoRefs, index }: Props) {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = reel.video ? `${API_URL}/uploads/${reel.video}` : undefined;
  const thumbnailUrl = reel.thumbnail ? `${API_URL}/uploads/${reel.thumbnail}` : "/placeholder-video.jpg";

  // Same rule as MomentsSection/Client.tsx: `.play()` must be called
  // synchronously inside the click handler for real mobile Safari to allow
  // it — deferring to an effect gets silently rejected on a real phone.
  const handleStart = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => { });
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index && !v.paused) v.pause();
    });
  };

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={started ? togglePlayback : handleStart}
        aria-label={started ? (isPlaying ? "Pause video" : "Play video") : "Play video"}
        className="relative block w-full h-90 xl:h-100 overflow-hidden cursor-pointer"
      >
        <video
          ref={(el) => {
            videoRef.current = el;
            videoRefs.current[index] = el;
          }}
          src={videoUrl}
          poster={thumbnailUrl}
          preload="auto"
          playsInline
          onPlay={handlePlay}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {!started && (
          <Image
            src={thumbnailUrl}
            alt={reel.title || "Video thumbnail"}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          {started && isPlaying ? (
            <Pause size={40} className="text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100" fill="currentColor" />
          ) : (
            <Play size={40} className="ml-1 text-cream" fill="currentColor" />
          )}
        </div>
      </button>

      <div className="pt-5 flex flex-col flex-1">
        <SubHeading className="text-primary-dark mb-4 leading-relaxed">
          {reel.title}
        </SubHeading>

        {reel.description && (
          <p className="text-charcoal leading-relaxed mb-4 line-clamp-3">
            {reel.description}
          </p>
        )}

        {reel.reel_url && (
          <Button
            href={reel.reel_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full pointer-events-auto whitespace-nowrap font-normal text-primary-dark cursor-pointer"
          >
            View On Instagram<span className="sr-only"> — {reel.title}</span>
          </Button>
        )}
      </div>
    </article>
  );
}
