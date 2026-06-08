import HeroBanner from './components/HeroBanner'
import ExploreDestinationSection from './components/ExploreDestinationSection'
import AmenitiesSection from './components/AmenitiesSection'
import GallerySection from './components/GallerySection'
import HotelCTASection from './components/HotelCTASection'
import Testimonials from './components/Testimonials'
import FAQSection from './components/FAQSection'
import ExclusiveOffersSection from './components/ExclusiveOffersSection'

const HomePage = () => {
    return (
        <>
            <HeroBanner />
            <ExclusiveOffersSection />
            <ExploreDestinationSection />
            <AmenitiesSection />
            <GallerySection />
            <HotelCTASection />
            <Testimonials />
            <FAQSection />
        </>
    )
}

export default HomePage
