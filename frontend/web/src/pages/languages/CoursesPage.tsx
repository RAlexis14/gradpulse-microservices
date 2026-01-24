import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card, CardBody, CardHeader, Spinner, Table, Th, Td } from "../../components/ui";
import { safeGet, type DataMode } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { normalizeList } from "../../utils/parsers";
import type { EnglishCourse } from "../../types";
import { mockEnglishCourses } from "../../mock/mockData";

export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<EnglishCourse[]>([]);
  const [mode, setMode] = useState<DataMode>("REAL");

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const res = await safeGet(endpoints.languages.courses(), () => mockEnglishCourses());
        setMode(res.mode);
        const list = normalizeList<EnglishCourse>(res.data as any);
        if (alive) setCourses(list);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <AppShell>
      <div>
        <div className="text-2xl font-bold">English Courses</div>
        <div className="text-sm text-slate-400 mt-1">Browse available English courses.</div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader
            title="Courses list"
            subtitle={`Data source: ${mode} (Gateway: ${endpoints.languages.courses()})`}
          />
          <CardBody>
            {loading ? (
              <Spinner label="Loading courses..." />
            ) : courses.length === 0 ? (
              <div className="text-sm text-slate-400">No courses returned by the API.</div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Level</Th>
                    <Th>Schedule/Provider</Th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, idx) => (
                    <tr key={String(c.id ?? c.course_id ?? idx)}>
                      <Td>{String(c.id ?? c.course_id ?? idx)}</Td>
                      <Td>{c.course_name ?? c.name ?? "Unnamed"}</Td>
                      <Td>{c.level ?? "-"}</Td>
                      <td className="px-4 py-3 border-t border-slate-800 text-slate-400">
                        {c.schedule ?? c.provider ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
