import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, FAQ } from "@/src/types";

export function getFaqData(): Promise<ApiListResponse<FAQ>> {
  return apiFetch<ApiListResponse<FAQ>>("/api/faqs/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.faqs],
  });
}
