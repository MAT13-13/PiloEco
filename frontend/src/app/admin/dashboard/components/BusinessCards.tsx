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

export default function BusinessCards({
  statistics,
}: Props) {
  const cards = [
    {
      label: "Commissions totales",
      value: formatCurrency(
        statistics.totalRevenue
      ),
      icon: "💰",
    },
    {
      label: "Clics",
      value: statistics.totalClicks.toLocaleString(
        "fr-FR"
      ),
      icon: "👆",
    },
    {
      label: "Leads",
      value: statistics.totalLeads.toLocaleString(
        "fr-FR"
      ),
      icon: "📝",
    },
    {
      label: "Ventes",
      value: statistics.totalSales.toLocaleString(
        "fr-FR"
      ),
      icon: "✅",
    },
    {
      label: "Conversion",
      value: `${statistics.conversionRate} %`,
      icon: "📈",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">
              {card.icon}
            </span>

            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-400">
              Temps réel
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-400">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}