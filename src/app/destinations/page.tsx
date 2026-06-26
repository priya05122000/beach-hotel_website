// import CommonBanner from '@/src/components/common/CommonBanner'
// import React from 'react'
// import DestinationHighlight from './components/DestinationHighlight'

// const page = async () => {
//     return (
//         <>
//             <CommonBanner title="Destinations" />
//             <DestinationHighlight />
//         </>
//     )
// }

// export default page


import { getNearbyDestinationData } from "@/src/service/nearbyDestination";
import NearbyHeroBanner from "./components/NearbyHeroBanner";
import NearbyDestinationsSection from "./components/NearbyDestinationsSection";

export default async function NearbyPage() {
    const { data: destinations } = await getNearbyDestinationData();

    return (
        <div>
            <NearbyHeroBanner destinations={destinations} />
            <NearbyDestinationsSection destinations={destinations} />
        </div>
    );
}
