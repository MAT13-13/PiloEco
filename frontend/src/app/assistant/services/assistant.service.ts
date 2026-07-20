import { supabase } from "../../lib/supabase";
import {
  buildAssistantBrain,
} from "../../services/ai/pilo-brain.service";


export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
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

type StoredAnalysis = {
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

export type AssistantContext = {
  profile: PiloProfile | null;
  missions: PiloMission[];
  monitoring: MonitoringContract[];
  projects: PiloLifeProject[];
  latestAnalysis: StoredAnalysis | null;
  analysisHistory: StoredAnalysis[];

  summary: {
  detectedYearlySaving: number;
  completedYearlySaving: number;
  activeAlerts: number;
  availableMissions: number;
  monitoredContracts: number;
};

brain: ReturnType<
  typeof buildAssistantBrain
>;
};

type AssistantApiResponse = {
  success?: boolean;
  answer?: string;
  actions?: AssistantAction[];
  error?: string;
};

const LATEST_ANALYSIS_KEY =
  "pilo-analysis-result";

const ANALYSIS_HISTORY_KEY =
  "pilo-analysis-history";

function readLocalStorageItem<T>(
  key: string,
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue =
      window.localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch (error) {
    console.error(
      `Impossible de lire ${key} :`,
      error
    );

    return fallback;
  }
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

  return (data ??
    []) as MonitoringContract[];
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

  return (data ??
    []) as PiloLifeProject[];
}

function calculateContextSummary(
  profile: PiloProfile | null,
  missions: PiloMission[],
  monitoring: MonitoringContract[],
  history: StoredAnalysis[]
) {
  const monitoringSaving =
    monitoring.reduce(
      (total, contract) =>
        total +
        Math.max(
          0,
          Number(
            contract.yearly_saving ?? 0
          )
        ),
      0
    );

  const historySaving = history.reduce(
    (total, analysis) =>
      total +
      Math.max(
        0,
        Number(
          analysis.yearlySaving ?? 0
        )
      ),
    0
  );

  const activeAlerts =
    monitoring.filter((contract) =>
      ["red", "yellow"].includes(
        String(
          contract.status ?? ""
        ).toLowerCase()
      )
    ).length;

  const availableMissions =
    missions.filter(
      (mission) =>
        String(
          mission.status ?? ""
        ).toLowerCase() !==
        "terminée"
    ).length;

  return {
    detectedYearlySaving:
      monitoringSaving || historySaving,

    completedYearlySaving:
      Number(
        profile?.total_savings ?? 0
      ),

    activeAlerts,

    availableMissions,

    monitoredContracts:
      monitoring.length,
  };
}

export async function getAssistantContext(): Promise<AssistantContext> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  const latestAnalysis =
    readLocalStorageItem<StoredAnalysis | null>(
      LATEST_ANALYSIS_KEY,
      null
    );

  const analysisHistory =
    readLocalStorageItem<
      StoredAnalysis[]
    >(
      ANALYSIS_HISTORY_KEY,
      []
    );

  const brain = buildAssistantBrain({
  profile,
  missions,
  monitoring,
  projects,
  latestAnalysis,
  analysisHistory,
});

return {
  profile,
  missions,
  monitoring,
  projects,
  latestAnalysis,
  analysisHistory,

  summary: calculateContextSummary(
    profile,
    missions,
    monitoring,
    analysisHistory
  ),

  brain,
};
}

export async function askPiloAssistant(input: {
  question: string;
  conversation: AssistantMessage[];
}): Promise<AssistantAnswer> {

  const question = input.question.trim();

  if (!question) {
    throw new Error(
      "La question est vide."
    );
  }

  const context =
    await getAssistantContext();

const {
  data: { session },
  error: sessionError,
} = await supabase.auth.getSession();

if (sessionError || !session?.access_token) {
  throw new Error(
    "Ta session a expiré. Reconnecte-toi."
  );
}

  const response = await fetch(
    "/api/assistant",
    {
      method: "POST",

      headers: {
  "Content-Type": "application/json",
  Authorization:
    `Bearer ${session.access_token}`,
},

      body: JSON.stringify({
        question,
        conversation:
          input.conversation.slice(-10),
        context,
      }),
    }
  );

  const data =
    (await response.json()) as
      AssistantApiResponse;

  if (!response.ok || !data.success) {
    throw new Error(
      data.error ??
        "Pilo ne peut pas répondre pour le moment."
    );
  }

  if (!data.answer) {
    throw new Error(
      "Pilo a retourné une réponse vide."
    );
  }

  return {
  content: data.answer,
  actions: Array.isArray(data.actions)
    ? data.actions
    : [],
};
}