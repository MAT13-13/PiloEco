import {
  getMonitoringAlerts,
  type MonitoringAlert,
} from "../monitoring/services/monitoring.service";

import {
  getPiloLifeProjects,
  type PiloLifeProject,
} from "../pilolife/services/pilolife.service";

export type PiloCopilotRecommendation = {
  title: string;
  category: string;
  saving: number;
  durationMinutes: number;
  priority: number;
  projectTitle: string | null;
  monthsSaved: number;
  href: string;
  description: string;
};

const durationByCategory: Record<
  string,
  number
> = {
  telephone: 5,
  internet: 10,
  electricite: 10,
  habitation: 12,
  auto: 10,
  animaux: 8,
  banque: 10,
  streaming: 5,
};

function getDurationMinutes(
  alert: MonitoringAlert
) {
  return (
    durationByCategory[
      alert.category
    ] ?? 10
  );
}

function getPriority(
  saving: number,
  durationMinutes: number
) {
  const efficiency =
    saving /
    Math.max(durationMinutes, 1);

  if (
    saving >= 300 ||
    efficiency >= 40
  ) {
    return 5;
  }

  if (
    saving >= 200 ||
    efficiency >= 25
  ) {
    return 4;
  }

  if (
    saving >= 100 ||
    efficiency >= 12
  ) {
    return 3;
  }

  if (saving > 0) {
    return 2;
  }

  return 1;
}

function calculateMonthsSaved(
  project: PiloLifeProject | null,
  yearlySaving: number
) {
  if (!project) {
    return 0;
  }

  const targetAmount = Math.max(
    0,
    Number(project.target_amount) || 0
  );

  const savedAmount = Math.max(
    0,
    Number(project.saved_amount) || 0
  );

  const monthlySaved = Math.max(
    0,
    Number(project.monthly_saved) || 0
  );

  const remainingAmount = Math.max(
    targetAmount - savedAmount,
    0
  );

  if (
    remainingAmount <= 0 ||
    yearlySaving <= 0
  ) {
    return 0;
  }

  const monthlySavingFromAction =
    yearlySaving / 12;

  const optimizedMonthlySaving =
    monthlySaved +
    monthlySavingFromAction;

  if (optimizedMonthlySaving <= 0) {
    return 0;
  }

  const optimizedMonths = Math.ceil(
    remainingAmount /
      optimizedMonthlySaving
  );

  if (monthlySaved <= 0) {
    return 0;
  }

  const currentMonths = Math.ceil(
    remainingAmount / monthlySaved
  );

  return Math.max(
    0,
    currentMonths -
      optimizedMonths
  );
}

function getActionTitle(
  alert: MonitoringAlert
) {
  const provider =
    alert.detectedProvider?.trim();

  if (provider) {
    return `${alert.title} avec ${provider}`;
  }

  return alert.title;
}

function buildDescription(
  saving: number,
  project: PiloLifeProject | null,
  monthsSaved: number
) {
  const savingLabel =
    Math.round(saving).toLocaleString(
      "fr-FR"
    );

  if (
    project &&
    monthsSaved > 0
  ) {
    return `C’est actuellement l’action la plus utile. Elle peut te faire économiser ${savingLabel} € par an et gagner environ ${monthsSaved} mois sur ton projet « ${project.title} ».`;
  }

  if (project) {
    return `C’est actuellement l’action qui peut le plus faire avancer ton projet « ${project.title} », avec ${savingLabel} € d’économie par an.`;
  }

  return `C’est actuellement l’action qui peut te rapporter le plus, avec ${savingLabel} € d’économie par an.`;
}

function getRecommendationScore(
  alert: MonitoringAlert
) {
  const saving = Math.max(
    0,
    Number(alert.yearlySaving) || 0
  );

  const durationMinutes =
    getDurationMinutes(alert);

  const urgencyBonus =
    alert.status === "red"
      ? 200
      : alert.status === "yellow"
        ? 100
        : 0;

  const efficiencyScore =
    saving /
    Math.max(durationMinutes, 1);

  return (
    saving +
    urgencyBonus +
    efficiencyScore * 10
  );
}

export async function getPiloCopilotRecommendation(
  userId: string
): Promise<PiloCopilotRecommendation | null> {
  const [
    monitoringAlerts,
    projects,
  ] = await Promise.all([
    getMonitoringAlerts(),
    getPiloLifeProjects(userId),
  ]);

  const primaryProject =
    projects.find(
      (project) =>
        project.is_primary
    ) ??
    projects[0] ??
    null;

  const availableAlerts =
    monitoringAlerts
      .filter((alert) => {
        const saving = Number(
          alert.yearlySaving || 0
        );

        return saving > 0;
      })
      .sort(
        (
          firstAlert,
          secondAlert
        ) =>
          getRecommendationScore(
            secondAlert
          ) -
          getRecommendationScore(
            firstAlert
          )
      );

 console.log("Monitoring Alerts :", monitoringAlerts);
console.log("Available Alerts :", availableAlerts);

const bestAlert = availableAlerts[0];

console.log("Best Alert :", bestAlert);

if (!bestAlert) {
  return null;
}

  const saving = Math.max(
    0,
    Number(
      bestAlert.yearlySaving
    ) || 0
  );

  const durationMinutes =
    getDurationMinutes(bestAlert);

  const priority = getPriority(
    saving,
    durationMinutes
  );

  const monthsSaved =
    calculateMonthsSaved(
      primaryProject,
      saving
    );

  return {
    title:
      getActionTitle(bestAlert),

    category:
      bestAlert.title,

    saving,

    durationMinutes,

    priority,

    projectTitle:
      primaryProject?.title ?? null,

    monthsSaved,

    href:
      bestAlert.href ??
      "/recommendations",

    description:
      buildDescription(
        saving,
        primaryProject,
        monthsSaved
      ),
  };
}