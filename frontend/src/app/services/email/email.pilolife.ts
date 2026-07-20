import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { sendEmail } from "./email.service";
import { generateEmailTemplate } from "./email.templates";

type DetectPiloLifeEmailInput = {
  userId: string;
  email: string;
  firstName: string | null;
};

type PiloLifeProject = {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  saved_amount: number;
  is_primary: boolean;
};

type PiloLifeEmailResult = {
  sent: boolean;
  reason: string;
  milestone: number | null;
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://pilo-eco.vercel.app";

const PROGRESS_MILESTONES = [
  100,
  75,
  50,
  25,
  1,
] as const;

async function hasAlreadySentMilestone(
  userId: string,
  projectId: string,
  milestone: number
) {
  const { data, error } =
    await supabaseAdmin
      .from("email_logs")
      .select("id")
      .eq("user_id", userId)
      .eq(
        "type",
        "pilolife_progress"
      )
      .eq("status", "sent")
      .contains("metadata", {
        projectId,
        milestone,
      })
      .limit(1);

  if (error) {
    console.error(
      "Erreur vérification doublon PiloLife :",
      error
    );

    throw new Error(error.message);
  }

  return Boolean(data?.length);
}

function getSubject(
  projectTitle: string,
  milestone: number
) {
  if (milestone === 100) {
    return `Ton projet « ${projectTitle} » est financé 🏆`;
  }

  if (milestone === 75) {
    return `Plus que 25 % pour réaliser « ${projectTitle} » 🚀`;
  }

  if (milestone === 50) {
    return `Ton projet « ${projectTitle} » est à mi-chemin 🎯`;
  }

  if (milestone === 25) {
    return `Ton projet « ${projectTitle} » atteint 25 % 🌱`;
  }

  return `Ton projet « ${projectTitle} » vient de commencer 💚`;
}

export async function detectPiloLifeEmail({
  userId,
  email,
  firstName,
}: DetectPiloLifeEmailInput): Promise<PiloLifeEmailResult> {
  if (!email.trim()) {
    return {
      sent: false,
      reason:
        "Aucune adresse email disponible.",
      milestone: null,
    };
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("pilolife_projects")
    .select(
      "id, user_id, title, target_amount, saved_amount, is_primary"
    )
    .eq("user_id", userId)
    .eq("is_primary", true)
    .maybeSingle();

  if (error) {
    console.error(
      `Erreur récupération projet PiloLife ${userId} :`,
      error
    );

    throw new Error(error.message);
  }

  if (!data) {
    return {
      sent: false,
      reason:
        "Aucun projet PiloLife principal.",
      milestone: null,
    };
  }

  const project =
    data as PiloLifeProject;

  const targetAmount = Number(
    project.target_amount ?? 0
  );

  const savedAmount = Number(
    project.saved_amount ?? 0
  );

  if (
    !Number.isFinite(targetAmount) ||
    targetAmount <= 0
  ) {
    return {
      sent: false,
      reason:
        "Objectif PiloLife invalide.",
      milestone: null,
    };
  }

  if (
    !Number.isFinite(savedAmount) ||
    savedAmount <= 0
  ) {
    return {
      sent: false,
      reason:
        "Le projet PiloLife n’a pas encore progressé.",
      milestone: null,
    };
  }

  const progress = Math.min(
    100,
    Math.max(
      0,
      (savedAmount / targetAmount) *
        100
    )
  );

  /*
   * On cherche le palier le plus élevé atteint
   * qui n’a jamais été envoyé.
   *
   * Exemple :
   * progression = 52 %
   * → email du palier 50 %
   */
  let milestoneToSend:
    | number
    | null = null;

  for (
    const milestone of PROGRESS_MILESTONES
  ) {
    if (progress < milestone) {
      continue;
    }

    const alreadySent =
      await hasAlreadySentMilestone(
        userId,
        project.id,
        milestone
      );

    if (!alreadySent) {
      milestoneToSend = milestone;
      break;
    }
  }

  if (milestoneToSend === null) {
    return {
      sent: false,
      reason:
        "Aucun nouveau palier PiloLife atteint.",
      milestone: null,
    };
  }

  const html = generateEmailTemplate(
    "pilolife_progress",
    {
      firstName:
        firstName ?? undefined,

      projectTitle: project.title,

      savedAmount,

      targetAmount,

      actionUrl:
        `${APP_URL}/pilolife`,
    }
  );

  const result = await sendEmail({
    userId,
    to: email,
    type: "pilolife_progress",
    subject: getSubject(
      project.title,
      milestoneToSend
    ),
    html,
    metadata: {
      projectId: project.id,
      projectTitle: project.title,
      milestone: milestoneToSend,
      progress: Math.round(progress),
      savedAmount,
      targetAmount,
    },
  });

  if (!result.success) {
    return {
      sent: false,
      reason:
        result.error ??
        "Échec de l’email PiloLife.",
      milestone: null,
    };
  }

  return {
    sent: true,
    reason:
      `Email PiloLife ${milestoneToSend} % envoyé.`,
    milestone: milestoneToSend,
  };
}