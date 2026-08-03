import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Facility } from "@/src/types";

export function getFacilitiesData(): Promise<ApiListResponse<Facility>> {
  return apiFetch<ApiListResponse<Facility>>("/api/facilities/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.facilities],
  });
}
