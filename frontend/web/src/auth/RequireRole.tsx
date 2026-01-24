import { Navigate } from "react-router-dom";
import { useAuthStore } from "./authStore";
import type { Role } from "../types";

export function RequireRole({ role, children }: { role: Role; children: JSX.Element }) {
  const current = useAuthStore((s) => s.role);
  if (current !== role) return <Navigate to="/dashboard" replace />;
  return children;
}
