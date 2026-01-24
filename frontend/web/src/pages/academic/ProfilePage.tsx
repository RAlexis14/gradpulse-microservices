import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Spinner } from "../../components/ui";
import { safeGet } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { useAuthStore } from "../../auth/authStore";
import { mockAcademicProfile } from "../../mock/mockData";
import { trafficFromBoolean, trafficLabel, trafficVariant } from "../../utils/traffic";

type AcademicProfile = {
  student_id?: number;
  major?: string;
  credits_earned?: number;
  credits_required?: number;
  status?: string;
};

export default function AcademicProfilePage() {
  const studentId = useAuthStore((s) => s.studentId) ?? 1;
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"REAL" | "MOCK">("REAL");
  const [profile, setProfile] = useState<AcademicProfile | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const res = await safeGet(endpoints.academic.academicProfile(studentId), () => mockAcademicProfile(studentId));
      setMode(res.mode);
      setProfile(res.data as AcademicProfile);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ok = Boolean(profile);
  const traffic = trafficFromBoolean(ok);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Academic Profile</div>
          <div className="text-sm text-slate-400 mt-1">Your program, credits, and academic status.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(traffic)} label={trafficLabel(traffic).toUpperCase()} />
          {mode === "MOCK" ? <Badge variant="neutral" label="MOCK" /> : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Profile" subtitle={`Student ID: ${studentId}`} />
          <CardBody className="space-y-3">
            {loading ? (
              <Spinner label="Loading academic profile..." />
            ) : (
              <>
                <div className="text-sm text-slate-300">
                  Major: <span className="font-semibold">{profile?.major ?? "N/A"}</span>
                </div>
                <div className="text-sm text-slate-300">
                  Credits: <span className="font-semibold">{profile?.credits_earned ?? 0}</span>
                  <span className="text-slate-400"> / {profile?.credits_required ?? 0}</span>
                </div>
                <div className="text-sm text-slate-300">
                  Status: <span className="font-semibold">{profile?.status ?? "N/A"}</span>
                </div>
                <Button
                  className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                  onClick={refresh}
                >
                  Refresh
                </Button>
              </>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Notes" subtitle="Academic profile is required to proceed with graduation." />
          <CardBody className="text-sm text-slate-400">
            If this panel is pending, verify your academic record is available in the Academic domain.
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
