import type {
  MonitoringCard,
  MonitoringCategory,
} from "../../types/monitoring";

import {
  getRankedMonitoringOffers,
} from "./monitoring-offers.service";

type MonitoringStatus =
  | "green"
  | "yellow"
  | "red";

/*
 * Catégories pour lesquelles le catalogue Monitoring
 * possède actuellement des offres avec un prix comparable.
 *
 * IMPORTANT :
 * Les autres catégories ne sont PAS ignorées.
 * Elles sont redirigées vers leur mission Pilo via card.href,
 * où le partenaire réel est présenté.
 */
type MonitoringOfferCompatibleCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

const MONITORING_OFFER_CATEGORIES:
  MonitoringOfferCompatibleCategory[] = [
    "telephone",
    "internet",
    "electricite",
    "habitation",
    "auto",
    "animaux",
    "banque",
    "streaming",
  ];

const MILLISECONDS_PER_DAY =
  1000 * 60 * 60 * 24;

function isMonitoringOfferCompatibleCategory(
  category: MonitoringCategory
): category is MonitoringOfferCompatibleCategory {
  return MONITORING_OFFER_CATEGORIES.includes(
    category as MonitoringOfferCompatibleCategory
  );
}

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
  hasPartnerOpportunity,
}: {
  daysUntilEnd: number | null;
  yearlySaving: number;
  hasPartnerOpportunity?: boolean;
}) {
  if (
    daysUntilEnd !== null &&
    daysUntilEnd < 0
  ) {
    return 1;
  }

  if (
    daysUntilEnd !== null &&
    daysUntilEnd <= 30
  ) {
    return 2;
  }

  if (yearlySaving >= 200) {
    return 3;
  }

  /*
   * Une mission partenaire disponible reste
   * une vraie opportunité même lorsqu'on ne peut
   * pas annoncer une économie chiffrée.
   */
  if (hasPartnerOpportunity) {
    return 4;
  }

  if (
    daysUntilEnd !== null &&
    daysUntilEnd <= 90
  ) {
    return 4;
  }

  if (yearlySaving >= 100) {
    return 5;
  }

  return 6;
}

