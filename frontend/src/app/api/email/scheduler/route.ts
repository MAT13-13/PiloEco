import { NextResponse } from "next/server";

import { runDailyEmailScheduler } from "@/app/services/email/email.scheduler";

export async function GET(request: Request) {
  const authorization =
    request.headers.get("authorization");

  const expectedAuthorization =
    `Bearer ${process.env.CRON_SECRET}`;

  if (
    !process.env.CRON_SECRET ||
    authorization !== expectedAuthorization
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
      message: "Scheduler exécuté avec succès.",
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
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      },
      {
        status: 500,
      }
    );
  }
}