export type MonitoringCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

export type MonitoringColor =
  | "green"
  | "blue"
  | "orange"
  | "red";

export type MonitoringStatus =
  | "green"
  | "yellow"
  | "red";

export type MonitoringCard = {
  id: string;

  category: MonitoringCategory;

  icon: string;

  title: string;

  /*
   * Contrat actuel
   */
  currentProvider?: string;
  currentOffer: string;
  currentPrice: number;
  endDate?: string | null;

  /*
   * Recommandation de Pilo
   */
  detectedProvider?: string;
  detectedOffer?: string | null;
  detectedPrice?: number | null;

  /*
   * Analyse
   */
  yearlySaving: number;
  alert?: string | null;

  /*
   * Affichage
   */
  button: string;
  color: MonitoringColor;
  status: MonitoringStatus;

  /*
   * Priorité de l’alerte
   */
  priority: number;

  /*
   * Dernière modification
   */
  updatedAt: string;

  href?: string;
};