export type MonitoringCard = {
  id: string;

  category:
    | "telephone"
    | "internet"
    | "electricite"
    | "habitation"
    | "auto"
    | "banque"
    | "streaming";

  icon: string;

  title: string;

  currentOffer: string;

  currentPrice: number;

  detectedOffer?: string;

  detectedPrice?: number;

  yearlySaving: number;

  alert?: string;

  button: string;

  color:
    | "green"
    | "blue"
    | "orange"
    | "red";

  status:
    | "green"
    | "yellow"
    | "red";

  updatedAt: string;
};