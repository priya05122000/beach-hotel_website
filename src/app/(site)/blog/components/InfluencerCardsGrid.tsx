"use client";

import { useRef } from "react";
import type { Reel } from "@/src/types";
import InfluencerCard from "./InfluencerCard";

interface Props {
  reels: Reel[];
}

export default function InfluencerCardsGrid({ reels }: Props) {
  // Shared across every card so starting one video pauses whichever other
  // one is currently playing — same rule as the homepage Moments section.
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Cards receive this to register their video element instead of writing
  // into `videoRefs` directly — mutating a ref that arrived as a prop is
  // what React Compiler's rules flag; owning the mutation here (a plain
  // local ref, not something this component received) keeps it clean.
  const setVideoRef = (index: number, el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el;
  };

  if (!reels.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-16 lg:pt-20">
      {reels.map((reel, i) => (
        <InfluencerCard
          key={reel.id}
          reel={reel}
          videoRefs={videoRefs}
          setVideoRef={setVideoRef}
          index={i}
        />
      ))}
    </div>
  );
}
