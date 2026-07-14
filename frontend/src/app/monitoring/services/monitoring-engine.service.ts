import type { MonitoringCard } from "../../types/monitoring";

import {
  getRankedMonitoringOffers,
} from "./monitoring-offers.service";

type MonitoringStatus =
  | "green"
  | "yellow"
  | "red";

const MILLISECONDS_PER_DAY =
  1000 * 60 * 60 * 24;

function isRealEndDate(
  value?: string | null
) {
  if (!value) {
    return false;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(
    value
  );
}

function getDaysUntilDate(
  dateValue: string
) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(
    `${dateValue}T12:00:00`
  );

  if (
    Number.isNaN(
      targetDate.getTime()
    )
  ) {
    return null;
  }

  return Math.ceil(
    (targetDate.getTime() -
      today.getTime()) /
      MILLISECONDS_PER_DAY
  );
}

function getMonitoringPriority({
  daysUntilEnd,
  yearlySaving,
}: {
  daysUntilEnd: number | null;
  yearlySaving: number;
}) {
  /*
   * Priorité 1 :
   * contrat arrivé à échéance.
   */
  if (
    daysUntilEnd !== null &&
    daysUntilEnd < 0
  ) {
    return 1;
  }

  /*
   * Priorité 2 :
   * échéance aujourd’hui ou
   * dans moins de 30 jours.
   */
  if (
    daysUntilEnd !== null &&
    daysUntilEnd <= 30
  ) {
    return 2;
  }

  /*
   * Priorité 3 :
   * économie très importante.
   */
  if (yearlySaving >= 200) {
    return 3;
  }

  /*
   * Priorité 4 :
   * échéance dans moins de 90 jours.
   */
  if (
    daysUntilEnd !== null &&
    daysUntilEnd <= 90
  ) {
    return 4;
  }

  /*
   * Priorité 5 :
   * économie intéressante.
   */
  if (yearlySaving >= 100) {
    return 5;
  }

  /*
   * Priorité 6 :
   * aucune urgence.
   */
  return 6;
}

export function enrichMonitoringCard(
  card: MonitoringCard
): MonitoringCard {
  const rankedOffers =
    getRankedMonitoringOffers(
      card.category,
      card.currentPrice
    );

  const bestOffer =
    rankedOffers[0];

  let daysUntilEnd: number | null =
    null;

  if (isRealEndDate(card.endDate)) {
    daysUntilEnd =
      getDaysUntilDate(
        card.endDate!
      );
  }

  if (!bestOffer) {
    return {
      ...card,

      yearlySaving: 0,

      alert:
        "ℹ️ Pilo ne dispose pas encore d’une offre de comparaison pour ce contrat.",

      status: "green",

      button:
        "Voir le contrat",

      priority:
        getMonitoringPriority({
          daysUntilEnd,
          yearlySaving: 0,
        }),
    };
  }

  const monthlySaving =
    Math.max(
      0,
      card.currentPrice -
        bestOffer.price
    );

  const yearlySaving =
    Math.max(
      0,
      Math.round(
        monthlySaving * 12
      )
    );

  const priceGapPercentage =
    bestOffer.price <= 0
      ? card.currentPrice > 0
        ? 100
        : 0
      : Math.round(
          (monthlySaving /
            bestOffer.price) *
            100
        );

  let status: MonitoringStatus =
    "green";

  let alert =
    "✅ Ton contrat est déjà proche des meilleures offres du catalogue Pilo.";

  let button =
    "Voir les recommandations";

  /*
   * Analyse du prix
   */
  if (yearlySaving > 0) {
    if (
      yearlySaving >= 150 ||
      priceGapPercentage >= 30
    ) {
      status = "red";

      alert = `⚠️ Ton contrat coûte environ ${monthlySaving.toFixed(
        2
      )} €/mois de plus que l’offre la mieux classée. Tu pourrais économiser ${yearlySaving} €/an.`;
    } else {
      status = "yellow";

      alert = `💡 Une offre moins chère est disponible chez ${bestOffer.provider} à ${bestOffer.price.toFixed(
        2
      )} €/mois. Économie estimée : ${yearlySaving} €/an.`;
    }

    button =
      `💰 Économiser ${yearlySaving} €/an`;
  }

  /*
   * Analyse de l’échéance
   */
  if (daysUntilEnd !== null) {
    if (daysUntilEnd < 0) {
      status = "red";

      alert =
        yearlySaving > 0
          ? `📅 L’échéance de ton contrat est dépassée. Une offre à ${bestOffer.price.toFixed(
              2
            )} €/mois permettrait d’économiser environ ${yearlySaving} €/an.`
          : "📅 L’échéance de ton contrat est dépassée. Vérifie son renouvellement.";

      button =
        "📅 Vérifier le contrat";
    } else if (daysUntilEnd === 0) {
      status = "red";

      alert =
        yearlySaving > 0
          ? `📅 Ton contrat arrive à échéance aujourd’hui. Tu pourrais économiser ${yearlySaving} €/an en étudiant l’offre la mieux classée.`
          : "📅 Ton contrat arrive à échéance aujourd’hui.";

      button =
        "📅 Agir aujourd’hui";
    } else if (daysUntilEnd <= 30) {
      status = "red";

      alert =
        yearlySaving > 0
          ? `📅 Ton contrat arrive à échéance dans ${daysUntilEnd} jour${
              daysUntilEnd > 1
                ? "s"
                : ""
            }. Une économie de ${yearlySaving} €/an est actuellement détectée.`
          : `📅 Ton contrat arrive à échéance dans ${daysUntilEnd} jour${
              daysUntilEnd > 1
                ? "s"
                : ""
            }. Pense à vérifier ses conditions.`;

      button =
        "📅 Préparer l’échéance";
    } else if (
      daysUntilEnd <= 90 &&
      status === "green"
    ) {
      status = "yellow";

      alert = `🗓️ L’échéance de ton contrat approche dans ${daysUntilEnd} jours. Pilo continuera de surveiller les offres disponibles.`;

      button =
        "Voir l’échéance";
    }
  }

  const priority =
    getMonitoringPriority({
      daysUntilEnd,
      yearlySaving,
    });

  return {
    ...card,

    detectedProvider:
      bestOffer.provider,

    detectedOffer:
      bestOffer.offer,

    detectedPrice:
      bestOffer.price,

    yearlySaving,

    alert,

    status,

    button,

    priority,

    href:
      `/recommendations/${card.category}`,
  };
}