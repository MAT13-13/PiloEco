import type { MonitoringCard } from "../../types/monitoring";

export type PiloBrainResult = {
  priority: "low" | "medium" | "high";

  title: string;

  explanation: string;

  recommendation: string;
};

export function analyseMonitoringCard(
  card: MonitoringCard
): PiloBrainResult {
  if (card.yearlySaving >= 300) {
    return {
      priority: "high",

      title: "Économie importante détectée",

      explanation: `Tu pourrais économiser environ ${card.yearlySaving} €/an.`,

      recommendation:
        "Je te conseille de comparer cette offre rapidement.",
    };
  }

  if (card.yearlySaving >= 100) {
    return {
      priority: "medium",

      title: "Une meilleure offre existe",

      explanation: `Une économie de ${card.yearlySaving} €/an semble possible.`,

      recommendation:
        "Tu peux comparer les offres lorsque tu auras un moment.",
    };
  }

  return {
    priority: "low",

    title: "Contrat compétitif",

    explanation:
      "Ton contrat semble correctement positionné par rapport au marché.",

    recommendation:
      "Aucune action urgente n'est nécessaire.",
  };
}