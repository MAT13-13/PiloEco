import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/app/lib/stripe";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { sendEmail } from "@/app/services/email/email.service";
import { generateEmailTemplate } from "@/app/services/email/email.templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      received: false,
      error: message,
    },
    {
      status,
    }
  );
}

function hasPremiumAccess(
  status: Stripe.Subscription.Status
) {
  return (
    status === "active" ||
    status === "trialing"
  );
}

function getStripeId(
  value:
    | string
    | { id: string }
    | null
    | undefined
) {
  if (!value) {
    return null;
  }

  return typeof value === "string"
    ? value
    : value.id;
}

async function sendPremiumWelcomeEmail(input: {
  userId: string;
  stripeEventId: string;
  customerId?: string | null;
  subscriptionId?: string | null;
}) {
  const {
    userId,
    stripeEventId,
    customerId,
    subscriptionId,
  } = input;

  const {
    data: existingLogs,
    error: existingLogError,
  } = await supabaseAdmin
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("type", "premium")
    .eq("status", "sent")
    .contains("metadata", {
      stripe_event_id: stripeEventId,
    })
    .limit(1);

  if (existingLogError) {
    console.error(
      "Erreur vérification doublon email Premium :",
      existingLogError
    );
  }

  if (
    existingLogs &&
    existingLogs.length > 0
  ) {
    console.log(
      "Email Premium déjà envoyé pour l'événement :",
      stripeEventId
    );

    return;
  }

  const {
    data: authUserData,
    error: authUserError,
  } =
    await supabaseAdmin.auth.admin.getUserById(
      userId
    );

  if (authUserError) {
    console.error(
      "Erreur récupération utilisateur pour email :",
      authUserError
    );

    return;
  }

  const user = authUserData.user;
  const recipient = user?.email;

  if (!recipient) {
    console.error(
      "Aucune adresse email trouvée pour l'utilisateur :",
      userId
    );

    return;
  }

  const firstName =
    typeof user.user_metadata?.first_name ===
    "string"
      ? user.user_metadata.first_name
      : typeof user.user_metadata?.full_name ===
          "string"
        ? user.user_metadata.full_name
            .trim()
            .split(" ")[0]
        : undefined;

  const subject =
    "🎉 Bienvenue dans Pilo Premium";

  const html = generateEmailTemplate(
    "premium",
    {
      firstName,
      actionUrl:
        "https://piloeco.com/pilolife",
    }
  );

  const result = await sendEmail({
    userId,
    to: recipient,
    type: "premium",
    subject,
    html,
    metadata: {
      stripe_event_id: stripeEventId,
      stripe_customer_id:
        customerId ?? null,
      stripe_subscription_id:
        subscriptionId ?? null,
    },
  });

  if (!result.success) {
    console.error(
      "Échec envoi email de bienvenue Premium :",
      result.error
    );

    return;
  }

  console.log(
    "✅ Email de bienvenue Premium envoyé à :",
    recipient
  );
}

