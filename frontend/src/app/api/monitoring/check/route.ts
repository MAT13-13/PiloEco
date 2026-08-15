import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@supabase/supabase-js";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { checkMonitoringContract } from "@/app/monitoring/services/monitoring-check.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(
  message: string,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
    }
  );
}

function getBearerToken(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization?.startsWith(
      "Bearer "
    )
  ) {
    return null;
  }

  const token =
    authorization.slice(7).trim();

  return token || null;
}

export async function POST(
  request: NextRequest
) {
  try {
    const accessToken =
      getBearerToken(request);

    if (!accessToken) {
      return jsonError(
        "Utilisateur non connecté.",
        401
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      !supabaseUrl ||
      !supabaseAnonKey
    ) {
      console.error(
        "Configuration Supabase manquante pour le Monitoring."
      );

      return jsonError(
        "Le Monitoring est temporairement indisponible.",
        500
      );
    }

    const authClient =
      createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          global: {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          },

          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
          },
        }
      );

    const {
      data: { user },
      error: userError,
    } =
      await authClient.auth.getUser(
        accessToken
      );

    if (userError || !user) {
      return jsonError(
        "Session utilisateur invalide ou expirée.",
        401
      );
    }

    const {
      data: contracts,
      error: contractsError,
    } = await supabaseAdmin
      .from("monitoring_contracts")
      .select("*")
      .eq("user_id", user.id);

    if (contractsError) {
      console.error(
        "Erreur récupération contrats Monitoring :",
        contractsError
      );

      return jsonError(
        "Impossible de récupérer les contrats à analyser.",
        500
      );
    }

    const errors: Array<{
      contractId: string;
      error: string;
    }> = [];

    let checked = 0;

    /*
     * Toutes les catégories passent par le même moteur.
     *
     * - Les catégories avec un catalogue comparable
     *   peuvent recevoir une économie chiffrée.
     *
     * - Les autres catégories possédant une mission
     *   reçoivent une recommandation de comparaison
     *   sans inventer de montant.
     */
    for (const contract of contracts ?? []) {
      try {
        await checkMonitoringContract(
          contract
        );

        checked += 1;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Erreur inconnue.";

        console.error(
          "Erreur analyse contrat Monitoring :",
          {
            contractId: contract.id,
            category: contract.category,
            error: message,
          }
        );

        errors.push({
          contractId:
            String(contract.id),
          error: message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      checked,
      errors,
    });
  } catch (error) {
    console.error(
      "Erreur API Monitoring Check :",
      error
    );

    return jsonError(
      "Impossible de lancer l'analyse Monitoring pour le moment.",
      500
    );
  }
}