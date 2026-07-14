import { PiloLifeProject } from "../services/pilolife.service";
import TreeBranch from "./TreeBranch";

type Props = {
  project: PiloLifeProject;
};

function getDestination(project: PiloLifeProject) {
  const title = project.title.toLowerCase();

  if (title.includes("bébé") || title.includes("bebe")) {
    return {
      label: "Bébé",
      icon: "🍼",
      text: "Vous préparez aujourd'hui le bonheur de demain.",
    };
  }

  const destinations: Record<
    string,
    { label: string; icon: string; text: string }
  > = {
    Maison: {
      label: "Maison",
      icon: "🏡",
      text: "Votre futur chez-vous se rapproche.",
    },
    Voyage: {
      label: "Voyage",
      icon: "✈️",
      text: "Votre prochaine aventure commence ici.",
    },
    Véhicule: {
      label: "Véhicule",
      icon: "🚗",
      text: "Votre liberté de mouvement avance.",
    },
    "Pouvoir d'achat": {
      label: "Pouvoir d'achat",
      icon: "💰",
      text: "Plus de marge chaque mois, plus de liberté.",
    },
    Épargne: {
      label: "Épargne",
      icon: "📈",
      text: "Votre sécurité grandit doucement.",
    },
    Animal: {
      label: "Animal",
      icon: "🐶",
      text: "Vous préparez une belle arrivée.",
    },
    Entreprise: {
      label: "Entreprise",
      icon: "💼",
      text: "Votre projet prend racine.",
    },
    Personnalisé: {
      label: "Objectif",
      icon: "🎯",
      text: "Votre liberté a sa propre destination.",
    },
  };

  return destinations[project.category] || destinations.Personnalisé;
}

function getTreeStage(progress: number) {
  if (progress >= 100) {
    return {
      icon: "🌳✨",
      label: "Arbre accompli",
      message: "Ton projet est prêt à devenir réalité. Bravo !",
      scale: 1.12,
      leaves: 12,
    };
  }

  if (progress >= 60) {
    return {
      icon: "🌳",
      label: "Grand arbre",
      message: "Ton projet est bien enraciné. Tu approches du but.",
      scale: 1,
      leaves: 9,
    };
  }

  if (progress >= 30) {
    return {
      icon: "🌲",
      label: "Jeune arbre",
      message: "Ton projet grandit à chaque économie.",
      scale: 0.88,
      leaves: 6,
    };
  }

  if (progress >= 10) {
    return {
      icon: "🌿",
      label: "Jeune pousse",
      message: "Les premières feuilles apparaissent.",
      scale: 0.72,
      leaves: 3,
    };
  }

  return {
    icon: "🌱",
    label: "Graine",
    message: "Le voyage commence avec la première économie.",
    scale: 0.58,
    leaves: 1,
  };
}

function getPiloMessage(
  progress: number,
  remaining: number,
  monthlySaving: number
) {
  if (progress >= 100) {
    return "Objectif atteint ! Tu peux être fière du chemin parcouru. 🎉";
  }

  if (progress >= 75) {
    return `Plus que ${remaining.toLocaleString(
      "fr-FR"
    )} € : la destination est toute proche.`;
  }

  if (progress >= 40) {
    return `Tu as déjà parcouru ${progress.toFixed(
      0
    )} % du chemin. Continue comme ça !`;
  }

  if (progress >= 10) {
    return `Ton projet prend forme : encore ${remaining.toLocaleString(
      "fr-FR"
    )} € à économiser.`;
  }

  if (monthlySaving > 0) {
    return `Tu économises environ ${monthlySaving.toLocaleString("fr-FR", {
      maximumFractionDigits: 2,
    })} € par mois. Chaque effort compte.`;
  }

  return "Commence par valider une mission pour faire pousser ton arbre. 🌱";
}

