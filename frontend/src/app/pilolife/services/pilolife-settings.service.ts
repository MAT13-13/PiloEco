import { supabase } from "../../lib/supabase";

export type PiloLifeInvestmentMode =
  | "project"
  | "wallet"
  | "auto";

export type PiloLifeSettings = {
  user_id: string;
  investment_mode: PiloLifeInvestmentMode;
  created_at: string;
  updated_at: string;
};

function isInvestmentMode(
  value: string
): value is PiloLifeInvestmentMode {
  return (
    value === "project" ||
    value === "wallet" ||
    value === "auto"
  );
}

export async function getPiloLifeSettings(
  userId: string
): Promise<PiloLifeSettings> {
  const { data, error } = await supabase
    .from("pilolife_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data) {
    return data as PiloLifeSettings;
  }

  const now = new Date().toISOString();

  const {
    data: createdSettings,
    error: createError,
  } = await supabase
    .from("pilolife_settings")
    .insert({
      user_id: userId,
      investment_mode: "project",
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (createError) {
    throw createError;
  }

  return createdSettings as PiloLifeSettings;
}

export async function updateInvestmentMode(
  userId: string,
  mode: PiloLifeInvestmentMode
): Promise<PiloLifeSettings> {
  if (!isInvestmentMode(mode)) {
    throw new Error(
      "Le mode d’investissement sélectionné est invalide."
    );
  }

  const { data, error } = await supabase
    .from("pilolife_settings")
    .upsert(
      {
        user_id: userId,
        investment_mode: mode,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as PiloLifeSettings;
}