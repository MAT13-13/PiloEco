export type MonitoringOfferCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

export const monitoringOfferCategories: MonitoringOfferCategory[] = [
  "telephone",
  "internet",
  "electricite",
  "habitation",
  "auto",
  "animaux",
  "banque",
  "streaming",
];

export function isMonitoringOfferCategory(
  category: string
): category is MonitoringOfferCategory {
  return monitoringOfferCategories.includes(
    category as MonitoringOfferCategory
  );
}

export type MonitoringOffer = {
  id: string;
  category: MonitoringOfferCategory;
  provider: string;
  offer: string;
  price: number;
  commitment: string;
  highlight: string;
  score: number;
  sourceLabel: string;
  checkedAt: string;
  isDemo: boolean;
};

export type RankedMonitoringOffer =
  MonitoringOffer & {
    rank: number;
    monthlySaving: number;
    yearlySaving: number;
  };

/*
 * IMPORTANT
 *
 * Aucun faux tarif et aucun faux partenaire ne doivent
 * être utilisés par le Monitoring.
 *
 * Tant qu'un tarif partenaire réel, stable et vérifié
 * n'est pas disponible, la catégorie reste vide ici.
 *
 * Le moteur Monitoring redirige alors vers la mission
 * Pilo correspondante, qui présente le vrai partenaire,
 * sans inventer d'économie chiffrée.
 */
export const monitoringOfferCatalog: Record<
  MonitoringOfferCategory,
  MonitoringOffer[]
> = {
  telephone: [],
  internet: [],
  electricite: [],
  habitation: [],
  auto: [],
  animaux: [],
  banque: [],
  streaming: [],
};

export function getRankedMonitoringOffers(
  category: MonitoringOfferCategory,
  currentPrice: number
): RankedMonitoringOffer[] {
  const safeCurrentPrice =
    Number.isFinite(Number(currentPrice))
      ? Number(currentPrice)
      : 0;

  return [
    ...monitoringOfferCatalog[category],
  ]
    .filter(
      (offer) =>
        !offer.isDemo &&
        Number.isFinite(offer.price) &&
        offer.price >= 0 &&
        offer.price < safeCurrentPrice
    )
    .sort((a, b) => {
      const savingA =
        safeCurrentPrice - a.price;

      const savingB =
        safeCurrentPrice - b.price;

      if (savingB !== savingA) {
        return savingB - savingA;
      }

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.price - b.price;
    })
    .map((offer, index) => {
      const monthlySaving =
        Math.max(
          0,
          safeCurrentPrice -
            offer.price
        );

      return {
        ...offer,
        rank: index + 1,
        monthlySaving,
        yearlySaving: Math.round(
          monthlySaving * 12
        ),
      };
    });
}

export function getMarketAverage(
  category: MonitoringOfferCategory
) {
  const realOffers =
    monitoringOfferCatalog[
      category
    ].filter(
      (offer) =>
        !offer.isDemo &&
        Number.isFinite(offer.price) &&
        offer.price >= 0
    );

  if (realOffers.length === 0) {
    return 0;
  }

  const total = realOffers.reduce(
    (sum, offer) =>
      sum + offer.price,
    0
  );

  return total / realOffers.length;
}

export function getRecommendationConfidence(
  category: MonitoringOfferCategory,
  currentPrice: number,
  currentProvider?: string,
  currentOffer?: string
) {
  const rankedOffers =
    getRankedMonitoringOffers(
      category,
      currentPrice
    );

  /*
   * Sans offre réelle vérifiée,
   * Pilo ne prétend pas disposer d'une
   * comparaison tarifaire fiable.
   */
  if (rankedOffers.length === 0) {
    return {
      score: 0,
      label: "Non chiffré",
    };
  }

  let score = 55;

  if (currentProvider?.trim()) {
    score += 10;
  }

  if (currentOffer?.trim()) {
    score += 10;
  }

  if (currentPrice > 0) {
    score += 10;
  }

  if (
    rankedOffers[0]?.yearlySaving >
    0
  ) {
    score += 10;
  }

  const cappedScore =
    Math.min(95, score);

  return {
    score: cappedScore,
    label:
      cappedScore >= 85
        ? "Élevé"
        : cappedScore >= 70
          ? "Moyen"
          : "Prudent",
  };
}

/*
 * Compatibilité avec les anciens appels.
 *
 * Si aucune offre réelle n'est disponible,
 * on retourne une valeur neutre au lieu
 * d'inventer un partenaire ou un tarif.
 */
export const monitoringOffers =
  Object.fromEntries(
    monitoringOfferCategories.map(
      (category) => {
        const firstRealOffer =
          monitoringOfferCatalog[
            category
          ].find(
            (offer) =>
              !offer.isDemo
          );

        return [
          category,
          firstRealOffer
            ? {
                provider:
                  firstRealOffer.provider,
                offer:
                  firstRealOffer.offer,
                price:
                  firstRealOffer.price,
              }
            : {
                provider:
                  "Solution partenaire Pilo",
                offer:
                  "Comparaison via la mission",
                price: 0,
              },
        ];
      }
    )
  ) as Record<
    MonitoringOfferCategory,
    {
      provider: string;
      offer: string;
      price: number;
    }
  >;