import CommonBanner from '@/src/components/common/CommonBanner'
import React from 'react'
import DestinationHighlight from './components/DestinationHighlight'

const page = async () => {
    return (
        <>
            <CommonBanner title="Destinations" />
            <DestinationHighlight />
        </>
    )
}

export default page
