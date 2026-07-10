import Link from "next/link";

type Mission = {
  id: string;
  title: string;
  saving: number;
  mission_id: string;
  status: "Nouvelle" | "En cours" | "Terminée";
};

type Props = {
  missions: Mission[];
  onCompleteMission: (mission: Mission) => void;
};

export default function PiloMissions({
  missions,
  onCompleteMission,
}: Props) {
  const sortedMissions = [...missions].sort((a, b) => {
    if (a.status === "Terminée" && b.status !== "Terminée") return 1;
    if (a.status !== "Terminée" && b.status === "Terminée") return -1;
    return b.saving - a.saving;
  });

  if (sortedMissions.length === 0) {
    return (
      <section className="mt-12 rounded-[2rem] border border-green-500/20 bg-green-500/10 p-8 text-center">
        <h2 className="text-3xl font-black text-white">🐦 Bravo !</h2>

        <p className="mt-4 text-lg text-slate-200">
          Pour l'instant, je n'ai trouvé aucune mission prioritaire.
        </p>

        <p className="mt-4 text-green-300">
          Continue comme ça 💚
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          🎯 Missions de Pilo
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          Voici les économies que je te conseille de faire en priorité.
        </h2>
      </div>

      <div className="space-y-5">
        {sortedMissions.map((mission) => (
          <div
            key={mission.id}
            className={`flex items-center justify-between gap-4 rounded-3xl border p-6 transition ${
              mission.status === "Terminée"
                ? "border-green-500/30 bg-green-500/10 opacity-80"
                : "border-white/10 bg-slate-900/60 hover:border-green-400/40"
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-white">
                  {mission.title}
                </h3>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                  {mission.status === "Terminée"
                    ? "✅ Terminée"
                    : mission.status}
                </span>
              </div>

              <p className="mt-2 font-bold text-green-400">
                +{mission.saving} €/an
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <Link
                href={`/missions/${mission.mission_id}`}
                className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:scale-105 hover:bg-green-400"
              >
                {mission.status === "Terminée"
                  ? "Voir"
                  : "Commencer"}
              </Link>

              {mission.status !== "Terminée" && (
                <button
                  type="button"
                  onClick={() => onCompleteMission(mission)}
                  className="rounded-full border border-green-500/40 px-4 py-2 text-sm font-bold text-green-300 transition hover:bg-green-500/10"
                >
                  ✅ Valider
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-green-500/10 p-5 text-green-300">
        🐦 Je te conseille de commencer par la mission qui rapporte le plus.
      </div>
    </section>
  );
}