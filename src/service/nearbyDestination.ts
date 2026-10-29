import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, NearbyDestination } from "@/src/types";

export function getNearbyDestinationData(): Promise<ApiListResponse<NearbyDestination>> {
  return apiFetch<ApiListResponse<NearbyDestination>>("/api/nearby-destinations/all", {
    revalidate: 180,
    tags: [CACHE_TAGS.destinations],
  });
}

// Home page cards link to `/destinations?to=<position>`, so both pages must
// build their list through this one function to agree on what each position is.
export async function getActiveNearbyDestinations(): Promise<NearbyDestination[]> {
  const { data } = await getNearbyDestinationData();
  return data
    .filter((d) => d.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}
