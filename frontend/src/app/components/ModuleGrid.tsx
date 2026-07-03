import Link from "next/link";

type ModuleStatus = "Disponible" | "En cours de création" | "Premium" | "Bientôt";

type ModuleItem = {
  emoji: string;
  title: string;
  description: string;
  status: ModuleStatus;
  href?: string;
};

const modules: ModuleItem[] = [
  {
    emoji: "💰",
    title: "Mes dépenses",
    description: "Analyse tes dépenses du quotidien.",
    status: "Disponible",
    href: "/depenses",
  },
  {
    emoji: "🏡",
    title: "Mon Nid",
    description: "Logement, travaux, énergie et projets maison.",
    status: "Disponible",
    href: "/mon-nid",
  },
  {
    emoji: "🛡️",
    title: "Assurances",
    description: "Compare et optimise tes contrats.",
    status: "En cours de création",
  },
  {
    emoji: "🐶",
    title: "Animaux",
    description: "Budget, nourriture, mutuelle et soins.",
    status: "En cours de création",
  },
  {
    emoji: "🚗",
    title: "Mobilité",
    description: "Voiture, moto, carburant et entretien.",
    status: "En cours de création",
  },
  {
    emoji: "👶",
    title: "Famille",
    description: "Préparer un enfant, aides et budget familial.",
    status: "Bientôt",
  },
  {
    emoji: "📈",
    title: "Patrimoine",
    description: "Épargne, crédits, projets et investissements.",
    status: "Premium",
  },
  {
    emoji: "🤖",
    title: "Pilo IA",
    description: "Conseils personnalisés et plan d’action.",
    status: "Premium",
  },
];

function getStatusClass(status: ModuleStatus) {
  if (status === "Disponible") {
    return "bg-green-500/10 text-green-300 border-green-500/30";
  }

  if (status === "En cours de création") {
    return "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";
  }

  if (status === "Premium") {
    return "bg-blue-500/10 text-blue-300 border-blue-500/30";
  }

  return "bg-slate-700/40 text-slate-300 border-slate-600";
}

export default function ModuleGrid() {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Que veux-tu améliorer ?</h2>

        <p className="mt-1 text-slate-400">
          Les modules disponibles et ceux en cours de création apparaissent ici.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => {
          const card = (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-green-500/50 hover:bg-slate-800 h-full">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="text-3xl">{module.emoji}</span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClass(
                    module.status
                  )}`}
                >
                  {module.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {module.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {module.description}
              </p>
            </div>
          );

          if (module.href) {
            return (
              <Link
                key={module.title}
                href={module.href}
                className="block"
              >
                {card}
              </Link>
            );
          }

          return (
            <div
              key={module.title}
              className="cursor-not-allowed opacity-80"
            >
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}