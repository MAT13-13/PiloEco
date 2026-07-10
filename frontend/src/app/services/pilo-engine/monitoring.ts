import { PiloAlert } from "./types";

export type MonitoringItem = {
  category: string;
  status: "green" | "yellow" | "red";
  title: string;
  saving: number;
};

export function buildMonitoring(
  alerts: PiloAlert[]
): MonitoringItem[] {
  return alerts.map((alert) => ({
    category: alert.category,
    status: alert.level,
    title: alert.title,
    saving: alert.saving,
  }));
}