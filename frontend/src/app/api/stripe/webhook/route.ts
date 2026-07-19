import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/app/lib/stripe";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquant");

    return NextResponse.json(
      { error: "Configuration webhook manquante" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Signature absente" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Signature Stripe invalide :", error);

    return NextResponse.json(
      { error: "Signature invalide" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session =
        event.data.object as Stripe.Checkout.Session;

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

      if (!userId) {
        console.error(
          "Aucun user_id trouvé dans la session Stripe"
        );

        return NextResponse.json(
          { error: "Utilisateur introuvable" },
          { status: 400 }
        );
      }

      const { data, error } = await supabaseAdmin
        .from("profils")
        .update({
          premium: true,
          stripe_customer_id: customerId ?? null,
          stripe_subscription_id: subscriptionId ?? null,
        })
        .eq("id", userId)
        .select();

      if (error) {
        console.error(
          "Erreur activation Premium :",
          error
        );

        return NextResponse.json(
          { error: "Impossible d'activer Premium" },
          { status: 500 }
        );
      }

      if (!data || data.length === 0) {
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
        "Premium activé pour l'utilisateur :",
        userId
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
      { error: "Erreur interne du webhook" },
      { status: 500 }
    );
  }
}