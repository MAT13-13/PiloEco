type Mission = {
  title: string;
  saving: number;
};

export function generatePiloMessage(missions: Mission[]) {
  if (missions.length === 0) {
    return {
      title: "🎉 Tout est optimisé !",
      message:
        "Je n'ai trouvé aucune économie importante pour le moment. Continue comme ça !",
    };
  }

  const meilleureMission = [...missions].sort(
    (a, b) => b.saving - a.saving
  )[0];

  const total = missions.reduce((sum, mission) => sum + mission.saving, 0);

  return {
    title: "🐦 Pilo a une bonne nouvelle",
    message: `J'ai trouvé environ ${total} € d'économies potentielles par an. Je te conseille de commencer par "${meilleureMission.title}" qui pourrait te faire économiser environ ${meilleureMission.saving} €/an.`,
  };
}