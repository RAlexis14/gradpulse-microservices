import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Select, Spinner } from "../../components/ui";
import { safeGet } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { useAuthStore } from "../../auth/authStore";
import { parseTotalHours } from "../../utils/parsers";
import { mockHoursProgress } from "../../mock/mockData";
import { trafficFromHours, trafficLabel, trafficVariant } from "../../utils/traffic";

const REQUIRED_INTERNSHIPS = 240;

export default function InternshipHoursPage() {
  const role = useAuthStore((s) => s.role);
  const studentIdFromAuth = useAuthStore((s) => s.studentId);

  const [studentId, setStudentId] = useState(String(studentIdFromAuth ?? 1));

  const [loadingTotal, setLoadingTotal] = useState(true);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState<"REAL" | "MOCK">("REAL");

  const studentOptions = useMemo(() => {
    return Array.from({ length: 21 }).map((_, i) => {
      const id = i + 1;
      return { value: id, label: `Student ${id}` };
    });
  }, []);

  async function refreshTotal(sid: number) {
    setLoadingTotal(true);
    try {
      const res = await safeGet(endpoints.internships.studentHours(sid), () => mockHoursProgress(sid, REQUIRED_INTERNSHIPS));
      setMode(res.mode);
      setTotal(parseTotalHours(res.data));
    } finally {
      setLoadingTotal(false);
    }
  }

  useEffect(() => {
    refreshTotal(Number(studentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const missing = Math.max(0, REQUIRED_INTERNSHIPS - total);
  const traffic = trafficFromHours(total, REQUIRED_INTERNSHIPS);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Internship Hours</div>
          <div className="text-sm text-slate-400 mt-1">Track your pre-professional internships requirement.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(traffic)} label={trafficLabel(traffic).toUpperCase()} />
          {mode === "MOCK" ? <Badge variant="neutral" label="MOCK" /> : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Current status" subtitle={`Required: ${REQUIRED_INTERNSHIPS} hours`} />
          <CardBody className="space-y-3">
            {loadingTotal ? (
              <Spinner label="Loading total..." />
            ) : (
              <>
                <div className="text-sm text-slate-300">
                  Total: <span className="font-semibold">{total}</span> hours
                </div>
                <div className="text-sm text-slate-400">
                  Missing: <span className="font-semibold text-slate-200">{missing}</span> hours
                </div>
                <Button
                  className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                  onClick={() => refreshTotal(Number(studentId))}
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
                ? "Students cannot self-register hours. Use the Admin Panel to register."
                : "Only ADMIN registers hours. Students can only track progress."
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
                    refreshTotal(Number(v));
                  }}
                  options={studentOptions}
                />
                <Button className="w-full" onClick={() => window.location.assign("/admin")}>
                  Go to Admin Panel
                </Button>
              </>
            ) : (
              <div className="text-sm text-slate-400">
                If you already completed an internship placement, wait for the administrator to update your hours.
                You can explore available offers in <span className="text-slate-200">Internships → Offers</span>.
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
