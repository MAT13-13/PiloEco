export type OfferCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque";

export type Offer = {
  id: string;
  provider: string;
  category: OfferCategory;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  piloScore: number;
  highlight: string;
  partnerUrl?: string;
};

export const offers: Offer[] = [
  // 📱 Téléphone
  {
    id: "red-200go",
    provider: "RED",
    category: "telephone",
    name: "RED 200 Go",
    monthlyPrice: 9.99,
    yearlyPrice: 119.88,
    piloScore: 92,
    highlight: "Très bon prix",
  },
  {
    id: "sosh-150go",
    provider: "Sosh",
    category: "telephone",
    name: "Sosh 150 Go",
    monthlyPrice: 15.99,
    yearlyPrice: 191.88,
    piloScore: 88,
    highlight: "Réseau Orange",
  },
  {
    id: "free-serie",
    provider: "Free",
    category: "telephone",
    name: "Free Série",
    monthlyPrice: 19.99,
    yearlyPrice: 239.88,
    piloScore: 82,
    highlight: "Bon volume data",
  },

  // 🌐 Internet
  {
    id: "freebox-pop",
    provider: "Free",
    category: "internet",
    name: "Freebox Pop",
    monthlyPrice: 29.99,
    yearlyPrice: 359.88,
    piloScore: 90,
    highlight: "Bon rapport prix/services",
  },
  {
    id: "red-box",
    provider: "RED",
    category: "internet",
    name: "RED Box Fibre",
    monthlyPrice: 25.99,
    yearlyPrice: 311.88,
    piloScore: 91,
    highlight: "Prix agressif",
  },
  {
    id: "livebox-fibre",
    provider: "Orange",
    category: "internet",
    name: "Livebox Fibre",
    monthlyPrice: 39.99,
    yearlyPrice: 479.88,
    piloScore: 84,
    highlight: "Réseau solide",
  },

  // ⚡ Électricité
  {
    id: "totalenergies-online",
    provider: "TotalEnergies",
    category: "electricite",
    name: "Offre Online",
    monthlyPrice: 95,
    yearlyPrice: 1140,
    piloScore: 86,
    highlight: "Prix compétitif",
  },
  {
    id: "edf-tarif-bleu",
    provider: "EDF",
    category: "electricite",
    name: "Tarif Bleu",
    monthlyPrice: 110,
    yearlyPrice: 1320,
    piloScore: 78,
    highlight: "Offre historique",
  },
  {
    id: "mint-electricite",
    provider: "Mint Energie",
    category: "electricite",
    name: "Offre Électricité",
    monthlyPrice: 90,
    yearlyPrice: 1080,
    piloScore: 88,
    highlight: "Alternative intéressante",
  },

  // 🏠 Habitation
  {
    id: "lovys-habitation",
    provider: "Lovys",
    category: "habitation",
    name: "Assurance habitation",
    monthlyPrice: 18,
    yearlyPrice: 216,
    piloScore: 86,
    highlight: "Simple et digital",
  },
  {
    id: "direct-assurance-habitation",
    provider: "Direct Assurance",
    category: "habitation",
    name: "Habitation Essentiel",
    monthlyPrice: 22,
    yearlyPrice: 264,
    piloScore: 84,
    highlight: "Bon prix",
  },

  // 🚗 Auto
  {
    id: "direct-assurance-auto",
    provider: "Direct Assurance",
    category: "auto",
    name: "Assurance auto",
    monthlyPrice: 35,
    yearlyPrice: 420,
    piloScore: 84,
    highlight: "Prix attractif",
  },
  {
    id: "ornikar-auto",
    provider: "Ornikar",
    category: "auto",
    name: "Assurance auto",
    monthlyPrice: 32,
    yearlyPrice: 384,
    piloScore: 86,
    highlight: "Digital et flexible",
  },

  // 🐶 Animaux
  {
    id: "santevet",
    provider: "SantéVet",
    category: "animaux",
    name: "Assurance animaux",
    monthlyPrice: 25,
    yearlyPrice: 300,
    piloScore: 86,
    highlight: "Référence animaux",
  },
  {
    id: "assur-o-poil",
    provider: "Assur O'Poil",
    category: "animaux",
    name: "Mutuelle animaux",
    monthlyPrice: 22,
    yearlyPrice: 264,
    piloScore: 84,
    highlight: "Spécialiste chien/chat",
  },

  // 🏦 Banque
  {
    id: "boursobank",
    provider: "BoursoBank",
    category: "banque",
    name: "Compte bancaire",
    monthlyPrice: 0,
    yearlyPrice: 0,
    piloScore: 92,
    highlight: "Frais réduits",
  },
  {
    id: "fortuneo",
    provider: "Fortuneo",
    category: "banque",
    name: "Compte bancaire",
    monthlyPrice: 0,
    yearlyPrice: 0,
    piloScore: 90,
    highlight: "Banque en ligne solide",
  },
];