import {
  NextRequest,
  NextResponse,
} from "next/server";

import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

import { stripe } from "@/app/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACADEMY_BUCKET = "academy-private";

type AcademyProductSlug =
  | "site-ia"
  | "mon-business"
  | "30-jours-visibilite"
  | "neuroscience"
  | "pack";

type AcademyProduct = {
  name: string;
  files: string[];
};

const PRODUCTS: Record<
  Exclude<AcademyProductSlug, "pack">,
  AcademyProduct
> = {
  "site-ia": {
    name: "Site IA",
    files: [
      "Pilo_Academy_Guide_Complet_Creer_Vendre_Sites_IA.pdf",
    ],
  },

  "mon-business": {
    name: "Mon Business",
    files: [
      "Pilo_Academy_Mon_Business_Ebook.pdf",
    ],
  },

  "30-jours-visibilite": {
    name: "30 Jours de Visibilité",
    files: [
      "Pilo_Academy_30_Jours_Visibilite_Ebook.pdf",
    ],
  },

  neuroscience: {
    name: "Neuroscience",
    files: [
      "Pilo_Academy_Neuroscience.pdf",
    ],
  },
};

const PACK_FILES = [
  ...PRODUCTS["site-ia"].files,
  ...PRODUCTS["mon-business"].files,
  ...PRODUCTS["30-jours-visibilite"].files,
  ...PRODUCTS.neuroscience.files,
];

function isAcademyProductSlug(
  value: string | null | undefined
): value is AcademyProductSlug {
  return (
    value === "site-ia" ||
    value === "mon-business" ||
    value === "30-jours-visibilite" ||
    value === "neuroscience" ||
    value === "pack"
  );
}

function getProduct(
  slug: AcademyProductSlug
): AcademyProduct {
  if (slug === "pack") {
    return {
      name: "Pack complet Pilo Academy",
      files: PACK_FILES,
    };
  }

  return PRODUCTS[slug];
}

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL est manquante."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY est manquante."
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

async function buildAttachments(
  fileNames: string[]
) {
  const supabase =
    getSupabaseAdmin();

  return Promise.all(
    fileNames.map(async (fileName) => {
      const {
        data,
        error,
      } = await supabase.storage
        .from(ACADEMY_BUCKET)
        .download(fileName);

      if (error || !data) {
        console.error(
          "Erreur téléchargement PDF Academy :",
          {
            fileName,
            error,
          }
        );

        throw new Error(
          `Impossible de récupérer le fichier ${fileName}.`
        );
      }

      const arrayBuffer =
        await data.arrayBuffer();

      const content =
        Buffer.from(arrayBuffer);

      return {
        filename: fileName,
        content,
        contentType: "application/pdf",
      };
    })
  );
}

function buildEmailHtml(
  productName: string,
  isPack: boolean
) {
  return `
    <div style="background:#f8f4ec;padding:32px 16px;font-family:Arial,sans-serif;color:#12372f;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e8eee9;">

        <div style="font-size:13px;font-weight:800;letter-spacing:1.5px;color:#07835f;text-transform:uppercase;">
          Pilo Academy
        </div>

        <h1 style="font-size:28px;line-height:1.15;margin:14px 0 12px;color:#063f31;">
          Ton parcours est prêt 🎓
        </h1>

        <p style="font-size:16px;line-height:1.7;color:#52635e;margin:0 0 18px;">
          Merci pour ta commande.
        </p>

        <div style="background:#f1fbf6;border-radius:18px;padding:18px;margin:20px 0;">
          <div style="font-size:12px;font-weight:800;color:#07835f;text-transform:uppercase;letter-spacing:1px;">
            Ta commande
          </div>

          <div style="font-size:20px;font-weight:900;color:#063f31;margin-top:5px;">
            ${productName}
          </div>
        </div>

        <p style="font-size:16px;line-height:1.7;color:#52635e;">
          ${
            isPack
              ? "Tu trouveras les guides de ton Pack Pilo Academy en pièces jointes à cet e-mail."
              : "Tu trouveras ton guide Pilo Academy directement en pièce jointe à cet e-mail."
          }
        </p>

        <p style="font-size:16px;line-height:1.7;color:#52635e;">
          Garde cet e-mail précieusement afin de pouvoir retrouver ton contenu facilement.
        </p>

        <div style="margin-top:26px;padding-top:22px;border-top:1px solid #edf0ee;">
          <strong style="color:#063f31;">
            Bonne lecture et surtout, passe à l'action 🚀
          </strong>

          <div style="margin-top:8px;color:#07835f;font-weight:800;">
            Pilo Academy
          </div>
        </div>

      </div>
    </div>
  `;
}

