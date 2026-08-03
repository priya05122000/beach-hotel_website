import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, GalleryCategory } from "@/src/types";

export function getGalleryCategoriesData(): Promise<ApiListResponse<GalleryCategory>> {
  return apiFetch<ApiListResponse<GalleryCategory>>("/api/gallery-categories/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.galleryCategories],
  });
}
