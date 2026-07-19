import { supabaseAdmin } from "@/app/lib/supabase-admin";

import type {
  MonitoringContract,
} from "@/app/monitoring/services/monitoring.service";

export type PremiumUserContract = {
  userId: string;
  email: string;
  firstName: string | null;
  premium: boolean;
  contract: MonitoringContract;
};

export async function getPremiumContracts(): Promise<
  PremiumUserContract[]
> {
  const { data: profiles, error: profilesError } =
    await supabaseAdmin
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

  if (!profiles || profiles.length === 0) {
    return [];
  }

  const userIds = profiles.map(
    (profile) => profile.id
  );

  const { data: contracts, error: contractsError } =
    await supabaseAdmin
      .from("monitoring_contracts")
      .select("*")
      .in("user_id", userIds);

  if (contractsError) {
    console.error(
      "Erreur récupération contrats Premium :",
      contractsError
    );

    throw new Error(contractsError.message);
  }

  const profileMap = new Map(
    profiles.map((profile) => [
      profile.id,
      profile,
    ])
  );

  const results: PremiumUserContract[] = [];

  for (const rawContract of contracts ?? []) {
    const contract =
      rawContract as MonitoringContract;

    const profile = profileMap.get(
      contract.user_id
    );

    if (!profile) {
      continue;
    }

    const {
      data: userData,
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(
      contract.user_id
    );

    if (userError) {
      console.error(
        `Erreur récupération utilisateur ${contract.user_id} :`,
        userError
      );

      continue;
    }

    const email = userData.user?.email;

    if (!email) {
      console.warn(
        `Aucune adresse email pour ${contract.user_id}`
      );

      continue;
    }

    results.push({
      userId: contract.user_id,
      email,
      firstName: profile.first_name,
      premium: profile.premium,
      contract,
    });
  }

  return results;
}