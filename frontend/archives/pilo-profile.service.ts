export type PiloProfile = {
  score: number;

  yearlySaving: number;

  monthlySaving: number;

  missionsCompleted: number;

  missionsRemaining: number;

  premium: boolean;

  level: number;

  title: string;

  mood:
    | "happy"
    | "thinking"
    | "warning"
    | "celebrating";

  progress: number;
};

export function createPiloProfile(data: {
  score: number;

  yearlySaving: number;

  monthlySaving: number;

  missionsCompleted: number;

  missionsRemaining: number;

  premium?: boolean;
}): PiloProfile {
  const total =
    data.missionsCompleted + data.missionsRemaining;

  const progress =
    total === 0
      ? 0
      : Math.round(
          (data.missionsCompleted / total) * 100
        );

  let level = 1;
  let title = "Débutant";
  let mood: PiloProfile["mood"] = "thinking";

  if (data.score >= 90) {
    level = 5;
    title = "Maître des économies";
    mood = "celebrating";
  } else if (data.score >= 80) {
    level = 4;
    title = "Expert";
    mood = "happy";
  } else if (data.score >= 70) {
    level = 3;
    title = "Économe";
    mood = "happy";
  } else if (data.score >= 60) {
    level = 2;
    title = "En progression";
    mood = "thinking";
  } else {
    mood = "warning";
  }

  return {
    score: data.score,
    yearlySaving: data.yearlySaving,
    monthlySaving: data.monthlySaving,
    missionsCompleted: data.missionsCompleted,
    missionsRemaining: data.missionsRemaining,
    premium: data.premium ?? false,
    level,
    title,
    mood,
    progress,
  };
}