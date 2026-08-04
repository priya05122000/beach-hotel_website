import type { Metadata } from "next";
import CommonBanner from "@/src/components/common/CommonBanner";
import InfluencerGrid from "./components/InfluencerGrid";
import { getReelsData } from "@/src/service/reels";

export const metadata: Metadata = {
  title: "Our Influencer Spotlight",
  description:
    "See the creators and influencers who have stayed at The Beach Hotel, Kanyakumari, and watch their reels from our coastal address.",
  alternates: { canonical: "/influencer" },
  openGraph: {
    title: "Influencer Spotlight — The Beach Hotel",
    description:
      "Creators and influencers who have stayed at The Beach Hotel, Kanyakumari — watch their reels from our coastal address.",
    url: "/influencer",
  },
};

export default async function InfluencerPage() {
  const { data: reels } = await getReelsData();
  const activeReels = reels
    .filter((r) => r.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <div>
      <CommonBanner
        title="INFLUENCER SPOTLIGHT"
        src="/home/hero-1.webp"
        alt="Influencer Spotlight — The Beach Hotel, Kanyakumari"
      />
      <InfluencerGrid reels={activeReels} />
    </div>
  );
}
