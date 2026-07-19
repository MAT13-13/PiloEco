import { Resend } from "resend";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import type {
  SendEmailInput,
  SendEmailResult,
} from "./email.types";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey
  ? new Resend(resendApiKey)
  : null;

async function saveEmailLog(input: {
  userId: string;
  type: string;
  recipient: string;
  subject: string;
  status: "sent" | "failed";
  resendId?: string | null;
  metadata?: Record<string, unknown>;
  errorMessage?: string | null;
}) {
  const { error } = await supabaseAdmin
    .from("email_logs")
    .insert({
      user_id: input.userId,
      type: input.type,
      recipient: input.recipient,
      subject: input.subject,
      status: input.status,
      resend_id: input.resendId ?? null,
      metadata: input.metadata ?? {},
      error_message: input.errorMessage ?? null,
      sent_at:
        input.status === "sent"
          ? new Date().toISOString()
          : null,
    });

  if (error) {
    console.error(
      "Erreur lors de l'enregistrement dans email_logs :",
      error
    );
  }
}

export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  try {
    if (!resend) {
      throw new Error(
        "La variable RESEND_API_KEY est absente."
      );
    }

    const { data, error } =
      await resend.emails.send({
        from: "PiloEco <onboarding@resend.dev>",
        to: input.to,
        subject: input.subject,
        html: input.html,
      });

    if (error) {
      await saveEmailLog({
        userId: input.userId,
        type: input.type,
        recipient: input.to,
        subject: input.subject,
        status: "failed",
        metadata: input.metadata,
        errorMessage: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }

    await saveEmailLog({
      userId: input.userId,
      type: input.type,
      recipient: input.to,
      subject: input.subject,
      status: "sent",
      resendId: data?.id ?? null,
      metadata: input.metadata,
    });

    console.log(
      "✅ Email envoyé et enregistré :",
      data?.id
    );

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erreur inconnue";

    await saveEmailLog({
      userId: input.userId,
      type: input.type,
      recipient: input.to,
      subject: input.subject,
      status: "failed",
      metadata: input.metadata,
      errorMessage,
    });

    console.error(
      "Erreur lors de l'envoi de l'email :",
      error
    );

    return {
      success: false,
      error: errorMessage,
    };
  }
}