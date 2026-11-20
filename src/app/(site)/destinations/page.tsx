import type { Metadata } from "next";
import { baseOpenGraph } from "@/src/lib/seo";
import { Suspense } from "react";
import { getActiveNearbyDestinations } from "@/src/service/nearbyDestination";
import NearbyHeroBanner from "./components/NearbyHeroBanner";
import NearbyDestinationsSection from "./components/NearbyDestinationsSection";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  title: "Nearby Places to Visit",
  description:
    "See the must-visit spots near The Beach Bay, Kanyakumari — from ancient temples to iconic landmarks, all within easy reach.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    ...baseOpenGraph,
    title: "Nearby Destinations — The Beach Bay",
    description:
      "See must-visit destinations near The Beach Bay, Kanyakumari — ancient temples, iconic landmarks, and stunning coastlines.",
    url: "/destinations",
    images: [
      {
        url: "/home/thiruvalluvar-statue-vivekananda-rock-kanyakumari-sunrise.webp",
        width: 1448,
        height: 1086,
        alt: "Thiruvalluvar Statue and Vivekananda Rock, Kanyakumari at sunrise",
      },
    ],
  },
};

export default async function DestinationsPage() {
  const activeDestinations = await getActiveNearbyDestinations();

  return (
    <div>
      <Suspense fallback={null}>
        <SectionScroller dataAttr="data-destination-order" hashPrefix="destination-" />
      </Suspense>
      <NearbyHeroBanner destinations={activeDestinations} />
      <NearbyDestinationsSection destinations={activeDestinations} />
    </div>
  );
}
