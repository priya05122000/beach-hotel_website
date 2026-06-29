import { getNearbyDestinationData } from "@/src/service/nearbyDestination";
import NearbyHeroBanner from "./components/NearbyHeroBanner";
import NearbyDestinationsSection from "./components/NearbyDestinationsSection";

export default async function NearbyPage() {
    const { data: destinations } = await getNearbyDestinationData();
    const activeDestinations = destinations.filter((d) => d.is_active !== false);

    return (
        <div>
            <NearbyHeroBanner destinations={activeDestinations.slice(0, 5)} />
            <NearbyDestinationsSection destinations={activeDestinations} />
        </div>
    );
}
