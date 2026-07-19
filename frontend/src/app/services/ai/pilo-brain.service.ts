import {
  getPiloDecision,
} from "./pilo-decision.service";

import {
  generatePiloSpeech,
} from "./pilo-speech.service";

/* ======================================================
   CERVEAU HISTORIQUE DU DASHBOARD
====================================================== */

type PiloBrainInput = {
  scoreProgression: number;
  totalEconomiesAnnuelles: number;
  missionsTerminees: number;
  totalMissions: number;
};

type PiloDiagnostic = {
  niveau:
    | "excellent"
    | "bon"
    | "moyen"
    | "urgent";

  couleur: string;
  priorite: string;
};

export function getPiloBrain({
  scoreProgression,
  totalEconomiesAnnuelles,
  missionsTerminees,
  totalMissions,
}: PiloBrainInput) {
  let mood = {
    emoji: "😊",
    title: "Tout va bien",
    message:
      "Je continue de surveiller tes économies.",
  };

  if (scoreProgression < 30) {
    mood = {
      emoji: "🔍",
      title: "Je cherche",
      message:
        "J'ai trouvé plusieurs pistes d'économies.",
    };
  } else if (scoreProgression < 60) {
    mood = {
      emoji: "💡",
      title: "Ça avance",
      message:
        "Tu commences déjà à économiser.",
    };
  } else if (scoreProgression < 90) {
    mood = {
      emoji: "🚀",
      title: "Excellent travail",
      message:
        "Tu optimises déjà très bien ton budget.",
    };
  } else {
    mood = {
      emoji: "🏆",
      title: "Champion des économies",
      message:
        "Franchement, je suis fier de toi.",
    };
  }

  const memory = {
    missionsTerminees,
    economiesRealisees:
      totalEconomiesAnnuelles,
    totalMissions,
  };

  let message = "";

  if (totalEconomiesAnnuelles === 0) {
    message =
      "Je n'ai pas encore trouvé d'économie. Continue à renseigner tes dépenses, je continue mes recherches.";
  } else if (missionsTerminees === 0) {
    message =
      `J'ai trouvé environ ${totalEconomiesAnnuelles} € d'économies par an. Je commencerais par la mission qui rapporte le plus.`;
  } else if (
    missionsTerminees <
    totalMissions / 2
  ) {
    message =
      `Bravo ! Tu avances bien. Tu as déjà sécurisé ${totalEconomiesAnnuelles} € par an mais il reste encore plusieurs économies à récupérer.`;
  } else if (
    missionsTerminees <
    totalMissions
  ) {
    message =
      "On approche du but ! Encore quelques missions et ton budget sera vraiment optimisé.";
  } else {
    message =
      "Mission accomplie ! Toutes tes missions sont terminées. Je continuerai de surveiller le marché pour trouver de nouvelles économies.";
  }

  let diagnostic: PiloDiagnostic;

  if (totalEconomiesAnnuelles >= 500) {
    diagnostic = {
      niveau: "urgent",
      couleur: "#ef4444",
      priorite:
        "Tu peux économiser beaucoup d'argent rapidement.",
    };
  } else if (
    totalEconomiesAnnuelles >= 250
  ) {
    diagnostic = {
      niveau: "moyen",
      couleur: "#f59e0b",
      priorite:
        "Quelques optimisations peuvent vraiment faire la différence.",
    };
  } else if (
    totalEconomiesAnnuelles >= 100
  ) {
    diagnostic = {
      niveau: "bon",
      couleur: "#22c55e",
      priorite:
        "Ton budget est déjà bien optimisé.",
    };
  } else {
    diagnostic = {
      niveau: "excellent",
      couleur: "#3b82f6",
      priorite:
        "Continue comme ça, tu gères très bien tes dépenses.",
    };
  }

  const decision = getPiloDecision({
    economie:
      totalEconomiesAnnuelles,
    missionsTerminees,
    totalMissions,
  });

  const speech = generatePiloSpeech({
    humeur: mood.emoji,
    diagnostic: diagnostic.niveau,
    economie:
      totalEconomiesAnnuelles,
    missions: missionsTerminees,
  });

  return {
    mood,
    message: speech || message,
    memory,
    diagnostic,
    decision,
  };
}

/* ======================================================
   CERVEAU DE L’ASSISTANT PILO
====================================================== */

export type AssistantBrainProfile = {
  premium?: boolean;
  xp?: number;
  level?: number;
  completed_missions?: number;
  total_savings?: number;
};

export type AssistantBrainMission = {
  mission_id?: string;
  title?: string;
  saving?: number;
  status?: string;
};

