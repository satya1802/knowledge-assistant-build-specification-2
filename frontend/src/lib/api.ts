/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails --
// which `vite build` does not catch, because it tree-shakes this module out when no screen
// imports it yet.
//
// Where the generated API lives.
//
// Set at build time: the platform bakes the deployed API URL into the frontend build. The
// fallback is the local backend so a bare `npm run dev` still points somewhere real.
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

/** Thrown by `apiFetch` for any non-2xx response. `detail` is the server's
 * own message (the JSON error body's `detail` field per the API contract);
 * callers render it verbatim rather than inventing their own copy. */
export class ApiError extends Error {
  status: number;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    let detail = `${init?.method ?? "GET"} ${path} failed: ${response.status}`;
    try {
      const body = (await response.json()) as { detail?: unknown };
      if (body && typeof body.detail === "string" && body.detail.trim()) {
        detail = body.detail;
      }
    } catch {
      // Non-JSON or empty error body: fall back to the status-shaped message above.
    }
    throw new ApiError(response.status, detail);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}
