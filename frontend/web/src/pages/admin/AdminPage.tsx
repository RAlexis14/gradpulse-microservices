import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppShell } from "../../components/layout/AppShell";
import { Button, Card, CardBody, CardHeader, Input, Select } from "../../components/ui";
import { api } from "../../api/axios";
import { endpoints } from "../../api/endpoints";

const LEVELS = ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2", "B2.1", "B2.2"];

export default function AdminPage() {
  const studentOptions = useMemo(() => {
    return Array.from({ length: 21 }).map((_, i) => {
      const id = i + 1;
      return { value: id, label: `Student ${id}` };
    });
  }, []);

  const [studentIdComm, setStudentIdComm] = useState("1");
  const [hoursComm, setHoursComm] = useState("10");
  const [postingComm, setPostingComm] = useState(false);

  const [studentIdIntern, setStudentIdIntern] = useState("1");
  const [hoursIntern, setHoursIntern] = useState("8");
  const [postingIntern, setPostingIntern] = useState(false);

  const [studentIdLang, setStudentIdLang] = useState("1");
  const [level, setLevel] = useState("A2.2");
  const [postingLang, setPostingLang] = useState(false);

  async function registerCommunity(e: React.FormEvent) {
    e.preventDefault();
    const sid = Number(studentIdComm);
    const h = Number(hoursComm);
    if (!Number.isFinite(sid) || sid < 1) return toast.error("Invalid student id.");
    if (!Number.isFinite(h) || h <= 0) return toast.error("Hours must be positive.");
    setPostingComm(true);
    try {
      await api.post(endpoints.community.registerHours(), { student_id: sid, hours: h });
      toast.success("Community hours registered.");
    } finally {
      setPostingComm(false);
    }
  }

  async function registerInternships(e: React.FormEvent) {
    e.preventDefault();
    const sid = Number(studentIdIntern);
    const h = Number(hoursIntern);
    if (!Number.isFinite(sid) || sid < 1) return toast.error("Invalid student id.");
    if (!Number.isFinite(h) || h <= 0) return toast.error("Hours must be positive.");
    setPostingIntern(true);
    try {
      await api.post(endpoints.internships.registerHours(), { student_id: sid, hours: h });
      toast.success("Internship hours registered.");
    } finally {
      setPostingIntern(false);
    }
  }

  async function updateEnglishLevel(e: React.FormEvent) {
    e.preventDefault();
    const sid = Number(studentIdLang);
    if (!Number.isFinite(sid) || sid < 1) return toast.error("Invalid student id.");
    if (!LEVELS.includes(level)) return toast.error("Invalid level.");
    setPostingLang(true);
    try {
      await api.post(endpoints.languages.updateLevel(), { student_id: sid, level });
      toast.success("English level updated.");
    } finally {
      setPostingLang(false);
    }
  }

  return (
    <AppShell>
      <div>
        <div className="text-2xl font-bold">Admin Panel</div>
        <div className="text-sm text-slate-400 mt-1">Manage community hours, internship hours and English level.</div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Register Community Hours" subtitle="POST /community/hours/register" />
          <CardBody>
            <form onSubmit={registerCommunity} className="space-y-4">
              <Select label="Student ID" value={studentIdComm} onChange={setStudentIdComm} options={studentOptions} />
              <Input label="Hours" type="number" value={hoursComm} onChange={setHoursComm} placeholder="10" />
              <Button type="submit" disabled={postingComm} className="w-full">
                {postingComm ? "Submitting..." : "Register"}
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Register Internship Hours" subtitle="POST /internships/hours/register" />
          <CardBody>
            <form onSubmit={registerInternships} className="space-y-4">
              <Select label="Student ID" value={studentIdIntern} onChange={setStudentIdIntern} options={studentOptions} />
              <Input label="Hours" type="number" value={hoursIntern} onChange={setHoursIntern} placeholder="8" />
              <Button type="submit" disabled={postingIntern} className="w-full">
                {postingIntern ? "Submitting..." : "Register"}
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Update English Level" subtitle="POST /languages/english/level/update" />
          <CardBody>
            <form onSubmit={updateEnglishLevel} className="space-y-4">
              <Select label="Student ID" value={studentIdLang} onChange={setStudentIdLang} options={studentOptions} />
              <Select
                label="Level"
                value={level}
                onChange={setLevel}
                options={LEVELS.map((l) => ({ value: l, label: l }))}
              />
              <Button type="submit" disabled={postingLang} className="w-full">
                {postingLang ? "Submitting..." : "Update"}
              </Button>
            </form>
            <div className="text-xs text-slate-500 mt-4">
              Optional: add a “students list” view if you later expose an endpoint. For now, IDs 1..21 are mocked.
            </div>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
