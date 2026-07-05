import { getNearbyDestinationData } from "@/src/service/nearbyDestination";
import HorizontalScrollSectionClient from "./Client";

export default async function HorizontalScrollSection() {
  const { data: destinations } = await getNearbyDestinationData();

  const items = destinations
    .filter((d) => d.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  return <HorizontalScrollSectionClient items={items} />;
}
