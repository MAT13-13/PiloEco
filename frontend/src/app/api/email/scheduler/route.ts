import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

import { runDailyEmailScheduler } from "@/app/services/email/email.scheduler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(
  body: Record<string, unknown>,
  status: number
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate",
    },
  });
}

function getBearerToken(
  request: Request
): string | null {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization?.startsWith("Bearer ")
  ) {
    return null;
  }

  const token =
    authorization.slice(7).trim();

  return token || null;
}

function secretsMatch(
  receivedSecret: string,
  expectedSecret: string
) {
  const receivedBuffer =
    Buffer.from(receivedSecret);

  const expectedBuffer =
    Buffer.from(expectedSecret);

  if (
    receivedBuffer.length !==
    expectedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    receivedBuffer,
    expectedBuffer
  );
}

export async function GET(
  request: Request
) {
  const cronSecret =
    process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error(
      "Variable CRON_SECRET manquante."
    );

    return jsonResponse(
      {
        success: false,
        error:
          "Le scheduler n’est pas configuré.",
      },
      500
    );
  }

  const receivedSecret =
    getBearerToken(request);

  if (
    !receivedSecret ||
    !secretsMatch(
      receivedSecret,
      cronSecret
    )
  ) {
    console.warn(
      "Tentative d’accès non autorisée au scheduler."
    );

    return jsonResponse(
      {
        success: false,
        error: "Accès refusé.",
      },
      401
    );
  }

  try {
    const startedAt = Date.now();

    const schedulerResult =
      await runDailyEmailScheduler();

    const durationMs =
      Date.now() - startedAt;

    console.log(
      `✅ Scheduler exécuté en ${durationMs} ms`
    );

    return jsonResponse(
      {
        success: true,
        message:
          "Scheduler exécuté avec succès.",
        durationMs,
        scheduler:
          schedulerResult ?? null,
      },
      200
    );
  } catch (error) {
    console.error(
      "Erreur route scheduler :",
      error
    );

    return jsonResponse(
      {
        success: false,
        error:
          "Impossible d’exécuter le scheduler.",
      },
      500
    );
  }
}