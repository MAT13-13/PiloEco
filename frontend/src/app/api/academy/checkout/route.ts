

import {
  NextRequest,
  NextResponse,
} from "next/server";

import Stripe from "stripe";
import { stripe } from "@/app/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AcademyProductSlug =
  | "site-ia"
  | "mon-business"
  | "30-jours-visibilite"
  | "neuroscience"
  | "pack";

const PRODUCTS: Record<
  AcademyProductSlug,
  {
    name: string;
    priceEnv: string;
  }
> = {
  "site-ia": {
    name: "Site IA",
    priceEnv: "STRIPE_PRICE_ACADEMY_SITE_IA",
  },
  "mon-business": {
    name: "Mon Business",
    priceEnv: "STRIPE_PRICE_ACADEMY_MON_BUSINESS",
  },
  "30-jours-visibilite": {
    name: "30 Jours de Visibilité",
    priceEnv: "STRIPE_PRICE_ACADEMY_VISIBILITE",
  },
  neuroscience: {
    name: "Neuroscience",
    priceEnv: "STRIPE_PRICE_ACADEMY_NEUROSCIENCE",
  },
  pack: {
    name: "Pack complet Pilo Academy",
    priceEnv: "STRIPE_PRICE_ACADEMY_PACK",
  },
};

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

function normalizeAppUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function isAcademyProductSlug(value: unknown): value is AcademyProductSlug {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(PRODUCTS, value)
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!rawAppUrl) {
      return jsonError(
        "NEXT_PUBLIC_APP_URL est manquante.",
        500
      );
    }

    const appUrl = normalizeAppUrl(rawAppUrl);

    let parsedAppUrl: URL;

    try {
      parsedAppUrl = new URL(appUrl);
    } catch {
      return jsonError(
        "NEXT_PUBLIC_APP_URL est invalide.",
        500
      );
    }

    if (
      parsedAppUrl.protocol !== "https:" &&
      parsedAppUrl.hostname !== "localhost"
    ) {
      return jsonError(
        "NEXT_PUBLIC_APP_URL doit utiliser HTTPS en production.",
        500
      );
    }

    const body = await request.json().catch(() => null);
    const productSlug = body?.productSlug;

    if (!isAcademyProductSlug(productSlug)) {
      return jsonError(
        "Produit Pilo Academy invalide.",
        400
      );
    }

    const product = PRODUCTS[productSlug];
    const priceId = process.env[product.priceEnv];

    if (!priceId) {
      console.error(
        `Variable Stripe manquante : ${product.priceEnv}`
      );

      return jsonError(
        "Ce produit n'est pas encore disponible au paiement.",
        500
      );
    }

    const checkoutParameters: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        purchase_type: "academy",
        product_slug: productSlug,
        product_name: product.name,
      },

      payment_intent_data: {
        metadata: {
          purchase_type: "academy",
          product_slug: productSlug,
          product_name: product.name,
        },
      },

      customer_creation: "always",

      billing_address_collection: "auto",

      success_url:
        `${appUrl}/academy/merci?success=true&product=${encodeURIComponent(
          productSlug
        )}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${appUrl}/academy?canceled=true#parcours`,

      allow_promotion_codes: false,
    };

    const session =
      await stripe.checkout.sessions.create(
        checkoutParameters
      );

    if (!session.url) {
      return jsonError(
        "Stripe n'a pas retourné d'URL de paiement.",
        500
      );
    }

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Erreur Stripe Checkout Academy :",
      error
    );

    return jsonError(
      "Impossible de démarrer le paiement pour le moment.",
      500
    );
  }
}
