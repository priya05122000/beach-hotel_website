import { apiFetch } from "@/src/lib/api";
import type { ApiListResponse, ApiSingleResponse, Blog } from "@/src/types";

export function getBlogList(): Promise<ApiListResponse<Blog>> {
  return apiFetch<ApiListResponse<Blog>>("/api/blogs/all", { revalidate: 600 });
}

export function getBlogBySlug(slug: string): Promise<ApiSingleResponse<Blog>> {
  return apiFetch<ApiSingleResponse<Blog>>(`/api/blogs/slug/${slug}`, { revalidate: 600 });
}
