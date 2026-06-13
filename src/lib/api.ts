const BASE_URL = process.env.API_URL ?? "http://localhost:5000";

export async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
    return res.json();
}
