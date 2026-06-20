import CommonBanner from '@/src/components/common/CommonBanner'
import React from 'react'
import ContactIntro from './components/ContactIntro'
import GroupCompaniesSection from './components/GroupCompaniesSection'
import ContactSection from './components/ContactSection'
import LocationSection from './components/LocationSection'

const page = () => {
    return (
        <>
            <CommonBanner title="Contact Us" />
            <ContactIntro />
            <GroupCompaniesSection />
            <ContactSection />
            <LocationSection />
        </>
    )
}

export default page
