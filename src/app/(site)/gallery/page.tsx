import type { Metadata } from "next";
import GalleryList from "./components/GalleryList";
import { getGalleryData } from "@/src/service/galleries";
import { getGalleryCategoriesData } from "@/src/service/gallery-categories";
import GalleryBanner from "./components/GalleryBanner";

export const metadata: Metadata = {
  title: "Gallery — Photos & Videos",
  description:
    "Browse photos and videos of The Beach Hotel, Kanyakumari — our rooms, sea views, dining, and the stunning coastline where three oceans converge.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — The Beach Hotel",
    description:
      "Photos and videos of The Beach Hotel, Kanyakumari — rooms, sea views, dining, and the stunning coastline.",
    url: "/gallery",
    images: [{ url: "/banner/gallery.webp", width: 1600, height: 900 }],
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
