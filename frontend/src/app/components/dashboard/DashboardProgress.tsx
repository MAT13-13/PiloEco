import Card from "../ui/Card";
import Progress from "../ui/Progress";
import Stat from "../ui/Stat";

type Props = {
  score: number;
  economiesRealisees: number;
  potentielRestant: number;
  missionsTerminees: number;
  totalMissions: number;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " €/an";
}

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

  const missionProgress =
    totalMissions > 0
      ? Math.round((missionsTerminees / totalMissions) * 100)
      : 0;

  const totalPotentiel = economiesRealisees + potentielRestant;

  const economieProgress =
    totalPotentiel > 0
      ? Math.round((economiesRealisees / totalPotentiel) * 100)
      : 0;

  return (
    <section className="mt-8 space-y-6">
      <Card className="p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
              Progression Pilo
            </p>

            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              {niveau}
            </h2>

            <p className="mt-3 max-w-2xl text-slate-300">
              Tu as déjà récupéré {economieProgress}% des économies identifiées par Pilo.
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/30 bg-green-500/10 px-6 py-5 text-center">
            <p className="text-sm font-bold text-green-300">Score Pilo</p>
            <p className="mt-2 text-5xl font-black text-green-400">{score}</p>
            <p className="mt-1 text-xs text-slate-400">sur 100</p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-sm text-slate-300">
              <span>Économies réalisées</span>
              <span>{economieProgress}%</span>
            </div>
            <Progress value={economieProgress} />
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm text-slate-300">
              <span>Missions terminées</span>
              <span>{missionProgress}%</span>
            </div>
            <Progress value={missionProgress} />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Économies réalisées"
          value={formatEuro(economiesRealisees)}
          icon="💰"
        />

        <Stat title="Score Pilo" value={`${score}/100`} icon="🏆" />

        <Stat
          title="Missions terminées"
          value={`${missionsTerminees}/${totalMissions}`}
          icon="✅"
        />

        <Stat
          title="Potentiel restant"
          value={formatEuro(potentielRestant)}
          icon="🎯"
        />
      </div>
    </section>
  );
}