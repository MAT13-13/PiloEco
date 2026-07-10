type DecisionInput = {
  economie: number;
  missionsTerminees: number;
  totalMissions: number;
};

export function getPiloDecision({
  economie,
  missionsTerminees,
  totalMissions,
}: DecisionInput) {
  if (missionsTerminees === 0) {
    return {
      type: "firstMission",
      priority: 100,
    };
  }

  if (missionsTerminees < totalMissions) {
    return {
      type: "continue",
      priority: 80,
    };
  }

  if (economie > 500) {
    return {
      type: "congratulations",
      priority: 60,
    };
  }

  return {
    type: "watch",
    priority: 20,
  };
}