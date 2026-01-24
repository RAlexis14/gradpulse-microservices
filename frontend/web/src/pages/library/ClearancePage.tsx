import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Spinner } from "../../components/ui";
import { safeGet } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { useAuthStore } from "../../auth/authStore";
import { mockLibraryClearance } from "../../mock/mockData";
import { trafficFromBoolean, trafficLabel, trafficVariant } from "../../utils/traffic";

type LibraryClearance = {
  student_id?: number;
  clearance?: boolean;
  blocking_reason?: string | null;
  certificate_available?: boolean;
  certificate_name?: string | null;
};

export default function LibraryClearancePage() {
  const studentId = useAuthStore((s) => s.studentId) ?? 1;
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"REAL" | "MOCK">("REAL");
  const [data, setData] = useState<LibraryClearance | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const res = await safeGet(endpoints.library.clearance(studentId), () => mockLibraryClearance(studentId));
      setMode(res.mode);
      setData(res.data as LibraryClearance);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ok = Boolean(data?.clearance);
  const traffic = trafficFromBoolean(ok);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Library Clearance</div>
          <div className="text-sm text-slate-400 mt-1">Verify pending loans and download clearance certificate.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(traffic)} label={trafficLabel(traffic).toUpperCase()} />
          {mode === "MOCK" ? <Badge variant="neutral" label="MOCK" /> : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Status" subtitle={`Student ID: ${studentId}`} />
          <CardBody className="space-y-3">
            {loading ? (
              <Spinner label="Loading clearance..." />
            ) : (
              <>
                <div className="text-sm text-slate-300">
                  Clearance: <span className="font-semibold">{ok ? "OK" : "BLOCKED"}</span>
                </div>
                {!ok ? (
                  <div className="text-sm text-slate-400">
                    Reason: <span className="text-slate-200">{data?.blocking_reason ?? "Unknown"}</span>
                  </div>
                ) : null}
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
          <CardHeader title="Certificate" subtitle="Text-based PDF certificate (demo placeholder)" />
          <CardBody className="space-y-3">
            {loading ? (
              <Spinner label="Preparing..." />
            ) : (
              <>
                <div className="text-sm text-slate-400">
                  {ok && data?.certificate_available
                    ? `Certificate ready: ${data?.certificate_name ?? "library_clearance.pdf"}`
                    : "Certificate is not available until clearance is OK."}
                </div>
                <Button
                  disabled={!ok}
                  className="w-full"
                  onClick={() => {
                    // Local placeholder: generate a simple text certificate.
                    // When the backend exposes a real PDF URL, replace this with a gateway download.
                    const content = `GRADPULSE - LIBRARY CLEARANCE\n\nStudent ID: ${studentId}\nStatus: CLEARED\nIssued At: ${new Date().toISOString()}\n`;
                    const blob = new Blob([content], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = data?.certificate_name ?? "library_clearance.txt";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                >
                  {ok ? "Download certificate (mock)" : "Not available"}
                </Button>
                <div className="text-xs text-slate-500">
                  When your library microservice exposes certificate download via gateway,
                  replace this placeholder action with the real URL.
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
