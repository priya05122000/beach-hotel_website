import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, NearbyDestination } from "@/src/types";

export function getNearbyDestinationData(): Promise<ApiListResponse<NearbyDestination>> {
  return apiFetch<ApiListResponse<NearbyDestination>>("/api/nearby-destinations/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.destinations],
  });
}
