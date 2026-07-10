type Mission = {
  title: string;
  saving: number;
  status: string;
};

type Profile = {
  level: number;
  xp: number;
  total_savings: number;
};

type Analyse = {
  economie_annuelle: number;
};

type Advice = {
  greeting: string;
  priority: string;
  explanation: string;
  encouragement: string;
};

export function createPiloAdvice(
  analyses: Analyse[],
  missions: Mission[],
  profile: Profile
): Advice {
  const missionPrioritaire = [...missions]
    .filter((m) => m.status !== "Terminée")
    .sort((a, b) => b.saving - a.saving)[0];

  if (!missionPrioritaire) {
    return {
      greeting: "Excellent travail 👏",
      priority: "Tu as terminé toutes tes missions.",
      explanation:
        "Je continue de surveiller tes dépenses pour détecter de nouvelles économies.",
      encouragement:
        "Reviens après une nouvelle analyse, je chercherai d'autres opportunités.",
    };
  }

  return {
    greeting: `Niveau ${profile.level} • ${profile.xp} XP`,
    priority: missionPrioritaire.title,
    explanation: `Cette mission pourrait te faire économiser environ ${missionPrioritaire.saving} € par an.`,
    encouragement: `Tu as déjà identifié ${profile.total_savings} € d'économies potentielles. Continue comme ça !`,
  };
}