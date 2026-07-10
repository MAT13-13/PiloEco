import { supabase } from "../../lib/supabase";

type MissionInput = {
  userId: string;
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

type PiloMission = {
  user_id: string;
  mission_id: string;
  title: string;
  status: "Nouvelle";
  saving: number;
  emoji: string;
  difficulty: "Facile" | "Moyenne" | "Difficile";
  estimated_time: string;
  priority: number;
  reason: string;
};

export async function savePiloMissions({
  userId,
  telephone,
  internet,
  assurance,
  electricite,
}: MissionInput) {
  const missions: PiloMission[] = [];

  if (telephone > 20) {
    missions.push({
      user_id: userId,
      mission_id: "mobile",
      title: "Comparer ton forfait mobile",
      status: "Nouvelle",
      saving: Math.round((telephone - 15) * 12),
      emoji: "📱",
      difficulty: "Facile",
      estimated_time: "5 minutes",
      priority: 5,
      reason: "Ton forfait mobile semble plus élevé que nécessaire.",
    });
  }

  if (internet > 30) {
    missions.push({
      user_id: userId,
      mission_id: "internet",
      title: "Vérifier ton offre Internet",
      status: "Nouvelle",
      saving: Math.round((internet - 25) * 12),
      emoji: "🌐",
      difficulty: "Facile",
      estimated_time: "7 minutes",
      priority: 4,
      reason: "Ton abonnement Internet peut probablement être optimisé.",
    });
  }

  if (assurance > 50) {
    missions.push({
      user_id: userId,
      mission_id: "assurance",
      title: "Comparer ton assurance",
      status: "Nouvelle",
      saving: Math.round((assurance - 40) * 12),
      emoji: "🛡️",
      difficulty: "Moyenne",
      estimated_time: "10 minutes",
      priority: 4,
      reason: "Ton assurance semble au-dessus du tarif cible.",
    });
  }

  if (electricite > 90) {
    missions.push({
      user_id: userId,
      mission_id: "electricite",
      title: "Optimiser ton contrat d'électricité",
      status: "Nouvelle",
      saving: Math.round((electricite - 75) * 12),
      emoji: "⚡",
      difficulty: "Moyenne",
      estimated_time: "10 minutes",
      priority: 3,
      reason: "Ta facture d'électricité semble optimisable.",
    });
  }

  const { error: deleteError } = await supabase
    .from("missions")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    console.error("Erreur suppression missions :", deleteError.message);
    return;
  }

  if (missions.length === 0) return;

  const { error } = await supabase.from("missions").insert(missions);

  if (error) {
    console.error("Erreur création missions :", error.message);
  }
}