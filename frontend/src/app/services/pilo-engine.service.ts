import { Offer } from "../data/offers";

export type PiloRecommendation = {
  offer: Offer;
  yearlySaving: number;
  monthlySaving: number;
  score: number;
  explanation: string;
};

export function createRecommendation(
  currentPrice: number,
  offers: Offer[]
): PiloRecommendation | null {
  if (offers.length === 0) return null;

  const bestOffer = [...offers].sort(
    (a, b) => a.monthlyPrice - b.monthlyPrice
  )[0];

  const monthlySaving = Math.max(
    0,
    currentPrice - bestOffer.monthlyPrice
  );

  const yearlySaving = Math.round(monthlySaving * 12);

  const score =
    bestOffer.score ??
    Math.max(
      50,
      Math.min(
        100,
        Math.round((monthlySaving / Math.max(currentPrice, 1)) * 100)
      )
    );

  const explanation = `Tu paies actuellement ${currentPrice.toFixed(
    2
  )} €/mois. En passant chez ${
    bestOffer.provider
  }, tu pourrais économiser environ ${yearlySaving} € par an.`;

  return {
    offer: bestOffer,
    monthlySaving,
    yearlySaving,
    score,
    explanation,
  };
}

export type PiloCategory = {
  id: string;
  name: string;
  monthlyPrice: number;
  recommendedPrice: number;
};

export type PiloEngineRecommendation = {
  id: string;
  name: string;
  monthlySaving: number;
  yearlySaving: number;
  priority: "Faible" | "Moyenne" | "Haute";
};

export type PiloMessage = {
  emoji: string;
  title: string;
  message: string;
};

export type PiloEngineResult = {
  score: number;
  yearlySaving: number;
  monthlySaving: number;
  recommendations: PiloEngineRecommendation[];
  pilo: PiloMessage;
};

export function createPiloEngine(
  categories: PiloCategory[]
): PiloEngineResult {
  const recommendations = categories.map((category) => {
    const monthlySaving = Math.max(
      category.monthlyPrice - category.recommendedPrice,
      0
    );

    const yearlySaving = monthlySaving * 12;

    let priority: "Faible" | "Moyenne" | "Haute" = "Faible";

    if (yearlySaving >= 200) {
      priority = "Haute";
    } else if (yearlySaving >= 80) {
      priority = "Moyenne";
    }

    return {
      id: category.id,
      name: category.name,
      monthlySaving,
      yearlySaving,
      priority,
    };
  });

  recommendations.sort(
    (a, b) => b.yearlySaving - a.yearlySaving
  );

  const yearlySaving = recommendations.reduce(
    (sum, item) => sum + item.yearlySaving,
    0
  );

  const monthlySaving = recommendations.reduce(
    (sum, item) => sum + item.monthlySaving,
    0
  );

  const score = Math.max(
    0,
    100 - Math.round(yearlySaving / 12)
  );

  let pilo: PiloMessage;

  if (yearlySaving >= 600) {
    pilo = {
      emoji: "🤩",
      title: "Énorme potentiel",
      message:
        "J'ai trouvé beaucoup d'économies. Commence par les missions prioritaires.",
    };
  } else if (yearlySaving >= 300) {
    pilo = {
      emoji: "😄",
      title: "Très bon potentiel",
      message:
        "Quelques changements peuvent déjà faire une vraie différence.",
    };
  } else if (yearlySaving >= 100) {
    pilo = {
      emoji: "🙂",
      title: "Quelques économies",
      message:
        "Ton budget est déjà bien optimisé, mais il reste encore quelques opportunités.",
    };
  } else {
    pilo = {
      emoji: "😊",
      title: "Bravo",
      message:
        "Je n'ai trouvé que peu d'économies. Tes dépenses semblent déjà bien optimisées.",
    };
  }

  return {
    score,
    yearlySaving,
    monthlySaving,
    recommendations,
    pilo,
  };
}