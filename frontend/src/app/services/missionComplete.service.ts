import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { addMissionSavingToPrimaryProject } from "../pilolife/services/pilolife.service";

type CompleteMissionInput = {
  user: User;
  missionId: string;
  title: string;
  saving: number;
};

type CompleteMissionResult = {
  success: boolean;
  alreadyCompleted?: boolean;
  premium?: boolean;
  message: string;
};

export async function completeMission({
  user,
  missionId,
  title,
  saving,
}: CompleteMissionInput): Promise<CompleteMissionResult> {
  const { data: existingMission, error: existingMissionError } = await supabase
    .from("missions")
    .select("mission_id")
    .eq("user_id", user.id)
    .eq("mission_id", missionId)
    .eq("status", "Terminée")
    .maybeSingle();

  if (existingMissionError) {
    console.error(
      "Erreur lors de la vérification de la mission :",
      existingMissionError
    );

    return {
      success: false,
      message: "Erreur lors de la vérification de la mission.",
    };
  }

  if (existingMission) {
    return {
      success: false,
      alreadyCompleted: true,
      message: "✅ Cette mission a déjà été validée.",
    };
  }

  const { error: missionError } = await supabase.from("missions").upsert({
    user_id: user.id,
    mission_id: missionId,
    title,
    status: "Terminée",
    saving,
    completed_at: new Date().toISOString(),
  });

  if (missionError) {
    console.error(
      "Erreur lors de la sauvegarde de la mission :",
      missionError
    );

    return {
      success: false,
      message: "Erreur lors de la sauvegarde de la mission.",
    };
  }

  const { data: profile, error: profileFetchError } = await supabase
    .from("profils")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileFetchError) {
    console.error(
      "Erreur lors du chargement du profil :",
      profileFetchError
    );

    return {
      success: false,
      message: "Mission terminée, mais impossible de charger ton profil.",
    };
  }

  const currentXp = Number(profile?.xp || 0);
  const newXp = currentXp + 100;

  let newLevel = 1;

  if (newXp >= 1200) newLevel = 5;
  else if (newXp >= 700) newLevel = 4;
  else if (newXp >= 300) newLevel = 3;
  else if (newXp >= 100) newLevel = 2;

  const { error: profileError } = await supabase.from("profils").upsert({
    id: user.id,
    email: user.email,
    premium: Boolean(profile?.premium),
    xp: newXp,
    level: newLevel,
    completed_missions: Number(profile?.completed_missions || 0) + 1,
    total_savings: Number(profile?.total_savings || 0) + saving,
  });

  if (profileError) {
    console.error(
      "Erreur lors de la mise à jour du profil :",
      profileError
    );

    return {
      success: false,
      message: "Mission terminée, mais erreur lors de la mise à jour du profil.",
    };
  }

  const isPremium = Boolean(profile?.premium);

  if (isPremium) {
    try {
      await addMissionSavingToPrimaryProject(user.id, saving);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de PiloLife :", error);

      return {
        success: false,
        premium: true,
        message:
          "Mission enregistrée, mais impossible de mettre à jour PiloLife.",
      };
    }

    return {
      success: true,
      premium: true,
      message: `🎉 Bravo ! Mission terminée.
+100 XP pour Pilo
Tu économises ${saving} €/an !
🌿 Ton projet PiloLife vient également de progresser.`,
    };
  }

  return {
    success: true,
    premium: false,
    message: `🎉 Bravo ! Mission terminée.
+100 XP pour Pilo
Tu économises ${saving} €/an !

✨ Passe à Pilo Premium pour transformer automatiquement tes économies en projets de vie avec PiloLife.`,
  };
}