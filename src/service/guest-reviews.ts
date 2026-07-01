import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, GuestReview } from "@/src/types";

export function getGuestReviewsData(): Promise<ApiListResponse<GuestReview>> {
  return apiFetch<ApiListResponse<GuestReview>>("/api/guest-reviews/all", { revalidate: 1800 });
}
