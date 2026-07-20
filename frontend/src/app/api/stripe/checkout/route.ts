import {
  NextRequest,
  NextResponse,
} from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { stripe } from "@/app/lib/stripe";

export async function POST(
  req: NextRequest
) {
  try {
    const priceId =
      process.env.STRIPE_PRICE_ID;

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL;

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      !priceId ||
      !appUrl ||
      !supabaseUrl ||
      !supabaseAnonKey
    ) {
      console.error(
        "Configuration Stripe ou Supabase manquante"
      );

      return NextResponse.json(
        {
          error:
            "Le paiement est temporairement indisponible.",
        },
        { status: 500 }
      );
    }

    const authorization =
      req.headers.get("authorization");

    const accessToken =
      authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Utilisateur non connecté",
        },
        { status: 401 }
      );
    }

    const supabase = createClient(
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

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(
      accessToken
    );

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Session utilisateur invalide",
        },
        { status: 401 }
      );
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profils")
      .select(
        "premium, stripe_customer_id, stripe_subscription_id"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Erreur lecture profil Stripe :",
        profileError
      );

      return NextResponse.json(
        {
          error:
            "Impossible de vérifier votre abonnement.",
        },
        { status: 500 }
      );
    }

    if (
      profile?.premium ||
      profile?.stripe_subscription_id
    ) {
      return NextResponse.json(
        {
          error:
            "Un abonnement Premium existe déjà pour ce compte.",
        },
        { status: 409 }
      );
    }

    const checkoutParameters:
      Stripe.Checkout.SessionCreateParams = {
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
          `${appUrl}/premium?success=true`,

        cancel_url:
          `${appUrl}/premium?canceled=true`,
      };

    if (profile?.stripe_customer_id) {
      checkoutParameters.customer =
        profile.stripe_customer_id;
    } else if (user.email) {
      checkoutParameters.customer_email =
        user.email;
    }

    const session =
      await stripe.checkout.sessions.create(
        checkoutParameters
      );

    if (!session.url) {
      console.error(
        "Stripe n'a pas retourné d'URL de paiement"
      );

      return NextResponse.json(
        {
          error:
            "Impossible de créer la page de paiement.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Erreur Stripe Checkout :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de démarrer le paiement pour le moment.",
      },
      { status: 500 }
    );
  }
}