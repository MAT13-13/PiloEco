import type { Depense } from "./depenses.service";
import { calculateEconomyScore } from "./score.service";
import type { Offer } from "../data/offers";
import {
  createPiloEngine,
  type PiloCategory,
  type PiloEngineResult,
} from "./pilo-engine.service";

export type PiloAnalysis = {
  greeting: string;
  summary: string;
  score: number;
  totalSavings: number;
  insights: {
    icon: string;
    title: string;
    message: string;
    saving: number;
  }[];
};

export type PiloBrain = PiloEngineResult & {
  nextMission: string | null;
  nextMissionSaving: number;
  priorityMessage: string;
};

export function analyzePilo(depenses: Depense[]): PiloAnalysis {
  const result = calculateEconomyScore(depenses);

  let greeting = "Bonjour 👋";
  let summary = "Continue comme ça.";

  if (result.score >= 90) {
    summary = "Excellent ! Tes finances sont très bien gérées.";
  } else if (result.score >= 75) {
    summary =
      "Très bon travail. Quelques optimisations peuvent encore augmenter tes économies.";
  } else if (result.score >= 60) {
    summary =
      "Tu peux améliorer ton budget avec quelques ajustements ciblés.";
  } else {
    summary =
      "Pilo a détecté plusieurs opportunités importantes d'économies.";
  }

  return {
    greeting,
    summary,
    score: result.score,
    totalSavings: result.totalSavings,
    insights: result.insights,
  };
}

export function createPiloBrain(categories: PiloCategory[]): PiloBrain {
  const engine = createPiloEngine(categories);
  const best = engine.recommendations[0];

  const nextMission = best?.name ?? null;
  const nextMissionSaving = best?.yearlySaving ?? 0;

  const priorityMessage = best
    ? `Je te conseille de commencer par ${best.name}. C'est là que tu peux économiser le plus : environ ${best.yearlySaving} €/an.`
    : "Je n'ai pas trouvé de mission prioritaire pour le moment.";

  return {
    ...engine,
    nextMission,
    nextMissionSaving,
    priorityMessage,
  };
}

export function createPiloMessage(
  totalSavings: number,
  bestMission?: {
    title: string;
    saving: number;
  }
) {
  if (!bestMission) {
    return {
      title: "🐦 Tout est sous contrôle",
      message:
        "Je n'ai trouvé aucune économie prioritaire. Continue comme ça !",
    };
  }

  return {
    title: "🐦 Pilo a une bonne nouvelle",
    message: `J'ai trouvé environ ${totalSavings} € d'économies potentielles par an. Je te conseille de commencer par "${bestMission.title}" qui pourrait te faire économiser environ ${bestMission.saving} €/an.`,
  };
}

export function explainOffer(currentPrice: number, offer: Offer): string {
  const saving = Math.max(
    0,
    Math.round((currentPrice - offer.monthlyPrice) * 12)
  );

  return `Tu paies actuellement ${currentPrice.toFixed(
    2
  )} €/mois. En choisissant ${offer.provider}, tu pourrais économiser environ ${saving} € par an. Cette offre bénéficie d'un excellent rapport qualité/prix avec ${offer.data}, ${offer.network} et ${offer.commitment}.`;
}