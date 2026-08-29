import type { Metadata } from "next";
import { Suspense } from "react";
import FacilitiesSplitHero from "./components/FacilitiesSplitHero";
import FacilitiesSection from "./components/FacilitiesSection";
import { getFacilitiesData } from "@/src/service/facilities";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  title: "Luxury Hotel Facilities in Kanyakumari",
  description:
    "World-class facilities at The Beach Hotel, Kanyakumari — from infinity pools and fine dining to a fully equipped spa and conference centre.",
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
    <div className="bg-ivory">
      <Suspense fallback={null}>
        <SectionScroller dataAttr="data-facility-id" />
      </Suspense>
      <FacilitiesSplitHero />

      <div id="facilities">
        <FacilitiesSection facilities={facilities} />
      </div>
    </div>
  );
}
