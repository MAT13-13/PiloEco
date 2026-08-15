import { supabase } from "./supabase";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantActionType =
  | "mission"
  | "monitoring"
  | "pilolife"
  | "analysis";

export type AssistantAction = {
  type: AssistantActionType;
  title: string;
  description: string;
  href: string;
  yearlySaving?: number;
  badge?: string;
  progress?: number;
};

export type AssistantAnswer = {
  content: string;
  actions: AssistantAction[];
};

type PiloProfile = {
  premium?: boolean;
  xp?: number;
  level?: number;
  completed_missions?: number;
  total_savings?: number;
};

type PiloMission = {
  mission_id?: string;
  title?: string;
  saving?: number;
  status?: string;
};

type MonitoringContract = {
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

type PiloLifeProject = {
  id?: string;
  title?: string;
  category?: string;
  target_amount?: number;
  saved_amount?: number;
  monthly_saved?: number;
  target_date?: string | null;
  is_primary?: boolean;
};

type AssistantApiResponse = {
  success?: boolean;
  answer?: string;
  actions?: AssistantAction[];
  error?: string;
};

type AssistantBrain = {
  recommendedNextAction?: {
    type?: string;
    title?: string;
    reason?: string;
    href?: string;
    yearlySaving?: number;
  };

  missions?: {
    priority?: {
      title?: string;
      yearlySaving?: number;
      reason?: string;
      id?: string | null;
    } | null;
  };

  monitoring?: {
    activeAlerts?: number;

    priorityAlert?: {
      category?: string | null;
      provider?: string | null;
      currentOffer?: string | null;
      yearlySaving?: number;
      status?: string | null;
    } | null;
  };

  piloLife?: {
    primaryProject?: {
      title?: string;
      progress?: number;
      savedAmount?: number;
      remainingAmount?: number;
    } | null;
  };
};

export type AssistantContext = {
  profile: PiloProfile | null;
  missions: PiloMission[];
  monitoring: MonitoringContract[];
  projects: PiloLifeProject[];

  summary: {
    detectedYearlySaving: number;
    completedYearlySaving: number;
    activeAlerts: number;
    availableMissions: number;
    monitoredContracts: number;
  };

  brain: AssistantBrain;
};

function safeNumber(value: unknown) {
  const numberValue = Number(value);

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
  mission: PiloMission
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
  contract: MonitoringContract
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
  project?: PiloLifeProject
) {
  if (!project) {
    return 0;
  }

  const targetAmount =
    safeNumber(project.target_amount);

  const savedAmount =
    safeNumber(project.saved_amount);

  if (targetAmount <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (savedAmount / targetAmount) *
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

function buildAssistantBrain(input: {
  profile: PiloProfile | null;
  missions: PiloMission[];
  monitoring: MonitoringContract[];
  projects: PiloLifeProject[];
}): AssistantBrain {
  const {
    missions,
    monitoring,
    projects,
  } = input;

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
    monitoring.filter(isActiveAlert);

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

  const priorities: Array<{
    type:
      | "mission"
      | "monitoring"
      | "pilolife"
      | "analysis";
    title: string;
    reason: string;
    href: string;
    yearlySaving: number;
  }> = [];

  if (priorityMission) {
    priorities.push({
      type: "mission",
      title:
        priorityMission.title ??
        "Mission prioritaire",
      reason: getPriorityReason(
        safeNumber(
          priorityMission.saving
        )
      ),
      href:
        priorityMission.mission_id
          ? `/missions/${priorityMission.mission_id}`
          : "/missions",
      yearlySaving:
        safeNumber(
          priorityMission.saving
        ),
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
      reason:
        "Une alerte active a été détectée sur ce contrat.",
      href: "/monitoring",
      yearlySaving:
        safeNumber(
          priorityAlert.yearly_saving
        ),
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
      reason:
        `${remainingProjectAmount.toLocaleString(
          "fr-FR"
        )} € restent à atteindre.`,
      href: "/pilolife",
      yearlySaving: 0,
    });
  }

  const recommendedNextAction =
    priorities[0] ?? {
      type: "analysis" as const,
      title:
        "Réaliser une nouvelle analyse",
      reason:
        "Aucune priorité suffisamment précise n’est encore disponible.",
      href: "/analyse",
      yearlySaving: 0,
    };

  return {
    recommendedNextAction,

    missions: {
      priority: priorityMission
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
    },

    monitoring: {
      activeAlerts:
        activeAlerts.length,

      priorityAlert: priorityAlert
        ? {
            category:
              priorityAlert.category ??
              null,
            provider:
              priorityAlert.provider ??
              null,
            currentOffer:
              priorityAlert.current_offer ??
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
    },

    piloLife: {
      primaryProject: primaryProject
        ? {
            title:
              primaryProject.title ??
              "Projet principal",
            progress:
              projectProgress,
            savedAmount:
              safeNumber(
                primaryProject.saved_amount
              ),
            remainingAmount:
              remainingProjectAmount,
          }
        : null,
    },
  };
}

async function getCurrentProfile(
  userId: string
): Promise<PiloProfile | null> {
  const firstAttempt = await supabase
    .from("profils")
    .select(
      "premium, xp, level, completed_missions, total_savings"
    )
    .eq("id", userId)
    .maybeSingle();

  if (!firstAttempt.error) {
    return firstAttempt.data as
      | PiloProfile
      | null;
  }

  const secondAttempt = await supabase
    .from("profils")
    .select(
      "premium, xp, level, completed_missions, total_savings"
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (secondAttempt.error) {
    console.error(
      "Erreur profil Assistant Pilo :",
      secondAttempt.error
    );

    return null;
  }

  return secondAttempt.data as
    | PiloProfile
    | null;
}

async function getUserMissions(
  userId: string
): Promise<PiloMission[]> {
  const { data, error } = await supabase
    .from("missions")
    .select(
      "mission_id, title, saving, status"
    )
    .eq("user_id", userId)
    .order("saving", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Erreur missions Assistant Pilo :",
      error
    );

    return [];
  }

  return (data ?? []) as PiloMission[];
}

async function getUserMonitoring(
  userId: string
): Promise<MonitoringContract[]> {
  const { data, error } = await supabase
    .from("monitoring_contracts")
    .select(
      `
        id,
        category,
        provider,
        monthly_price,
        current_offer,
        better_offer,
        yearly_saving,
        status,
        end_date
      `
    )
    .eq("user_id", userId)
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Erreur Monitoring Assistant Pilo :",
      error
    );

    return [];
  }

  return (data ?? []) as MonitoringContract[];
}

async function getUserProjects(
  userId: string
): Promise<PiloLifeProject[]> {
  const { data, error } = await supabase
    .from("pilolife_projects")
    .select(
      `
        id,
        title,
        category,
        target_amount,
        saved_amount,
        monthly_saved,
        target_date,
        is_primary
      `
    )
    .eq("user_id", userId)
    .order("is_primary", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Erreur PiloLife Assistant Pilo :",
      error
    );

    return [];
  }

  return (data ?? []) as PiloLifeProject[];
}

function calculateContextSummary(
  profile: PiloProfile | null,
  missions: PiloMission[],
  monitoring: MonitoringContract[]
) {
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

  const missionSaving =
    missions
      .filter(
        (mission) =>
          !isCompletedMission(mission)
      )
      .reduce(
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

  return {
    detectedYearlySaving:
      Math.max(
        monitoringSaving,
        missionSaving
      ),

    completedYearlySaving:
      safeNumber(
        profile?.total_savings
      ),

    activeAlerts:
      monitoring.filter(
        isActiveAlert
      ).length,

    availableMissions:
      missions.filter(
        (mission) =>
          !isCompletedMission(mission)
      ).length,

    monitoredContracts:
      monitoring.length,
  };
}

export async function getAssistantContext(): Promise<AssistantContext> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté pour utiliser l’Assistant Pilo."
    );
  }

  const [
    profile,
    missions,
    monitoring,
    projects,
  ] = await Promise.all([
    getCurrentProfile(user.id),
    getUserMissions(user.id),
    getUserMonitoring(user.id),
    getUserProjects(user.id),
  ]);

  const brain =
    buildAssistantBrain({
      profile,
      missions,
      monitoring,
      projects,
    });

  return {
    profile,
    missions,
    monitoring,
    projects,

    summary:
      calculateContextSummary(
        profile,
        missions,
        monitoring
      ),

    brain,
  };
}

