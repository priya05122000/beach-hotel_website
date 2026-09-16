import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, Offer } from "@/src/types";

export function getOfferData(): Promise<ApiListResponse<Offer>> {
  return apiFetch<ApiListResponse<Offer>>("/api/offers/all", {
    revalidate: 180,
    tags: [CACHE_TAGS.offers],
  });
}
