import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, GalleryCategory } from "@/src/types";

export function getGalleryCategoriesData(): Promise<ApiListResponse<GalleryCategory>> {
    return apiFetch<ApiListResponse<GalleryCategory>>("/api/gallery-categories/all");
}