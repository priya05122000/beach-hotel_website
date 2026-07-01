import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, NearbyDestination } from "@/src/types";

export function getNearbyDestinationData(): Promise<ApiListResponse<NearbyDestination>> {
  return apiFetch<ApiListResponse<NearbyDestination>>("/api/nearby-destinations/all", { revalidate: 3600 });
}
