import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, Announcement } from "@/src/types";

// Announcements change frequently — always fetch fresh
export function getAnnouncementsData(): Promise<ApiListResponse<Announcement>> {
  return apiFetch<ApiListResponse<Announcement>>("/api/announcements/all");
}