async function sendAcademyPurchaseEmail(
  email: string,
  productSlug: AcademyProductSlug
) {
  const resendApiKey =
    process.env.RESEND_API_KEY;

  const from =
    process.env.ACADEMY_EMAIL_FROM ||
    "Pilo Academy <contact@piloeco.com>";

  if (!resendApiKey) {
    throw new Error(
      "RESEND_API_KEY est manquante."
    );
  }

  const resend =
    new Resend(resendApiKey);

  const product =
    getProduct(productSlug);

  /*
   * Les PDF sont téléchargés depuis
   * le bucket Supabase privé.
   */
  const attachments =
    await buildAttachments(
      product.files
    );

  const result =
    await resend.emails.send({
      from,
      to: email,

      subject:
        productSlug === "pack"
          ? "🎓 Ton Pack Pilo Academy est prêt"
          : `🎓 Ton parcours ${product.name} est prêt`,

      html: buildEmailHtml(
        product.name,
        productSlug === "pack"
      ),

      attachments,
    });

  if (result.error) {
    throw new Error(
      `Erreur Resend : ${result.error.message}`
    );
  }

  return result.data;
}

async function alreadyDelivered(
  session: Stripe.Checkout.Session
) {
  if (!session.payment_intent) {
    return false;
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent.id;

  const paymentIntent =
    await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

  return (
    paymentIntent.metadata
      .academy_delivered === "true"
  );
}

async function markAsDelivered(
  session: Stripe.Checkout.Session
) {
  if (!session.payment_intent) {
    return;
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent.id;

  await stripe.paymentIntents.update(
    paymentIntentId,
    {
      metadata: {
        academy_delivered: "true",
        academy_delivered_at:
          new Date().toISOString(),
      },
    }
  );
}

export async function POST(
  request: NextRequest
) {
  const webhookSecret =
    process.env
      .STRIPE_ACADEMY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "STRIPE_ACADEMY_WEBHOOK_SECRET manquante."
    );

    return NextResponse.json(
      {
        error:
          "Webhook non configuré.",
      },
      {
        status: 500,
      }
    );
  }

  const signature =
    request.headers.get(
      "stripe-signature"
    );

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Signature Stripe absente.",
      },
      {
        status: 400,
      }
    );
  }

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
      "Signature webhook Stripe invalide :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Signature webhook invalide.",
      },
      {
        status: 400,
      }
    );
  }

  /*
   * On ne traite que le paiement
   * Checkout terminé.
   */
  if (
    event.type !==
    "checkout.session.completed"
  ) {
    return NextResponse.json({
      received: true,
    });
  }

  const session =
    event.data.object as Stripe.Checkout.Session;

  /*
   * Ce webhook ne doit livrer
   * QUE les achats Academy.
   */
  if (
    session.metadata?.purchase_type !==
    "academy"
  ) {
    return NextResponse.json({
      received: true,
    });
  }

  /*
   * Pas de livraison sans paiement.
   */
  if (
    session.payment_status !== "paid"
  ) {
    console.warn(
      "Checkout Academy terminé mais non payé :",
      session.id
    );

    return NextResponse.json({
      received: true,
    });
  }

  const productSlug =
    session.metadata?.product_slug;

  if (
    !isAcademyProductSlug(
      productSlug
    )
  ) {
    console.error(
      "Produit Academy inconnu :",
      productSlug
    );

    return NextResponse.json(
      {
        error:
          "Produit Academy invalide.",
      },
      {
        status: 400,
      }
    );
  }

  const customerEmail =
    session.customer_details?.email ||
    session.customer_email;

  if (!customerEmail) {
    console.error(
      "Aucun e-mail client sur la session Academy :",
      session.id
    );

    return NextResponse.json(
      {
        error:
          "E-mail client introuvable.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    /*
     * Stripe peut renvoyer un webhook
     * plusieurs fois.
     *
     * On évite donc d'envoyer
     * plusieurs fois le même ebook.
     */
    const delivered =
      await alreadyDelivered(
        session
      );

    if (delivered) {
      console.log(
        "Commande Academy déjà livrée :",
        session.id
      );

      return NextResponse.json({
        received: true,
        delivered: true,
        duplicate: true,
      });
    }

    await sendAcademyPurchaseEmail(
      customerEmail,
      productSlug
    );

    await markAsDelivered(
      session
    );

    console.log(
      "Commande Pilo Academy livrée :",
      {
        sessionId: session.id,
        productSlug,
        email: customerEmail,
      }
    );

    return NextResponse.json({
      received: true,
      delivered: true,
    });
  } catch (error) {
    /*
     * On renvoie 500 :
     * Stripe pourra retenter automatiquement
     * le webhook si Supabase ou Resend
     * a un problème temporaire.
     */
    console.error(
      "Échec livraison Pilo Academy :",
      {
        sessionId: session.id,
        productSlug,
        email: customerEmail,
        error,
      }
    );

    return NextResponse.json(
      {
        error:
          "Échec de livraison Academy.",
      },
      {
        status: 500,
      }
    );
  }
}