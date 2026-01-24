import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Spinner } from "../components/ui";
import { endpoints } from "../api/endpoints";
import { safeGet, type DataMode } from "../api/safe";
import { useAuthStore } from "../auth/authStore";
import { mockAcademicProfile, mockFinanceClearance, mockHoursProgress, mockLibraryClearance, mockEnglishLevel } from "../mock/mockData";
import { parseEnglishLevel, parseTotalHours } from "../utils/parsers";
import { isAtLeast } from "../utils/levels";
import { lsGet } from "../utils/localStore";
import { trafficFromBoolean, trafficFromEnglish, trafficFromHours, trafficLabel, trafficVariant, type Traffic } from "../utils/traffic";

const REQUIRED_COMMUNITY = 160;
const REQUIRED_INTERNSHIPS = 240;
const REQUIRED_ENGLISH = "B1.1";
const LS_PAYMENTS = "gradpulse_payments";
const LS_NOTIFICATIONS = "gradpulse_notifications";

type RequirementCard = {
  key: string;
  title: string;
  route: string;
  traffic: Traffic;
  detail: string;
  mode: DataMode;
};

export default function DashboardPage() {
  const role = useAuthStore((s) => s.role);
  const studentId = useAuthStore((s) => s.studentId) ?? 1;

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<RequirementCard[]>([]);

  const paymentPaid = useMemo(() => {
    const store = lsGet<Record<string, any[]>>(LS_PAYMENTS, {});
    const receipts = store[String(studentId)] ?? [];
    return receipts.some((r) => r?.status === "APPROVED");
  }, [studentId]);

  const notificationsCount = useMemo(() => {
    const items = lsGet<any[]>(LS_NOTIFICATIONS, []);
    return Array.isArray(items) ? items.length : 0;
  }, []);

  const overall = useMemo(() => {
    if (!cards.length) return { traffic: "RED" as Traffic, provisional: true };
    const provisional = cards.some((c) => c.mode === "MOCK");
    const allGreen = cards.every((c) => c.traffic === "GREEN");
    if (allGreen) return { traffic: "GREEN" as Traffic, provisional };
    const anyRed = cards.some((c) => c.traffic === "RED");
    return { traffic: anyRed ? ("RED" as Traffic) : ("YELLOW" as Traffic), provisional };
  }, [cards]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const [academic, community, internships, english, library, finance] = await Promise.all([
        safeGet(endpoints.academic.academicProfile(studentId), () => mockAcademicProfile(studentId)),
        safeGet(endpoints.community.studentHours(studentId), () => mockHoursProgress(studentId, REQUIRED_COMMUNITY)),
        safeGet(endpoints.internships.studentHours(studentId), () => mockHoursProgress(studentId, REQUIRED_INTERNSHIPS)),
        safeGet(endpoints.languages.studentLevel(studentId), () => mockEnglishLevel(studentId)),
        safeGet(endpoints.library.clearance(studentId), () => mockLibraryClearance(studentId)),
        safeGet(endpoints.finance.clearance(studentId), () => mockFinanceClearance(studentId))
      ]);

      if (!alive) return;

      const academicOk = Boolean(academic.data);

      const communityTotal = parseTotalHours(community.data);
      const communityMissing = Math.max(0, REQUIRED_COMMUNITY - communityTotal);

      const internshipsTotal = parseTotalHours(internships.data);
      const internshipsMissing = Math.max(0, REQUIRED_INTERNSHIPS - internshipsTotal);

      const level = parseEnglishLevel(english.data);
      const englishCompleted = level ? isAtLeast(level, REQUIRED_ENGLISH) : false;

      const libOk = Boolean((library.data as any)?.clearance);
      const finOk = Boolean((finance.data as any)?.clearance);

      const next: RequirementCard[] = [
        {
          key: "academic",
          title: "Academic",
          route: "/academic/profile",
          traffic: trafficFromBoolean(academicOk),
          detail: academicOk ? "Academic profile found." : "No academic profile found.",
          mode: academic.mode
        },
        {
          key: "community",
          title: "Community",
          route: "/community/hours",
          traffic: trafficFromHours(communityTotal, REQUIRED_COMMUNITY),
          detail:
            communityTotal >= REQUIRED_COMMUNITY
              ? `${communityTotal}/${REQUIRED_COMMUNITY} hours completed.`
              : `${communityTotal}/${REQUIRED_COMMUNITY} hours. Missing ${communityMissing}.`,
          mode: community.mode
        },
        {
          key: "internships",
          title: "Internships",
          route: "/internships/hours",
          traffic: trafficFromHours(internshipsTotal, REQUIRED_INTERNSHIPS),
          detail:
            internshipsTotal >= REQUIRED_INTERNSHIPS
              ? `${internshipsTotal}/${REQUIRED_INTERNSHIPS} hours completed.`
              : `${internshipsTotal}/${REQUIRED_INTERNSHIPS} hours. Missing ${internshipsMissing}.`,
          mode: internships.mode
        },
        {
          key: "languages",
          title: "Languages",
          route: "/languages/level",
          traffic: trafficFromEnglish(level, REQUIRED_ENGLISH),
          detail: englishCompleted
            ? `Level ${level} meets requirement (${REQUIRED_ENGLISH}).`
            : level
              ? `Current: ${level}. Pending: reach ${REQUIRED_ENGLISH}.`
              : `No level found. Pending: reach ${REQUIRED_ENGLISH}.`,
          mode: english.mode
        },
        {
          key: "library",
          title: "Library",
          route: "/library",
          traffic: trafficFromBoolean(libOk),
          detail: libOk ? "Cleared." : "Blocked.",
          mode: library.mode
        },
        {
          key: "finance",
          title: "Finance",
          route: "/finance",
          traffic: trafficFromBoolean(finOk),
          detail: finOk ? "Cleared." : "Pending debts.",
          mode: finance.mode
        },
        {
          key: "payments",
          title: "Payments",
          route: "/payments",
          traffic: trafficFromBoolean(paymentPaid),
          detail: paymentPaid ? "Paid (mock receipt)." : "Not paid (mock).",
          mode: "MOCK"
        },
        {
          key: "graduation",
          title: "Graduation Status",
          route: "/graduation/status",
          traffic: "YELLOW",
          detail: "View consolidated traffic-light eligibility.",
          mode: "MOCK"
        },
        {
          key: "notifications",
          title: "Notifications",
          route: "/notifications",
          traffic: "GREEN",
          detail: `${notificationsCount} messages (mock inbox).`,
          mode: "MOCK"
        }
      ];

      setCards(next);
      setLoading(false);
    }

    load();

    return () => {
      alive = false;
    };
  }, [studentId, paymentPaid, notificationsCount]);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
        <div>
          <div className="text-2xl font-bold">My Graduation Status</div>
          <div className="text-sm text-slate-400 mt-1">
            Dashboard cards are computed from microservices data via API Gateway. Some modules can be MOCK while you
            finish the backend.
          </div>
        </div>

        <Card className="w-full lg:w-[420px]">
          <CardBody className="flex items-center justify-between gap-6">
            <div>
              <div className="text-xs text-slate-400">Overall</div>
              <div className="text-lg font-semibold">{trafficLabel(overall.traffic)}</div>
              <div className="text-xs text-slate-500 mt-1">
                {overall.provisional ? "Provisional (some MOCK data)" : "Live"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={trafficVariant(overall.traffic)} label={trafficLabel(overall.traffic).toUpperCase()} />
              {overall.provisional ? <Badge variant="neutral" label="PROVISIONAL" /> : null}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        {loading ? (
          <Spinner label="Loading dashboard..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {cards.map((c) => (
                <Card key={c.key} className="hover:border-slate-800 transition">
                  <CardHeader title={c.title} subtitle={c.detail} />
                  <CardBody className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={trafficVariant(c.traffic)} label={trafficLabel(c.traffic).toUpperCase()} />
                        {c.mode === "MOCK" ? <Badge variant="neutral" label="MOCK" /> : null}
                      </div>
                      <Button
                        className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                        onClick={() => window.location.assign(c.route)}
                      >
                        Open
                      </Button>
                    </div>
                    {c.key === "graduation" ? (
                      <div className="text-xs text-slate-500">
                        This view consolidates all domains into a single traffic-light eligibility screen.
                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              ))}
            </div>

            {role === "ADMIN" ? (
              <div className="mt-6">
                <Card>
                  <CardHeader title="Admin shortcuts" subtitle="Register hours and update levels from the Admin panel." />
                  <CardBody className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => window.location.assign("/admin")}>Open Admin Panel</Button>
                    <Button
                      className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                      onClick={() => window.location.assign("/notifications")}
                    >
                      Send notification (mock)
                    </Button>
                  </CardBody>
                </Card>
              </div>
            ) : null}
          </>
        )}
      </div>
    </AppShell>
  );
}
