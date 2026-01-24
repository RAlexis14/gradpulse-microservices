import { useMemo } from "react";
import { useAuthStore } from "../../auth/authStore";
import { Badge, Button } from "../ui";

export function Topbar() {
  const studentId = useAuthStore((s) => s.studentId);
  const role = useAuthStore((s) => s.role);
  const email = useAuthStore((s) => s.email);
  const logout = useAuthStore((s) => s.logout);

  const roleBadge = useMemo(() => {
    if (role === "ADMIN") return <Badge variant="success" label="ADMIN" />;
    if (role === "STUDENT") return <Badge variant="neutral" label="STUDENT" />;
    return <Badge variant="warn" label="UNKNOWN ROLE" />;
  }, [role]);

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="md:hidden text-lg font-bold">GradPulse</div>
          <div className="hidden md:flex items-center gap-3">

            {roleBadge}
            {studentId ? <div className="text-xs text-slate-400">Student ID: {studentId}</div> : null}
            {email ? <div className="text-xs text-slate-500">({email})</div> : null}
          </div>
        </div>

        <Button
          onClick={() => {
            logout().then(() => window.location.assign("/login"));
          }}
          className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
