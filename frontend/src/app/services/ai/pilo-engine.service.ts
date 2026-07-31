export type RecommendationOffer = {
  price?: number;
  monthlyPrice?: number;
  score?: number;

  provider?: string;
  operator?: string;
  name?: string;

  data?: string;
  network?: string;
  commitment?: string;

  url?: string;
};

export type PiloRecommendation<
  T extends RecommendationOffer = RecommendationOffer
> = {
  offer: T;
  yearlySaving: number;
  monthlySaving: number;
  score: number;
  explanation: string;
};

function getOfferPrice(
  offer: RecommendationOffer
): number {
  return (
    offer.monthlyPrice ??
    offer.price ??
    0
  );
}

function getOfferName(
  offer: RecommendationOffer
): string {
  return (
    offer.provider ??
    offer.operator ??
    offer.name ??
    "cette offre"
  );
}

export function createRecommendation<
  T extends RecommendationOffer
>(
  currentPrice: number,
  offers: T[]
): PiloRecommendation<T> | null {
  if (offers.length === 0) {
    return null;
  }

  const bestOffer = [...offers].sort(
    (a, b) => {
      const scoreA = a.score ?? 0;
      const scoreB = b.score ?? 0;

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      return (
        getOfferPrice(a) -
        getOfferPrice(b)
      );
    }
  )[0];

  if (!bestOffer) {
    return null;
  }

  const bestOfferPrice =
    getOfferPrice(bestOffer);

  const monthlySaving = Math.max(
    0,
    currentPrice - bestOfferPrice
  );

  const yearlySaving = Math.round(
    monthlySaving * 12
  );

  const score =
    bestOffer.score ??
    Math.max(
      50,
      Math.min(
        100,
        Math.round(
          (
            monthlySaving /
            Math.max(currentPrice, 1)
          ) * 100
        )
      )
    );

  const offerName =
    getOfferName(bestOffer);

  const explanation =
    monthlySaving > 0
      ? `Tu paies actuellement ${currentPrice.toFixed(
          2
        )} €/mois. En passant chez ${offerName}, tu pourrais économiser environ ${yearlySaving} € par an.`
      : `${offerName} est actuellement l’offre la plus intéressante parmi celles analysées.`;

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
  priority:
    | "Faible"
    | "Moyenne"
    | "Haute";
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
  const recommendations:
    PiloEngineRecommendation[] =
    categories.map((category) => {
      const monthlySaving = Math.max(
        category.monthlyPrice -
          category.recommendedPrice,
        0
      );

      const yearlySaving =
        monthlySaving * 12;

      let priority:
        | "Faible"
        | "Moyenne"
        | "Haute" = "Faible";

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
    (a, b) =>
      b.yearlySaving -
      a.yearlySaving
  );

  const yearlySaving =
    recommendations.reduce(
      (sum, item) =>
        sum + item.yearlySaving,
      0
    );

  const monthlySaving =
    recommendations.reduce(
      (sum, item) =>
        sum + item.monthlySaving,
      0
    );

  const score = Math.max(
    0,
    Math.min(
      100,
      100 -
        Math.round(yearlySaving / 12)
    )
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