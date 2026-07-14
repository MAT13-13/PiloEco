export type MonitoringOfferCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

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

export type RankedMonitoringOffer = MonitoringOffer & {
  rank: number;
  monthlySaving: number;
  yearlySaving: number;
};

const checkedAt = new Date().toISOString();

/**
 * Catalogue de démonstration Pilo.
 * À remplacer plus tard par des offres réelles issues de partenaires/API.
 */
export const monitoringOfferCatalog: Record<
  MonitoringOfferCategory,
  MonitoringOffer[]
> = {
  telephone: [
    {
      id: "mobile-free-799",
      category: "telephone",
      provider: "Free",
      offer: "Forfait mobile",
      price: 7.99,
      commitment: "Sans engagement",
      highlight: "Prix très bas",
      score: 94,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "mobile-red-899",
      category: "telephone",
      provider: "RED",
      offer: "Forfait mobile",
      price: 8.99,
      commitment: "Sans engagement",
      highlight: "Bon équilibre prix / simplicité",
      score: 91,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "mobile-byou-999",
      category: "telephone",
      provider: "B&You",
      offer: "Forfait mobile",
      price: 9.99,
      commitment: "Sans engagement",
      highlight: "Alternative compétitive",
      score: 89,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  internet: [
    {
      id: "internet-red-2499",
      category: "internet",
      provider: "RED",
      offer: "Box Internet",
      price: 24.99,
      commitment: "Sans engagement",
      highlight: "Prix d’entrée compétitif",
      score: 92,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "internet-sosh-2599",
      category: "internet",
      provider: "Sosh",
      offer: "Boîte Internet",
      price: 25.99,
      commitment: "Sans engagement",
      highlight: "Offre simple",
      score: 90,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "internet-free-2999",
      category: "internet",
      provider: "Free",
      offer: "Freebox",
      price: 29.99,
      commitment: "Selon offre",
      highlight: "Services enrichis",
      score: 87,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  electricite: [
  {
    id: "electricite-eco-32",
    category: "electricite",
    provider: "Électricité Éco",
    offer: "Offre électricité",
    price: 32,
    commitment: "Résiliable",
    highlight: "Prix le plus bas",
    score: 92,
    sourceLabel: "Catalogue démo Pilo",
    checkedAt,
    isDemo: true,
  },
  {
    id: "electricite-flex-36",
    category: "electricite",
    provider: "Énergie Flex",
    offer: "Offre ajustable",
    price: 36,
    commitment: "Résiliable",
    highlight: "Bon rapport qualité/prix",
    score: 88,
    sourceLabel: "Catalogue démo Pilo",
    checkedAt,
    isDemo: true,
  },
  {
    id: "electricite-verte-39",
    category: "electricite",
    provider: "Énergie Verte",
    offer: "Offre verte",
    price: 39,
    commitment: "Résiliable",
    highlight: "Électricité verte",
    score: 84,
    sourceLabel: "Catalogue démo Pilo",
    checkedAt,
    isDemo: true,
  },
],

  habitation: [
    {
      id: "habitation-acheel-22",
      category: "habitation",
      provider: "Acheel",
      offer: "Assurance habitation",
      price: 22,
      commitment: "Résiliable selon conditions",
      highlight: "Prix de référence bas",
      score: 92,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "habitation-eco-25",
      category: "habitation",
      provider: "Habitation Éco",
      offer: "Formule essentielle",
      price: 25,
      commitment: "Résiliable selon conditions",
      highlight: "Couverture essentielle",
      score: 88,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "habitation-plus-29",
      category: "habitation",
      provider: "Habitation Plus",
      offer: "Formule confort",
      price: 29,
      commitment: "Résiliable selon conditions",
      highlight: "Couverture renforcée",
      score: 85,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  auto: [
    {
      id: "auto-lolivier-49",
      category: "auto",
      provider: "L’olivier Assurance",
      offer: "Assurance auto",
      price: 49,
      commitment: "Selon contrat",
      highlight: "Prix de référence compétitif",
      score: 92,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "auto-direct-54",
      category: "auto",
      provider: "Direct Assurance",
      offer: "Formule auto",
      price: 54,
      commitment: "Selon contrat",
      highlight: "Alternative équilibrée",
      score: 89,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "auto-eco-59",
      category: "auto",
      provider: "Auto Éco",
      offer: "Formule standard",
      price: 59,
      commitment: "Selon contrat",
      highlight: "Couverture standard",
      score: 85,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  animaux: [
    {
      id: "animaux-eco-22",
      category: "animaux",
      provider: "Assurance Animaux Éco",
      offer: "Formule essentielle",
      price: 22,
      commitment: "Selon contrat",
      highlight: "Prix de référence bas",
      score: 91,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "animaux-confort-27",
      category: "animaux",
      provider: "Animaux Confort",
      offer: "Formule confort",
      price: 27,
      commitment: "Selon contrat",
      highlight: "Couverture intermédiaire",
      score: 87,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "animaux-plus-32",
      category: "animaux",
      provider: "Animaux Plus",
      offer: "Formule renforcée",
      price: 32,
      commitment: "Selon contrat",
      highlight: "Couverture renforcée",
      score: 84,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  banque: [
    {
      id: "banque-bourso-0",
      category: "banque",
      provider: "BoursoBank",
      offer: "Compte bancaire",
      price: 0,
      commitment: "Sans engagement",
      highlight: "Frais mensuels réduits",
      score: 94,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "banque-online-2",
      category: "banque",
      provider: "Banque Online",
      offer: "Compte essentiel",
      price: 2,
      commitment: "Sans engagement",
      highlight: "Compte simple",
      score: 89,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "banque-premium-5",
      category: "banque",
      provider: "Banque Premium",
      offer: "Compte confort",
      price: 5,
      commitment: "Sans engagement",
      highlight: "Services supplémentaires",
      score: 84,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],

  streaming: [
    {
      id: "streaming-optimise-12",
      category: "streaming",
      provider: "Pack Optimisé",
      offer: "Streaming essentiel",
      price: 12,
      commitment: "Sans engagement",
      highlight: "Réduction des abonnements inutiles",
      score: 92,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "streaming-duo-16",
      category: "streaming",
      provider: "Pack Duo",
      offer: "Deux services",
      price: 16,
      commitment: "Sans engagement",
      highlight: "Bon compromis",
      score: 88,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
    {
      id: "streaming-famille-24",
      category: "streaming",
      provider: "Pack Famille",
      offer: "Multi-utilisateurs",
      price: 24,
      commitment: "Sans engagement",
      highlight: "Usage familial",
      score: 84,
      sourceLabel: "Catalogue démo Pilo",
      checkedAt,
      isDemo: true,
    },
  ],
};

export function getRankedMonitoringOffers(
  category: MonitoringOfferCategory,
  currentPrice: number
): RankedMonitoringOffer[] {
  return [...monitoringOfferCatalog[category]]
    .filter((offer) => offer.price < currentPrice)
    .sort((a, b) => {
      const savingA =
        currentPrice - a.price;

      const savingB =
        currentPrice - b.price;

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
        currentPrice - offer.price;

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
  const offers = monitoringOfferCatalog[category];

  const total = offers.reduce(
    (sum, offer) => sum + offer.price,
    0
  );

  return offers.length === 0
    ? 0
    : total / offers.length;
}

export function getRecommendationConfidence(
  category: MonitoringOfferCategory,
  currentPrice: number,
  currentProvider?: string,
  currentOffer?: string
) {
  const rankedOffers = getRankedMonitoringOffers(
    category,
    currentPrice
  );

  const bestOffer = rankedOffers[0];

  let score = 55;

  if (currentProvider?.trim()) score += 10;
  if (currentOffer?.trim()) score += 10;
  if (currentPrice > 0) score += 10;
  if (bestOffer?.yearlySaving > 0) score += 5;
  if (monitoringOfferCatalog[category].length >= 3) score += 5;

  const cappedScore = Math.min(95, score);

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

/**
 * Compatibilité avec le code existant :
 * monitoringOffers[category].provider / offer / price
 */
export const monitoringOffers = Object.fromEntries(
  Object.entries(monitoringOfferCatalog).map(
    ([category, offers]) => [
      category,
      {
        provider: offers[0].provider,
        offer: offers[0].offer,
        price: offers[0].price,
      },
    ]
  )
) as Record<
  MonitoringOfferCategory,
  {
    provider: string;
    offer: string;
    price: number;
  }
>;