export async function askPiloAssistant(input: {
  question: string;
  conversation: AssistantMessage[];
}): Promise<AssistantAnswer> {
  const question =
    input.question.trim();

  if (!question) {
    throw new Error(
      "La question est vide."
    );
  }

  /*
   * Sur mobile, on rafraîchit explicitement la session
   * avant l'appel à l'API Pilo. Cela évite d'envoyer
   * un ancien access_token encore présent dans AsyncStorage.
   */
  const {
    data: refreshData,
    error: refreshError,
  } = await supabase.auth.refreshSession();

  if (refreshError) {
    console.warn(
      "Refresh session Assistant Pilo :",
      refreshError.message
    );
  }

  let session =
    refreshData.session ?? null;

  /*
   * Si aucune session n'a été renvoyée par refreshSession,
   * on tente de relire la session persistée.
   */
  if (!session?.access_token) {
    const {
      data: sessionData,
      error: sessionError,
    } =
      await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(
        "Impossible de vérifier ta session. Reconnecte-toi."
      );
    }

    session = sessionData.session;
  }

  if (!session?.access_token) {
    throw new Error(
      "Ta session a expiré. Reconnecte-toi."
    );
  }

  /*
   * Maintenant seulement, on construit le contexte.
   * getAssistantContext() utilise le même utilisateur
   * Supabase que la session vérifiée juste au-dessus.
   */
  const context =
    await getAssistantContext();

  const payload = JSON.stringify({
    question,

    conversation:
      input.conversation.slice(-10),

    context,
  });

  const headers = {
    "Content-Type":
      "application/json",

    Accept: "application/json",

    Authorization:
      `Bearer ${session.access_token}`,
  };

  /*
   * Selon la configuration Vercel du domaine,
   * un passage piloeco.com <-> www.piloeco.com peut
   * provoquer une redirection HTTP. Certains clients
   * mobiles retirent alors le header Authorization.
   *
   * On essaye donc directement les deux domaines,
   * sans jamais afficher le token dans les logs.
   */
  const apiUrls = [
    "https://piloeco.com/api/assistant",
    "https://www.piloeco.com/api/assistant",
  ];

  let lastResponse:
    | Response
    | null = null;

  let lastData:
    | AssistantApiResponse
    | null = null;

  for (const apiUrl of apiUrls) {
    try {
      const response =
        await fetch(
          apiUrl,
          {
            method: "POST",
            headers,
            body: payload,
          }
        );

      lastResponse = response;

      let data:
        AssistantApiResponse;

      try {
        data =
          (await response.json()) as
            AssistantApiResponse;
      } catch {
        data = {
          success: false,
          error:
            "Réponse invalide du serveur Pilo.",
        };
      }

      lastData = data;

      console.log(
        "Assistant Pilo API :",
        {
          url: apiUrl,
          status: response.status,
          success:
            data.success === true,
          hasSession:
            Boolean(session),
          hasAccessToken:
            Boolean(
              session.access_token
            ),
        }
      );

      if (
        response.ok &&
        data.success &&
        data.answer
      ) {
        return {
          content: data.answer,

          actions:
            Array.isArray(
              data.actions
            )
              ? data.actions
              : [],
        };
      }

      /*
       * Si le premier domaine répond 401 parce que le
       * header Authorization a été perdu pendant une
       * redirection, on essaye le second domaine.
       */
      if (
        response.status === 401 &&
        apiUrl !==
          apiUrls[
            apiUrls.length - 1
          ]
      ) {
        continue;
      }

      /*
       * Pour les autres erreurs, inutile de multiplier
       * les requêtes : on renvoie directement le message.
       */
      throw new Error(
        data.error ??
          "Pilo ne peut pas répondre pour le moment."
      );
    } catch (error) {
      /*
       * Si le premier domaine échoue au niveau réseau,
       * on tente le second.
       */
      if (
        apiUrl !==
        apiUrls[
          apiUrls.length - 1
        ]
      ) {
        console.warn(
          "Assistant Pilo : nouvel essai avec le domaine alternatif.",
          error instanceof Error
            ? error.message
            : error
        );

        continue;
      }

      throw error;
    }
  }

  if (
    lastResponse &&
    lastData
  ) {
    throw new Error(
      lastData.error ??
        `Pilo ne peut pas répondre pour le moment (${lastResponse.status}).`
    );
  }

  throw new Error(
    "Impossible de joindre le service Pilo."
  );
}