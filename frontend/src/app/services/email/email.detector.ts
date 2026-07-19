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
  "http://localhost:3000";

function formatPrice(value: number) {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function createBasicEmailHtml({
  firstName,
  title,
  message,
}: {
  firstName: string | null;
  title: string;
  message: string;
}) {
  const displayedName =
    firstName?.trim() || "Bonjour";

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background: #f1f5f9;
          font-family: Arial, sans-serif;
          color: #0f172a;
        "
      >
        <div
          style="
            max-width: 620px;
            margin: 0 auto;
            padding: 32px 16px;
          "
        >
          <div
            style="
              background: #ffffff;
              border-radius: 24px;
              padding: 32px;
              border: 1px solid #e2e8f0;
            "
          >
            <p
              style="
                margin: 0 0 16px;
                font-size: 14px;
                font-weight: bold;
                color: #16a34a;
              "
            >
              🌿 PILOECO
            </p>

            <h1
              style="
                margin: 0 0 20px;
                font-size: 28px;
                line-height: 1.2;
              "
            >
              ${title}
            </h1>

            <p
              style="
                margin: 0 0 16px;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              ${displayedName},
            </p>

            <p
              style="
                margin: 0 0 28px;
                font-size: 16px;
                line-height: 1.6;
                color: #475569;
              "
            >
              ${message}
            </p>

            <a
              href="${APP_URL}/monitoring"
              style="
                display: inline-block;
                padding: 14px 22px;
                border-radius: 12px;
                background: #16a34a;
                color: #ffffff;
                text-decoration: none;
                font-weight: bold;
              "
            >
              Voir mon Monitoring
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
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
   * 1. EMAIL MEILLEURE OFFRE
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
   * 2. EMAIL HAUSSE DE PRIX
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
      const html = createBasicEmailHtml({
        firstName,
        title: "Une hausse de prix a été détectée 📈",
        message: `
          Le prix de ton contrat
          <strong>${contract.provider ?? contract.category}</strong>
          est passé de
          <strong>${formatPrice(previousPrice)} €</strong>
          à
          <strong>${formatPrice(currentPrice)} € par mois</strong>.
          Cela représente une hausse de
          <strong>${formatPrice(increaseAmount)} € par mois</strong>.
        `,
      });

      const result = await sendEmail({
        userId,
        to: email,
        type: "price_up",
        subject:
          `Hausse détectée sur ton contrat ${contract.provider ?? ""} 📈`,
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
          "Email hausse de prix envoyé."
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
   * 3. EMAIL BAISSE DE PRIX
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
      const html = createBasicEmailHtml({
        firstName,
        title: "Bonne nouvelle : ton prix a baissé 📉",
        message: `
          Le prix de ton contrat
          <strong>${contract.provider ?? contract.category}</strong>
          est passé de
          <strong>${formatPrice(previousPrice)} €</strong>
          à
          <strong>${formatPrice(currentPrice)} € par mois</strong>.
          Tu économises désormais
          <strong>${formatPrice(decreaseAmount)} € par mois</strong>.
        `,
      });

      const result = await sendEmail({
        userId,
        to: email,
        type: "price_down",
        subject:
          `Le prix de ton contrat a baissé 📉`,
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
          "Email baisse de prix envoyé."
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
   * 4. EMAIL FIN DE CONTRAT
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
      const endMessage =
        daysBeforeEnd === 0
          ? "Ton contrat arrive à échéance aujourd’hui."
          : `Ton contrat arrive à échéance dans ${daysBeforeEnd} jour${daysBeforeEnd > 1 ? "s" : ""}.`;

      const html = createBasicEmailHtml({
        firstName,
        title:
          "L’échéance de ton contrat approche ⏰",
        message: `
          ${endMessage}
          C’est le bon moment pour vérifier ton offre
          <strong>${contract.provider ?? contract.category}</strong>
          et éviter une reconduction peu avantageuse.
        `,
      });

      const result = await sendEmail({
        userId,
        to: email,
        type: "contract_end",
        subject:
          daysBeforeEnd === 0
            ? "Ton contrat arrive à échéance aujourd’hui ⏰"
            : `Ton contrat arrive à échéance dans ${daysBeforeEnd} jours ⏰`,
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