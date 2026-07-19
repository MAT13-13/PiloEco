import { supabase } from "../../lib/supabase";

export type PiloLifeWallet = {
  user_id: string;
  balance: number;
  total_credited: number;
  total_allocated: number;
  created_at: string;
  updated_at: string;
};

export type PiloLifeWalletTransaction = {
  id: string;
  user_id: string;
  project_id: string | null;
  type: "credit" | "allocation";
  amount: number;
  source: string | null;
  source_id: string | null;
  description: string | null;
  created_at: string;
};

export type CreditPiloLifeWalletInput = {
  userId: string;
  amount: number;
  source: "mission" | "monitoring" | "manual" | "other";
  sourceId?: string | null;
  description?: string | null;
};

export type AllocateWalletToProjectInput = {
  userId: string;
  projectId: string;
  amount: number;
  description?: string | null;
};

export type AllocateWalletToPurchasingPowerInput = {
  userId: string;
  amount: number;
  description?: string | null;
};

function normalizeAmount(value: number, label: string) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`${label} doit être supérieur à zéro.`);
  }

  return Math.round(amount * 100) / 100;
}

async function ensureWallet(
  userId: string
): Promise<PiloLifeWallet> {
  const { data: existingWallet, error } = await supabase
    .from("pilolife_wallets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  if (existingWallet) {
    return existingWallet as PiloLifeWallet;
  }

  const now = new Date().toISOString();

  const { data, error: createError } = await supabase
    .from("pilolife_wallets")
    .insert({
      user_id: userId,
      balance: 0,
      total_credited: 0,
      total_allocated: 0,
      updated_at: now,
    })
    .select("*")
    .single();

  if (createError) {
    const { data: concurrentWallet, error: readError } =
      await supabase
        .from("pilolife_wallets")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (readError) throw createError;

    return concurrentWallet as PiloLifeWallet;
  }

  return data as PiloLifeWallet;
}

export async function getPiloLifeWallet(
  userId: string
): Promise<PiloLifeWallet> {
  if (!userId) {
    throw new Error("Utilisateur introuvable.");
  }

  return ensureWallet(userId);
}

