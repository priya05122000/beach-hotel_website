import HeroBanner from "./components/HeroBanner";
import ExploreDestinationSection from "./components/ExploreDestinationSection";
import AmenitiesSection from "./components/AmenitiesSection";
import RoomShowcaseSection from "./components/RoomShowcaseSection";
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
            <ExclusiveOffersSection offerDatas={offerDatas.data} />
            <ExploreDestinationSection />
            <AmenitiesSection />
            {/* <RoomShowcaseSection /> */}

            <GallerySection galleries={randomGalleryItems} />

            <HotelCTASection />
            <Testimonials reviews={guestReviewData.data} />
            <FAQSection faqDatas={faqDatas.data} faqCategories={faqCategories.data} />
        </>
    );
}