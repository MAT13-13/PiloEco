import { supabase } from "../../lib/supabase";

export type PiloLifeRecommendationSource =
  | "mission"
  | "monitoring";

export type PiloLifeRecommendation = {
  id: string;
  source: PiloLifeRecommendationSource;
  sourceId: string;
  title: string;
  category: string;
  icon: string;
  href: string;
  yearlySaving: number;
  monthlySaving: number;
  estimatedMonthsSaved: number;
  priorityScore: number;
  impactLabel: string;
  stars: number;
  reason: string;
};

type MissionRow = {
  id: string;
  mission_id: string;
  title: string;
  saving: number | null;
  status: string | null;
};

type MonitoringContractRow = {
  id: string;
  category: string;
  provider: string | null;
  yearly_saving: number | null;
  status: string | null;
};

type GetRecommendationsInput = {
  userId: string;
  projectTargetAmount: number;
  projectSavedAmount: number;
  projectMonthlySaved?: number;
  limit?: number;
};

const categoryConfig: Record<
  string,
  {
    icon: string;
    label: string;
    missionHref: string;
  }
> = {
  mobile: {
    icon: "📱",
    label: "Téléphone",
    missionHref: "/missions/mobile",
  },
  telephone: {
    icon: "📱",
    label: "Téléphone",
    missionHref: "/missions/mobile",
  },
  internet: {
    icon: "🌐",
    label: "Internet",
    missionHref: "/missions/internet",
  },
  electricite: {
    icon: "⚡",
    label: "Électricité",
    missionHref: "/missions/electricite",
  },
  habitation: {
    icon: "🏠",
    label: "Habitation",
    missionHref: "/missions/habitation",
  },
  assurance: {
    icon: "🛡️",
    label: "Assurances",
    missionHref: "/missions/assurance",
  },
  auto: {
    icon: "🚗",
    label: "Assurance auto",
    missionHref: "/missions/mobilite",
  },
  mobilite: {
    icon: "🚗",
    label: "Mobilité",
    missionHref: "/missions/mobilite",
  },
  banque: {
    icon: "🏦",
    label: "Banque",
    missionHref: "/missions/banque",
  },
  animaux: {
    icon: "🐶",
    label: "Animaux",
    missionHref: "/missions/animaux",
  },
  streaming: {
    icon: "📺",
    label: "Streaming",
    missionHref: "/missions/streaming",
  },
  famille: {
    icon: "👨‍👩‍👧",
    label: "Famille",
    missionHref: "/missions/famille",
  },
};

function normalizeCategory(value?: string | null) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategoryConfig(category: string) {
  const normalized = normalizeCategory(category);

  return (
    categoryConfig[normalized] ?? {
      icon: "💰",
      label: category || "Économie",
      missionHref: "/missions",
    }
  );
}

function normalizeSaving(value?: number | null) {
  const saving = Number(value ?? 0);

  return Number.isFinite(saving) && saving > 0
    ? Math.round(saving)
    : 0;
}

function getImpact(yearlySaving: number) {
  if (yearlySaving >= 300) {
    return {
      impactLabel: "Très fort impact",
      stars: 5,
    };
  }

  if (yearlySaving >= 180) {
    return {
      impactLabel: "Fort impact",
      stars: 4,
    };
  }

  if (yearlySaving >= 90) {
    return {
      impactLabel: "Impact intéressant",
      stars: 3,
    };
  }

  return {
    impactLabel: "Petit gain utile",
    stars: 2,
  };
}

function calculateEstimatedMonthsSaved({
  yearlySaving,
  remainingAmount,
  projectMonthlySaved,
}: {
  yearlySaving: number;
  remainingAmount: number;
  projectMonthlySaved: number;
}) {
  const monthlySaving = yearlySaving / 12;

  if (monthlySaving <= 0 || remainingAmount <= 0) {
    return 0;
  }

  if (projectMonthlySaved <= 0) {
    return Math.max(
      1,
      Math.round(remainingAmount / monthlySaving)
    );
  }

  const monthsWithoutAction =
    remainingAmount / projectMonthlySaved;

  const monthsWithAction =
    remainingAmount /
    (projectMonthlySaved + monthlySaving);

  return Math.max(
    1,
    Math.round(monthsWithoutAction - monthsWithAction)
  );
}

function calculatePriorityScore({
  yearlySaving,
  remainingAmount,
  source,
  status,
}: {
  yearlySaving: number;
  remainingAmount: number;
  source: PiloLifeRecommendationSource;
  status?: string | null;
}) {
  const savingScore = Math.min(
    70,
    Math.round(yearlySaving / 5)
  );

  const projectImpactScore =
    remainingAmount > 0
      ? Math.min(
          20,
          Math.round((yearlySaving / remainingAmount) * 100)
        )
      : 0;

  const monitoringBonus =
    source === "monitoring" ? 5 : 0;

  const normalizedStatus =
    (status ?? "").toLowerCase();

  const urgencyBonus =
    normalizedStatus.includes("red") ||
    normalizedStatus.includes("hausse") ||
    normalizedStatus.includes("prior")
      ? 5
      : 0;

  return Math.min(
    100,
    savingScore +
      projectImpactScore +
      monitoringBonus +
      urgencyBonus
  );
}

