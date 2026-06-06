import CommonBanner from '@/src/components/common/CommonBanner'
import React from 'react'
import StorySection from './components/StorySection'
import SectionHeading from './components/SectionHeading'
import StoryPreviewSection from './components/StoryPreviewSection'
import MembershipSection from './components/MembershipSection'

const page = () => {
    return (
        <>
            <CommonBanner />
            <StorySection />
            <SectionHeading />
            <StoryPreviewSection />
            <MembershipSection />
        </>
    )
}

export default page
