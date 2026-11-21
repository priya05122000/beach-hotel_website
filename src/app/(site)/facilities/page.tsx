import type { Metadata } from "next";
import { Suspense } from "react";
import FacilitiesSplitHero from "./components/FacilitiesSplitHero";
import FacilitiesSection from "./components/FacilitiesSection";
import FacilityAmenitiesSection from "./components/FacilityAmenitiesSection";
import { getActiveFacilities } from "@/src/service/facilities";
import { SectionScroller } from "@/src/components/common/SectionScroller";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "Resort Facilities & Spa in Kanyakumari | The Beach Bay" },
  description:
    "Explore resort facilities at The Beach Bay in Kanyakumari, including an infinity swimming pool, spa, restaurant, room service, parking and guest services.",
  alternates: { canonical: "/facilities" },
  openGraph: {
    title: "Resort Facilities & Spa in Kanyakumari | The Beach Bay",
    description:
      "Explore resort facilities at The Beach Bay in Kanyakumari, including an infinity swimming pool, spa, restaurant, room service, parking and guest services.",
    url: "/facilities",
    images: [{ url: "/common/banner/sea-view-hotel-suite-sunset.webp", width: 1600, height: 900 }],
  },
};

export default async function FacilitiesPage() {
  const facilities = await getActiveFacilities();

  return (
    <>
      <div className="bg-cream">
        <Suspense fallback={null}>
          <SectionScroller dataAttr="data-facility-order" hashPrefix="facility-" />
        </Suspense>
        <FacilitiesSplitHero />

        <div id="facilities">
          <FacilitiesSection facilities={facilities} />
        </div>

        <div className="h-24 lg:h-32 bg-linear-to-b from-cream to-white" aria-hidden="true" />
      </div>
      <div className="bg-white">
        <FacilityAmenitiesSection />
      </div>
    </>
  );
}
