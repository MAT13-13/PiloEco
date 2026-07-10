import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Progress from "./ui/Progress";
import Stat from "./ui/Stat";

type Props = {
  level: number;
  title: string;
  score: number;
  progress: number;
  yearlySaving: number;
  monthlySaving: number;
  missionsCompleted: number;
  missionsRemaining: number;
  premium: boolean;
  xp?: number;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " €";
}

export default function PiloProfileCard({
  level,
  title,
  score,
  yearlySaving,
  monthlySaving,
  missionsCompleted,
  missionsRemaining,
  premium,
  xp = 0,
}: Props) {
  const nextLevelXp =
    level === 1 ? 100 : level === 2 ? 300 : level === 3 ? 700 : level === 4 ? 1200 : 1200;

  const previousLevelXp =
    level === 1 ? 0 : level === 2 ? 100 : level === 3 ? 300 : level === 4 ? 700 : 1200;

  const xpProgress =
    level >= 5
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            Math.round(((xp - previousLevelXp) / (nextLevelXp - previousLevelXp)) * 100)
          )
        );

  return (
    <Card className="mt-8 p-5 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Profil Pilo</Badge>
            <Badge variant={premium ? "purple" : "slate"}>
              {premium ? "👑 Premium" : "Gratuit"}
            </Badge>
          </div>

          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            🐦 Niveau {level} — {title}
          </h2>

          <p className="mt-3 text-slate-300">
            {xp} XP gagnés avec tes économies.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            🔒 Tes analyses, missions et dépenses restent liées uniquement à ton compte.
          </p>
        </div>

        <div className="rounded-3xl border border-green-500/30 bg-green-500/10 px-6 py-5 text-center">
          <p className="text-sm font-bold text-green-300">Score Pilo</p>
          <p className="mt-2 text-5xl font-black text-green-400">{score}</p>
          <p className="mt-1 text-xs text-slate-400">sur 100</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex justify-between text-sm text-slate-300">
          <span>Progression XP</span>
          <span>{xpProgress}%</span>
        </div>

        <Progress value={xpProgress} />

        <p className="mt-2 text-sm text-slate-400">
          {level >= 5
            ? "Niveau maximum atteint 👑"
            : `${Math.max(0, nextLevelXp - xp)} XP avant le prochain niveau`}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Économies/an" value={formatEuro(yearlySaving)} icon="💰" />
        <Stat title="Économies/mois" value={formatEuro(monthlySaving)} icon="📅" />
        <Stat title="Missions terminées" value={missionsCompleted} icon="✅" />
        <Stat title="Missions restantes" value={missionsRemaining} icon="🎯" />
      </div>
    </Card>
  );
}