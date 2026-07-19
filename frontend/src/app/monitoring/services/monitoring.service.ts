import { supabase } from "../../lib/supabase";

import type {
  MonitoringCard,
  MonitoringCategory,
  MonitoringColor,
  MonitoringStatus,
} from "../../types/monitoring";

import { enrichMonitoringCard } from "./monitoring-engine.service";
import { addMissionSavingToPrimaryProject } from "../../pilolife/services/pilolife.service";
import {
  getPiloLifeSettings,
} from "../../pilolife/services/pilolife-settings.service";

import {
  creditPiloLifeWallet,
} from "../../pilolife/services/pilolife-wallet.service";

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
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(
      "Impossible de vérifier ta connexion."
    );
  }

  const user = session?.user;

  if (!user) {
    throw new Error(
      "Tu dois être connecté pour ajouter ce contrat au Monitoring."
    );
  }

  const category = normalizeCategory(
    input.category
  );

  const monthlyPrice = Number(
    input.monthly_price
  );

  const yearlySaving = Math.max(
    0,
    Number(input.yearly_saving ?? 0)
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
    .select("id")
    .eq("user_id", user.id)
    .eq("category", category)
    .maybeSingle();

  if (existingContractError) {
    throw existingContractError;
  }

  if (existingContract) {
    throw new Error(
      "Ce contrat est déjà surveillé."
    );
  }

  const now = new Date().toISOString();

  const betterOffer =
    input.better_offer?.trim() || null;

  const status =
    betterOffer || yearlySaving > 0
      ? "Meilleure offre trouvée"
      : "Contrat surveillé";

  const { data, error } = await supabase
    .from("monitoring_contracts")
    .insert({
      user_id: user.id,
      category,
      provider: input.provider.trim(),
      monthly_price: monthlyPrice,
      previous_price: monthlyPrice,
      last_checked_at: now,
      last_price_change_at: null,
      last_offer_detected_at:
        betterOffer ? now : null,
      end_date: input.end_date || null,
      current_offer:
        input.current_offer?.trim() || null,
      better_offer: betterOffer,
      yearly_saving: yearlySaving,
      status,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as MonitoringContract;
}

export async function updateMonitoringContract(
  contractId: string,
  input: CreateMonitoringContractInput
): Promise<MonitoringContract> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(
      "Impossible de vérifier ta connexion."
    );
  }

  const user = session?.user;

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

  const yearlySaving = Math.max(
    0,
    Number(input.yearly_saving ?? 0)
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
  const betterOffer =
    input.better_offer?.trim() || null;

  let status =
    betterOffer || yearlySaving > 0
      ? "Meilleure offre trouvée"
      : "Contrat surveillé";

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
      category,
      provider: input.provider.trim(),
      previous_price: previousPrice,
      monthly_price: monthlyPrice,
      current_offer:
        input.current_offer?.trim() || null,
      end_date: input.end_date || null,
      better_offer: betterOffer,
      yearly_saving: yearlySaving,
      status,
      last_checked_at: now,
      last_price_change_at:
        lastPriceChangeAt,
      last_offer_detected_at:
        betterOffer
          ? now
          : existingContract.last_offer_detected_at,
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
  previousSavedAmount: number;
  savedAmount: number;
  targetAmount: number;
  previousProgress: number;
  progress: number;
  progressGain: number;
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

const historyEntry = {
  user_id: user.id,
  contract_id: contractId,
  category: existingContract.category,

  old_provider: existingContract.provider,
  old_offer: existingContract.current_offer,
  old_monthly_price: existingContract.monthly_price ?? 0,

  new_provider: input.provider.trim(),
  new_offer: input.offer.trim() || null,
  new_monthly_price: monthlyPrice,

  yearly_saving: yearlySaving,
};

  if (
    existingContract.status ===
    "Économie validée"
  ) {
    throw new Error(
      "Cette économie a déjà été validée."
    );
  }

  const settings =
    await getPiloLifeSettings(
      user.id
    );

  let project:
    | Awaited<
        ReturnType<
          typeof addMissionSavingToPrimaryProject
        >
      >
    | null = null;

  if (
    settings.investment_mode ===
    "project"
  ) {
    project =
      await addMissionSavingToPrimaryProject(
        user.id,
        yearlySaving
      );

    if (!project) {
      await creditPiloLifeWallet({
        userId: user.id,
        amount: yearlySaving,
        source: "monitoring",
        sourceId: contractId,
        description:
          "Économie Monitoring ajoutée à la cagnotte faute de projet principal.",
      });
    }
  }

  if (
    settings.investment_mode ===
    "wallet"
  ) {
    await creditPiloLifeWallet({
      userId: user.id,
      amount: yearlySaving,
      source: "monitoring",
      sourceId: contractId,
      description:
        "Économie Monitoring conservée dans la cagnotte.",
    });
  }

  if (
    settings.investment_mode ===
    "auto"
  ) {
    project =
      await addMissionSavingToPrimaryProject(
        user.id,
        yearlySaving
      );

    if (!project) {
      await creditPiloLifeWallet({
        userId: user.id,
        amount: yearlySaving,
        source: "monitoring",
        sourceId: contractId,
        description:
          "Économie Monitoring placée automatiquement dans la cagnotte par Pilo.",
      });
    }
  }

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

const { error: historyError } =
  await supabase
    .from("monitoring_offer_history")
    .insert(historyEntry);

if (historyError) {
  console.error(
    "Erreur historique Monitoring :",
    historyError
  );
}

  if (updateError) {
    throw updateError;
  }

 return {
  contract:
    updatedContract as MonitoringContract,

  projectTitle:
    project?.project.title ?? null,

  savingAdded: yearlySaving,

  previousSavedAmount:
    project?.previousSavedAmount ?? 0,

  savedAmount:
    project?.savedAmount ?? 0,

  targetAmount:
    project?.targetAmount ?? 0,

  previousProgress:
    project?.previousProgress ?? 0,

  progress:
    project?.progress ?? 0,

  progressGain:
    project?.progressGain ?? 0,
  };
}
export async function checkMonitoringContracts(): Promise<void> {
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
      update.status = "Hausse détectée";
      update.last_price_change_at = now;
    } else if (
      currentPrice < previousPrice
    ) {
      update.status = "Baisse détectée";
      update.last_price_change_at = now;
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
export type MonitoringHistory = {
  id: string;
  category: string;
  old_provider: string | null;
  old_offer: string | null;
  old_monthly_price: number;
  new_provider: string;
  new_offer: string | null;
  new_monthly_price: number;
  yearly_saving: number;
  changed_at: string;
};

export async function getMonitoringHistory(): Promise<
  MonitoringHistory[]
> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return [];
  }

  const { data, error } = await supabase
    .from("monitoring_offer_history")
    .select("*")
    .eq("user_id", session.user.id)
    .order("changed_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as MonitoringHistory[];
}