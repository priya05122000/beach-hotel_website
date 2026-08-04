import type { Metadata } from "next";
import HeroBanner from "./home/components/HeroBanner";
import ExploreDestinationSection from "./home/components/ExploreDestinationSection";
import AmenitiesSection from "./home/components/AmenitiesSection";
import RoomShowcaseSection from "./home/components/RoomShowcaseSection";
import RoomCardsSection from "./home/components/RoomCardsSection";
import HorizontalScrollSection from "./home/components/HorizontalScrollSection";
import GallerySection from "./home/components/GallerySection";
import MomentsSection from "./home/components/MomentsSection";
import LazyTestimonials from "./home/components/LazyTestimonials";
import ExclusiveOffersSection from "./home/components/ExclusiveOffersSection";
import BannerBelowSection from "./home/components/BannerBelowSection";
import SignatureHeadline from "./home/components/SignatureHeadline";
import FeaturedHighlightSection from "./home/components/FeaturedHighlightSection";

import { getGuestReviewsData } from "@/src/service/guest-reviews";
import { getGalleryData } from "@/src/service/galleries";

import { getOfferData } from "@/src/service/offers";
import { getRoomsData } from "@/src/service/rooms";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s | The Beach Hotel" template —
  // this title already contains the brand name, so templating it would
  // double up ("...Address | The Beach Hotel") and push it well past 60
  // characters.
  title: { absolute: "The Beach Hotel Kanyakumari — Luxury Address" },
  description:
    "Book your stay at The Beach Hotel Kanyakumari. Enjoy luxury sea view rooms, infinity pool, beachfront location and the best direct rates today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Beach Hotel in Kanniyakumari for Sea View Stay",
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
  // Embla mounts every slide's DOM upfront (no virtualization), so an
  // unbounded review count directly inflates page DOM size.
  const featuredReviews = guestReviewData.data.slice(0, 10);

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
      <LazyTestimonials reviews={featuredReviews} />
      <MomentsSection />
    </>
  );
}
