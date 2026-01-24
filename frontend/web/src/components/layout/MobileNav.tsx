import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuthStore } from "../../auth/authStore";

const base =
  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs border border-transparent";
const active = "bg-slate-900/70 border-slate-800";

export function MobileNav() {
  const role = useAuthStore((s) => s.role);

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30">
      <div className="max-w-3xl mx-auto grid grid-cols-5 gap-2 p-2 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur">
        <NavLink to="/dashboard" className={({ isActive }) => clsx(base, isActive && active)}>
          <span>🏁</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/graduation/status" className={({ isActive }) => clsx(base, isActive && active)}>
          <span>🚦</span>
          <span>Status</span>
        </NavLink>
        <NavLink to="/community/hours" className={({ isActive }) => clsx(base, isActive && active)}>
          <span>🤝</span>
          <span>Comm</span>
        </NavLink>
        <NavLink to="/internships/hours" className={({ isActive }) => clsx(base, isActive && active)}>
          <span>🧑‍💼</span>
          <span>Intern</span>
        </NavLink>
        {role === "ADMIN" ? (
          <NavLink to="/admin" className={({ isActive }) => clsx(base, isActive && active)}>
            <span>🛡️</span>
            <span>Admin</span>
          </NavLink>
        ) : (
          <NavLink to="/notifications" className={({ isActive }) => clsx(base, isActive && active)}>
            <span>🔔</span>
            <span>Inbox</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
