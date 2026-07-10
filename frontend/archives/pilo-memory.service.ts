type Mission = {
  status: "Nouvelle" | "En cours" | "Terminée";
  saving: number;
};

export type PiloMemory = {
  economiesRealisees: number;
  potentielRestant: number;
  missionsTerminees: number;
  totalMissions: number;
};

export function getPiloMemory(missions: Mission[]): PiloMemory {
  const terminees = missions.filter(
    (mission) => mission.status === "Terminée"
  );

  const restantes = missions.filter(
    (mission) => mission.status !== "Terminée"
  );

  return {
    economiesRealisees: terminees.reduce(
      (total, mission) => total + mission.saving,
      0
    ),

    potentielRestant: restantes.reduce(
      (total, mission) => total + mission.saving,
      0
    ),

    missionsTerminees: terminees.length,

    totalMissions: missions.length,
  };
}