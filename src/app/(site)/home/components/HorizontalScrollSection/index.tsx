import { getActiveNearbyDestinations } from "@/src/service/nearbyDestination";
import HorizontalScrollSectionClient from "./Client";

export default async function HorizontalScrollSection() {
  const items = (await getActiveNearbyDestinations()).slice(0, 8);

  return <HorizontalScrollSectionClient items={items} />;
}