async function activatePremium(input: {
  userId: string;
  customerId: string | null;
  subscriptionId: string;
}) {
  const {
    userId,
    customerId,
    subscriptionId,
  } = input;

  const {
    data: updatedProfiles,
    error,
  } = await supabaseAdmin
    .from("profils")
    .update({
      premium: true,
      stripe_customer_id: customerId,
      stripe_subscription_id:
        subscriptionId,
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    throw new Error(
      `Erreur activation Premium : ${error.message}`
    );
  }

  if (
    !updatedProfiles ||
    updatedProfiles.length === 0
  ) {
    throw new Error(
      `Aucun profil trouvé pour l'utilisateur ${userId}`
    );
  }
}

async function updatePremiumFromSubscription(
  subscription: Stripe.Subscription
) {
  const premium = hasPremiumAccess(
    subscription.status
  );

  const {
    data: updatedProfiles,
    error,
  } = await supabaseAdmin
    .from("profils")
    .update({
      premium,
      stripe_customer_id:
        getStripeId(subscription.customer),
      stripe_subscription_id:
        subscription.id,
    })
    .eq(
      "stripe_subscription_id",
      subscription.id
    )
    .select("id");

  if (error) {
    throw new Error(
      `Erreur mise à jour Premium : ${error.message}`
    );
  }

  if (
    !updatedProfiles ||
    updatedProfiles.length === 0
  ) {
    console.warn(
      "Aucun profil associé à l'abonnement :",
      subscription.id
    );
  }

  console.log(
    premium
      ? "✅ Abonnement Premium actif"
      : `⚠️ Premium désactivé, statut : ${subscription.status}`
  );
}

async function disablePremium(
  subscription: Stripe.Subscription
) {
  const {
    data: updatedProfiles,
    error,
  } = await supabaseAdmin
    .from("profils")
    .update({
      premium: false,
      stripe_subscription_id: null,
    })
    .eq(
      "stripe_subscription_id",
      subscription.id
    )
    .select("id");

  if (error) {
    throw new Error(
      `Erreur désactivation Premium : ${error.message}`
    );
  }

  if (
    !updatedProfiles ||
    updatedProfiles.length === 0
  ) {
    console.warn(
      "Aucun profil associé à l'abonnement supprimé :",
      subscription.id
    );
  }

  console.log(
    "✅ Premium désactivé pour l'abonnement :",
    subscription.id
  );
}

export async function POST(
  request: NextRequest
) {
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "STRIPE_WEBHOOK_SECRET manquant"
    );

    return jsonError(
      "Configuration webhook manquante",
      500
    );
  }

  const signature =
    request.headers.get(
      "stripe-signature"
    );

  if (!signature) {
    return jsonError(
      "Signature absente",
      400
    );
  }

  /*
   * Stripe exige le corps brut pour vérifier
   * correctement la signature.
   */
  const rawBody =
    await request.text();

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
  } catch (error) {
    console.error(
      "Signature Stripe invalide :",
      error
    );

    return jsonError(
      "Signature invalide",
      400
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data
            .object as Stripe.Checkout.Session;

        if (
          session.mode !== "subscription"
        ) {
          console.log(
            "Session Stripe ignorée : ce n'est pas un abonnement"
          );

          break;
        }

        const userId =
          session.client_reference_id ??
          session.metadata?.user_id;

        const customerId =
          getStripeId(session.customer);

        const subscriptionId =
          getStripeId(
            session.subscription
          );

        if (
          !userId ||
          !subscriptionId
        ) {
          /*
           * L'événement est authentique, mais son contenu
           * ne correspond pas au Checkout attendu.
           * On journalise puis on répond 200 pour éviter
           * des répétitions Stripe sans fin.
           */
          console.error(
            "Utilisateur ou abonnement Stripe introuvable",
            {
              eventId: event.id,
              sessionId: session.id,
            }
          );

          break;
        }

        const subscription =
          await stripe.subscriptions.retrieve(
            subscriptionId
          );

        if (
          !hasPremiumAccess(
            subscription.status
          )
        ) {
          console.warn(
            "Abonnement pas encore actif :",
            {
              subscriptionId,
              status:
                subscription.status,
            }
          );

          /*
           * customer.subscription.updated
           * synchronisera ensuite le statut.
           */
          break;
        }

        await activatePremium({
          userId,
          customerId,
          subscriptionId,
        });

        console.log(
          "✅ Premium activé pour l'utilisateur :",
          userId
        );

        await sendPremiumWelcomeEmail({
          userId,
          stripeEventId: event.id,
          customerId,
          subscriptionId,
        });

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription =
          event.data
            .object as Stripe.Subscription;

        await updatePremiumFromSubscription(
          subscription
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data
            .object as Stripe.Subscription;

        await disablePremium(
          subscription
        );

        break;
      }

      default:
        console.log(
          "Événement Stripe ignoré :",
          event.type
        );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Erreur traitement webhook Stripe :",
      {
        eventId: event.id,
        eventType: event.type,
        error,
      }
    );

    /*
     * On renvoie 500 afin que Stripe retente
     * l'événement lorsqu'une vraie opération
     * serveur ou Supabase a échoué.
     */
    return jsonError(
      "Erreur interne du webhook",
      500
    );
  }
}