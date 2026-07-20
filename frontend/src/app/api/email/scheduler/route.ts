import { NextResponse } from "next/server";

import { runDailyEmailScheduler } from "@/app/services/email/email.scheduler";

export async function GET(request: Request) {
  const authorization =
    request.headers.get("authorization");

  const cronSecret =
    process.env.CRON_SECRET;

  if (
    !cronSecret ||
    authorization !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Accès refusé.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const schedulerResult =
      await runDailyEmailScheduler();

    return NextResponse.json({
      success: true,
      message:
        "Scheduler exécuté avec succès.",
      scheduler: schedulerResult ?? null,
    });
  } catch (error) {
    console.error(
      "Erreur route scheduler :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible d’exécuter le scheduler.",
      },
      {
        status: 500,
      }
    );
  }
}