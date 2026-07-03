type StatsCardsProps = {
  analyses: number;
  economieMensuelle: number;
  economieAnnuelle: number;
};

export default function StatsCards({
  analyses,
  economieMensuelle,
  economieAnnuelle,
}: StatsCardsProps) {
  const scorePilo = Math.min(
    100,
    Math.round(analyses * 8 + economieMensuelle / 10)
  );

  const stats = [
    {
      label: "Analyses",
      value: analyses,
      suffix: "",
      icon: "🔎",
      helper: "Dépenses étudiées par Pilo",
    },
    {
      label: "Économie / mois",
      value: economieMensuelle,
      suffix: " €",
      icon: "💰",
      helper: "Gain estimé chaque mois",
    },
    {
      label: "Économie / an",
      value: economieAnnuelle,
      suffix: " €",
      icon: "🚀",
      helper: "Projection annuelle",
    },
  ];

  return (
    <section className="mb-8 grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-white/[0.07]"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-2xl">
            {stat.icon}
          </div>

          <p className="text-sm font-medium text-slate-400">{stat.label}</p>

          <p className="mt-2 text-4xl font-black text-white">
            {stat.value}
            {stat.suffix}
          </p>

          <p className="mt-3 text-sm text-slate-500">{stat.helper}</p>
        </div>
      ))}

      <div className="rounded-3xl border border-green-400/30 bg-gradient-to-br from-green-400 to-emerald-600 p-6 text-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black/10 text-2xl">
          🧠
        </div>

        <p className="text-sm font-bold">Score Pilo</p>

        <p className="mt-2 text-5xl font-black">{scorePilo}/100</p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/20">
          <div
            className="h-full rounded-full bg-slate-950 transition-all duration-700"
            style={{ width: `${scorePilo}%` }}
          />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-900/80">
          Plus ton score monte, plus tes dépenses sont optimisées.
        </p>
      </div>
    </section>
  );
}