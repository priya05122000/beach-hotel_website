const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, path: string) {
    super(`API error: ${status} ${path}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T> {
  // `revalidate` is a time-based safety net (data self-heals within this
  // window even if nothing ever calls the on-demand revalidation webhook at
  // /api/revalidate). `tags` let that webhook invalidate just the affected
  // resource via revalidateTag() instead of waiting out the window or
  // nuking the whole site's cache.
  const fetchOptions: RequestInit =
    options?.revalidate !== undefined
      ? { next: { revalidate: options.revalidate, tags: options.tags } }
      : { cache: "no-store" };

  const res = await fetch(`${BASE_URL}${path}`, fetchOptions);
  if (!res.ok) throw new ApiError(res.status, path);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data as T;
}
