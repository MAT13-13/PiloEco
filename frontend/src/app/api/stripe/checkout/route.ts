import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";

export async function POST() {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_ID manquant dans .env.local" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/premium?success=true",
      cancel_url: "http://localhost:3000/premium?canceled=true",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe Checkout:", error);

    return NextResponse.json(
      { error: "Impossible de créer la session Stripe" },
      { status: 500 }
    );
  }
}