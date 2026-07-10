export type Offer = {
  id: number;
  category: "mobile" | "internet" | "assurance" | "electricite";
  provider: string;
  monthlyPrice: number;
  url: string;
  network?: string;
  data?: string;
  note?: number;
  yearlySaving?: number;
  commitment?: string;
  score?: number;
};

export const offers: Offer[] = [
  // 📱 Mobile
  {
    id: 1,
    category: "mobile",
    provider: "Free Mobile",
    monthlyPrice: 7.99,
    url: "https://mobile.free.fr/",
    network: "5G",
    data: "250 Go",
    note: 9.6,
    yearlySaving: 408,
    commitment: "Sans engagement",
    score: 98,
  },
  {
    id: 2,
    category: "mobile",
    provider: "RED by SFR",
    monthlyPrice: 8.99,
    url: "https://www.red-by-sfr.fr/",
    network: "5G",
    data: "200 Go",
    note: 9.2,
    yearlySaving: 396,
    commitment: "Sans engagement",
    score: 95,
  },
  {
    id: 3,
    category: "mobile",
    provider: "B&You",
    monthlyPrice: 9.99,
    url: "https://www.bouyguestelecom.fr/forfaits-mobiles/sans-engagement",
    network: "5G",
    data: "130 Go",
    note: 9.0,
    yearlySaving: 384,
    commitment: "Sans engagement",
    score: 92,
  },

  // ⚡ Électricité
  {
    id: 4,
    category: "electricite",
    provider: "OHM Énergie",
    monthlyPrice: 72,
    url: "https://ohm-energie.com/",
    yearlySaving: 276,
    commitment: "Sans engagement",
    score: 97,
  },
  {
    id: 5,
    category: "electricite",
    provider: "TotalEnergies",
    monthlyPrice: 75,
    url: "https://www.totalenergies.fr/",
    yearlySaving: 240,
    commitment: "Sans engagement",
    score: 94,
  },
  {
    id: 6,
    category: "electricite",
    provider: "Primeo Énergie",
    monthlyPrice: 78,
    url: "https://www.primeo-energie.fr/",
    yearlySaving: 204,
    commitment: "Sans engagement",
    score: 91,
  },
];

export const mobileOffers = offers.filter(
  (offer) => offer.category === "mobile"
);

export const electriciteOffers = offers.filter(
  (offer) => offer.category === "electricite"
);