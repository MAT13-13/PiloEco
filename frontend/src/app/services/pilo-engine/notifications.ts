import { Echeance } from "./echeances";
import { PiloAlert } from "./types";

export type PiloNotification = {
  id: string;
  title: string;
  message: string;
  priority: "green" | "yellow" | "red";
};

export function buildNotifications(
  alerts: PiloAlert[],
  echeances: Echeance[]
): PiloNotification[] {
  const notifications: PiloNotification[] = [];

  alerts.forEach((alert) => {
    notifications.push({
      id: alert.id,
      title: alert.title,
      message: alert.description,
      priority: alert.level,
    });
  });

  echeances.forEach((echeance) => {
    notifications.push({
      id: echeance.id,
      title: echeance.title,
      message: `Échéance dans ${echeance.dueInDays} jours.`,
      priority: echeance.priority,
    });
  });

  return notifications.sort((a, b) => {
    const order = {
      red: 0,
      yellow: 1,
      green: 2,
    };

    return order[a.priority] - order[b.priority];
  });
}