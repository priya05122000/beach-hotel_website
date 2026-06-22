import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Announcement } from "@/src/types";

export function getAnnouncementsData(): Promise<ApiListResponse<Announcement>> {
    return apiFetch<ApiListResponse<Announcement>>("/api/announcements/all");
}