import { getPiloBrain } from "../ai/pilo-brain.service";
import { getPiloGreeting } from "./pilo-greeting.service";

type PiloCoreInput = {
  name?: string;
  scoreProgression: number;
  totalEconomiesAnnuelles: number;
  missionsTerminees: number;
  totalMissions: number;
};

export function getPiloCore(data: PiloCoreInput) {
  const brain = getPiloBrain(data);
  const greeting = getPiloGreeting(data.name);

  return {
    greeting,
    ...brain,
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
  };
}