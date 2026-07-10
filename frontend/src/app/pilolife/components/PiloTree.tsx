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

export default function PiloTree({ project }: Props) {
  const destination = getDestination(project);

  const progress =
    project.target_amount > 0
      ? Math.min((project.saved_amount / project.target_amount) * 100, 100)
      : 0;

  const remaining = Math.max(project.target_amount - project.saved_amount, 0);

  const yearlySaving = project.monthly_saved * 12;

  const estimatedYears =
    yearlySaving > 0 ? (remaining / yearlySaving).toFixed(1) : null;

  return (
    <section className="mt-10">
      <div className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-8 shadow-[0_0_80px_rgba(34,197,94,0.08)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              🌿 Le Voyage de Pilo
            </p>

            <h2 className="mt-4 text-5xl font-black">{project.title}</h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Chaque économie fera pousser une nouvelle feuille sur votre arbre
              de liberté.
            </p>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-5xl">
            {destination.icon}
          </div>
        </div>

        <div className="relative mt-10 h-[420px] overflow-hidden rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(34,197,94,0.22),transparent_35%),radial-gradient(circle_at_78%_20%,rgba(132,204,22,0.14),transparent_25%)]" />

          <div className="absolute inset-0 z-10">
            <TreeBranch />
          </div>

          <img
            src="/pilo.png"
            alt="Pilo"
            className="absolute bottom-[78px] left-10 z-30 h-40 w-40 object-contain drop-shadow-[0_25px_60px_rgba(34,197,94,0.55)]"
          />

          <div className="absolute right-10 top-10 z-30 flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-green-400/30 bg-slate-950/80 text-7xl shadow-[0_0_70px_rgba(34,197,94,0.3)]">
              {destination.icon}
            </div>

            <p className="mt-3 rounded-full bg-green-500/20 px-5 py-2 text-sm font-black text-green-300">
              Destination
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-green-500/30 bg-slate-950/90 px-6 py-3 text-center font-bold text-green-300 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            🌱 Le voyage commence aujourd'hui
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Destination</p>
            <p className="mt-3 text-2xl font-black">{destination.label}</p>
            <p className="mt-3 text-slate-300">{destination.text}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Progression</p>

            <p className="mt-3 text-3xl font-black text-green-400">
              {progress.toFixed(1)} %
            </p>

            <p className="mt-2 text-slate-300">
              {Number(project.saved_amount).toLocaleString("fr-FR")} €
              économisés
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Pilo</p>

            <p className="mt-3 font-bold">
              {estimatedYears
                ? `Au rythme actuel, nous atteindrons ton objectif dans environ ${estimatedYears} an(s). 🌿`
                : "Commençons par réaliser quelques économies. 🌱"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}