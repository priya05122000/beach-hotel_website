import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Banner } from "@/src/types";

export function getBannerData(): Promise<ApiListResponse<Banner>> {
  return apiFetch<ApiListResponse<Banner>>("/api/banners/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.banners],
  });
}

export function getBannerById(id: number): Promise<Banner> {
  return apiFetch<Banner>(`/api/banners/${id}/`, {
    revalidate: 3600,
    tags: [CACHE_TAGS.banners],
  });
}
