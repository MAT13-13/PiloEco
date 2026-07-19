type Props = {
  totalSavings: number;
  completedMissions: number;
  badges: string[];
  createdAt: string | null;
};

type BadgeConfig = {
  icon: string;
  title: string;
  description: string;
};

const badgeCatalog: Record<string, BadgeConfig> = {
  first_mission: {
    icon: "🎯",
    title: "Première mission",
    description: "Première économie validée.",
  },

  five_missions: {
    icon: "🏅",
    title: "Éco régulier",
    description: "5 missions terminées.",
  },

  ten_missions: {
    icon: "🏆",
    title: "Expert des économies",
    description: "10 missions terminées.",
  },

  saving_100: {
    icon: "💰",
    title: "Premier cap",
    description: "100 € économisés.",
  },

  saving_500: {
    icon: "🌱",
    title: "Épargne en croissance",
    description: "500 € économisés.",
  },

  saving_1000: {
    icon: "💎",
    title: "Cap des 1 000 €",
    description: "1 000 € économisés.",
  },

  saving_2000: {
    icon: "🚀",
    title: "Super économiseur",
    description: "2 000 € économisés.",
  },

  pilolife_project: {
    icon: "🌿",
    title: "Projet de vie",
    description: "Premier objectif PiloLife créé.",
  },

  premium_member: {
    icon: "⭐",
    title: "Membre Premium",
    description: "PiloEco Premium activé.",
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getMembershipMonths(
  createdAt: string | null
) {
  if (!createdAt) {
    return 1;
  }

  const startDate = new Date(createdAt);
  const currentDate = new Date();

  if (Number.isNaN(startDate.getTime())) {
    return 1;
  }

  const yearsDifference =
    currentDate.getFullYear() -
    startDate.getFullYear();

  const monthsDifference =
    currentDate.getMonth() -
    startDate.getMonth();

  const totalMonths =
    yearsDifference * 12 +
    monthsDifference +
    1;

  return Math.max(1, totalMonths);
}

function getAverageMonthlySaving(
  totalSavings: number,
  createdAt: string | null
) {
  const membershipMonths =
    getMembershipMonths(createdAt);

  return totalSavings / membershipMonths;
}

function getBadgeInformation(
  badge: string
): BadgeConfig {
  return (
    badgeCatalog[badge] ?? {
      icon: "🏅",
      title: badge
        .replaceAll("_", " ")
        .replace(/^\w/, (letter) =>
          letter.toUpperCase()
        ),
      description:
        "Badge débloqué dans PiloEco.",
    }
  );
}

export default function AccountInsightsCard({
  totalSavings,
  completedMissions,
  badges,
  createdAt,
}: Props) {
  const averageMonthlySaving =
    getAverageMonthlySaving(
      totalSavings,
      createdAt
    );

  const averageMissionSaving =
    completedMissions > 0
      ? totalSavings / completedMissions
      : 0;

  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          Mes résultats
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          L’impact de mes économies
        </h2>

        <p className="mt-3 text-slate-400">
          Une vue simple de ce que PiloEco t’a
          déjà aidé à accomplir.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
          <p className="text-sm text-green-200">
            Moyenne économisée
          </p>

          <p className="mt-2 text-3xl font-black text-green-400">
            {formatCurrency(
              averageMonthlySaving
            )}
          </p>

          <p className="mt-1 text-sm text-green-200/70">
            environ par mois
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
          <p className="text-sm text-slate-400">
            Gain moyen par mission
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {formatCurrency(
              averageMissionSaving
            )}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            sur {completedMissions} mission
            {completedMissions > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
              Badges
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              Mes réussites
            </h3>
          </div>

          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
            {badges.length} débloqué
            {badges.length > 1 ? "s" : ""}
          </span>
        </div>

        {badges.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-center">
            <p className="text-4xl">
              🏅
            </p>

            <p className="mt-3 font-bold text-white">
              Ton premier badge t’attend
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Termine une mission ou franchis un
              nouveau cap d’économie pour le
              débloquer.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {badges.map((badge) => {
              const information =
                getBadgeInformation(badge);

              return (
                <article
                  key={badge}
                  className="flex gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                    {information.icon}
                  </div>

                  <div>
                    <p className="font-black text-white">
                      {information.title}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {information.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}