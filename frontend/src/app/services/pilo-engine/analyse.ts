import { Depense } from "../../services/finance/depenses.service";
import { generateAlerts } from "./alerts";
import { buildMonitoringCards } from "./monitoring-builder";
import { calculateScore } from "./score";
import { buildJournal } from "./journal";
import { buildEcheances } from "./echeances";
import { buildNotifications } from "./notifications";
import { PiloMonitoring } from "./types";

export function analysePiloEngine(depenses: Depense[]): PiloMonitoring {
  const alerts = generateAlerts(depenses);

  const yearlySavings = alerts.reduce(
    (total, alert) => total + alert.saving,
    0
  );

  const monitoring = buildMonitoringCards(alerts);
  const journal = buildJournal(alerts);
  const echeances = buildEcheances();
  const notifications = buildNotifications(alerts, echeances);

  return {
    score: calculateScore(alerts),
    yearlySavings,
    alerts,
    monitoring,
    journal,
    missions: [],
    insights: [],
    echeances,
    notifications,
  };
}