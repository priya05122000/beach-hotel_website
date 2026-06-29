import HeroBanner from "./components/HeroBanner";
import ExploreDestinationSection from "./components/ExploreDestinationSection";
import AmenitiesSection from "./components/AmenitiesSection";
import RoomShowcaseSection from "./components/RoomShowcaseSection";
import RoomCardsSection from "./components/RoomCardsSection";
import HorizontalScrollSection from "./components/HorizontalScrollSection";
import ZoomRevealSection from "./components/ZoomRevealSection";
import GallerySection from "./components/GallerySection";
import HotelCTASection from "./components/HotelCTASection";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import ExclusiveOffersSection from "./components/ExclusiveOffersSection";

import { getBannerData } from "@/src/service/banner";
import { getGuestReviewsData } from "@/src/service/guest-reviews";
import { getGalleryData } from "@/src/service/galleries";
import { getFaqCategoryData } from "@/src/service/faq-categories";
import { getFaqData } from "@/src/service/faqs";
import { getOfferData } from "@/src/service/offers";
import BannerBelowSection from "./components/BannerBelowSection";
import CinematicSplitSection from "./components/CinematicSplitSection";
import SignatureHeadline from "./components/SignatureHeadline";
import FeaturedHighlightSection from "./components/FeaturedHighlightSection";

export default async function HomePage() {
    const bannerData = await getBannerData();
    const guestReviewData = await getGuestReviewsData();
    const galleryData = await getGalleryData();
    const faqCategories = await getFaqCategoryData();
    const faqDatas = await getFaqData();
    const offerDatas = await getOfferData();


    const shuffled = [...galleryData.data];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const randomGalleryItems = shuffled.slice(0, 8);

    return (
        <>
            <HeroBanner />
            <BannerBelowSection />
            <SignatureHeadline />
            <ExclusiveOffersSection offerDatas={offerDatas.data} />
            <ExploreDestinationSection />
            <AmenitiesSection />
            
            <RoomShowcaseSection />
            <RoomCardsSection />
            <HorizontalScrollSection />
            {/* <ZoomRevealSection /> */}

            <FeaturedHighlightSection />

            {/* <HotelCTASection /> */}

            {/* <CinematicSplitSection /> */}


            {/* <FAQSection faqDatas={faqDatas.data} faqCategories={faqCategories.data} /> */}

            <GallerySection galleries={randomGalleryItems} />
            <Testimonials reviews={guestReviewData.data} />

        </>
    );
}