import { supabase } from "../../lib/supabase";

import type {
  MonitoringContract,
} from "./monitoring.service";

import { savePriceHistory } from "./monitoring-history.service";
import { createMonitoringNotification } from "./monitoring-notification.service";

export async function checkMonitoringContracts(
  userId: string
) {
  const { data, error } = await supabase
    .from("monitoring_contracts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  const contracts =
    (data ?? []) as MonitoringContract[];

  for (const contract of contracts) {
    await analyseContract(contract);
  }
}

async function analyseContract(
  contract: MonitoringContract
) {
  const currentPrice =
    Number(contract.monthly_price ?? 0);

  const previousPrice =
    Number(
      contract.previous_price ??
        currentPrice
    );

  /*
   * Historique
   */
  await savePriceHistory(contract);

  /*
   * Hausse
   */
  if (currentPrice > previousPrice) {
    await createMonitoringNotification({
      userId: contract.user_id,
      contractId: contract.id,
      type: "price_increase",
      title: "📈 Hausse détectée",
      message: `Ton contrat est passé de ${previousPrice.toFixed(
        2
      )} € à ${currentPrice.toFixed(2)} €.`,
    });
  }

  /*
   * Baisse
   */
  if (currentPrice < previousPrice) {
    await createMonitoringNotification({
      userId: contract.user_id,
      contractId: contract.id,
      type: "price_drop",
      title: "📉 Bonne nouvelle",
      message: `Ton contrat est passé de ${previousPrice.toFixed(
        2
      )} € à ${currentPrice.toFixed(2)} €.`,
    });
  }

  await supabase
    .from("monitoring_contracts")
    .update({
      previous_price:
        currentPrice,

      last_checked_at:
        new Date().toISOString(),
    })
    .eq("id", contract.id);
}