// Simple CEFR ordering for comparisons.
const ORDER = ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2", "B2.1", "B2.2"] as const;

export function isAtLeast(current: string, required: string): boolean {
  const a = ORDER.indexOf(current as any);
  const b = ORDER.indexOf(required as any);
  if (a === -1 || b === -1) return false;
  return a >= b;
}
