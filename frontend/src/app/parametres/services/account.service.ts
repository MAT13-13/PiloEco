import { supabase } from "../../lib/supabase";

export type NotificationFrequency =
  | "instant"
  | "daily"
  | "weekly"
  | "never";

export type AccountPreferences = {
  notificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  monitoringNotificationsEnabled: boolean;
  missionNotificationsEnabled: boolean;
  piloLifeNotificationsEnabled: boolean;
  marketingEmailsEnabled: boolean;
  notificationFrequency: NotificationFrequency;
};

export type AccountProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  premium: boolean;
  xp: number;
  level: number;
  totalSavings: number;
  completedMissions: number;
  badges: string[];
  createdAt: string | null;
  preferences: AccountPreferences;
};

export type UpdateAccountProfileInput = {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
};

const defaultPreferences: AccountPreferences = {
  notificationsEnabled: true,
  emailNotificationsEnabled: true,
  monitoringNotificationsEnabled: true,
  missionNotificationsEnabled: true,
  piloLifeNotificationsEnabled: true,
  marketingEmailsEnabled: false,
  notificationFrequency: "instant",
};

function asNumber(
  value: unknown,
  fallback = 0
) {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
}

function asBoolean(
  value: unknown,
  fallback: boolean
) {
  return typeof value === "boolean"
    ? value
    : fallback;
}

function asStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string"
  );
}

function parseFrequency(
  value: unknown
): NotificationFrequency {
  if (
    value === "instant" ||
    value === "daily" ||
    value === "weekly" ||
    value === "never"
  ) {
    return value;
  }

  return "instant";
}

function normalizePreferences(
  value: unknown
): AccountPreferences {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return defaultPreferences;
  }

  const preferences =
    value as Record<string, unknown>;

  return {
    notificationsEnabled: asBoolean(
      preferences.notificationsEnabled,
      true
    ),
    emailNotificationsEnabled: asBoolean(
      preferences.emailNotificationsEnabled,
      true
    ),
    monitoringNotificationsEnabled:
      asBoolean(
        preferences.monitoringNotificationsEnabled,
        true
      ),
    missionNotificationsEnabled:
      asBoolean(
        preferences.missionNotificationsEnabled,
        true
      ),
    piloLifeNotificationsEnabled:
      asBoolean(
        preferences.piloLifeNotificationsEnabled,
        true
      ),
    marketingEmailsEnabled: asBoolean(
      preferences.marketingEmailsEnabled,
      false
    ),
    notificationFrequency:
      parseFrequency(
        preferences.notificationFrequency
      ),
  };
}

export async function getAccountProfile(): Promise<AccountProfile> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté pour accéder à ton compte."
    );
  }

  const { data, error } = await supabase
    .from("profils")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const metadata =
    user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? "",
    firstName:
      data?.first_name ??
      metadata.first_name ??
      "",
    lastName:
      data?.last_name ??
      metadata.last_name ??
      "",
    avatarUrl:
      data?.avatar_url ??
      metadata.avatar_url ??
      null,
    premium: Boolean(
      data?.premium
    ),
    xp: asNumber(data?.xp),
    level: asNumber(
      data?.level,
      1
    ),
    totalSavings: asNumber(
      data?.total_savings
    ),
    completedMissions: asNumber(
      data?.completed_missions
    ),
    badges: asStringArray(
      data?.badges
    ),
    createdAt:
      data?.created_at ??
      user.created_at ??
      null,
    preferences:
      normalizePreferences(
        data?.preferences
      ),
  };
}

export async function updateAccountProfile(
  input: UpdateAccountProfileInput
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const firstName =
    input.firstName.trim();

  const lastName =
    input.lastName.trim();

  if (!firstName) {
    throw new Error(
      "Le prénom est obligatoire."
    );
  }

  const { error: profileError } =
    await supabase
      .from("profils")
      .upsert(
        {
          id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          avatar_url:
            input.avatarUrl ?? null,
          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

  if (profileError) {
    throw profileError;
  }

  const {
    error: metadataError,
  } =
    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        avatar_url:
          input.avatarUrl ?? null,
      },
    });

  if (metadataError) {
    throw metadataError;
  }
}

export async function updateAccountPreferences(
  preferences: AccountPreferences
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const { error } = await supabase
    .from("profils")
    .upsert(
      {
        id: user.id,
        email: user.email,
        preferences,
        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    );

  if (error) {
    throw error;
  }
}

export async function updateAccountEmail(
  email: string
) {
  const normalizedEmail =
    email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error(
      "L’adresse email est obligatoire."
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      email: normalizedEmail,
    });

  if (error) {
    throw error;
  }
}

export async function updateAccountPassword(
  password: string,
  confirmation: string
) {
  if (password.length < 8) {
    throw new Error(
      "Le mot de passe doit contenir au moins 8 caractères."
    );
  }

  if (password !== confirmation) {
    throw new Error(
      "Les mots de passe ne correspondent pas."
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    throw error;
  }
}

export async function uploadAccountAvatar(
  file: File
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  if (!file.type.startsWith("image/")) {
    throw new Error(
      "Le fichier doit être une image."
    );
  }

  const maximumSize =
    5 * 1024 * 1024;

  if (file.size > maximumSize) {
    throw new Error(
      "L’image ne doit pas dépasser 5 Mo."
    );
  }

  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() ?? "jpg";

  const filePath =
    `${user.id}/avatar-${Date.now()}.${extension}`;

  const { error: uploadError } =
    await supabase.storage
      .from("avatars")
      .upload(
        filePath,
        file,
        {
          cacheControl: "3600",
          upsert: true,
        }
      );

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: publicUrlData,
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const avatarUrl =
    publicUrlData.publicUrl;

  await updateAccountProfile({
    firstName:
      user.user_metadata
        ?.first_name ?? "Utilisateur",
    lastName:
      user.user_metadata
        ?.last_name ?? "",
    avatarUrl,
  });

  return avatarUrl;
}

export async function signOutAccount() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function deleteAccountData() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "Tu dois être connecté."
    );
  }

  const tables = [
    "monitoring_notifications",
    "monitoring_contracts",
    "pilolife_projects",
    "missions",
    "analyses",
  ];

  for (const table of tables) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(
        table === "analyses"
          ? "utilisateur_id"
          : "user_id",
        user.id
      );

    if (error) {
      console.error(
        `Erreur suppression ${table}:`,
        error
      );
    }
  }

  const { error: profileError } =
    await supabase
      .from("profils")
      .delete()
      .eq("id", user.id);

  if (profileError) {
    throw profileError;
  }

  await signOutAccount();
}