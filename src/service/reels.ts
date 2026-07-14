import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Reel } from "@/src/types";

export function getReelsData(): Promise<ApiListResponse<Reel>> {
  return apiFetch<ApiListResponse<Reel>>("/api/reels/all", { revalidate: 3600 });
}
