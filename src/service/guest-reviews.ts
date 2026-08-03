import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, GuestReview } from "@/src/types";

export function getGuestReviewsData(): Promise<ApiListResponse<GuestReview>> {
  return apiFetch<ApiListResponse<GuestReview>>("/api/guest-reviews/all", {
    revalidate: 1800,
    tags: [CACHE_TAGS.guestReviews],
  });
}
