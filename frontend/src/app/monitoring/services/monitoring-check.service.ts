import { supabaseAdmin } from "@/app/lib/supabase-admin";

import type {
  MonitoringContract,
} from "./monitoring.service";

import {
  getRankedMonitoringOffers,
  type MonitoringOfferCategory,
  type RankedMonitoringOffer,
} from "./monitoring-offers.service";

const MILLISECONDS_PER_DAY =
  1000 * 60 * 60 * 24;

export type MonitoringCheckResult = {
  contract: MonitoringContract;

  bestOffer: RankedMonitoringOffer | null;
  hasBetterOffer: boolean;

  hasPriceUp: boolean;
  hasPriceDown: boolean;

  previousPrice: number;
  currentPrice: number;
  priceDifference: number;

  hasContractEnd: boolean;
  daysBeforeEnd: number | null;
};

function isSupportedCategory(
  category: string
): category is MonitoringOfferCategory {
  return [
    "telephone",
    "internet",
    "electricite",
    "habitation",
    "auto",
    "animaux",
    "banque",
    "streaming",
  ].includes(category);
}

function getDaysBeforeEnd(
  endDateValue: string | null
): number | null {
  if (!endDateValue) {
    return null;
  }

  const endDate = new Date(endDateValue);

  if (Number.isNaN(endDate.getTime())) {
    return null;
  }

  const now = new Date();

  /*
   * On remet les heures à zéro afin d’éviter
   * les erreurs dues à l’heure courante.
   */
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const normalizedEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  return Math.ceil(
    (
      normalizedEndDate.getTime() -
      today.getTime()
    ) / MILLISECONDS_PER_DAY
  );
}

function getPriceDetection(
  contract: MonitoringContract
) {
  const currentPrice = Number(
    contract.monthly_price ?? 0
  );

  /*
   * Si aucun ancien prix n’est encore enregistré,
   * on considère que le prix précédent est identique
   * au prix actuel.
   */
  const previousPrice =
    contract.previous_price === null ||
    contract.previous_price === undefined
      ? currentPrice
      : Number(contract.previous_price);

  const safeCurrentPrice =
    Number.isFinite(currentPrice)
      ? currentPrice
      : 0;

  const safePreviousPrice =
    Number.isFinite(previousPrice)
      ? previousPrice
      : safeCurrentPrice;

  const priceDifference =
    safeCurrentPrice - safePreviousPrice;

  return {
    currentPrice: safeCurrentPrice,
    previousPrice: safePreviousPrice,
    priceDifference,
    hasPriceUp: priceDifference > 0,
    hasPriceDown: priceDifference < 0,
  };
}

export async function checkMonitoringContract(
  contract: MonitoringContract
): Promise<MonitoringCheckResult> {
  const checkedAt = new Date().toISOString();

  const {
    currentPrice,
    previousPrice,
    priceDifference,
    hasPriceUp,
    hasPriceDown,
  } = getPriceDetection(contract);

  const daysBeforeEnd = getDaysBeforeEnd(
    contract.end_date
  );

  /*
   * Une alerte de fin de contrat est déclenchée
   * entre aujourd’hui et 30 jours avant l’échéance.
   */
  const hasContractEnd =
    daysBeforeEnd !== null &&
    daysBeforeEnd >= 0 &&
    daysBeforeEnd <= 30;

  let bestOffer:
    | RankedMonitoringOffer
    | null = null;

  if (
    currentPrice > 0 &&
    isSupportedCategory(contract.category)
  ) {
    const rankedOffers =
      getRankedMonitoringOffers(
        contract.category,
        currentPrice
      );

    bestOffer = rankedOffers[0] ?? null;
  }

  const hasBetterOffer =
    Boolean(bestOffer) &&
    Number(bestOffer?.yearlySaving ?? 0) > 0;

  /*
   * On choisit le statut le plus important
   * à afficher sur le contrat.
   *
   * Priorité :
   * 1. hausse de prix ;
   * 2. échéance proche ;
   * 3. meilleure offre ;
   * 4. baisse de prix ;
   * 5. contrat optimisé.
   */
  let status = "Contrat optimisé";

  if (hasPriceDown) {
    status = "Baisse détectée";
  }

  if (hasBetterOffer) {
    status = "Meilleure offre trouvée";
  }

  if (hasContractEnd) {
    status = "Fin d'engagement proche";
  }

  if (hasPriceUp) {
    status = "Hausse détectée";
  }

  const updatePayload = {
    better_offer:
      hasBetterOffer && bestOffer
        ? `${bestOffer.provider} — ${bestOffer.offer}`
        : null,

    yearly_saving:
      hasBetterOffer && bestOffer
        ? Math.max(
            0,
            Number(bestOffer.yearlySaving)
          )
        : 0,

    status,

    last_checked_at: checkedAt,

    /*
     * On conserve la date précédente lorsqu’aucun
     * changement de prix n’est détecté.
     */
    last_price_change_at:
      hasPriceUp || hasPriceDown
        ? checkedAt
        : contract.last_price_change_at,

    last_offer_detected_at:
      hasBetterOffer
        ? checkedAt
        : contract.last_offer_detected_at,
  };

  const { data, error } = await supabaseAdmin
    .from("monitoring_contracts")
    .update(updatePayload)
    .eq("id", contract.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    contract: data as MonitoringContract,

    bestOffer,
    hasBetterOffer,

    hasPriceUp,
    hasPriceDown,

    previousPrice,
    currentPrice,
    priceDifference,

    hasContractEnd,
    daysBeforeEnd,
  };
}