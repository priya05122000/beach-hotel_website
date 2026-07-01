const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function apiFetch<T>(
  path: string,
  options?: { revalidate?: number | false }
): Promise<T> {
  const fetchOptions: RequestInit =
    options?.revalidate !== undefined
      ? { next: { revalidate: options.revalidate } }
      : { cache: "no-store" };

  const res = await fetch(`${BASE_URL}${path}`, fetchOptions);
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
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
