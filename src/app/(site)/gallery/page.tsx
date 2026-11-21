import type { Metadata } from "next";
import GalleryList from "./components/GalleryList";
import { getGalleryData } from "@/src/service/galleries";
import { getGalleryCategoriesData } from "@/src/service/gallery-categories";
import GalleryBanner from "./components/GalleryBanner";

export const metadata: Metadata = {
  // Title already contains the brand name, so bypass the "%s | The Beach Bay" template.
  title: { absolute: "The Beach Bay Gallery | Resort & Spa in Kanyakumari" },
  description:
    "View The Beach Bay Resort & Spa in Kanyakumari, including sea-view rooms, the infinity pool, dining spaces, interiors and property views.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "The Beach Bay Gallery | Resort & Spa in Kanyakumari",
    description:
      "View The Beach Bay Resort & Spa in Kanyakumari, including sea-view rooms, the infinity pool, dining spaces, interiors and property views.",
    url: "/gallery",
    images: [{ url: "/gallery/beachfront-hotel-infinity-pool-sunset.webp", width: 1600, height: 900 }],
  },
};

export default async function GalleryPage() {
  const [{ data: categories }, { data: galleries }] = await Promise.all([
    getGalleryCategoriesData(),
    getGalleryData(),
  ]);

  return (
    <>
      <GalleryBanner />
      <GalleryList sections={categories} galleries={galleries} />
    </>
  );
}
