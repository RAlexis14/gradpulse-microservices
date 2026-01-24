import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuthStore } from "../../auth/authStore";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition border border-transparent hover:bg-slate-900/70 hover:border-slate-800";
const active = "bg-slate-900/80 border-slate-800";

export function Sidebar() {
  const role = useAuthStore((s) => s.role);

  // Electron injects window.gradpulse via preload.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isElectron = Boolean((window as any).gradpulse);

  return (
    <aside className="hidden md:flex md:flex-col w-72 p-4 gap-3 border-r border-slate-900 bg-slate-950">
      <div className="px-3 py-2">
        <div className="text-xl font-bold tracking-tight">GradPulse</div>
        <div className="text-xs text-slate-400 mt-1">Graduation Eligibility Dashboard</div>
      </div>

      <nav className="flex flex-col gap-1 mt-2">
        <NavLink to="/dashboard" className={({ isActive }) => clsx(linkBase, isActive && active)}>
          <span className="text-slate-300">🏁</span> Dashboard
        </NavLink>

        <NavLink to="/graduation/status" className={({ isActive }) => clsx(linkBase, isActive && active)}>
          <span className="text-slate-300">🚦</span> Graduation Status
        </NavLink>

        <NavLink to="/notifications" className={({ isActive }) => clsx(linkBase, isActive && active)}>
          <span className="text-slate-300">🔔</span> Notifications
        </NavLink>

        {!isElectron ? (
          <>
            <div className="mt-3 text-xs text-slate-500 px-3">Academic</div>
            <NavLink to="/academic/profile" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">🎓</span> Profile
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Community</div>
            <NavLink to="/community/programs" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">🤝</span> Programs
            </NavLink>
            <NavLink to="/community/hours" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">⏱️</span> Hours
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Internships</div>
            <NavLink to="/internships/offers" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">🧑‍💼</span> Offers
            </NavLink>
            <NavLink to="/internships/hours" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">📈</span> Hours
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Languages</div>
            <NavLink to="/languages/courses" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">🌍</span> Courses
            </NavLink>
            <NavLink to="/languages/level" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">📚</span> Level
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Library</div>
            <NavLink to="/library" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">📖</span> Clearance
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Finance</div>
            <NavLink to="/finance" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">💰</span> Clearance
            </NavLink>

            <div className="mt-3 text-xs text-slate-500 px-3">Payments (Mock)</div>
            <NavLink to="/payments" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">💳</span> Pay
            </NavLink>
          </>
        ) : (
          <>
            <div className="mt-3 text-xs text-slate-500 px-3">Desktop quick</div>
            <NavLink to="/community/hours" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">⏱️</span> Community Hours
            </NavLink>
            <NavLink to="/languages/level" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">📚</span> English Level
            </NavLink>
          </>
        )}

        {role === "ADMIN" ? (
          <>
            <div className="mt-3 text-xs text-slate-500 px-3">Admin</div>
            <NavLink to="/admin" className={({ isActive }) => clsx(linkBase, isActive && active)}>
              <span className="text-slate-300">🛡️</span> Admin Panel
            </NavLink>
          </>
        ) : null}
      </nav>

      <div className="mt-auto p-3 rounded-2xl border border-slate-900 bg-slate-900/30 text-xs text-slate-400">
        Tip: install the PWA from your browser menu for mobile usage.
      </div>
    </aside>
  );
}
