import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Reel } from "@/src/types";

export function getReelsData(): Promise<ApiListResponse<Reel>> {
  return apiFetch<ApiListResponse<Reel>>("/api/reels/all", {
    revalidate: 180,
    tags: [CACHE_TAGS.reels],
  });
}