export default function PiloTree({ project }: Props) {
  const destination = getDestination(project);

  const targetAmount = Number(project.target_amount || 0);
  const savedAmount = Number(project.saved_amount || 0);
  const monthlySaved = Number(project.monthly_saved || 0);

  const progress =
    targetAmount > 0
      ? Math.min((savedAmount / targetAmount) * 100, 100)
      : 0;

  const remaining = Math.max(targetAmount - savedAmount, 0);

  const estimatedMonths =
    monthlySaved > 0 && remaining > 0
      ? Math.ceil(remaining / monthlySaved)
      : null;

  const treeStage = getTreeStage(progress);
  const piloMessage = getPiloMessage(progress, remaining, monthlySaved);

  function formatEstimatedTime(months: number | null) {
    if (months === null) {
      return null;
    }

    if (months <= 1) {
      return "moins d’un mois";
    }

    if (months < 12) {
      return `${months} mois`;
    }

    const years = Math.floor(months / 12);
    const restMonths = months % 12;

    if (restMonths === 0) {
      return `${years} an${years > 1 ? "s" : ""}`;
    }

    return `${years} an${years > 1 ? "s" : ""} et ${restMonths} mois`;
  }

  const estimatedTime = formatEstimatedTime(estimatedMonths);

  return (
    <section className="mt-10">
      <div className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8 shadow-[0_0_80px_rgba(34,197,94,0.08)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              🌿 Le voyage de Pilo
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              {project.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Chaque économie fait grandir ton arbre et rapproche ton projet de
              la réalité.
            </p>
          </div>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-5xl">
            {destination.icon}
          </div>
        </div>

        <div className="relative mt-10 h-[440px] overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(34,197,94,0.22),transparent_35%),radial-gradient(circle_at_78%_20%,rgba(132,204,22,0.14),transparent_25%)]" />

          <div className="absolute left-6 top-6 z-40 rounded-2xl border border-green-500/20 bg-slate-950/85 px-5 py-4 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-wider text-green-400">
              Évolution
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {treeStage.icon}
            </p>

            <p className="mt-1 font-bold text-green-300">
              {treeStage.label}
            </p>
          </div>

          <div
            className="absolute inset-0 z-10 origin-bottom transition-transform duration-1000"
            style={{
              transform: `scale(${treeStage.scale})`,
            }}
          >
            <TreeBranch />
          </div>

          <div className="absolute bottom-[90px] left-[37%] z-20 flex max-w-52 flex-wrap justify-center gap-2">
            {Array.from({ length: treeStage.leaves }).map((_, index) => (
              <span
                key={index}
                className="animate-pulse text-2xl drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
                style={{
                  animationDelay: `${index * 130}ms`,
                }}
              >
                🌿
              </span>
            ))}
          </div>

          <img
            src="/pilo.png"
            alt="Pilo"
            className="absolute bottom-[72px] left-8 z-30 h-36 w-36 object-contain drop-shadow-[0_25px_60px_rgba(34,197,94,0.55)] sm:h-40 sm:w-40"
          />

          <div className="absolute right-6 top-6 z-30 flex flex-col items-center sm:right-10 sm:top-10">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-green-400/30 bg-slate-950/80 text-6xl shadow-[0_0_70px_rgba(34,197,94,0.3)] sm:h-32 sm:w-32 sm:text-7xl">
              {destination.icon}
            </div>

            <p className="mt-3 rounded-full bg-green-500/20 px-5 py-2 text-sm font-black text-green-300">
              Destination
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-40 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-green-500/30 bg-slate-950/90 px-6 py-4 text-center shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            <p className="text-sm font-bold uppercase tracking-wider text-green-400">
              Pilo te dit
            </p>

            <p className="mt-2 font-bold text-green-100">
              {piloMessage}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Destination</p>

            <p className="mt-3 text-2xl font-black">
              {destination.label}
            </p>

            <p className="mt-3 text-slate-300">
              {destination.text}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Progression</p>

              <p className="text-xl font-black text-green-400">
                {progress.toFixed(1)} %
              </p>
            </div>

            <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-slate-300">
              {savedAmount.toLocaleString("fr-FR", {
                maximumFractionDigits: 2,
              })}{" "}
              € économisés
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Encore{" "}
              {remaining.toLocaleString("fr-FR", {
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Projection de Pilo</p>

            <p className="mt-3 font-bold text-white">
              {remaining === 0
                ? "Ton objectif est atteint. Il est temps de célébrer ! 🎉"
                : estimatedTime
                ? `Au rythme actuel, ton objectif pourrait être atteint dans ${estimatedTime}.`
                : treeStage.message}
            </p>

            {monthlySaved > 0 && (
              <p className="mt-3 text-sm text-green-300">
                Rythme actuel :{" "}
                {monthlySaved.toLocaleString("fr-FR", {
                  maximumFractionDigits: 2,
                })}{" "}
                €/mois
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}