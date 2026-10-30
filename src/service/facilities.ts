import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Facility } from "@/src/types";

export function getFacilitiesData(): Promise<ApiListResponse<Facility>> {
  return apiFetch<ApiListResponse<Facility>>("/api/facilities/all", {
    revalidate: 180,
    tags: [CACHE_TAGS.facilities],
  });
}

// Home page cards link to `/facilities?to=<position>`, so every page must
// build its list through this one function to agree on what each position is.
export async function getActiveFacilities(): Promise<Facility[]> {
  const { data } = await getFacilitiesData();
  return data
    .filter((f) => f.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}
