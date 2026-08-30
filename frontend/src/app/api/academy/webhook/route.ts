import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

import Stripe from "stripe";
import { Resend } from "resend";

import { stripe } from "@/app/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

async function buildAttachments(
  fileNames: string[]
) {
  return Promise.all(
    fileNames.map(async (fileName) => {
      /*
       * Les PDF restent hors du dossier /public :
       * ils ne sont donc pas accessibles directement par URL.
       *
       * Arborescence attendue :
       *
       * frontend/
       *   private/
       *     academy/
       *       ...pdf
       */
      const filePath = path.join(
        process.cwd(),
        "private",
        "academy",
        fileName
      );

      const content =
        await readFile(filePath);

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
          <strong style="color:#063f31;">Bonne lecture et surtout, passe à l'action 🚀</strong>
          <div style="margin-top:8px;color:#07835f;font-weight:800;">Pilo Academy</div>
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

  const attachments =
    await buildAttachments(
      product.files
    );

  const result = await resend.emails.send({
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
      { error: "Webhook non configuré." },
      { status: 500 }
    );
  }

  const signature =
    request.headers.get(
      "stripe-signature"
    );

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe absente." },
      { status: 400 }
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
      { status: 400 }
    );
  }

  /*
   * On traite uniquement la validation d'un paiement Checkout.
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
   * Protection :
   * ce webhook ne livre que les produits Academy.
   */
  if (
    session.metadata?.purchase_type !==
    "academy"
  ) {
    return NextResponse.json({
      received: true,
    });
  }

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
      { status: 400 }
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
      { status: 400 }
    );
  }

  try {
    await sendAcademyPurchaseEmail(
      customerEmail,
      productSlug
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
     * Important :
     * on renvoie 500 afin que Stripe puisse retenter
     * automatiquement le webhook si l'envoi échoue.
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
      { status: 500 }
    );
  }
}
