import { apiFetch } from "@/src/lib/api";
import { CACHE_TAGS } from "@/src/lib/cache-tags";
import type { ApiListResponse, FaqCategory } from "@/src/types";

export function getFaqCategoryData(): Promise<ApiListResponse<FaqCategory>> {
  return apiFetch<ApiListResponse<FaqCategory>>("/api/faq-categories/all", {
    revalidate: 3600,
    tags: [CACHE_TAGS.faqCategories],
  });
}
