import { PiloAlert } from "./types";

export function calculateScore(
  alerts: PiloAlert[]
): number {
  let score = 100;

  alerts.forEach((alert) => {
    switch (alert.level) {
      case "red":
        score -= 12;
        break;

      case "yellow":
        score -= 6;
        break;

      case "green":
        score -= 0;
        break;
    }
  });

  return Math.max(score, 0);
}