function applyDeadlineAlert({
  daysUntilEnd,
  status,
  alert,
  button,
  yearlySaving,
  offerPrice,
}: {
  daysUntilEnd: number | null;
  status: MonitoringStatus;
  alert: string;
  button: string;
  yearlySaving: number;
  offerPrice?: number | null;
}) {
  let nextStatus = status;
  let nextAlert = alert;
  let nextButton = button;

  if (daysUntilEnd === null) {
    return {
      status: nextStatus,
      alert: nextAlert,
      button: nextButton,
    };
  }

  if (daysUntilEnd < 0) {
    nextStatus = "red";

    nextAlert =
      yearlySaving > 0 &&
      offerPrice != null
        ? `📅 L’échéance de ton contrat est dépassée. Une offre à ${offerPrice.toFixed(
            2
          )} €/mois permettrait d’économiser environ ${yearlySaving} €/an.`
        : "📅 L’échéance de ton contrat est dépassée. Vérifie son renouvellement et compare la solution partenaire proposée par Pilo.";

    nextButton =
      "📅 Vérifier et comparer";
  } else if (daysUntilEnd === 0) {
    nextStatus = "red";

    nextAlert =
      yearlySaving > 0
        ? `📅 Ton contrat arrive à échéance aujourd’hui. Tu pourrais économiser ${yearlySaving} €/an en étudiant l’offre proposée.`
        : "📅 Ton contrat arrive à échéance aujourd’hui. C’est le bon moment pour vérifier la solution partenaire proposée par Pilo.";

    nextButton =
      "📅 Agir aujourd’hui";
  } else if (daysUntilEnd <= 30) {
    nextStatus = "red";

    nextAlert =
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
          }. Compare maintenant la solution partenaire proposée par Pilo.`;

    nextButton =
      "📅 Préparer l’échéance";
  } else if (
    daysUntilEnd <= 90 &&
    nextStatus === "green"
  ) {
    nextStatus = "yellow";

    nextAlert = `🗓️ L’échéance de ton contrat approche dans ${daysUntilEnd} jours. Pilo te propose déjà une solution partenaire à comparer.`;

    nextButton =
      "Voir la solution partenaire";
  }

  return {
    status: nextStatus,
    alert: nextAlert,
    button: nextButton,
  };
}

export function enrichMonitoringCard(
  card: MonitoringCard
): MonitoringCard {
  let daysUntilEnd: number | null =
    null;

  if (isRealEndDate(card.endDate)) {
    daysUntilEnd =
      getDaysUntilDate(
        card.endDate!
      );
  }

  /*
   * CAS 1
   * La catégorie ne possède pas encore de catalogue
   * tarifaire comparable.
   *
   * On ne fabrique aucun prix ni économie.
   * Mais on propose systématiquement la mission Pilo
   * correspondant à la catégorie.
   *
   * card.href est déjà défini dans monitoring.service.ts
   * pour chaque rubrique :
   * téléphone senior, gaz, moto, mutuelle,
   * assurance emprunteur, assurance obsèques,
   * mobilités douces, sécurité, logiciels,
   * cybersécurité, etc.
   */
  if (
    !isMonitoringOfferCompatibleCategory(
      card.category
    )
  ) {
    let status: MonitoringStatus =
      "yellow";

    let alert =
      "💡 Une solution partenaire Pilo est disponible pour ce contrat. Compare les garanties et le tarif directement dans la mission correspondante.";

    let button =
      "Voir l’offre partenaire";

    const deadlineResult =
      applyDeadlineAlert({
        daysUntilEnd,
        status,
        alert,
        button,
        yearlySaving: 0,
      });

    status = deadlineResult.status;
    alert = deadlineResult.alert;
    button = deadlineResult.button;

    return {
      ...card,

      /*
       * On conserve better_offer si le moteur serveur
       * a déjà enregistré une information.
       */
      detectedProvider:
        card.detectedProvider,

      detectedOffer:
        card.detectedOffer ||
        "Solution partenaire Pilo",

      /*
       * Aucun faux tarif pour une offre personnalisée.
       */
      detectedPrice: null,

      yearlySaving: 0,

      alert,

      status,

      button,

      priority:
        getMonitoringPriority({
          daysUntilEnd,
          yearlySaving: 0,
          hasPartnerOpportunity: true,
        }),

      /*
       * Surtout : on garde la route de mission déjà
       * configurée dans monitoring.service.ts.
       *
       * Exemple :
       * assurance-obseques
       * → /missions/assurance-obseques
       * → partenaire APRIL sur la page mission.
       */
      href: card.href,
    };
  }

  /*
   * CAS 2
   * La catégorie possède un catalogue de comparaison.
   */
  const rankedOffers =
    getRankedMonitoringOffers(
      card.category,
      card.currentPrice
    );

  const bestOffer =
    rankedOffers[0];

  if (!bestOffer) {
    let status: MonitoringStatus =
      "yellow";

    let alert =
      "💡 Pilo ne dispose pas d’un tarif comparable fiable pour ce contrat, mais une mission partenaire est disponible.";

    let button =
      "Voir l’offre partenaire";

    const deadlineResult =
      applyDeadlineAlert({
        daysUntilEnd,
        status,
        alert,
        button,
        yearlySaving: 0,
      });

    status = deadlineResult.status;
    alert = deadlineResult.alert;
    button = deadlineResult.button;

    return {
      ...card,

      detectedProvider:
        card.detectedProvider,

      detectedOffer:
        card.detectedOffer ||
        "Solution partenaire Pilo",

      detectedPrice: null,

      yearlySaving: 0,

      alert,

      status,

      button,

      priority:
        getMonitoringPriority({
          daysUntilEnd,
          yearlySaving: 0,
          hasPartnerOpportunity: true,
        }),

      href: card.href,
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
    "Voir l’offre partenaire";

  if (yearlySaving > 0) {
    if (
      yearlySaving >= 150 ||
      priceGapPercentage >= 30
    ) {
      status = "red";

      alert = `⚠️ Ton contrat coûte environ ${monthlySaving.toFixed(
        2
      )} €/mois de plus que l’offre la mieux classée. Économie potentielle estimée : ${yearlySaving} €/an.`;
    } else {
      status = "yellow";

      alert = `💡 Une offre moins chère est détectée chez ${bestOffer.provider} à ${bestOffer.price.toFixed(
        2
      )} €/mois. Économie potentielle estimée : ${yearlySaving} €/an.`;
    }

    button =
      "Voir l’offre partenaire";
  }

  const deadlineResult =
    applyDeadlineAlert({
      daysUntilEnd,
      status,
      alert,
      button,
      yearlySaving,
      offerPrice:
        bestOffer.price,
    });

  status = deadlineResult.status;
  alert = deadlineResult.alert;
  button = deadlineResult.button;

  const priority =
    getMonitoringPriority({
      daysUntilEnd,
      yearlySaving,
      hasPartnerOpportunity: true,
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

    /*
     * IMPORTANT :
     * plus aucune route /recommendations/...
     *
     * Toutes les catégories retournent vers leur
     * mission Pilo, déjà reliée au partenaire réel.
     */
    href: card.href,
  };
}