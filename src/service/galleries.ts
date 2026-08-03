import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Gallery } from "@/src/types";

export function getGalleryData(): Promise<ApiListResponse<Gallery>> {
  return apiFetch<ApiListResponse<Gallery>>("/api/galleries/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.galleries],
  });
}
