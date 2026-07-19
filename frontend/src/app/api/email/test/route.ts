import { NextResponse } from "next/server";

import { sendEmail } from "@/app/services/email/email.service";
import { generateEmailTemplate } from "@/app/services/email/email.templates";

export async function GET() {
  const html = generateEmailTemplate("better_offer", {
    betterProvider: "Free",
    yearlySaving: 216,
    actionUrl: "http://localhost:3000/monitoring",
  });

  const result = await sendEmail({
    userId: "844961e1-7bd3-4acb-8cec-7427f9792427",
    to: "fionamathieu15@gmail.com",
    type: "better_offer",
    subject: "Pilo a trouvé une meilleure offre 🎉",
    html,
  });

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: result.error,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Email envoyé avec succès.",
  });
}