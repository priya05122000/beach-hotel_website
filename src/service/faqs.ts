import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, FAQ } from "@/src/types";

export function getFaqData(): Promise<ApiListResponse<FAQ>> {
  return apiFetch<ApiListResponse<FAQ>>("/api/faqs/all", { revalidate: 3600 });
}
