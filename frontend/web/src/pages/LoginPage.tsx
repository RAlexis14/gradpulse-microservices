import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../api/axios";
import { endpoints } from "../api/endpoints";
import { tokenStorage } from "../api/tokenStorage";
import { useAuthStore } from "../auth/authStore";
import { Button, Card, CardBody, CardHeader, Input, Select } from "../components/ui";
import type { LoginResponse, Role } from "../types";

function inferRole(email: string): Role {
  // Fallback role inference. Replace with real role logic if your /users/roles endpoint returns roles.
  if (email.toLowerCase().includes("admin")) return "ADMIN";
  return "STUDENT";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useAuthStore((s) => s.setToken);
  const setRole = useAuthStore((s) => s.setRole);
  const setStudentId = useAuthStore((s) => s.setStudentId);
  const setEmail = useAuthStore((s) => s.setEmail);

  const [email, setEmailState] = useState("student1@uce.edu.ec");
  const [password, setPasswordState] = useState("password123");
  const [loading, setLoading] = useState(false);

  // UI-mock: since backend does not return the student_id, we ask for it.
  const [studentIdUi, setStudentIdUi] = useState("1");

  const studentOptions = useMemo(() => {
    return Array.from({ length: 21 }).map((_, i) => {
      const id = i + 1;
      return { value: id, label: `Student ${id}` };
    });
  }, []);

  async function resolveRoleFromApiOrFallback(fallback: Role): Promise<Role> {
    try {
      // Some implementations may support GET or POST; we try GET first.
      const res = await api.get(endpoints.users.roles());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = res.data;

      // Common shapes: { role: "ADMIN" } or { roles: ["ADMIN"] } or ["ADMIN"]
      const role = data?.role || (Array.isArray(data?.roles) ? data.roles[0] : null);
      if (role === "ADMIN" || role === "STUDENT") return role;
      if (Array.isArray(data) && (data[0] === "ADMIN" || data[0] === "STUDENT")) return data[0];

      return fallback;
    } catch {
      // Try a more explicit endpoint shape (optional): /roles/{user_id}
      try {
        const sid = Number(studentIdUi);
        const res2 = await api.get(endpoints.users.rolesByUser(sid));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data2: any = res2.data;
        const role = data2?.role || (Array.isArray(data2?.roles) ? data2.roles[0] : null);
        if (role === "ADMIN" || role === "STUDENT") return role;
        return fallback;
      } catch {
        return fallback;
      }
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // We suppress toast here because we can offer a demo fallback.
      const res = await api.post<LoginResponse>(
        endpoints.users.login(),
        { email, password },
        { headers: { "X-Suppress-Toast": "1" } }
      );
      const { access_token } = res.data;

      await setToken(access_token);
      setEmail(email);
      tokenStorage.setEmail(email);

      // Student ID selection (UI-mock) for API calls that require /{id}.
      const sid = Number(studentIdUi);
      if (!Number.isFinite(sid) || sid < 1 || sid > 21) {
        toast.error("Invalid Student ID. Pick one between 1 and 21.");
        setLoading(false);
        return;
      }
      setStudentId(sid);

      const fallbackRole = inferRole(email);
      const finalRole = await resolveRoleFromApiOrFallback(fallbackRole);
      setRole(finalRole);

      toast.success("Login successful!");

      // Redirect back if the user was forced to login.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch {
      // If the backend is down, allow a local demo login to keep the UI testable.
      toast.error("Login failed. Using DEMO mode (MOCK data). Check API Gateway /health.");
      const demoToken = `demo-${Date.now()}`;
      await setToken(demoToken);
      setEmail(email);
      tokenStorage.setEmail(email);

      const sid = Number(studentIdUi);
      setStudentId(Number.isFinite(sid) ? sid : 1);

      const fallbackRole = inferRole(email);
      setRole(fallbackRole);

      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold tracking-tight">GradPulse</div>
          <div className="text-sm text-slate-400 mt-2">
            Login via <span className="text-slate-200">NGINX API Gateway</span> (QA)
          </div>
        </div>

        <Card>
          <CardHeader title="Sign in" subtitle="Use your GradPulse credentials. Token is stored for this session." />
          <CardBody>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input label="Email" value={email} onChange={setEmailState} placeholder="student1@uce.edu.ec" />
              <Input label="Password" type="password" value={password} onChange={setPasswordState} placeholder="••••••••" />

              <Select
                label="Student ID (UI mock, required for /{id} endpoints)"
                value={studentIdUi}
                onChange={setStudentIdUi}
                options={studentOptions}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing in..." : "Login"}
              </Button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                  type="button"
                  className="w-full bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                  onClick={() => {
                    setEmailState("rapachacama@uce.edu.ec");
                    setPasswordState("rommelo");
                    setStudentIdUi("1");
                  }}
                >
                  Demo STUDENT
                </Button>
                <Button
                  type="button"
                  className="w-full bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                  onClick={() => {
                    setEmailState("admin@uce.edu.ec");
                    setPasswordState("rommelo");
                    setStudentIdUi("1");
                  }}
                >
                  Demo ADMIN
                </Button>
              </div>

              <div className="text-xs text-slate-500">
                Tip: if your roles endpoint is not active yet, the UI infers role by email (contains{" "}
                <span className="text-slate-300">admin</span>).
              </div>
            </form>
          </CardBody>
        </Card>

        <div className="mt-6 text-center text-xs text-slate-500">
          Base URL: <span className="text-slate-200">{import.meta.env.VITE_API_BASE_URL}</span>
        </div>
      </div>
    </div>
  );
}
