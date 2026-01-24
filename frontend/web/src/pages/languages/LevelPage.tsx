import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Select, Spinner } from "../../components/ui";
import { safeGet } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { useAuthStore } from "../../auth/authStore";
import { parseEnglishLevel } from "../../utils/parsers";
import { isAtLeast } from "../../utils/levels";
import { mockEnglishLevel } from "../../mock/mockData";
import { trafficFromEnglish, trafficLabel, trafficVariant } from "../../utils/traffic";

const REQUIRED_LEVEL = "B1.1";

export default function EnglishLevelPage() {
  const role = useAuthStore((s) => s.role);
  const studentIdFromAuth = useAuthStore((s) => s.studentId);

  // STUDENT keeps its own ID fixed. ADMIN can inspect any ID.
  const [studentId, setStudentId] = useState(String(studentIdFromAuth ?? 1));
  const [level, setLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"REAL" | "MOCK">("REAL");

  const studentOptions = useMemo(() => {
    return Array.from({ length: 21 }).map((_, i) => {
      const id = i + 1;
      return { value: id, label: `Student ${id}` };
    });
  }, []);

  async function refresh(sid: number) {
    setLoading(true);
    try {
      const res = await safeGet(endpoints.languages.studentLevel(sid), () => mockEnglishLevel(sid));
      setMode(res.mode);
      setLevel(parseEnglishLevel(res.data));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh(Number(studentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const traffic = trafficFromEnglish(level, REQUIRED_LEVEL);
  const completed = level ? isAtLeast(level, REQUIRED_LEVEL) : false;
  const missing = completed ? "Completed" : `Pending: reach ${REQUIRED_LEVEL}`;

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">English Level</div>
          <div className="text-sm text-slate-400 mt-1">Track your required English proficiency.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(traffic)} label={trafficLabel(traffic).toUpperCase()} />
          {mode === "MOCK" ? <Badge variant="neutral" label="MOCK" /> : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Current status" subtitle={`Required: ${REQUIRED_LEVEL}`} />
          <CardBody className="space-y-3">
            {loading ? (
              <Spinner label="Loading level..." />
            ) : (
              <>
                <div className="text-sm text-slate-300">
                  Current level: <span className="font-semibold">{level ?? "N/A"}</span>
                </div>
                <div className="text-sm text-slate-400">{missing}</div>
                <Button
                  className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                  onClick={() => refresh(Number(studentId))}
                >
                  Refresh
                </Button>
              </>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={role === "ADMIN" ? "Admin actions" : "How it works"}
            subtitle={
              role === "ADMIN"
                ? "Admins update levels from the Admin Panel. Students can only view their level."
                : "You can browse courses and enroll. Admin updates the official level once completed."
            }
          />
          <CardBody className="space-y-4">
            {role === "ADMIN" ? (
              <>
                <Select
                  label="Inspect Student ID"
                  value={studentId}
                  onChange={(v) => {
                    setStudentId(v);
                    refresh(Number(v));
                  }}
                  options={studentOptions}
                />
                <Button className="w-full" onClick={() => window.location.assign("/admin")}>Go to Admin Panel</Button>
              </>
            ) : (
              <div className="text-sm text-slate-400">
                Tip: check <span className="text-slate-200">Languages → Courses</span> to see available courses.
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
