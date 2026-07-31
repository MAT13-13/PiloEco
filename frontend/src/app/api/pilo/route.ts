import {
  NextRequest,
  NextResponse,
} from "next/server";

import { createClient } from "@supabase/supabase-js";

import { generatePiloAdvice } from "../../services/openai/openai.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_SIZE = 20_000;

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
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function getBearerToken(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization?.startsWith("Bearer ")
  ) {
    return null;
  }

  return authorization.slice(7).trim();
}

function isValidPayload(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export async function POST(
  request: NextRequest
) {
  try {
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
        "Configuration Supabase manquante dans /api/pilo."
      );

      return jsonError(
        "Le service est temporairement indisponible.",
        500
      );
    }

    const accessToken =
      getBearerToken(request);

    if (!accessToken) {
      return jsonError(
        "Utilisateur non connecté.",
        401
      );
    }

    const supabase = createClient(
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
    } = await supabase.auth.getUser(
      accessToken
    );

    if (userError || !user) {
      return jsonError(
        "Session utilisateur invalide ou expirée.",
        401
      );
    }

    const contentLength =
      Number(
        request.headers.get(
          "content-length"
        ) ?? 0
      );

    if (
      contentLength >
      MAX_BODY_SIZE
    ) {
      return jsonError(
        "La demande envoyée est trop volumineuse.",
        413
      );
    }

    let data: unknown;

    try {
      data = await request.json();
    } catch {
      return jsonError(
        "Le contenu envoyé est invalide.",
        400
      );
    }

    if (!isValidPayload(data)) {
      return jsonError(
        "Les informations envoyées sont invalides.",
        400
      );
    }

    const serializedData =
      JSON.stringify(data);

    if (
      serializedData.length >
      MAX_BODY_SIZE
    ) {
      return jsonError(
        "La demande envoyée est trop volumineuse.",
        413
      );
    }

 const advice = await generatePiloAdvice(
  data as Parameters<
    typeof generatePiloAdvice
  >[0]
);

    return NextResponse.json(
      {
        success: true,
        advice,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Erreur API Pilo :",
      error
    );

    return jsonError(
      "Pilo n’a pas pu générer de conseil pour le moment.",
      500
    );
  }
}