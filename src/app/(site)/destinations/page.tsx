import type { Metadata } from "next";
import { getNearbyDestinationData } from "@/src/service/nearbyDestination";
import NearbyHeroBanner from "./components/NearbyHeroBanner";
import NearbyDestinationsSection from "./components/NearbyDestinationsSection";

export const metadata: Metadata = {
  title: "Nearby Destinations",
  description:
    "Explore the must-see destinations near The Beach Hotel, Kanyakumari — from ancient temples to iconic landmarks, all within easy reach.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Nearby Destinations — The Beach Hotel",
    description:
      "Explore must-see destinations near The Beach Hotel, Kanyakumari — ancient temples, iconic landmarks, and stunning coastlines.",
    url: "/destinations",
  },
};

export default async function DestinationsPage() {
  const { data: destinations } = await getNearbyDestinationData();
  const activeDestinations = destinations.filter((d) => d.is_active !== false);

  return (
    <div>
      <NearbyHeroBanner destinations={activeDestinations.slice(0, 5)} />
      <NearbyDestinationsSection destinations={activeDestinations} />
    </div>
  );
}
