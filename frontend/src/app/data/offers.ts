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
  {
    id: 1,
    category: "mobile",
    provider: "Free Mobile",
    monthlyPrice: 7.99,
    url: "#",
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
    url: "#",
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
    url: "#",
    network: "5G",
    data: "130 Go",
    note: 9.0,
    yearlySaving: 384,
    commitment: "Sans engagement",
    score: 92,
  },
];

export const mobileOffers = offers.filter(
  (offer) => offer.category === "mobile"
);