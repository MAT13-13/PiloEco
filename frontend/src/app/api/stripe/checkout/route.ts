import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!priceId || !appUrl) {
      return NextResponse.json(
        {
          error:
            "STRIPE_PRICE_ID ou NEXT_PUBLIC_APP_URL manquant dans les variables d'environnement",
        },
        { status: 500 }
      );
    }

    const authorization = req.headers.get("authorization");
    const accessToken = authorization?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Utilisateur non connecté" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Session utilisateur invalide" },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      client_reference_id: user.id,

      customer_email: user.email,

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

      success_url: `${appUrl}/premium?success=true`,
      cancel_url: `${appUrl}/premium?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Erreur Stripe Checkout :", error);

    return NextResponse.json(
      { error: "Impossible de créer la session Stripe" },
      { status: 500 }
    );
  }
}