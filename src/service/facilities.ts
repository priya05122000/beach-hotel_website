import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Facility } from "@/src/types";

export function getFacilitiesData(): Promise<ApiListResponse<Facility>> {
  return apiFetch<ApiListResponse<Facility>>("/api/facilities/all", { revalidate: 3600 });
}
