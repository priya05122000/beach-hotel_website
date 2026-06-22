import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Gallery } from "@/src/types";

export function getGalleryData(): Promise<ApiListResponse<Gallery>> {
    return apiFetch<ApiListResponse<Gallery>>("/api/galleries/all");
}