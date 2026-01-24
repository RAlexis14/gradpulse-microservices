import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./authStore";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  const initializing = useAuthStore((s) => s.initializing);
  const location = useLocation();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-300">Loading...</div>
      </div>
    );
  }

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
