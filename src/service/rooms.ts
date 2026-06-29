import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Room } from "@/src/types";

export function getRoomsData(): Promise<ApiListResponse<Room>> {
    return apiFetch<ApiListResponse<Room>>("/api/rooms/all");
}
