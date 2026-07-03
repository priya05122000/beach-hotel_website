import type { Metadata } from "next";
import { Suspense } from "react";
import FacilitiesSplitHero from "./components/FacilitiesSplitHero";
import FacilitiesSection from "./components/FacilitiesSection";
import { FacilityScroller } from "./components/FacilityScroller";
import { getFacilitiesData } from "@/src/service/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Discover world-class facilities at The Beach Hotel, Kanyakumari — from infinity pools and fine dining to a fully equipped spa and conference centre.",
  alternates: { canonical: "/facilities" },
  openGraph: {
    title: "Facilities — The Beach Hotel",
    description:
      "World-class facilities including infinity pool, spa, fine dining, and more at The Beach Hotel, Kanyakumari.",
    url: "/facilities",
    images: [{ url: "/banner/facilities.webp", width: 1600, height: 900 }],
  },
};

export default async function FacilitiesPage() {
  const { data: facilities } = await getFacilitiesData();

  return (
    <>
      <Suspense fallback={null}>
        <FacilityScroller />
      </Suspense>
      <FacilitiesSplitHero />
      <div id="facilities">
        <FacilitiesSection facilities={facilities} />
      </div>
    </>
  );
}
