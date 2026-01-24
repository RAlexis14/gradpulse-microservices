import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Spinner } from "../../components/ui";
import { endpoints } from "../../api/endpoints";
import { safeGet, type DataMode } from "../../api/safe";
import { useAuthStore } from "../../auth/authStore";
import { mockAcademicProfile, mockFinanceClearance, mockHoursProgress, mockLibraryClearance, mockEnglishLevel } from "../../mock/mockData";
import { parseEnglishLevel, parseTotalHours } from "../../utils/parsers";
import { isAtLeast } from "../../utils/levels";
import { lsGet } from "../../utils/localStore";
import {
  trafficFromBoolean,
  trafficFromEnglish,
  trafficFromHours,
  trafficLabel,
  trafficVariant,
  type Traffic
} from "../../utils/traffic";

const REQUIRED_COMMUNITY = 160;
const REQUIRED_INTERNSHIPS = 240;
const REQUIRED_LEVEL = "B1.1";
const LS_PAYMENTS = "gradpulse_payments";

type Row = {
  key: string;
  title: string;
  traffic: Traffic;
  detail: string;
  mode: DataMode;
};

export default function GraduationStatusPage() {
  const studentId = useAuthStore((s) => s.studentId) ?? 1;
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

  const paymentsPaid = useMemo(() => {
    const store = lsGet<Record<string, any[]>>(LS_PAYMENTS, {});
    const receipts = store[String(studentId)] ?? [];
    return receipts.some((r) => r?.status === "APPROVED");
  }, [studentId]);

  async function refresh() {
    setLoading(true);
    try {
      // Fetch in parallel, and fallback to deterministic mocks if a service is not reachable.
      const [academic, community, internships, english, library, finance] = await Promise.all([
        safeGet(endpoints.academic.academicProfile(studentId), () => mockAcademicProfile(studentId)),
        safeGet(endpoints.community.studentHours(studentId), () => mockHoursProgress(studentId, REQUIRED_COMMUNITY)),
        safeGet(endpoints.internships.studentHours(studentId), () => mockHoursProgress(studentId, REQUIRED_INTERNSHIPS)),
        safeGet(endpoints.languages.studentLevel(studentId), () => mockEnglishLevel(studentId)),
        safeGet(endpoints.library.clearance(studentId), () => mockLibraryClearance(studentId)),
        safeGet(endpoints.finance.clearance(studentId), () => mockFinanceClearance(studentId))
      ]);

      const academicOk = Boolean(academic.data);
      const academicRow: Row = {
        key: "academic",
        title: "Academic",
        traffic: trafficFromBoolean(academicOk),
        detail: academicOk ? "Profile found" : "Profile missing",
        mode: academic.mode
      };

      const commTotal = parseTotalHours(community.data);
      const commMissing = Math.max(0, REQUIRED_COMMUNITY - commTotal);
      const commRow: Row = {
        key: "community",
        title: "Community",
        traffic: trafficFromHours(commTotal, REQUIRED_COMMUNITY),
        detail: `${commTotal}/${REQUIRED_COMMUNITY} hours (missing ${commMissing})`,
        mode: community.mode
      };

      const intTotal = parseTotalHours(internships.data);
      const intMissing = Math.max(0, REQUIRED_INTERNSHIPS - intTotal);
      const intRow: Row = {
        key: "internships",
        title: "Internships",
        traffic: trafficFromHours(intTotal, REQUIRED_INTERNSHIPS),
        detail: `${intTotal}/${REQUIRED_INTERNSHIPS} hours (missing ${intMissing})`,
        mode: internships.mode
      };

      const lvl = parseEnglishLevel(english.data);
      const englishOk = lvl ? isAtLeast(lvl, REQUIRED_LEVEL) : false;
      const engRow: Row = {
        key: "languages",
        title: "Languages",
        traffic: trafficFromEnglish(lvl, REQUIRED_LEVEL),
        detail: englishOk ? `Level ${lvl} (OK)` : `Level ${lvl ?? "N/A"} (need ${REQUIRED_LEVEL})`,
        mode: english.mode
      };

      const libOk = Boolean((library.data as any)?.clearance);
      const libRow: Row = {
        key: "library",
        title: "Library",
        traffic: trafficFromBoolean(libOk),
        detail: libOk ? "Cleared" : "Blocked",
        mode: library.mode
      };

      const finOk = Boolean((finance.data as any)?.clearance);
      const finRow: Row = {
        key: "finance",
        title: "Finance",
        traffic: trafficFromBoolean(finOk),
        detail: finOk ? "Cleared" : "Pending debts",
        mode: finance.mode
      };

      const payRow: Row = {
        key: "payments",
        title: "Payments (mock)",
        traffic: trafficFromBoolean(paymentsPaid),
        detail: paymentsPaid ? "Paid (mock receipt)" : "Not paid (mock)",
        mode: "MOCK"
      };

      setRows([academicRow, commRow, intRow, engRow, libRow, finRow, payRow]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overall = useMemo(() => {
    if (!rows.length) return { traffic: "RED" as Traffic, provisional: true };
    const provisional = rows.some((r) => r.mode === "MOCK");
    const allGreen = rows.every((r) => r.traffic === "GREEN");
    if (allGreen) return { traffic: "GREEN" as Traffic, provisional };
    const anyRed = rows.some((r) => r.traffic === "RED");
    return { traffic: anyRed ? ("RED" as Traffic) : ("YELLOW" as Traffic), provisional };
  }, [rows]);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Graduation Status</div>
          <div className="text-sm text-slate-400 mt-1">
            Provisional traffic-light status calculated in the frontend (until the core CQRS service is live).
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(overall.traffic)} label={`OVERALL: ${trafficLabel(overall.traffic)}`} />
          {overall.provisional ? <Badge variant="neutral" label="PROVISIONAL" /> : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Requirements" subtitle={`Student ID: ${studentId}`} />
          <CardBody>
            {loading ? (
              <Spinner label="Calculating status..." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400">
                      <th className="py-2">Domain</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Detail</th>
                      <th className="py-2 text-right">Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.key} className="border-t border-slate-900">
                        <td className="py-2 text-slate-200 font-medium">{r.title}</td>
                        <td className="py-2">
                          <span className={r.traffic === "GREEN" ? "text-emerald-400" : r.traffic === "YELLOW" ? "text-amber-400" : "text-rose-400"}>
                            {trafficLabel(r.traffic)}
                          </span>
                        </td>
                        <td className="py-2 text-slate-400">{r.detail}</td>
                        <td className="py-2 text-right text-slate-500">{r.mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Actions" subtitle="Quick shortcuts to fix pending items." />
          <CardBody className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button onClick={() => window.location.assign("/community/hours")}>Community</Button>
              <Button onClick={() => window.location.assign("/internships/hours")}>Internships</Button>
              <Button onClick={() => window.location.assign("/languages/level")}>Languages</Button>
              <Button onClick={() => window.location.assign("/library")}>Library</Button>
              <Button onClick={() => window.location.assign("/finance")}>Finance</Button>
              <Button onClick={() => window.location.assign("/payments")}>Payments</Button>
            </div>
            <Button
              className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
              onClick={refresh}
            >
              Refresh
            </Button>
            <div className="text-xs text-slate-500">
              Provisional mode means some data is coming from MOCK. Once your backend CQRS service is ready,
              this page can switch to a single gateway call.
            </div>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