export async function getPiloLifeWalletTransactions(
  userId: string,
  limit = 50
): Promise<PiloLifeWalletTransaction[]> {
  const safeLimit = Math.min(Math.max(1, limit), 200);

  const { data, error } = await supabase
    .from("pilolife_wallet_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (error) throw error;

  return (data ?? []) as PiloLifeWalletTransaction[];
}

export async function creditPiloLifeWallet(
  input: CreditPiloLifeWalletInput
): Promise<PiloLifeWallet> {
  const amount = normalizeAmount(
    input.amount,
    "Le montant de l’économie"
  );

  const sourceId = input.sourceId?.trim() || null;

  if (sourceId) {
    const { data: existingTransaction, error: existingError } =
      await supabase
        .from("pilolife_wallet_transactions")
        .select("id")
        .eq("user_id", input.userId)
        .eq("type", "credit")
        .eq("source", input.source)
        .eq("source_id", sourceId)
        .maybeSingle();

    if (existingError) throw existingError;

    if (existingTransaction) {
      return getPiloLifeWallet(input.userId);
    }
  }

  const wallet = await ensureWallet(input.userId);
  const now = new Date().toISOString();

  const { data: updatedWallet, error } = await supabase
    .from("pilolife_wallets")
    .update({
      balance: Number(wallet.balance || 0) + amount,
      total_credited:
        Number(wallet.total_credited || 0) + amount,
      updated_at: now,
    })
    .eq("user_id", input.userId)
    .select("*")
    .single();

  if (error) throw error;

  const { error: transactionError } = await supabase
    .from("pilolife_wallet_transactions")
    .insert({
      user_id: input.userId,
      project_id: null,
      type: "credit",
      amount,
      source: input.source,
      source_id: sourceId,
      description:
        input.description?.trim() ||
        "Économie ajoutée à la cagnotte",
    });

  if (transactionError) {
    await supabase
      .from("pilolife_wallets")
      .update({
        balance: wallet.balance,
        total_credited: wallet.total_credited,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", input.userId);

    throw transactionError;
  }

  return updatedWallet as PiloLifeWallet;
}

export async function allocateWalletToProject(
  input: AllocateWalletToProjectInput
): Promise<{
  wallet: PiloLifeWallet;
  projectSavedAmount: number;
}> {
  const amount = normalizeAmount(
    input.amount,
    "Le montant à investir"
  );

  const wallet = await ensureWallet(input.userId);
  const currentBalance = Number(wallet.balance || 0);

  if (amount > currentBalance) {
    throw new Error("Le solde de la cagnotte est insuffisant.");
  }

  const { data: project, error: projectError } = await supabase
    .from("pilolife_projects")
    .select("*")
    .eq("id", input.projectId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (projectError) throw projectError;

  if (!project) {
    throw new Error("Le projet sélectionné n’existe plus.");
  }

  const currentSavedAmount = Number(project.saved_amount || 0);
  const currentMonthlySaved = Number(project.monthly_saved || 0);

  const newSavedAmount = currentSavedAmount + amount;
  const newMonthlySaved = currentMonthlySaved + amount / 12;
  const now = new Date().toISOString();

  const { error: projectUpdateError } = await supabase
    .from("pilolife_projects")
    .update({
      saved_amount: newSavedAmount,
      monthly_saved: newMonthlySaved,
      updated_at: now,
    })
    .eq("id", input.projectId)
    .eq("user_id", input.userId);

  if (projectUpdateError) throw projectUpdateError;

  const { data: updatedWallet, error: walletUpdateError } =
    await supabase
      .from("pilolife_wallets")
      .update({
        balance: currentBalance - amount,
        total_allocated:
          Number(wallet.total_allocated || 0) + amount,
        updated_at: now,
      })
      .eq("user_id", input.userId)
      .select("*")
      .single();

  if (walletUpdateError) {
    await supabase
      .from("pilolife_projects")
      .update({
        saved_amount: currentSavedAmount,
        monthly_saved: currentMonthlySaved,
        updated_at: new Date().toISOString(),
      })
      .eq("id", input.projectId)
      .eq("user_id", input.userId);

    throw walletUpdateError;
  }

  const { error: transactionError } = await supabase
    .from("pilolife_wallet_transactions")
    .insert({
      user_id: input.userId,
      project_id: input.projectId,
      type: "allocation",
      amount,
      source: "project",
      source_id: input.projectId,
      description:
        input.description?.trim() ||
        `Économie investie dans ${project.title}`,
    });

  if (transactionError) {
    await Promise.all([
      supabase
        .from("pilolife_wallets")
        .update({
          balance: wallet.balance,
          total_allocated: wallet.total_allocated,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", input.userId),

      supabase
        .from("pilolife_projects")
        .update({
          saved_amount: currentSavedAmount,
          monthly_saved: currentMonthlySaved,
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.projectId)
        .eq("user_id", input.userId),
    ]);

    throw transactionError;
  }

  return {
    wallet: updatedWallet as PiloLifeWallet,
    projectSavedAmount: newSavedAmount,
  };
}

export async function allocateWalletToPurchasingPower(
  input: AllocateWalletToPurchasingPowerInput
): Promise<PiloLifeWallet> {
  const amount = normalizeAmount(
    input.amount,
    "Le montant à utiliser"
  );

  const wallet = await ensureWallet(input.userId);
  const currentBalance = Number(wallet.balance || 0);

  if (amount > currentBalance) {
    throw new Error("Le solde de la cagnotte est insuffisant.");
  }

  const now = new Date().toISOString();

  const { data: updatedWallet, error: walletError } =
    await supabase
      .from("pilolife_wallets")
      .update({
        balance: currentBalance - amount,
        total_allocated:
          Number(wallet.total_allocated || 0) + amount,
        updated_at: now,
      })
      .eq("user_id", input.userId)
      .select("*")
      .single();

  if (walletError) throw walletError;

  const { error: transactionError } = await supabase
    .from("pilolife_wallet_transactions")
    .insert({
      user_id: input.userId,
      project_id: null,
      type: "allocation",
      amount,
      source: "purchasing_power",
      source_id: null,
      description:
        input.description?.trim() ||
        "Économie conservée en pouvoir d’achat",
    });

  if (transactionError) {
    await supabase
      .from("pilolife_wallets")
      .update({
        balance: wallet.balance,
        total_allocated: wallet.total_allocated,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", input.userId);

    throw transactionError;
  }

  return updatedWallet as PiloLifeWallet;
}