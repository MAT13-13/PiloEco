import type {
  DashboardStatistics,
} from "../services/dashboard.service";

type Props = {
  statistics: DashboardStatistics;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function PartnersTable({
  statistics,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        📊 Performances des partenaires
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-white/10 text-sm text-slate-400">
            <tr>
              <th className="pb-3">Partenaire</th>
              <th className="pb-3 text-right">Clics</th>
              <th className="pb-3 text-right">Leads</th>
              <th className="pb-3 text-right">Ventes</th>
              <th className="pb-3 text-right">Conversion</th>
              <th className="pb-3 text-right">Commission</th>
            </tr>
          </thead>

          <tbody>
            {statistics.partners.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-500"
                >
                  Aucun partenaire enregistré.
                </td>
              </tr>
            ) : (
              statistics.partners.map((partner) => (
                <tr
                  key={partner.partnerId}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-4 font-semibold text-white">
                    {partner.company}
                  </td>

                  <td className="py-4 text-right text-white">
                    {partner.clicks}
                  </td>

                  <td className="py-4 text-right text-white">
                    {partner.leads}
                  </td>

                  <td className="py-4 text-right text-white">
                    {partner.sales}
                  </td>

                  <td className="py-4 text-right text-blue-400 font-bold">
                    {partner.conversionRate} %
                  </td>

                  <td className="py-4 text-right font-bold text-green-400">
                    {formatCurrency(partner.revenue)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}