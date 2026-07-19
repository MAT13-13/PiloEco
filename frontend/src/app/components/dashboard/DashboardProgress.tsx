"use client";

import Card from "../ui/Card";
import Progress from "../ui/Progress";

type Props = {
  economieAnnuelle: number;
  score: number;
  economiesRealisees: number;
  potentielRestant: number;
  missionsTerminees: number;
  totalMissions: number;
};

function formatEuro(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(
    Math.max(0, value)
  )} €/an`;
}

export default function DashboardProgress({
  economieAnnuelle,
  score,
  economiesRealisees,
  potentielRestant,
  missionsTerminees,
  totalMissions,
}: Props) {
  const objectif = 500;

  const objectifProgress = Math.min(
    100,
    Math.round(
      (Math.max(0, economieAnnuelle) / objectif) * 100
    )
  );

  const missionProgress =
    totalMissions > 0
      ? Math.min(
          100,
          Math.round(
            (missionsTerminees / totalMissions) * 100
          )
        )
      : 0;

  const totalPotentiel =
    Math.max(0, economiesRealisees) +
    Math.max(0, potentielRestant);

  const economieProgress =
    totalPotentiel > 0
      ? Math.min(
          100,
          Math.round(
            (Math.max(0, economiesRealisees) /
              totalPotentiel) *
              100
          )
        )
      : 0;

  const niveau =
    score >= 90
      ? "👑 Maître Pilo"
      : score >= 75
        ? "🦅 Expert"
        : score >= 50
          ? "🐦 Explorateur"
          : "🐣 Débutant";

  return (
    <section className="mt-8">
      <Card className="p-5 sm:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
              Mon évolution
            </p>

            <div className="mx-auto mt-5 flex h-36 w-36 items-center justify-center rounded-full border-8 border-green-500">
              <span className="text-4xl font-black text-white">
                {objectifProgress}%
              </span>
            </div>

            <p className="mt-5 text-3xl font-black text-green-400">
              {formatEuro(economieAnnuelle)}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              détectés par Pilo
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
                  Progression Pilo
                </p>

                <h2 className="mt-2 text-3xl font-black text-white">
                  {niveau}
                </h2>

                <p className="mt-2 max-w-xl text-slate-300">
                  Tu as récupéré {economieProgress}% des
                  économies identifiées et terminé{" "}
                  {missionsTerminees} mission
                  {missionsTerminees > 1 ? "s" : ""}.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase text-green-300">
                  Score Pilo
                </p>

                <p className="mt-1 text-4xl font-black text-green-400">
                  {score}
                </p>

                <p className="text-xs text-slate-400">
                  sur 100
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
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

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Réalisées
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {formatEuro(economiesRealisees)}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Missions
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {missionsTerminees}/{totalMissions}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Potentiel restant
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {formatEuro(potentielRestant)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm text-slate-400">
                <span>Objectif annuel</span>
                <span>{objectifProgress}%</span>
              </div>

              <Progress value={objectifProgress} />

              <p className="mt-2 text-xs text-slate-500">
                Objectif : {formatEuro(objectif)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}