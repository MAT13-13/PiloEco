import {
  NextRequest,
  NextResponse,
} from "next/server";

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { stripe } from "@/app/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(
  message: string,
  status: number
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
    }
  );
}

function getBearerToken(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization?.startsWith("Bearer ")
  ) {
    return null;
  }

  return authorization.slice(7).trim();
}

function normalizeAppUrl(
  value: string
) {
  return value.replace(/\/+$/, "");
}

export async function POST(
  request: NextRequest
) {
  try {
    const priceId =
      process.env.STRIPE_PRICE_ID;

    const rawAppUrl =
      process.env.NEXT_PUBLIC_APP_URL;

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      !priceId ||
      !rawAppUrl ||
      !supabaseUrl ||
      !supabaseAnonKey
    ) {
      console.error(
        "Configuration Stripe ou Supabase manquante"
      );

      return jsonError(
        "Le paiement est temporairement indisponible.",
        500
      );
    }

    const appUrl =
      normalizeAppUrl(rawAppUrl);

    let parsedAppUrl: URL;

    try {
      parsedAppUrl = new URL(appUrl);
    } catch {
      console.error(
        "NEXT_PUBLIC_APP_URL invalide :",
        appUrl
      );

      return jsonError(
        "La configuration du site est invalide.",
        500
      );
    }

    if (
      parsedAppUrl.protocol !== "https:" &&
      parsedAppUrl.hostname !==
        "localhost"
    ) {
      console.error(
        "NEXT_PUBLIC_APP_URL doit utiliser HTTPS en production."
      );

      return jsonError(
        "La configuration du paiement est invalide.",
        500
      );
    }

    const accessToken =
      getBearerToken(request);

    if (!accessToken) {
      return jsonError(
        "Utilisateur non connecté.",
        401
      );
    }

    /*
     * Ce client utilise la clé publique Supabase,
     * accompagnée du token de l'utilisateur.
     */
    const supabase =
      createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          global: {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          },

          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
          },
        }
      );

    /*
     * getUser contacte Supabase Auth et vérifie
     * réellement le token reçu.
     */
    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser(
        accessToken
      );

    if (userError || !user) {
      return jsonError(
        "Session utilisateur invalide ou expirée.",
        401
      );
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profils")
      .select(
        `
          premium,
          stripe_customer_id,
          stripe_subscription_id
        `
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Erreur lecture profil Stripe :",
        profileError
      );

      return jsonError(
        "Impossible de vérifier votre abonnement.",
        500
      );
    }

    if (!profile) {
      return jsonError(
        "Votre profil utilisateur est introuvable.",
        404
      );
    }

    if (profile.premium) {
      return jsonError(
        "Ce compte possède déjà un abonnement Premium actif.",
        409
      );
    }

    /*
     * Si un identifiant d'abonnement existe déjà,
     * on vérifie directement son statut dans Stripe.
     */
    if (
      profile.stripe_subscription_id
    ) {
      try {
        const existingSubscription =
          await stripe.subscriptions.retrieve(
            profile.stripe_subscription_id
          );

        const subscriptionExists =
          existingSubscription.status !==
            "canceled" &&
          existingSubscription.status !==
            "incomplete_expired";

        if (subscriptionExists) {
          return jsonError(
            "Un abonnement Stripe existe déjà pour ce compte.",
            409
          );
        }
      } catch (error) {
        if (
          error instanceof
            Stripe.errors.StripeInvalidRequestError
        ) {
          console.warn(
            "Ancien abonnement Stripe introuvable :",
            profile.stripe_subscription_id
          );
        } else {
          throw error;
        }
      }
    }

    const checkoutParameters:
      Stripe.Checkout.SessionCreateParams =
      {
        mode: "subscription",

        client_reference_id: user.id,

        metadata: {
          user_id: user.id,
        },

        subscription_data: {
          metadata: {
            user_id: user.id,
          },
        },

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        success_url:
          `${appUrl}/premium?success=true&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${appUrl}/premium?canceled=true`,

        allow_promotion_codes: false,
      };

    if (
      profile.stripe_customer_id
    ) {
      checkoutParameters.customer =
        profile.stripe_customer_id;
    } else if (user.email) {
      checkoutParameters.customer_email =
        user.email;
    } else {
      return jsonError(
        "Aucune adresse e-mail n’est associée à ce compte.",
        400
      );
    }

    const session =
      await stripe.checkout.sessions.create(
        checkoutParameters
      );

    if (!session.url) {
      console.error(
        "Stripe n'a pas retourné d'URL de paiement",
        {
          sessionId: session.id,
          userId: user.id,
        }
      );

      return jsonError(
        "Impossible de créer la page de paiement.",
        500
      );
    }

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Erreur Stripe Checkout :",
      error
    );

    return jsonError(
      "Impossible de démarrer le paiement pour le moment.",
      500
    );
  }
}