export type AssistantBrainContract = {
  id?: string;
  category?: string;
  provider?: string | null;
  monthly_price?: number | null;
  current_offer?: string | null;
  better_offer?: string | null;
  yearly_saving?: number | null;
  status?: string | null;
  end_date?: string | null;
};

export type AssistantBrainProject = {
  id?: string;
  title?: string;
  category?: string;
  target_amount?: number;
  saved_amount?: number;
  monthly_saved?: number;
  target_date?: string | null;
  is_primary?: boolean;
};

export type AssistantBrainAnalysis = {
  analysisId?: string;
  category?: string;
  currentPrice?: number;
  yearlySaving?: number;
  createdAt?: string;

  recommendation?: {
    provider?: string;
    offer?: string;
    price?: number;
  };
};

export type AssistantBrainInput = {
  profile: AssistantBrainProfile | null;
  missions: AssistantBrainMission[];
  monitoring: AssistantBrainContract[];
  projects: AssistantBrainProject[];
  latestAnalysis:
    | AssistantBrainAnalysis
    | null;
  analysisHistory:
    AssistantBrainAnalysis[];
};

function safeNumber(
  value: unknown
) {
  const numberValue =
    Number(value);

  return Number.isFinite(numberValue)
    ? numberValue
    : 0;
}

function normalizeStatus(
  value?: string | null
) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function isCompletedMission(
  mission: AssistantBrainMission
) {
  const status =
    normalizeStatus(mission.status);

  return (
    status === "terminée" ||
    status === "terminee" ||
    status === "completed"
  );
}

function isActiveAlert(
  contract: AssistantBrainContract
) {
  const status =
    normalizeStatus(contract.status);

  return (
    status === "red" ||
    status === "yellow" ||
    status === "rouge" ||
    status === "orange"
  );
}

function getProjectProgress(
  project?: AssistantBrainProject
) {
  if (!project) {
    return 0;
  }

  const targetAmount =
    safeNumber(
      project.target_amount
    );

  const savedAmount =
    safeNumber(
      project.saved_amount
    );

  if (targetAmount <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (savedAmount /
          targetAmount) *
          100
      )
    )
  );
}

function getPriorityReason(
  saving: number
) {
  if (saving >= 300) {
    return "Très forte économie annuelle détectée.";
  }

  if (saving >= 150) {
    return "Économie importante avec un impact rapide sur le budget.";
  }

  if (saving > 0) {
    return "Action simple permettant de réduire les dépenses.";
  }

  return "Mission à examiner pour améliorer le budget.";
}

