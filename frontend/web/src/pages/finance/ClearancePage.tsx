import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Spinner } from "../../components/ui";
import { safeGet } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { useAuthStore } from "../../auth/authStore";
import { mockFinanceClearance } from "../../mock/mockData";
import { trafficFromBoolean, trafficLabel, trafficVariant } from "../../utils/traffic";

type DebtItem = { concept: string; amount: number; due_date: string };

type FinanceClearance = {
  student_id?: number;
  clearance?: boolean;
  debts?: DebtItem[];
  total_due?: number;
};

export default function FinanceClearancePage() {
  const navigate = useNavigate();
  const studentId = useAuthStore((s) => s.studentId) ?? 1;
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"REAL" | "MOCK">("REAL");
  const [data, setData] = useState<FinanceClearance | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const res = await safeGet(endpoints.finance.clearance(studentId), () => mockFinanceClearance(studentId));
      setMode(res.mode);
      setData(res.data as FinanceClearance);
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
  const debts = data?.debts ?? [];
  const totalDue = data?.total_due ?? debts.reduce((acc, d) => acc + (d.amount ?? 0), 0);

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Financial Clearance</div>
          <div className="text-sm text-slate-400 mt-1">Verify pending obligations and simulate payment.</div>
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
              <Spinner label="Loading finance status..." />
            ) : (
              <>
                <div className="text-sm text-slate-300">
                  Clearance: <span className="font-semibold">{ok ? "OK" : "PENDING"}</span>
                </div>
                {!ok ? (
                  <div className="text-sm text-slate-400">
                    Total due: <span className="font-semibold text-slate-200">${totalDue.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <Button
                    className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                    onClick={refresh}
                  >
                    Refresh
                  </Button>
                  {!ok ? (
                    <Button onClick={() => navigate("/payments")}>Pay now (mock)</Button>
                  ) : null}
                </div>
              </>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Pending items" subtitle="This table is mock-friendly for demos." />
          <CardBody className="space-y-2">
            {loading ? (
              <Spinner label="Loading..." />
            ) : debts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400">
                      <th className="py-2">Concept</th>
                      <th className="py-2">Due date</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debts.map((d, idx) => (
                      <tr key={idx} className="border-t border-slate-900">
                        <td className="py-2 text-slate-200">{d.concept}</td>
                        <td className="py-2 text-slate-400">{d.due_date}</td>
                        <td className="py-2 text-right text-slate-200">${d.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-slate-400">No pending debts found.</div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
