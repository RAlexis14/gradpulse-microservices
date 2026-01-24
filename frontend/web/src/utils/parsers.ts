/* eslint-disable @typescript-eslint/no-explicit-any */

// Tries to support multiple payload shapes from different microservices.
export function parseTotalHours(payload: any): number {
  if (!payload) return 0;

  // Common direct keys
  const keys = ["total_hours", "hours_total", "total", "sum", "hours"];
  for (const k of keys) {
    const v = payload?.[k];
    if (typeof v === "number") return v;
    if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) return Number(v);
  }

  // Arrays or nested lists
  const list = Array.isArray(payload) ? payload : payload?.data ?? payload?.items ?? null;
  if (Array.isArray(list)) {
    return list.reduce((acc, item) => {
      const h = item?.hours ?? item?.value ?? item?.amount ?? 0;
      return acc + (typeof h === "number" ? h : Number(h) || 0);
    }, 0);
  }

  return 0;
}

export function parseEnglishLevel(payload: any): string | null {
  if (!payload) return null;
  const keys = ["level", "english_level", "current_level"];
  for (const k of keys) {
    const v = payload?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  if (typeof payload === "string") return payload.trim();
  return null;
}

export function normalizeList<T = any>(payload: any): T[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}
