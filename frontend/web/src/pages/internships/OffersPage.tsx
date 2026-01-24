import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card, CardBody, CardHeader, Spinner, Table, Th, Td } from "../../components/ui";
import { safeGet, type DataMode } from "../../api/safe";
import { endpoints } from "../../api/endpoints";
import { normalizeList } from "../../utils/parsers";
import type { InternshipOffer } from "../../types";
import { mockInternshipOffers } from "../../mock/mockData";

export default function OffersPage() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<InternshipOffer[]>([]);
  const [mode, setMode] = useState<DataMode>("REAL");

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const res = await safeGet(endpoints.internships.offers(), () => mockInternshipOffers());
        setMode(res.mode);
        const list = normalizeList<InternshipOffer>(res.data as any);
        if (alive) setOffers(list);
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
        <div className="text-2xl font-bold">Internship Offers</div>
        <div className="text-sm text-slate-400 mt-1">Browse available internship offers.</div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader
            title="Offers list"
            subtitle={`Data source: ${mode} (Gateway: ${endpoints.internships.offers()})`}
          />
          <CardBody>
            {loading ? (
              <Spinner label="Loading offers..." />
            ) : offers.length === 0 ? (
              <div className="text-sm text-slate-400">No offers returned by the API.</div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Company</Th>
                    <Th>Description</Th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((o, idx) => (
                    <tr key={String(o.id ?? o.offer_id ?? idx)}>
                      <Td>{String(o.id ?? o.offer_id ?? idx)}</Td>
                      <Td>{o.title ?? o.role ?? "Untitled"}</Td>
                      <Td>{o.company ?? "-"}</Td>
                      <Td>
                        <span className="text-slate-400">{o.description ?? "-"}</span>
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
