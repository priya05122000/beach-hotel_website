import CommonBanner from '@/src/components/common/CommonBanner'
import React from 'react'
import StorySection from './components/StorySection'
import SectionHeading from './components/SectionHeading'
import StoryPreviewSection from './components/StoryPreviewSection'
import MembershipSection from './components/MembershipSection'
import AboutHotelSection from './components/AboutHotelSection'
import FAQAboutSection from './components/FAQAboutSection'

const page = () => {
    return (
        <>
            {/* <CommonBanner title="About Us" /> */}

            <AboutHotelSection />
            <StorySection />
            {/* <SectionHeading /> */}
            <StoryPreviewSection />
            <MembershipSection />
            <FAQAboutSection />
        </>
    )
}

export default page
