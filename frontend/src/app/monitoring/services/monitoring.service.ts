import { supabase } from "../../lib/supabase";

import type {
  MonitoringCard,
  MonitoringCategory,
  MonitoringColor,
  MonitoringStatus,
} from "../../types/monitoring";

import { enrichMonitoringCard } from "./monitoring-engine.service";
import { addMissionSavingToPrimaryProject } from "../../pilolife/services/pilolife.service";

export type MonitoringContract = {
  id: string;
  user_id: string;
  category: string;
  provider: string | null;
  monthly_price: number | null;
  previous_price: number | null;

  last_checked_at: string | null;

  last_price_change_at: string | null;

  last_offer_detected_at: string | null;
  end_date: string | null;
  current_offer: string | null;
  better_offer: string | null;
  yearly_saving: number | null;
  status: string | null;
  updated_at: string;
};

export type MonitoringAlert = MonitoringCard;

export type CreateMonitoringContractInput = {
  category: string;
  provider: string;
  monthly_price: number;
  end_date?: string | null;
  current_offer?: string | null;

  better_offer?: string | null;
  yearly_saving?: number;
};

const categoryConfig: Record<
  MonitoringCategory,
  {
    icon: string;
    title: string;
    href: string;
  }
> = {
  telephone: {
    icon: "📱",
    title: "Téléphone",
    href: "/missions/mobile",
  },

  internet: {
    icon: "🌐",
    title: "Internet",
    href: "/missions/internet",
  },

  electricite: {
    icon: "⚡",
    title: "Électricité",
    href: "/missions/electricite",
  },

  habitation: {
    icon: "🏠",
    title: "Assurance habitation",
    href: "/missions/habitation",
  },

  auto: {
    icon: "🚗",
    title: "Assurance auto",
    href: "/missions/auto",
  },

  animaux: {
    icon: "🐶",
    title: "Assurance animaux",
    href: "/missions/animaux",
  },

  banque: {
    icon: "🏦",
    title: "Banque",
    href: "/missions/banque",
  },

  streaming: {
    icon: "📺",
    title: "Streaming",
    href: "/missions/streaming",
  },
};

function normalizeCategory(
  category: string
): MonitoringCategory {
  const normalizedCategory = category
    .trim()
    .toLowerCase();

  if (normalizedCategory === "mobile") {
    return "telephone";
  }

  if (
    normalizedCategory === "telephone" ||
    normalizedCategory === "internet" ||
    normalizedCategory === "electricite" ||
    normalizedCategory === "habitation" ||
    normalizedCategory === "auto" ||
    normalizedCategory === "animaux" ||
    normalizedCategory === "banque" ||
    normalizedCategory === "streaming"
  ) {
    return normalizedCategory;
  }

  return "telephone";
}

function getStatusFromDatabase(
  status: string | null
): MonitoringStatus {
  const normalizedStatus = status
    ?.trim()
    .toLowerCase();

  if (
    normalizedStatus === "hausse détectée" ||
    normalizedStatus === "alerte" ||
    normalizedStatus === "danger"
  ) {
    return "red";
  }

  if (
    normalizedStatus === "meilleure offre trouvée" ||
    normalizedStatus === "abonnement oublié" ||
    normalizedStatus === "action recommandée" ||
    normalizedStatus === "échéance proche" ||
    normalizedStatus === "fin d'engagement proche"
  ) {
    return "yellow";
  }

  return "green";
}

function getColorFromStatus(
  status: MonitoringStatus
): MonitoringColor {
  if (status === "red") {
    return "red";
  }

  if (status === "yellow") {
    return "orange";
  }

  return "green";
}

