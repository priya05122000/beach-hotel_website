import FacilitiesSplitHero from './components/FacilitiesSplitHero'
import FacilitiesSection from './components/FacilitiesSection'
import { getFacilitiesData } from '@/src/service/facilities'

export default async function page() {
    const { data: facilities } = await getFacilitiesData()

    return (
        <>
            <FacilitiesSplitHero />
            <div id="facilities">
                <FacilitiesSection facilities={facilities} />
            </div>
        </>
    )
}
