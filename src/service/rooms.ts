import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Room } from "@/src/types";

export function getRoomsData(): Promise<ApiListResponse<Room>> {
  return apiFetch<ApiListResponse<Room>>("/api/rooms/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.rooms],
  });
}
