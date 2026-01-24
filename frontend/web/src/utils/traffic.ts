import { isAtLeast } from "./levels";

export type Traffic = "GREEN" | "YELLOW" | "RED";

export function trafficFromHours(total: number, required: number): Traffic {
  if (required <= 0) return "GREEN";
  if (total >= required) return "GREEN";
  const ratio = total / required;
  if (ratio >= 0.6) return "YELLOW";
  return "RED";
}

export function trafficFromBoolean(ok: boolean): Traffic {
  return ok ? "GREEN" : "RED";
}

export function trafficFromEnglish(level: string | null, requiredLevel = "B1.1"): Traffic {
  if (!level) return "RED";
  if (isAtLeast(level, requiredLevel)) return "GREEN";
  // Midpoint heuristic: A2.2 or higher is yellow.
  if (isAtLeast(level, "A2.2")) return "YELLOW";
  return "RED";
}

export function trafficLabel(t: Traffic): string {
  if (t === "GREEN") return "Completed";
  if (t === "YELLOW") return "In progress";
  return "Pending";
}

export function trafficVariant(t: Traffic): "success" | "warn" | "danger" {
  if (t === "GREEN") return "success";
  if (t === "YELLOW") return "warn";
  return "danger";
}
