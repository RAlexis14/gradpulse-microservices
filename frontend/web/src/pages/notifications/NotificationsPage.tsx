import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "../../components/layout/AppShell";
import { Badge, Button, Card, CardBody, CardHeader, Input, Select } from "../../components/ui";
import { useAuthStore } from "../../auth/authStore";
import { lsGet, lsSet } from "../../utils/localStore";

type NotificationItem = {
  id: string;
  target: "ALL" | "STUDENT";
  student_id?: number;
  title: string;
  message: string;
  created_at: string;
};

const LS_KEY = "gradpulse_notifications";

function seedNotifications(): NotificationItem[] {
  return [
    {
      id: "N-001",
      target: "ALL",
      title: "Welcome to GradPulse",
      message: "Track your graduation requirements with real-time status cards.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      id: "N-002",
      target: "ALL",
      title: "Tip",
      message: "If a module is in MOCK mode, it means the backend endpoint is not available yet.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
  ];
}

export default function NotificationsPage() {
  const role = useAuthStore((s) => s.role);
  const studentId = useAuthStore((s) => s.studentId) ?? 1;

  const store = useMemo(() => {
    const existing = lsGet<NotificationItem[]>(LS_KEY, []);
    if (existing.length) return existing;
    const seeded = seedNotifications();
    lsSet(LS_KEY, seeded);
    return seeded;
  }, []);

  const [title, setTitle] = useState("Graduation update");
  const [message, setMessage] = useState("Your status has been recalculated. Check the dashboard.");
  const [target, setTarget] = useState<"ALL" | "STUDENT">("ALL");
  const [targetStudentId, setTargetStudentId] = useState(String(studentId));

  const visible = store.filter((n) => n.target === "ALL" || (n.target === "STUDENT" && n.student_id === studentId));

  function sendMock() {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }
    const next = lsGet<NotificationItem[]>(LS_KEY, []);
    const item: NotificationItem = {
      id: `N-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
      target,
      student_id: target === "STUDENT" ? Number(targetStudentId) : undefined,
      title: title.trim(),
      message: message.trim(),
      created_at: new Date().toISOString()
    };
    lsSet(LS_KEY, [item, ...next].slice(0, 25));
    toast.success("Notification sent (mock).");
    window.location.reload();
  }

  const studentOptions = Array.from({ length: 21 }).map((_, i) => {
    const id = i + 1;
    return { value: id, label: `Student ${id}` };
  });

  return (
    <AppShell>
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Notifications</div>
          <div className="text-sm text-slate-400 mt-1">Mock inbox for UI and demo flows.</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" label="MOCK" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Inbox" subtitle="Latest notifications." />
          <CardBody className="space-y-3">
            {visible.length ? (
              visible.map((n) => (
                <div key={n.id} className="p-3 rounded-xl border border-slate-900 bg-slate-950">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-slate-100">{n.title}</div>
                    <div className="text-xs text-slate-500">{new Date(n.created_at).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-slate-300 mt-1">{n.message}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-400">No notifications.</div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title={role === "ADMIN" ? "Send notification" : "Notes"}
            subtitle={
              role === "ADMIN"
                ? "This is mock UI. In the final architecture, this is driven by events/webhooks."
                : "When the backend notification service is ready, this page can switch from mock to real-time."
            }
          />
          <CardBody className="space-y-3">
            {role === "ADMIN" ? (
              <>
                <Select
                  label="Target"
                  value={target}
                  onChange={(v) => setTarget(v as "ALL" | "STUDENT")}
                  options={[
                    { value: "ALL", label: "All users" },
                    { value: "STUDENT", label: "Specific student" }
                  ]}
                />
                {target === "STUDENT" ? (
                  <Select
                    label="Student ID"
                    value={targetStudentId}
                    onChange={setTargetStudentId}
                    options={studentOptions}
                  />
                ) : null}
                <Input label="Title" value={title} onChange={setTitle} />
                <Input label="Message" value={message} onChange={setMessage} />
                <Button className="w-full" onClick={sendMock}>
                  Send (mock)
                </Button>
              </>
            ) : (
              <div className="text-sm text-slate-400">
                You will receive system updates here (e.g., when your Graduation Status turns GREEN).
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
