import CommonBanner from '@/src/components/common/CommonBanner'
import FacilitiesSection from './components/FacilitiesSection'
import { getFacilitiesData } from '@/src/service/facilities'

export default async function page() {
    const { data: facilities } = await getFacilitiesData()

    return (
        <>
            <CommonBanner title="Facilities" />
            <FacilitiesSection facilities={facilities} />
        </>
    )
}
