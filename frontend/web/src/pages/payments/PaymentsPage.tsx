import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Input } from "../../components/ui";
import { useAuthStore } from "../../auth/authStore";
import { lsGet, lsSet } from "../../utils/localStore";
import { trafficFromBoolean, trafficLabel, trafficVariant } from "../../utils/traffic";

type PaymentReceipt = {
  id: string;
  student_id: number;
  amount: number;
  provider: "PayPal" | "Stripe";
  payer_email: string;
  created_at: string;
  status: "APPROVED" | "CANCELLED";
};

const LS_KEY = "gradpulse_payments";

export default function PaymentsPage() {
  const studentId = useAuthStore((s) => s.studentId) ?? 1;
  const [provider, setProvider] = useState<"PayPal" | "Stripe">("PayPal");
  const [payerEmail, setPayerEmail] = useState("student1@uce.edu.ec");
  const [amount, setAmount] = useState("15.00");
  const [loading, setLoading] = useState(false);

  const store = useMemo(() => lsGet<Record<string, PaymentReceipt[]>>(LS_KEY, {}), []);
  const receipts = store[String(studentId)] ?? [];
  const latestApproved = receipts.find((r) => r.status === "APPROVED");
  const paid = Boolean(latestApproved);
  const traffic = trafficFromBoolean(paid);

  function persistReceipt(r: PaymentReceipt) {
    const next = lsGet<Record<string, PaymentReceipt[]>>(LS_KEY, {});
    const key = String(studentId);
    const current = next[key] ?? [];
    next[key] = [r, ...current].slice(0, 10);
    lsSet(LS_KEY, next);
  }

  function downloadReceipt(r: PaymentReceipt) {
    const content = `GRADPULSE - PAYMENT RECEIPT\n\nReceipt: ${r.id}\nStudent ID: ${r.student_id}\nProvider: ${r.provider}\nPayer: ${r.payer_email}\nAmount: $${r.amount.toFixed(2)}\nStatus: ${r.status}\nCreated at: ${r.created_at}\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradpulse_receipt_${r.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function simulate(status: "APPROVED" | "CANCELLED") {
    const amt = Number(amount);
    if (!payerEmail.includes("@")) {
      toast.error("Enter a valid payer email.");
      return;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Amount must be a positive number.");
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay to look realistic in demos.
      await new Promise((r) => setTimeout(r, 700));
      const receipt: PaymentReceipt = {
        id: `PAY-${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
        student_id: studentId,
        amount: amt,
        provider,
        payer_email: payerEmail,
        status,
        created_at: new Date().toISOString()
      };
      persistReceipt(receipt);
      toast.success(status === "APPROVED" ? "Payment approved (mock)." : "Payment cancelled (mock).");
      if (status === "APPROVED") downloadReceipt(receipt);
      // Soft refresh in-place.
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Payments</div>
          <div className="text-sm text-slate-400 mt-1">Mock payment simulation with downloadable receipt.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trafficVariant(traffic)} label={trafficLabel(traffic).toUpperCase()} />
          <Badge variant="neutral" label="MOCK" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Pay with" subtitle={`Student ID: ${studentId}`} />
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                className={provider === "PayPal" ? "w-full" : "w-full bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"}
                onClick={() => setProvider("PayPal")}
              >
                PayPal
              </Button>
              <Button
                type="button"
                className={provider === "Stripe" ? "w-full" : "w-full bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"}
                onClick={() => setProvider("Stripe")}
              >
                Card (Stripe)
              </Button>
            </div>

            <Input label="Payer email" value={payerEmail} onChange={setPayerEmail} placeholder="student@uce.edu.ec" />
            <Input label="Amount (USD)" type="number" value={amount} onChange={setAmount} placeholder="15.00" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button disabled={loading} onClick={() => simulate("APPROVED")}>
                {loading ? "Processing..." : "Approve payment"}
              </Button>
              <Button
                disabled={loading}
                className="bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800"
                onClick={() => simulate("CANCELLED")}
              >
                Cancel
              </Button>
            </div>

            <div className="text-xs text-slate-500">
              This module is fully MOCK to keep the project self-contained. No external APIs are used.
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent receipts" subtitle="Latest payment attempts (localStorage)." />
          <CardBody className="space-y-2">
            {receipts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400">
                      <th className="py-2">Receipt</th>
                      <th className="py-2">Provider</th>
                      <th className="py-2">Status</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((r) => (
                      <tr key={r.id} className="border-t border-slate-900">
                        <td className="py-2 text-slate-200">{r.id}</td>
                        <td className="py-2 text-slate-400">{r.provider}</td>
                        <td className="py-2">
                          <span className={r.status === "APPROVED" ? "text-emerald-400" : "text-amber-400"}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-2 text-right text-slate-200">${r.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-slate-400">No receipts yet.</div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
