import type { Metadata } from "next";
import { baseOpenGraph } from "@/src/lib/seo";
import { Suspense } from "react";
import { getActiveNearbyDestinations } from "@/src/service/nearbyDestination";
import NearbyHeroBanner from "./components/NearbyHeroBanner";
import NearbyDestinationsSection from "./components/NearbyDestinationsSection";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "Places to Visit Near The Beach Bay, Kanyakumari" },
  description:
    "Plan your Kanyakumari sightseeing with nearby attractions from The Beach Bay, including the Glass Bridge, temples, memorials and popular local landmarks.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    ...baseOpenGraph,
    title: "Places to Visit Near The Beach Bay, Kanyakumari",
    description:
      "Plan your Kanyakumari sightseeing with nearby attractions from The Beach Bay, including the Glass Bridge, temples, memorials and popular local landmarks.",
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
