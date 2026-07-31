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

export default function PartnerRanking({
  statistics,
}: Props) {
  const topPartner = statistics.topPartner;
  const topOffer = statistics.topOffer;

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <h2 className="text-xl font-bold text-white">
          🏆 Meilleur partenaire
        </h2>

        {topPartner ? (
          <>
            <p className="mt-5 text-3xl font-black text-green-400">
              {topPartner.company}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Clics</p>
                <p className="font-bold text-white">
                  {topPartner.clicks}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Leads</p>
                <p className="font-bold text-white">
                  {topPartner.leads}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Ventes</p>
                <p className="font-bold text-white">
                  {topPartner.sales}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Commission
                </p>
                <p className="font-bold text-green-400">
                  {formatCurrency(
                    topPartner.revenue
                  )}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-5 text-slate-400">
            Aucun partenaire.
          </p>
        )}
      </article>

      <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <h2 className="text-xl font-bold text-white">
          ⭐ Meilleure offre
        </h2>

        {topOffer ? (
          <>
            <p className="mt-5 text-3xl font-black text-blue-400">
              {topOffer.offerName}
            </p>

            <p className="mt-2 text-slate-400">
              {topOffer.company}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Clics</p>
                <p className="font-bold text-white">
                  {topOffer.clicks}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Leads</p>
                <p className="font-bold text-white">
                  {topOffer.leads}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Ventes</p>
                <p className="font-bold text-white">
                  {topOffer.sales}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Commission
                </p>
                <p className="font-bold text-green-400">
                  {formatCurrency(
                    topOffer.revenue
                  )}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-5 text-slate-400">
            Aucune offre.
          </p>
        )}
      </article>
    </section>
  );
}