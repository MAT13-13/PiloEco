import { MonitoringCard } from "../../types/monitoring";
import { PiloAlert } from "./types";

export function buildMonitoringCards(
  alerts: PiloAlert[]
): MonitoringCard[] {
  return alerts.map((alert) => ({
    id: alert.id,

    category: alert.category as MonitoringCard["category"],

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

    currentOffer: alert.currentOffer,

    currentPrice: alert.currentPrice,

    detectedOffer: alert.action,

    detectedPrice: undefined,

    yearlySaving: alert.saving,

    alert: alert.description,

    button: alert.action,

    color:
      alert.level === "red"
        ? "red"
        : alert.level === "yellow"
        ? "orange"
        : "green",

    status: alert.level,

    updatedAt: "À l'instant",
  }));
}