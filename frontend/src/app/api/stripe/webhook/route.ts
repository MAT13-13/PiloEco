import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/app/lib/stripe";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { sendEmail } from "@/app/services/email/email.service";
import { generateEmailTemplate } from "@/app/services/email/email.templates";

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

  /*
   * Stripe peut renvoyer plusieurs fois le même webhook.
   * On vérifie donc que le mail correspondant à cet
   * événement précis n'a pas déjà été envoyé.
   */
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

  if (existingLogs && existingLogs.length > 0) {
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
        "https://pilo-eco.vercel.app/pilolife",
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
      stripe_customer_id: customerId ?? null,
      stripe_subscription_id:
        subscriptionId ?? null,
    },
  });

  if (!result.success) {
    /*
     * L'abonnement reste activé même si Resend
     * rencontre un problème. Le webhook ne doit pas
     * annuler l'accès Premium à cause d'un email.
     */
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

function hasPremiumAccess(
  status: Stripe.Subscription.Status
) {
  return (
    status === "active" ||
    status === "trialing"
  );
}

export async function POST(req: NextRequest) {
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "STRIPE_WEBHOOK_SECRET manquant"
    );

    return NextResponse.json(
      {
        error:
          "Configuration webhook manquante",
      },
      { status: 500 }
    );
  }

  const body = await req.text();

  const signature = req.headers.get(
    "stripe-signature"
  );

  if (!signature) {
    return NextResponse.json(
      { error: "Signature absente" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
  } catch (error) {
    console.error(
      "Signature Stripe invalide :",
      error
    );

    return NextResponse.json(
      { error: "Signature invalide" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
  const session =
    event.data.object as Stripe.Checkout.Session;

  if (session.mode !== "subscription") {
    console.log(
      "Session Stripe ignorée : ce n'est pas un abonnement"
    );

    break;
  }

  const userId =
    session.client_reference_id ??
    session.metadata?.user_id;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!userId || !subscriptionId) {
    console.error(
      "Utilisateur ou abonnement Stripe introuvable"
    );

    return NextResponse.json(
      {
        error:
          "Informations d'abonnement incomplètes",
      },
      { status: 400 }
    );
  }

  const subscription =
    await stripe.subscriptions.retrieve(
      subscriptionId
    );

  if (!hasPremiumAccess(subscription.status)) {
    console.error(
      "Abonnement non actif :",
      subscription.status
    );

    return NextResponse.json(
      {
        error:
          "L'abonnement n'est pas actif",
      },
      { status: 400 }
    );
  }

  const {
    data: updatedProfiles,
    error: updateError,
  } = await supabaseAdmin
    .from("profils")
    .update({
      premium: true,
      stripe_customer_id:
        customerId ?? null,
      stripe_subscription_id:
        subscriptionId,
    })
    .eq("id", userId)
    .select("id");

  if (updateError) {
    console.error(
      "Erreur activation Premium :",
      updateError
    );

    return NextResponse.json(
      {
        error:
          "Impossible d'activer Premium",
      },
      { status: 500 }
    );
  }

  if (
    !updatedProfiles ||
    updatedProfiles.length === 0
  ) {
    console.error(
      "Aucun profil trouvé pour l'utilisateur :",
      userId
    );

    return NextResponse.json(
      { error: "Profil introuvable" },
      { status: 404 }
    );
  }

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

case "customer.subscription.updated": {
  const subscription =
    event.data.object as Stripe.Subscription;

  const premium =
    hasPremiumAccess(subscription.status);

  const { error } =
    await supabaseAdmin
      .from("profils")
      .update({
        premium,
      })
      .eq(
        "stripe_subscription_id",
        subscription.id
      );

  if (error) {
    console.error(
      "Erreur mise à jour statut Premium :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de mettre à jour Premium",
      },
      { status: 500 }
    );
  }

  console.log(
    premium
      ? "✅ Abonnement Premium actif"
      : `⚠️ Premium désactivé, statut : ${subscription.status}`
  );

  break;
}

      case "customer.subscription.deleted": {
        const subscription =
          event.data
            .object as Stripe.Subscription;

        const subscriptionId =
          subscription.id;

        const { error } =
          await supabaseAdmin
            .from("profils")
            .update({
              premium: false,
              stripe_subscription_id: null,
            })
            .eq(
              "stripe_subscription_id",
              subscriptionId
            );

        if (error) {
          console.error(
            "Erreur désactivation Premium :",
            error
          );

          return NextResponse.json(
            {
              error:
                "Impossible de désactiver Premium",
            },
            { status: 500 }
          );
        }

        console.log(
          "✅ Premium désactivé pour l'abonnement :",
          subscriptionId
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
      error
    );

    return NextResponse.json(
      {
        error:
          "Erreur interne du webhook",
      },
      { status: 500 }
    );
  }
}