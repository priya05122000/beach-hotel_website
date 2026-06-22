import CommonBanner from '@/src/components/common/CommonBanner'
import React from 'react'
import HotelGallerySection from './components/HotelGallerySection'
import { getGalleryCategoriesData } from '@/src/service/gallery-categories'
import GalleryTabs from './components/GalleryTabs'
import { getGalleryData } from '@/src/service/galleries'

const page = async () => {

    const galleryCategoryData = await getGalleryCategoriesData();

    const galleryData = await getGalleryData();

    return (
        <>
            <CommonBanner title="Gallery" />
            <GalleryTabs galleries={galleryCategoryData.data} />
            <HotelGallerySection galleries={galleryData.data} galleryCategories={galleryCategoryData.data} />
        </>
    )
}

export default page