function buildReason({
  yearlySaving,
  estimatedMonthsSaved,
  categoryLabel,
}: {
  yearlySaving: number;
  estimatedMonthsSaved: number;
  categoryLabel: string;
}) {
  if (estimatedMonthsSaved > 0) {
    return `Optimiser ${categoryLabel.toLowerCase()} pourrait libérer ${yearlySaving.toLocaleString(
      "fr-FR"
    )} €/an et faire gagner environ ${estimatedMonthsSaved} mois sur ton projet.`;
  }

  return `Optimiser ${categoryLabel.toLowerCase()} pourrait libérer environ ${yearlySaving.toLocaleString(
    "fr-FR"
  )} €/an pour ta cagnotte Pilo.`;
}

export async function getPiloLifeRecommendations({
  userId,
  projectTargetAmount,
  projectSavedAmount,
  projectMonthlySaved = 0,
  limit = 4,
}: GetRecommendationsInput): Promise<
  PiloLifeRecommendation[]
> {
  const remainingAmount = Math.max(
    0,
    Number(projectTargetAmount || 0) -
      Number(projectSavedAmount || 0)
  );

  const safeLimit = Math.min(Math.max(1, limit), 10);

  const [
    { data: missions, error: missionsError },
    {
      data: monitoringContracts,
      error: monitoringError,
    },
  ] = await Promise.all([
    supabase
      .from("missions")
      .select("id, mission_id, title, saving, status")
      .eq("user_id", userId)
      .neq("status", "Terminée"),

    supabase
      .from("monitoring_contracts")
      .select(
        "id, category, provider, yearly_saving, status"
      )
      .eq("user_id", userId)
      .gt("yearly_saving", 0),
  ]);

  if (missionsError) throw missionsError;
  if (monitoringError) throw monitoringError;

  const recommendations: PiloLifeRecommendation[] =
    [];

  for (const mission of (missions ?? []) as MissionRow[]) {
    const yearlySaving = normalizeSaving(mission.saving);

    if (yearlySaving <= 0) continue;

    const config = getCategoryConfig(
      mission.mission_id
    );

    const estimatedMonthsSaved =
      calculateEstimatedMonthsSaved({
        yearlySaving,
        remainingAmount,
        projectMonthlySaved,
      });

    recommendations.push({
      id: `mission-${mission.id}`,
      source: "mission",
      sourceId: mission.id,
      title: mission.title,
      category: config.label,
      icon: config.icon,
      href: config.missionHref,
      yearlySaving,
      monthlySaving:
        Math.round((yearlySaving / 12) * 100) / 100,
      estimatedMonthsSaved,
      priorityScore: calculatePriorityScore({
        yearlySaving,
        remainingAmount,
        source: "mission",
        status: mission.status,
      }),
      ...getImpact(yearlySaving),
      reason: buildReason({
        yearlySaving,
        estimatedMonthsSaved,
        categoryLabel: config.label,
      }),
    });
  }

  for (const contract of (monitoringContracts ??
    []) as MonitoringContractRow[]) {
    const yearlySaving = normalizeSaving(
      contract.yearly_saving
    );

    if (yearlySaving <= 0) continue;

    const config = getCategoryConfig(
      contract.category
    );

    const estimatedMonthsSaved =
      calculateEstimatedMonthsSaved({
        yearlySaving,
        remainingAmount,
        projectMonthlySaved,
      });

    recommendations.push({
      id: `monitoring-${contract.id}`,
      source: "monitoring",
      sourceId: contract.id,
      title: contract.provider
        ? `Optimiser ${config.label} chez ${contract.provider}`
        : `Optimiser ${config.label}`,
      category: config.label,
      icon: config.icon,
      href: "/monitoring",
      yearlySaving,
      monthlySaving:
        Math.round((yearlySaving / 12) * 100) / 100,
      estimatedMonthsSaved,
      priorityScore: calculatePriorityScore({
        yearlySaving,
        remainingAmount,
        source: "monitoring",
        status: contract.status,
      }),
      ...getImpact(yearlySaving),
      reason: buildReason({
        yearlySaving,
        estimatedMonthsSaved,
        categoryLabel: config.label,
      }),
    });
  }

  const deduplicated = new Map<
    string,
    PiloLifeRecommendation
  >();

  for (const recommendation of recommendations) {
    const key = normalizeCategory(
      recommendation.category
    );

    const current = deduplicated.get(key);

    if (
      !current ||
      recommendation.priorityScore >
        current.priorityScore
    ) {
      deduplicated.set(key, recommendation);
    }
  }

  return Array.from(deduplicated.values())
    .sort(
      (a, b) =>
        b.priorityScore - a.priorityScore ||
        b.yearlySaving - a.yearlySaving
    )
    .slice(0, safeLimit);
}