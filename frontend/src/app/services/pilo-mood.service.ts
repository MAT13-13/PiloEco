type Mission = {
  status: "Nouvelle" | "En cours" | "Terminée";
  saving: number;
};

export type PiloMood = {
  mood:
    | "happy"
    | "detective"
    | "expert"
    | "proud"
    | "calm"
    | "welcome"
    | "celebration";

  emoji: string;

  title: string;

  message: string;
};

export function getPiloMood(missions: Mission[]): PiloMood {
  const terminees = missions.filter(
    (mission) => mission.status === "Terminée"
  );

  const restantes = missions.filter(
    (mission) => mission.status !== "Terminée"
  );

  const potentiel = restantes.reduce(
    (total, mission) => total + mission.saving,
    0
  );

  if (missions.length === 0) {
    return {
      mood: "calm",
      emoji: "😊",
      title: "Tout est sous contrôle",
      message:
        "Je n'ai trouvé aucune économie urgente aujourd'hui. Continue comme ça.",
    };
  }

  if (terminees.length >= 5) {
    return {
      mood: "celebration",
      emoji: "🥳",
      title: "Quelle équipe !",
      message:
        "Grâce aux missions terminées, tu économises déjà beaucoup d'argent chaque année.",
    };
  }

  if (terminees.length >= 3) {
    return {
      mood: "proud",
      emoji: "😎",
      title: "Je suis fier de toi",
      message:
        "Tu avances vraiment bien. Chaque mission validée augmente tes économies.",
    };
  }

  if (potentiel >= 1000) {
    return {
      mood: "detective",
      emoji: "🕵️",
      title: "J'ai trouvé une grosse piste",
      message:
        "Je pense que l'on peut récupérer une belle somme rapidement. La prochaine mission vaut vraiment le coup.",
    };
  }

  if (potentiel >= 500) {
    return {
      mood: "expert",
      emoji: "📊",
      title: "J'ai analysé ton budget",
      message:
        "Quelques optimisations bien choisies peuvent faire une vraie différence sur ton budget annuel.",
    };
  }

  return {
    mood: "happy",
    emoji: "🐦",
    title: "On avance bien",
    message:
      "Je continue de surveiller tes dépenses pour trouver de nouvelles économies.",
  };
}