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