export function buildAssistantBrain({
  profile,
  missions,
  monitoring,
  projects,
  latestAnalysis,
  analysisHistory,
}: AssistantBrainInput) {
  const completedMissions =
    missions.filter(
      isCompletedMission
    );

  const availableMissions =
    missions.filter(
      (mission) =>
        !isCompletedMission(mission)
    );

  const sortedMissions = [
    ...availableMissions,
  ].sort(
    (firstMission, secondMission) =>
      safeNumber(
        secondMission.saving
      ) -
      safeNumber(
        firstMission.saving
      )
  );

  const priorityMission =
    sortedMissions[0] ?? null;

  const activeAlerts =
    monitoring.filter(
      isActiveAlert
    );

  const sortedAlerts = [
    ...activeAlerts,
  ].sort(
    (firstContract, secondContract) =>
      safeNumber(
        secondContract.yearly_saving
      ) -
      safeNumber(
        firstContract.yearly_saving
      )
  );

  const priorityAlert =
    sortedAlerts[0] ?? null;

  const primaryProject =
    projects.find(
      (project) =>
        project.is_primary
    ) ??
    projects[0] ??
    null;

  const projectProgress =
    getProjectProgress(
      primaryProject ?? undefined
    );

  const monitoringSaving =
    monitoring.reduce(
      (total, contract) =>
        total +
        Math.max(
          0,
          safeNumber(
            contract.yearly_saving
          )
        ),
      0
    );

  const analysisSaving =
    analysisHistory.reduce(
      (total, analysis) =>
        total +
        Math.max(
          0,
          safeNumber(
            analysis.yearlySaving
          )
        ),
      0
    );

  const missionSaving =
    availableMissions.reduce(
      (total, mission) =>
        total +
        Math.max(
          0,
          safeNumber(
            mission.saving
          )
        ),
      0
    );

  /*
   * On évite d’additionner les mêmes
   * économies si elles apparaissent dans
   * plusieurs parties de l’application.
   *
   * On conserve la source la plus élevée
   * comme estimation globale.
   */
  const detectedYearlySaving =
    Math.max(
      monitoringSaving,
      analysisSaving,
      missionSaving
    );

  const validatedYearlySaving =
    safeNumber(
      profile?.total_savings
    );

  const remainingProjectAmount =
    primaryProject
      ? Math.max(
          0,
          safeNumber(
            primaryProject.target_amount
          ) -
            safeNumber(
              primaryProject.saved_amount
            )
        )
      : 0;

  const priorities = [];

  if (priorityMission) {
    priorities.push({
      type: "mission",
      title:
        priorityMission.title ??
        "Mission prioritaire",

      category:
        priorityMission.mission_id ??
        null,

      yearlySaving:
        safeNumber(
          priorityMission.saving
        ),

      reason: getPriorityReason(
        safeNumber(
          priorityMission.saving
        )
      ),

      href:
        priorityMission.mission_id
          ? `/missions/${priorityMission.mission_id}`
          : "/missions",
    });
  }

  if (priorityAlert) {
    priorities.push({
      type: "monitoring",
      title:
        priorityAlert.current_offer ??
        priorityAlert.provider ??
        priorityAlert.category ??
        "Contrat à surveiller",

      category:
        priorityAlert.category ??
        null,

      yearlySaving:
        safeNumber(
          priorityAlert.yearly_saving
        ),

      reason:
        "Une alerte active a été détectée sur ce contrat.",

      href: "/monitoring",
    });
  }

  if (
    primaryProject &&
    remainingProjectAmount > 0
  ) {
    priorities.push({
      type: "pilolife",
      title:
        primaryProject.title ??
        "Projet principal",

      category:
        primaryProject.category ??
        null,

      yearlySaving: 0,

      reason:
        `${remainingProjectAmount.toLocaleString(
          "fr-FR"
        )} € restent à atteindre.`,

      href: "/pilolife",
    });
  }

  return {
    identity: {
      assistantName: "Pilo",
      applicationName:
        "PiloEco",
      analysisEnabled: true,
    },

    user: {
      premium:
        Boolean(
          profile?.premium
        ),

      xp:
        safeNumber(
          profile?.xp
        ),

      level:
        safeNumber(
          profile?.level
        ),
    },

    savings: {
      detectedYearlySaving,
      validatedYearlySaving,

      monitoringYearlySaving:
        monitoringSaving,

      missionYearlySaving:
        missionSaving,

      analysisYearlySaving:
        analysisSaving,

      distinction: {
        detected:
          "Économies potentielles identifiées par PiloEco.",

        validated:
          "Économies réellement validées par l'utilisateur.",
      },
    },

    missions: {
      total: missions.length,

      completed:
        completedMissions.length,

      available:
        availableMissions.length,

      priority:
        priorityMission
          ? {
              id:
                priorityMission.mission_id ??
                null,

              title:
                priorityMission.title ??
                "Mission prioritaire",

              yearlySaving:
                safeNumber(
                  priorityMission.saving
                ),

              reason:
                getPriorityReason(
                  safeNumber(
                    priorityMission.saving
                  )
                ),
            }
          : null,

      items: sortedMissions.slice(
        0,
        10
      ),
    },

    monitoring: {
      totalContracts:
        monitoring.length,

      activeAlerts:
        activeAlerts.length,

      priorityAlert:
        priorityAlert
          ? {
              id:
                priorityAlert.id ??
                null,

              category:
                priorityAlert.category ??
                null,

              provider:
                priorityAlert.provider ??
                null,

              currentOffer:
                priorityAlert.current_offer ??
                null,

              betterOffer:
                priorityAlert.better_offer ??
                null,

              yearlySaving:
                safeNumber(
                  priorityAlert.yearly_saving
                ),

              status:
                priorityAlert.status ??
                null,
            }
          : null,

      contracts: monitoring,
    },

    piloLife: {
      projectCount:
        projects.length,

      primaryProject:
        primaryProject
          ? {
              id:
                primaryProject.id ??
                null,

              title:
                primaryProject.title ??
                "Projet principal",

              category:
                primaryProject.category ??
                null,

              targetAmount:
                safeNumber(
                  primaryProject.target_amount
                ),

              savedAmount:
                safeNumber(
                  primaryProject.saved_amount
                ),

              remainingAmount:
                remainingProjectAmount,

              monthlySaved:
                safeNumber(
                  primaryProject.monthly_saved
                ),

              progress:
                projectProgress,

              targetDate:
                primaryProject.target_date ??
                null,
            }
          : null,

      projects,
    },

    analyses: {
      total:
        analysisHistory.length,

      latest:
        latestAnalysis,

      history:
        analysisHistory.slice(
          0,
          10
        ),
    },

    priorities,

    recommendedNextAction:
      priorities[0] ?? {
        type: "analysis",
        title:
          "Réaliser une nouvelle analyse",

        yearlySaving: 0,

        reason:
          "Aucune priorité suffisamment précise n’est encore disponible.",

        href: "/analyse",
      },
  };
}