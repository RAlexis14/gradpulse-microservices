import type { AxiosRequestConfig } from "axios";
import { api } from "./axios";

export type DataMode = "REAL" | "MOCK";

export type SafeResult<T> = {
  mode: DataMode;
  data: T;
  error?: { status?: number; message: string };
};

// Generic safe GET with a deterministic mock fallback.
// NOTE: We intentionally suppress toast errors here because the UI
// can show a "MOCK" badge instead of spamming the user with toasts.
export async function safeGet<T>(
  url: string,
  makeMock: () => T,
  config?: AxiosRequestConfig
): Promise<SafeResult<T>> {
  try {
    const res = await api.get<T>(url, {
      ...(config ?? {}),
      headers: {
        ...(config?.headers ?? {}),
        "X-Suppress-Toast": "1"
      }
    });

    return { mode: "REAL", data: res.data };
  } catch (e: any) {
    const status = e?.response?.status;
    const message = e?.response?.data?.message || e?.response?.data?.detail || e?.message || "Request failed";
    return { mode: "MOCK", data: makeMock(), error: { status, message } };
  }
}

// Generic safe POST (used only for ADMIN actions)...
// If it fails, we return a MOCK success in demo mode.
export async function safePost<T>(
  url: string,
  body: unknown,
  makeMock: () => T,
  config?: AxiosRequestConfig
): Promise<SafeResult<T>> {
  try {
    const res = await api.post<T>(url, body, {
      ...(config ?? {}),
      headers: {
        ...(config?.headers ?? {}),
        "X-Suppress-Toast": "1"
      }
    });
    return { mode: "REAL", data: res.data };
  } catch (e: any) {
    const status = e?.response?.status;
    const message = e?.response?.data?.message || e?.response?.data?.detail || e?.message || "Request failed";
    return { mode: "MOCK", data: makeMock(), error: { status, message } };
  }
}
