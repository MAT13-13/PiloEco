import type { Depense } from "./depenses.service";

export type EconomyInsight = {
  title: string;
  icon: string;
  saving: number;
  message: string;
};

export type EconomyScore = {
  score: number;
  totalSavings: number;
  insights: EconomyInsight[];
};

export function calculateEconomyScore(depenses: Depense[]): EconomyScore {
  const totalDepenses = depenses.reduce(
    (total, depense) => total + Number(depense.amount),
    0
  );

  const abonnements = depenses.filter((depense) =>
    depense.category.toLowerCase().includes("abonnement")
  );

  const restaurants = depenses.filter((depense) =>
    depense.category.toLowerCase().includes("restaurant")
  );

  const transport = depenses.filter((depense) =>
    depense.category.toLowerCase().includes("transport")
  );

  let score = 100;
  const insights: EconomyInsight[] = [];

  if (abonnements.length > 0) {
    const totalAbonnements = abonnements.reduce(
      (total, depense) => total + Number(depense.amount),
      0
    );

    score -= 10;

    insights.push({
      title: "Abonnements",
      icon: "📦",
      saving: Math.round(totalAbonnements * 12 * 0.25),
      message: "Pilo a détecté des abonnements à optimiser.",
    });
  }

  if (restaurants.length > 0) {
    const totalRestaurants = restaurants.reduce(
      (total, depense) => total + Number(depense.amount),
      0
    );

    score -= 8;

    insights.push({
      title: "Restaurants",
      icon: "🍔",
      saving: Math.round(totalRestaurants * 12 * 0.15),
      message: "Tes dépenses restaurant peuvent être réduites sans te priver.",
    });
  }

  if (transport.length > 0) {
    const totalTransport = transport.reduce(
      (total, depense) => total + Number(depense.amount),
      0
    );

    score -= 5;

    insights.push({
      title: "Transport",
      icon: "🚗",
      saving: Math.round(totalTransport * 12 * 0.1),
      message: "Quelques économies sont possibles sur tes trajets.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      title: "Analyse en cours",
      icon: "🤖",
      saving: 0,
      message: "Ajoute plus de dépenses pour que Pilo affine ton score.",
    });
  }

  const totalSavings = insights.reduce(
    (total, insight) => total + insight.saving,
    0
  );

  score = Math.max(0, Math.min(100, score));

  if (totalDepenses === 0) {
    score = 50;
  }

  return {
    score,
    totalSavings,
    insights,
  };
}