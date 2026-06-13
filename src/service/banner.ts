import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Banner } from "@/src/types";

export function getBannerData(): Promise<ApiListResponse<Banner>> {
    return apiFetch<ApiListResponse<Banner>>("/api/banners/all");
}

export function getBannerById(id: number): Promise<Banner> {
    return apiFetch<Banner>(`/api/banners/${id}/`);
}
