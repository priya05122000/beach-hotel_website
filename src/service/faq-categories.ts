import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, FaqCategory } from "@/src/types";

export function getFaqCategoryData(): Promise<ApiListResponse<FaqCategory>> {
    return apiFetch<ApiListResponse<FaqCategory>>("/api/faq-categories/all");
}