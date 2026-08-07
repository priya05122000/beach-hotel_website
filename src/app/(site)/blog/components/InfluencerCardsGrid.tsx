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

  if (!reels.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pt-16 lg:pt-20">
      {reels.map((reel, i) => (
        <InfluencerCard key={reel.id} reel={reel} videoRefs={videoRefs} index={i} />
      ))}
    </div>
  );
}