function contractToMonitoringCard(
  contract: MonitoringContract
): MonitoringCard {
  const category = normalizeCategory(
    contract.category
  );

  const config = categoryConfig[category];

  const initialStatus = getStatusFromDatabase(
    contract.status
  );

  const initialCard: MonitoringCard = {
    id: contract.id,

    category,

    icon: config.icon,

    title: config.title,

    currentProvider:
      contract.provider?.trim() ||
      "Fournisseur non renseigné",

    currentOffer:
      contract.current_offer?.trim() ||
      "Offre non renseignée",

    currentPrice: Number(
      contract.monthly_price ?? 0
    ),

    endDate:
      contract.end_date,

    detectedProvider: undefined,

    detectedOffer:
      contract.better_offer?.trim() || null,

    detectedPrice: null,

    yearlySaving: Number(
      contract.yearly_saving ?? 0
    ),

    alert:
      contract.status?.trim() ||
      "Contrat surveillé",

    button: "Voir les recommandations",

    color: getColorFromStatus(initialStatus),

    status: initialStatus,
    priority: 6,
    updatedAt:
      contract.updated_at,

    href: config.href,
  };

  const enrichedCard =
    enrichMonitoringCard(initialCard);

  return {
    ...enrichedCard,
    color: getColorFromStatus(
      enrichedCard.status
    ),
  };
}

export async function getMonitoringAlerts(): Promise<
  MonitoringAlert[]
> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("monitoring_contracts")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const contracts =
    (data ?? []) as MonitoringContract[];

  return contracts
  .map(contractToMonitoringCard)
  .sort(
    (a, b) =>
      a.priority - b.priority
  );
}

export function getMonitoringSummary(
  alerts: MonitoringAlert[]
) {
  const totalSaving = alerts.reduce(
    (total, alert) =>
      total +
      Number(alert.yearlySaving || 0),
    0
  );

  const activeAlerts = alerts.filter(
    (alert) =>
      alert.status === "yellow" ||
      alert.status === "red"
  ).length;

  return {
    totalSaving,
    activeAlerts,
    monitoredContracts: alerts.length,
  };
}

export async function createMonitoringContract(
  input: CreateMonitoringContractInput
): Promise<MonitoringContract> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const category = normalizeCategory(
    input.category
  );

  const monthlyPrice = Number(
    input.monthly_price
  );

  if (!input.provider.trim()) {
    throw new Error(
      "Le fournisseur est obligatoire."
    );
  }

  if (
    !Number.isFinite(monthlyPrice) ||
    monthlyPrice < 0
  ) {
    throw new Error(
      "Le prix mensuel est invalide."
    );
  }

const { data: existingContract } = await supabase
  .from("monitoring_contracts")
  .select("id")
  .eq("user_id", user.id)
  .eq("category", category)
  .maybeSingle();

if (existingContract) {
  throw new Error(
    "Ce contrat est déjà surveillé."
  );
}

  const { data, error } = await supabase
    .from("monitoring_contracts")
    .insert({
      user_id: user.id,
      category,
      provider: input.provider.trim(),
      monthly_price: monthlyPrice,
      end_date: input.end_date || null,
      current_offer:
        input.current_offer?.trim() ||
        null,
      better_offer:
  input.better_offer?.trim() ||
  null,

yearly_saving: Math.max(
  0,
  Number(input.yearly_saving ?? 0)
),

status:
  Number(input.yearly_saving ?? 0) > 0
    ? "Meilleure offre trouvée"
    : "Contrat surveillé",
      updated_at:
        new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as MonitoringContract;
}
export type UpdateMonitoringContractInput = {
  provider: string;
  monthly_price: number;
  current_offer?: string | null;
  end_date?: string | null;
};

export async function updateMonitoringContract(
  contractId: string,
  input: UpdateMonitoringContractInput
): Promise<MonitoringContract> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const monthlyPrice = Number(
    input.monthly_price
  );

  if (!input.provider.trim()) {
    throw new Error(
      "Le fournisseur est obligatoire."
    );
  }

  if (
    !Number.isFinite(monthlyPrice) ||
    monthlyPrice < 0
  ) {
    throw new Error(
      "Le prix mensuel est invalide."
    );
  }

  const {
    data: existingContract,
    error: existingContractError,
  } = await supabase
    .from("monitoring_contracts")
    .select("*")
    .eq("id", contractId)
    .eq("user_id", user.id)
    .single();

  if (existingContractError) {
    throw existingContractError;
  }

  const previousPrice = Number(
    existingContract.monthly_price ?? 0
  );

  const now = new Date().toISOString();

  let status = "Contrat surveillé";
  let lastPriceChangeAt: string | null =
    existingContract.last_price_change_at ??
    null;

  if (monthlyPrice > previousPrice) {
    status = "Hausse détectée";
    lastPriceChangeAt = now;
  } else if (monthlyPrice < previousPrice) {
    status = "Baisse détectée";
    lastPriceChangeAt = now;
  }

  const { data, error } = await supabase
    .from("monitoring_contracts")
    .update({
      provider: input.provider.trim(),
      previous_price: previousPrice,
      monthly_price: monthlyPrice,
      current_offer:
        input.current_offer?.trim() ||
        null,
      end_date: input.end_date || null,
      status,
      last_checked_at: now,
      last_price_change_at:
        lastPriceChangeAt,
      updated_at: now,
    })
    .eq("id", contractId)
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as MonitoringContract;
}
export async function deleteMonitoringContract(
  contractId: string
): Promise<void> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const { error } = await supabase
    .from("monitoring_contracts")
    .delete()
    .eq("id", contractId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}
