import type { Metadata } from "next";
import HeroBanner from "./home/components/HeroBanner";
import ExploreDestinationSection from "./home/components/ExploreDestinationSection";
import AmenitiesSection from "./home/components/AmenitiesSection";
import RoomShowcaseSection from "./home/components/RoomShowcaseSection";
import RoomCardsSection from "./home/components/RoomCardsSection";
import HorizontalScrollSection from "./home/components/HorizontalScrollSection";
import GallerySection from "./home/components/GallerySection";
import Testimonials from "./home/components/Testimonials";
import MomentsSection from "./home/components/MomentsSection";
import ExclusiveOffersSection from "./home/components/ExclusiveOffersSection";
import BannerBelowSection from "./home/components/BannerBelowSection";
import SignatureHeadline from "./home/components/SignatureHeadline";
import FeaturedHighlightSection from "./home/components/FeaturedHighlightSection";

import { getGuestReviewsData } from "@/src/service/guest-reviews";
import { getGalleryData } from "@/src/service/galleries";

import { getOfferData } from "@/src/service/offers";
import { getRoomsData } from "@/src/service/rooms";


export const metadata: Metadata = {
  title: "The Beach Hotel — Kanyakumari's Premier Luxury Address",
  description:
    "Experience unmatched luxury at The Beach Hotel, Kanyakumari — where three oceans meet. Book your stay and discover world-class rooms, amenities, and sea views.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Beach Hotel — Kanyakumari's Premier Luxury Address",
    description:
      "Experience unmatched luxury at The Beach Hotel, Kanyakumari — where three oceans meet.",
    url: "/",
    type: "website",
    images: [{ url: "/home/hero-1.webp", width: 1600, height: 900, alt: "The Beach Hotel, Kanyakumari" }],
  },
};


function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function HomePage() {
  const [guestReviewData, galleryData, offerDatas, roomDatas] =
    await Promise.all([
      getGuestReviewsData(),
      getGalleryData(),
      getOfferData(),
      getRoomsData(),
    ]);

  const randomGalleryItems = shuffleArray(galleryData.data).slice(0, 8);

  return (
    <>
      <HeroBanner />
      <BannerBelowSection />
      <SignatureHeadline />
      <ExclusiveOffersSection offerDatas={offerDatas.data} />
      <ExploreDestinationSection />
      <AmenitiesSection />
      <RoomShowcaseSection />
      <RoomCardsSection rooms={roomDatas.data} />
      <HorizontalScrollSection />
      <FeaturedHighlightSection />
      <GallerySection galleries={randomGalleryItems} />
      <Testimonials reviews={guestReviewData.data} />
      <MomentsSection />
    </>
  );
}
