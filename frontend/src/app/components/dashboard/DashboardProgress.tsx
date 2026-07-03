type Props = {
  score: number;
  economiesRealisees: number;
  potentielRestant: number;
  missionsTerminees: number;
  totalMissions: number;
};

export default function DashboardProgress({
  score,
  economiesRealisees,
  potentielRestant,
  missionsTerminees,
  totalMissions,
}: Props) {
  const niveau =
    score >= 90
      ? "👑 Maître Pilo"
      : score >= 75
      ? "🦅 Expert"
      : score >= 50
      ? "🐦 Explorateur"
      : "🐣 Débutant";

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
        <p className="text-sm font-bold text-green-300">
          💰 Économies réalisées
        </p>

        <p className="mt-3 text-3xl font-black text-white">
          {economiesRealisees} €/an
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-bold text-slate-300">🏆 Score Pilo</p>

        <p className="mt-3 text-3xl font-black text-white">
          {score}/100
        </p>

        <p className="mt-2 text-green-400 font-bold">
          {niveau}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-bold text-slate-300">
          ✅ Missions terminées
        </p>

        <p className="mt-3 text-3xl font-black text-white">
          {missionsTerminees}/{totalMissions}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-bold text-slate-300">
          🎯 Potentiel restant
        </p>

        <p className="mt-3 text-3xl font-black text-white">
          {potentielRestant} €/an
        </p>
      </div>
    </section>
  );
}