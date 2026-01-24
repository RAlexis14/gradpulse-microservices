import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card, CardBody, CardHeader, Spinner, Table, Th, Td, Button } from "../../components/ui";
import { safeGet, type DataMode } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { normalizeList } from "../../utils/parsers";
import type { CommunityProgram } from "../../types";
import { mockCommunityPrograms } from "../../mock/mockData";

export default function ProgramsPage() {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<CommunityProgram[]>([]);
  const [mode, setMode] = useState<DataMode>("REAL");

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const res = await safeGet(endpoints.community.programs(), () => mockCommunityPrograms());
        setMode(res.mode);
        const list = normalizeList<CommunityProgram>(res.data as any);
        if (alive) setPrograms(list);
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
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div>
          <div className="text-2xl font-bold">Community Programs</div>
          <div className="text-sm text-slate-400 mt-1">Browse available community programs.</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Data:</span>
          <span
            className={
              "text-xs px-2 py-1 rounded-full border " +
              (mode === "REAL" ? "border-emerald-600/50 text-emerald-300" : "border-amber-600/50 text-amber-300")
            }
          >
            {mode}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader
            title="Programs list"
            subtitle={`Data source: ${mode} (Gateway: ${endpoints.community.programs()})`}
          />
          <CardBody>
            {loading ? (
              <Spinner label="Loading programs..." />
            ) : programs.length === 0 ? (
              <div className="text-sm text-slate-400">No programs returned by the API.</div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>ID</Th>
                    <Th>Title/Name</Th>
                    <Th>Description</Th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, idx) => (
                    <tr key={String(p.id ?? p.program_id ?? idx)}>
                      <Td>{String(p.id ?? p.program_id ?? idx)}</Td>
                      <Td>{p.title ?? p.name ?? "Untitled"}</Td>
                      <Td>
                        <span className="text-slate-400">{p.description ?? "-"}</span>
                      </Td>
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
