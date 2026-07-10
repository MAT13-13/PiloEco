export type MissionStatus = "Nouvelle" | "En cours" | "Terminée";

export type Mission = {
  mission_id: string;
  title: string;
  saving: number;
  status: MissionStatus;
};

type AnalyseInput = {
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
};

export function generateMissions(data: AnalyseInput): Mission[] {
  const missions: Mission[] = [];

  if (data.telephone > 20) {
    missions.push({
      mission_id: "mobile",
      title: "Comparer ton forfait mobile",
      saving: Math.round((data.telephone - 15) * 12),
      status: "Nouvelle",
    });
  }

  if (data.internet > 30) {
    missions.push({
      mission_id: "internet",
      title: "Vérifier ton offre Internet",
      saving: Math.round((data.internet - 25) * 12),
      status: "Nouvelle",
    });
  }

  if (data.assurance > 40) {
    missions.push({
      mission_id: "habitation",
      title: "Comparer ton assurance habitation",
      saving: Math.round((data.assurance - 25) * 12),
      status: "Nouvelle",
    });
  }

  if (data.electricite > 80) {
    missions.push({
      mission_id: "electricite",
      title: "Optimiser ton contrat d'électricité",
      saving: Math.round((data.electricite - 70) * 12),
      status: "Nouvelle",
    });
  }

  return missions;
}