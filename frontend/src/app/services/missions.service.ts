import type { Depense } from "./depenses.service";

export type MissionStatus = "new" | "progress" | "done";

export type Mission = {
  id: string;
  title: string;
  description: string;
  reward: string;
  status: MissionStatus;
};

export function generateMissions(depenses: Depense[]): Mission[] {
  const missions: Mission[] = [];

  const restaurants = depenses.filter(
    (d) => d.category === "Restaurant"
  );

  if (restaurants.length > 0) {
    missions.push({
      id: "restaurants",
      title: "Limiter les restaurants",
      description:
        "Essaie de préparer deux repas cette semaine.",
      reward: "+3 points",
      status: "new",
    });
  }

  const abonnements = depenses.filter(
    (d) => d.category === "Abonnement"
  );

  if (abonnements.length > 1) {
    missions.push({
      id: "abonnements",
      title: "Faire le tri",
      description:
        "Vérifie si un abonnement peut être supprimé.",
      reward: "+2 points",
      status: "new",
    });
  }

  missions.push({
    id: "assurance",
    title: "Comparer une assurance",
    description:
      "Demande un devis pour ton assurance habitation.",
    reward: "+5 points",
    status: "new",
  });

  return missions;
}