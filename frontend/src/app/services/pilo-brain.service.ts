import { getPiloDecision } from "./pilo-decision.service";
import { generatePiloSpeech } from "./pilo-speech.service";

type PiloBrainInput = {
  scoreProgression: number;
  totalEconomiesAnnuelles: number;
  missionsTerminees: number;
  totalMissions: number;
};

type PiloDiagnostic = {
  niveau: "excellent" | "bon" | "moyen" | "urgent";
  couleur: string;
  priorite: string;
};

export function getPiloBrain({
  scoreProgression,
  totalEconomiesAnnuelles,
  missionsTerminees,
  totalMissions,
}: PiloBrainInput) {
  let mood = {
    emoji: "😊",
    title: "Tout va bien",
    message: "Je continue de surveiller tes économies.",
  };

  if (scoreProgression < 30) {
    mood = {
      emoji: "🔍",
      title: "Je cherche",
      message: "J'ai trouvé plusieurs pistes d'économies.",
    };
  } else if (scoreProgression < 60) {
    mood = {
      emoji: "💡",
      title: "Ça avance",
      message: "Tu commences déjà à économiser.",
    };
  } else if (scoreProgression < 90) {
    mood = {
      emoji: "🚀",
      title: "Excellent travail",
      message: "Tu optimises déjà très bien ton budget.",
    };
  } else {
    mood = {
      emoji: "🏆",
      title: "Champion des économies",
      message: "Franchement, je suis fier de toi.",
    };
  }

  const memory = {
    missionsTerminees,
    economiesRealisees: totalEconomiesAnnuelles,
    totalMissions,
  };

 let message = "";

if (totalEconomiesAnnuelles === 0) {
  message =
    "Je n'ai pas encore trouvé d'économie. Continue à renseigner tes dépenses, je continue mes recherches.";
}

else if (missionsTerminees === 0) {
  message =
    `J'ai trouvé environ ${totalEconomiesAnnuelles} € d'économies par an. Je commencerais par la mission qui rapporte le plus.`;
}

else if (missionsTerminees < totalMissions / 2) {
  message =
    `Bravo ! Tu avances bien. Tu as déjà sécurisé ${totalEconomiesAnnuelles} € par an mais il reste encore plusieurs économies à récupérer.`;
}

else if (missionsTerminees < totalMissions) {
  message =
    `On approche du but ! Encore quelques missions et ton budget sera vraiment optimisé.`;
}

else {
  message =
    `Mission accomplie ! Toutes tes missions sont terminées. Je continuerai de surveiller le marché pour trouver de nouvelles économies.`;
}
let diagnostic: PiloDiagnostic;

if (totalEconomiesAnnuelles >= 500) {
  diagnostic = {
    niveau: "urgent",
    couleur: "#ef4444",
    priorite: "Tu peux économiser beaucoup d'argent rapidement.",
  };
} else if (totalEconomiesAnnuelles >= 250) {
  diagnostic = {
    niveau: "moyen",
    couleur: "#f59e0b",
    priorite: "Quelques optimisations peuvent vraiment faire la différence.",
  };
} else if (totalEconomiesAnnuelles >= 100) {
  diagnostic = {
    niveau: "bon",
    couleur: "#22c55e",
    priorite: "Ton budget est déjà bien optimisé.",
  };
} else {
  diagnostic = {
    niveau: "excellent",
    couleur: "#3b82f6",
    priorite: "Continue comme ça, tu gères très bien tes dépenses.",
  };
}
const decision = getPiloDecision({
  economie: totalEconomiesAnnuelles,
  missionsTerminees,
  totalMissions,
});

const speech = generatePiloSpeech({
  humeur: mood.emoji,
  diagnostic: diagnostic.niveau,
  economie: totalEconomiesAnnuelles,
  missions: missionsTerminees,
});
 return {
  mood,
  message: speech,
  memory,
  diagnostic,
decision,
  };
}