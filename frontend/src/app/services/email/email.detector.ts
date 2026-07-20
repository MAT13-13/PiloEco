import { supabaseAdmin } from "@/app/lib/supabase-admin";

import type {
  MonitoringCheckResult,
} from "@/app/monitoring/services/monitoring-check.service";

import { sendEmail } from "./email.service";
import { generateEmailTemplate } from "./email.templates";

type MonitoringEmailType =
  | "better_offer"
  | "price_up"
  | "price_down"
  | "contract_end";

type DetectMonitoringEmailInput = {
  userId: string;
  email: string;
  firstName: string | null;
  contract: MonitoringCheckResult["contract"];
  monitoringResult: MonitoringCheckResult;
};

type EmailDetectionResult = {
  sent: boolean;
  reason: string;
  sentTypes: MonitoringEmailType[];
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://pilo-eco.vercel.app";

function formatPrice(value: number) {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

async function hasAlreadySentEmail(
  userId: string,
  type: MonitoringEmailType,
  metadata: Record<string, unknown>
) {
  const { data, error } = await supabaseAdmin
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("type", type)
    .eq("status", "sent")
    .contains("metadata", metadata)
    .limit(1);

  if (error) {
    console.error(
      `Erreur pendant la vérification du doublon ${type} :`,
      error
    );

    throw new Error(error.message);
  }

  return Boolean(data && data.length > 0);
}

export async function detectMonitoringEmail({
  userId,
  email,
  firstName,
  contract,
  monitoringResult,
}: DetectMonitoringEmailInput): Promise<EmailDetectionResult> {
  if (!email?.trim()) {
    return {
      sent: false,
      reason: "Aucune adresse email disponible.",
      sentTypes: [],
    };
  }

  const sentTypes: MonitoringEmailType[] = [];
  const reasons: string[] = [];

  const {
    hasBetterOffer,
    hasPriceUp,
    hasPriceDown,
    previousPrice,
    currentPrice,
    priceDifference,
    hasContractEnd,
    daysBeforeEnd,
  } = monitoringResult;

  /*
   * 1. MEILLEURE OFFRE
   */
  const yearlySaving = Math.round(
    Math.max(
      0,
      Number(contract.yearly_saving ?? 0)
    )
  );

  if (
    hasBetterOffer &&
    yearlySaving > 0 &&
    contract.better_offer
  ) {
    const duplicateMetadata = {
      contractId: contract.id,
      yearlySaving,
    };

    const alreadySent =
      await hasAlreadySentEmail(
        userId,
        "better_offer",
        duplicateMetadata
      );

    if (!alreadySent) {
      const html = generateEmailTemplate(
        "better_offer",
        {
          firstName:
            firstName ?? undefined,

          currentProvider:
            contract.provider ?? undefined,

          betterProvider:
            contract.better_offer,

          yearlySaving,

          monthlySaving:
            Math.round(yearlySaving / 12),

          actionUrl:
            `${APP_URL}/monitoring`,
        }
      );

      const result = await sendEmail({
        userId,
        to: email,
        type: "better_offer",
        subject:
          `Pilo a trouvé ${yearlySaving} € d’économie par an 🎉`,
        html,
        metadata: {
          contractId: contract.id,
          category: contract.category,
          currentProvider:
            contract.provider,
          betterOffer:
            contract.better_offer,
          yearlySaving,
        },
      });

      if (result.success) {
        sentTypes.push("better_offer");

        reasons.push(
          "Email meilleure offre envoyé."
        );
      } else {
        reasons.push(
          result.error ??
            "Échec de l’email meilleure offre."
        );
      }
    } else {
      reasons.push(
        "Email meilleure offre déjà envoyé."
      );
    }
  }

  /*
   * 2. HAUSSE DE PRIX
   */
  if (hasPriceUp) {
    const increaseAmount =
      Math.abs(priceDifference);

    const duplicateMetadata = {
      contractId: contract.id,
      previousPrice,
      currentPrice,
    };

    const alreadySent =
      await hasAlreadySentEmail(
        userId,
        "price_up",
        duplicateMetadata
      );

    if (!alreadySent) {
      const html = generateEmailTemplate(
        "price_up",
        {
          firstName:
            firstName ?? undefined,

          provider:
            contract.provider ?? undefined,

          offer:
            contract.current_offer ??
            undefined,

          currentPrice: previousPrice,

          newPrice: currentPrice,

          actionUrl:
            `${APP_URL}/monitoring`,
        }
      );

      const result = await sendEmail({
        userId,
        to: email,
        type: "price_up",
        subject:
          contract.provider
            ? `Hausse détectée chez ${contract.provider} 📈`
            : "Une hausse de prix a été détectée 📈",
        html,
        metadata: {
          contractId: contract.id,
          category: contract.category,
          provider: contract.provider,
          previousPrice,
          currentPrice,
          priceDifference:
            increaseAmount,
        },
      });

      if (result.success) {
        sentTypes.push("price_up");

        reasons.push(
          `Email hausse de prix envoyé : +${formatPrice(
            increaseAmount
          )} €/mois.`
        );
      } else {
        reasons.push(
          result.error ??
            "Échec de l’email hausse de prix."
        );
      }
    } else {
      reasons.push(
        "Email hausse de prix déjà envoyé."
      );
    }
  }

  /*
   * 3. BAISSE DE PRIX
   */
  if (hasPriceDown) {
    const decreaseAmount =
      Math.abs(priceDifference);

    const duplicateMetadata = {
      contractId: contract.id,
      previousPrice,
      currentPrice,
    };

    const alreadySent =
      await hasAlreadySentEmail(
        userId,
        "price_down",
        duplicateMetadata
      );

    if (!alreadySent) {
      const html = generateEmailTemplate(
        "price_down",
        {
          firstName:
            firstName ?? undefined,

          provider:
            contract.provider ?? undefined,

          offer:
            contract.current_offer ??
            undefined,

          currentPrice: previousPrice,

          newPrice: currentPrice,

          actionUrl:
            `${APP_URL}/monitoring`,
        }
      );

      const result = await sendEmail({
        userId,
        to: email,
        type: "price_down",
        subject:
          contract.provider
            ? `Bonne nouvelle chez ${contract.provider} 📉`
            : "Le prix de ton contrat a baissé 📉",
        html,
        metadata: {
          contractId: contract.id,
          category: contract.category,
          provider: contract.provider,
          previousPrice,
          currentPrice,
          priceDifference:
            decreaseAmount,
        },
      });

      if (result.success) {
        sentTypes.push("price_down");

        reasons.push(
          `Email baisse de prix envoyé : -${formatPrice(
            decreaseAmount
          )} €/mois.`
        );
      } else {
        reasons.push(
          result.error ??
            "Échec de l’email baisse de prix."
        );
      }
    } else {
      reasons.push(
        "Email baisse de prix déjà envoyé."
      );
    }
  }

  /*
   * 4. FIN D’ENGAGEMENT
   */
  if (
    hasContractEnd &&
    daysBeforeEnd !== null &&
    contract.end_date
  ) {
    const duplicateMetadata = {
      contractId: contract.id,
      endDate: contract.end_date,
    };

    const alreadySent =
      await hasAlreadySentEmail(
        userId,
        "contract_end",
        duplicateMetadata
      );

    if (!alreadySent) {
      const html = generateEmailTemplate(
        "contract_end",
        {
          firstName:
            firstName ?? undefined,

          provider:
            contract.provider ?? undefined,

          offer:
            contract.current_offer ??
            undefined,

          contractEndDate:
            new Date(
              contract.end_date
            ).toLocaleDateString(
              "fr-FR",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            ),

          actionUrl:
            `${APP_URL}/monitoring`,
        }
      );

      const subject =
        daysBeforeEnd === 0
          ? "Ton contrat arrive à échéance aujourd’hui ⏰"
          : daysBeforeEnd === 1
            ? "Ton contrat arrive à échéance demain ⏰"
            : `Ton contrat arrive à échéance dans ${daysBeforeEnd} jours ⏰`;

      const result = await sendEmail({
        userId,
        to: email,
        type: "contract_end",
        subject,
        html,
        metadata: {
          contractId: contract.id,
          category: contract.category,
          provider: contract.provider,
          endDate: contract.end_date,
          daysBeforeEnd,
        },
      });

      if (result.success) {
        sentTypes.push("contract_end");

        reasons.push(
          "Email échéance envoyé."
        );
      } else {
        reasons.push(
          result.error ??
            "Échec de l’email échéance."
        );
      }
    } else {
      reasons.push(
        "Email échéance déjà envoyé."
      );
    }
  }

  /*
   * Aucun événement détecté
   */
  if (reasons.length === 0) {
    return {
      sent: false,
      reason:
        "Aucune nouvelle alerte nécessitant un email.",
      sentTypes: [],
    };
  }

  return {
    sent: sentTypes.length > 0,
    reason: reasons.join(" "),
    sentTypes,
  };
}