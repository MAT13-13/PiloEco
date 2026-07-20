import { supabaseAdmin } from "@/app/lib/supabase-admin";

import type {
  MonitoringContract,
} from "@/app/monitoring/services/monitoring.service";

export type PremiumUser = {
  userId: string;
  email: string;
  firstName: string | null;
  premium: boolean;
};

export type PremiumUserContract =
  PremiumUser & {
    contract: MonitoringContract;
  };

/**
 * Récupère tous les utilisateurs Premium
 * possédant une adresse email.
 */
export async function getPremiumUsers(): Promise<
  PremiumUser[]
> {
  const {
    data: profiles,
    error: profilesError,
  } = await supabaseAdmin
    .from("profils")
    .select("id, premium, first_name")
    .eq("premium", true);

  if (profilesError) {
    console.error(
      "Erreur récupération profils Premium :",
      profilesError
    );

    throw new Error(profilesError.message);
  }

  if (!profiles?.length) {
    return [];
  }

  const results: PremiumUser[] = [];

  for (const profile of profiles) {
    const {
      data: userData,
      error: userError,
    } =
      await supabaseAdmin.auth.admin.getUserById(
        profile.id
      );

    if (userError) {
      console.error(
        `Erreur récupération utilisateur ${profile.id} :`,
        userError
      );

      continue;
    }

    const email = userData.user?.email;

    if (!email) {
      console.warn(
        `Aucune adresse email pour ${profile.id}`
      );

      continue;
    }

    results.push({
      userId: profile.id,
      email,
      firstName:
        profile.first_name ?? null,
      premium: profile.premium,
    });
  }

  return results;
}

/**
 * Récupère tous les contrats appartenant
 * aux utilisateurs Premium.
 */
export async function getPremiumContracts(): Promise<
  PremiumUserContract[]
> {
  const premiumUsers =
    await getPremiumUsers();

  if (!premiumUsers.length) {
    return [];
  }

  const userIds = premiumUsers.map(
    (user) => user.userId
  );

  const {
    data: contracts,
    error: contractsError,
  } = await supabaseAdmin
    .from("monitoring_contracts")
    .select("*")
    .in("user_id", userIds);

  if (contractsError) {
    console.error(
      "Erreur récupération contrats Premium :",
      contractsError
    );

    throw new Error(
      contractsError.message
    );
  }

  const userMap = new Map(
    premiumUsers.map((user) => [
      user.userId,
      user,
    ])
  );

  const results: PremiumUserContract[] =
    [];

  for (const rawContract of contracts ?? []) {
    const contract =
      rawContract as MonitoringContract;

    const user = userMap.get(
      contract.user_id
    );

    if (!user) {
      continue;
    }

    results.push({
      ...user,
      contract,
    });
  }

  return results;
}