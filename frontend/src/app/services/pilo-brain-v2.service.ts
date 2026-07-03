export type PiloDifficulty = "Facile" | "Moyenne" | "Élevée";

export type PiloMission = {
  id: string;
  title: string;
  monthlyCost: number;
  potentialSaving: number;
  difficulty: PiloDifficulty;
  estimatedTime: string;
  priority: 1 | 2 | 3 | 4 | 5;
  reason: string;
};

export type PiloBrainResult = {
  score: number;
  priority: PiloMission | null;
  orderedMissions: PiloMission[];
  message: string;
  totalPotentialSaving: number;
};

export function analyzePiloBrain(
  missions: PiloMission[],
  score: number
): PiloBrainResult {
  const ordered = [...missions].sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }

    return b.potentialSaving - a.potentialSaving;
  });

  const priority = ordered.length > 0 ? ordered[0] : null;

  const totalPotentialSaving = ordered.reduce(
    (total, mission) => total + mission.potentialSaving,
    0
  );

  let message =
    "Je continue d'analyser tes dépenses pour trouver les meilleures économies.";

  if (priority) {
    message = `Je te conseille de commencer par "${priority.title}". C'est actuellement la mission la plus intéressante pour toi : priorité ${priority.priority}/5, environ ${priority.potentialSaving} € par an, difficulté ${priority.difficulty}.`;
  }

  return {
    score,
    priority,
    orderedMissions: ordered,
    message,
    totalPotentialSaving,
  };
}