export type ValidateMonitoringSavingInput = {
  provider: string;
  offer: string;
  monthly_price: number;
  yearly_saving: number;
};

export type ValidateMonitoringSavingResult = {
  contract: MonitoringContract;
  projectTitle: string | null;
  savingAdded: number;
};

export async function validateMonitoringSaving(
  contractId: string,
  input: ValidateMonitoringSavingInput
): Promise<ValidateMonitoringSavingResult> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const monthlyPrice = Number(
    input.monthly_price
  );

  const yearlySaving = Math.max(
    0,
    Number(input.yearly_saving)
  );

  if (!input.provider.trim()) {
    throw new Error(
      "Le nouveau fournisseur est obligatoire."
    );
  }

  if (
    !Number.isFinite(monthlyPrice) ||
    monthlyPrice < 0
  ) {
    throw new Error(
      "Le nouveau prix est invalide."
    );
  }

  if (
    !Number.isFinite(yearlySaving) ||
    yearlySaving <= 0
  ) {
    throw new Error(
      "Aucune économie ne peut être validée."
    );
  }

  const {
    data: existingContract,
    error: contractError,
  } = await supabase
    .from("monitoring_contracts")
    .select("*")
    .eq("id", contractId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (contractError) {
    throw contractError;
  }

  if (!existingContract) {
    throw new Error(
      "Ce contrat n’existe plus."
    );
  }

  if (
    existingContract.status ===
    "Économie validée"
  ) {
    throw new Error(
      "Cette économie a déjà été validée."
    );
  }

  const project =
    await addMissionSavingToPrimaryProject(
      user.id,
      yearlySaving
    );

  const {
    data: updatedContract,
    error: updateError,
  } = await supabase
    .from("monitoring_contracts")
    .update({
      provider: input.provider.trim(),
      current_offer:
        input.offer.trim() || null,
      monthly_price: monthlyPrice,

      better_offer: null,
      yearly_saving: 0,

      status: "Économie validée",
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", contractId)
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (updateError) {
    throw updateError;
  }

  return {
    contract:
      updatedContract as MonitoringContract,

    projectTitle:
      project?.title ?? null,

    savingAdded: yearlySaving,
  };
}
export async function checkMonitoringContracts() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from("monitoring_contracts")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  const contracts =
    (data ?? []) as MonitoringContract[];

  for (const contract of contracts) {
    const currentPrice = Number(
      contract.monthly_price ?? 0
    );

    const previousPrice =
      contract.previous_price === null
        ? currentPrice
        : Number(contract.previous_price);

    const now = new Date().toISOString();

    const update: Partial<MonitoringContract> = {
      last_checked_at: now,
    };

    if (currentPrice > previousPrice) {
      update.status =
        "Hausse détectée";
      update.last_price_change_at =
        now;
    } else if (
      currentPrice < previousPrice
    ) {
      update.status =
        "Baisse détectée";
      update.last_price_change_at =
        now;
    }

    const { error: updateError } =
      await supabase
        .from("monitoring_contracts")
        .update(update)
        .eq("id", contract.id)
        .eq("user_id", user.id);

    if (updateError) {
      throw updateError;
    }
  }
}