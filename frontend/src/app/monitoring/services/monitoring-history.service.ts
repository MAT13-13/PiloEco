import { supabase } from "../../lib/supabase";

import type {
  MonitoringContract,
} from "./monitoring.service";

export async function savePriceHistory(
  contract: MonitoringContract
) {
  const price = Number(
    contract.monthly_price ?? 0
  );

  const { data: lastHistory } =
    await supabase
      .from("monitoring_price_history")
      .select("price")
      .eq("contract_id", contract.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  /*
   * On évite d'enregistrer deux fois
   * le même prix.
   */
  if (
    lastHistory &&
    Number(lastHistory.price) === price
  ) {
    return;
  }

  const { error } = await supabase
    .from("monitoring_price_history")
    .insert({
      contract_id: contract.id,

      price,

      provider:
        contract.provider,

      offer:
        contract.current_offer,
    });

  if (error) {
    throw error;
  }
}

export async function getPriceHistory(
  contractId: string
) {
  const { data, error } =
    await supabase
      .from("monitoring_price_history")
      .select("*")
      .eq("contract_id", contractId)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data ?? [];
}