import { PiloAlert, JournalEntry } from "./types";

export function buildJournal(
  alerts: PiloAlert[]
): JournalEntry[] {
  return alerts.map((alert) => ({
    id: alert.id,
    date: "Aujourd'hui",
    icon:
      alert.category === "telephone"
        ? "📱"
        : alert.category === "internet"
        ? "🌐"
        : alert.category === "electricite"
        ? "⚡"
        : alert.category === "habitation"
        ? "🏠"
        : alert.category === "streaming"
        ? "📺"
        : "🦜",

    title: alert.title,

    message: alert.description,
  }));
}