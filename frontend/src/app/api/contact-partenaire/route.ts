import {
  NextRequest,
  NextResponse,
} from "next/server";

import { Resend } from "resend";

import { supabaseAdmin } from "../../lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPartnerPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  website?: unknown;
  partnershipType?: unknown;
  message?: unknown;

  /*
   * Champ invisible anti-robot.
   * Il doit rester vide pour un vrai utilisateur.
   */
  contactPhone?: unknown;
};

const MAX_BODY_SIZE = 10_000;

const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 150;
const MAX_EMAIL_LENGTH = 254;
const MAX_WEBSITE_LENGTH = 300;
const MAX_PARTNERSHIP_TYPE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 3000;

function jsonResponse(
  body: Record<string, unknown>,
  status: number
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function jsonError(
  message: string,
  status: number
) {
  return jsonResponse(
    {
      success: false,
      error: message,
    },
    status
  );
}

function isPayloadObject(
  value: unknown
): value is ContactPartnerPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getString(
  value: unknown
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

/*
 * Empêche l’injection de retours à la ligne
 * dans les sujets et en-têtes d’e-mail.
 */
function sanitizeHeaderValue(
  value: string
) {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(
  email: string
) {
  return (
    email.length > 0 &&
    email.length <= MAX_EMAIL_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function normalizeWebsite(
  value: string
): string | null {
  if (!value) {
    return null;
  }

  try {
    const websiteUrl = new URL(value);

    if (
      websiteUrl.protocol !== "http:" &&
      websiteUrl.protocol !== "https:"
    ) {
      return null;
    }

    /*
     * Refuse les URL de la forme :
     * https://identifiant:motdepasse@site.com
     */
    if (
      websiteUrl.username ||
      websiteUrl.password
    ) {
      return null;
    }

    return websiteUrl.toString();
  } catch {
    return null;
  }
}

function validateLength(
  value: string,
  maxLength: number
) {
  return (
    value.length > 0 &&
    value.length <= maxLength
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const contentType =
      request.headers.get("content-type");

    if (
      !contentType
        ?.toLowerCase()
        .includes("application/json")
    ) {
      return jsonError(
        "Le format du formulaire est invalide.",
        415
      );
    }

    const contentLengthHeader =
      request.headers.get("content-length");

    if (contentLengthHeader) {
      const contentLength =
        Number(contentLengthHeader);

      if (
        Number.isFinite(contentLength) &&
        contentLength > MAX_BODY_SIZE
      ) {
        return jsonError(
          "Le formulaire envoyé est trop volumineux.",
          413
        );
      }
    }

    let rawBody: unknown;

    try {
      rawBody = await request.json();
    } catch {
      return jsonError(
        "Le formulaire envoyé est invalide.",
        400
      );
    }

    if (!isPayloadObject(rawBody)) {
      return jsonError(
        "Les informations envoyées sont invalides.",
        400
      );
    }

    const serializedBody =
      JSON.stringify(rawBody);

    if (
      serializedBody.length >
      MAX_BODY_SIZE
    ) {
      return jsonError(
        "Le formulaire envoyé est trop volumineux.",
        413
      );
    }

    const body = rawBody;

    /*
     * Honeypot anti-robot.
     * Un robot remplit souvent ce champ invisible.
     */
    const honeypot =
      getString(body.contactPhone);

    if (honeypot) {
      /*
       * On répond comme si la demande avait été acceptée
       * afin de ne pas révéler le fonctionnement du filtre.
       */
      return jsonResponse(
        {
          success: true,
          message:
            "Votre demande de partenariat a bien été envoyée.",
        },
        201
      );
    }

    const name =
      getString(body.name);

    const company =
      getString(body.company);

    const email =
      getString(body.email)
        .toLowerCase();

    const rawWebsite =
      getString(body.website);

    const partnershipType =
      getString(body.partnershipType);

    const message =
      getString(body.message);

    if (
      !name ||
      !company ||
      !email ||
      !partnershipType ||
      !message
    ) {
      return jsonError(
        "Merci de remplir tous les champs obligatoires.",
        400
      );
    }

    if (
      !validateLength(
        name,
        MAX_NAME_LENGTH
      )
    ) {
      return jsonError(
        "Le nom renseigné est trop long.",
        400
      );
    }

    if (
      !validateLength(
        company,
        MAX_COMPANY_LENGTH
      )
    ) {
      return jsonError(
        "Le nom de l’entreprise est trop long.",
        400
      );
    }

    if (!isValidEmail(email)) {
      return jsonError(
        "L’adresse e-mail saisie n’est pas valide.",
        400
      );
    }

    if (
      !validateLength(
        partnershipType,
        MAX_PARTNERSHIP_TYPE_LENGTH
      )
    ) {
      return jsonError(
        "Le type de partenariat est invalide.",
        400
      );
    }

    if (
      !validateLength(
        message,
        MAX_MESSAGE_LENGTH
      )
    ) {
      return jsonError(
        `Le message ne doit pas dépasser ${MAX_MESSAGE_LENGTH} caractères.`,
        400
      );
    }

    let website: string | null = null;

    if (rawWebsite) {
      if (
        rawWebsite.length >
        MAX_WEBSITE_LENGTH
      ) {
        return jsonError(
          "L’adresse du site internet est trop longue.",
          400
        );
      }

      website =
        normalizeWebsite(rawWebsite);

      if (!website) {
        return jsonError(
          "L’adresse du site internet n’est pas valide. Utilise une adresse commençant par http:// ou https://.",
          400
        );
      }
    }

    /*
     * Empêche une même adresse e-mail
     * d’envoyer plusieurs demandes en moins de 10 minutes.
     */
    const duplicateLimitDate =
      new Date(
        Date.now() -
          10 * 60 * 1000
      ).toISOString();

    const {
      data: recentRequests,
      error: duplicateCheckError,
    } = await supabaseAdmin
      .from("partner_requests")
      .select("id")
      .eq("email", email)
      .gte(
        "created_at",
        duplicateLimitDate
      )
      .limit(1);

    if (duplicateCheckError) {
      console.error(
        "Erreur vérification doublon partenaire :",
        duplicateCheckError
      );

      return jsonError(
        "Impossible de vérifier la demande.",
        500
      );
    }

    if (
      recentRequests &&
      recentRequests.length > 0
    ) {
      return jsonError(
        "Une demande a déjà été envoyée récemment avec cette adresse e-mail.",
        429
      );
    }

    const {
      data: insertedRequest,
      error: databaseError,
    } = await supabaseAdmin
      .from("partner_requests")
      .insert({
        name,
        company,
        email,
        website,
        partnership_type:
          partnershipType,
        message,
        status: "En attente",
      })
      .select("id")
      .single();

    if (databaseError) {
      console.error(
        "Erreur enregistrement demande partenaire :",
        databaseError
      );

      return jsonError(
        "La demande n’a pas pu être enregistrée.",
        500
      );
    }

    /*
     * La demande est maintenant enregistrée.
     * Une panne de Resend ne doit donc pas faire croire
     * qu’elle a été perdue.
     */
    const resendApiKey =
      process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error(
        "Variable RESEND_API_KEY manquante. Demande partenaire enregistrée sans notification.",
        {
          partnerRequestId:
            insertedRequest.id,
        }
      );

      return jsonResponse(
        {
          success: true,
          message:
            "Votre demande de partenariat a bien été enregistrée.",
        },
        201
      );
    }

    const resend =
      new Resend(resendApiKey);

    const safeName =
      escapeHtml(name);

    const safeCompany =
      escapeHtml(company);

    const safeEmail =
      escapeHtml(email);

    const safeWebsite =
      website
        ? escapeHtml(website)
        : "Non renseigné";

    const safePartnershipType =
      escapeHtml(partnershipType);

    const safeMessage =
      escapeHtml(message).replaceAll(
        "\n",
        "<br />"
      );

    const safeSubjectCompany =
      sanitizeHeaderValue(company);

    /*
     * E-mail interne.
     */
    const {
      error: notificationEmailError,
    } = await resend.emails.send({
      from:
        "PiloEco <contact@piloeco.com>",

      to: [
        "partenariats@piloeco.com",
      ],

      replyTo: email,

      subject:
        `Nouvelle demande de partenariat — ${safeSubjectCompany}`,

      html: `
        <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
          <h1 style="color: #059669;">
            Nouvelle demande de partenariat
          </h1>

          <p>
            Une nouvelle demande a été envoyée depuis le site PiloEco.
          </p>

          <div style="margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 16px;">
            <p>
              <strong>Référence :</strong>
              ${escapeHtml(insertedRequest.id)}
            </p>

            <p>
              <strong>Nom :</strong>
              ${safeName}
            </p>

            <p>
              <strong>Entreprise :</strong>
              ${safeCompany}
            </p>

            <p>
              <strong>E-mail :</strong>
              ${safeEmail}
            </p>

            <p>
              <strong>Site internet :</strong>
              ${safeWebsite}
            </p>

            <p>
              <strong>Type de partenariat :</strong>
              ${safePartnershipType}
            </p>
          </div>

          <div style="margin-top: 24px;">
            <p>
              <strong>Message :</strong>
            </p>

            <p>
              ${safeMessage}
            </p>
          </div>
        </div>
      `,
    });

    if (notificationEmailError) {
      console.error(
        "Erreur Resend e-mail interne :",
        notificationEmailError
      );
    }

    /*
     * E-mail de confirmation envoyé au partenaire.
     */
    const {
      error: confirmationEmailError,
    } = await resend.emails.send({
      from:
        "PiloEco <contact@piloeco.com>",

      to: [email],

      subject:
        "Votre demande de partenariat a bien été reçue",

      html: `
        <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
          <h1 style="color: #059669;">
            Merci pour votre message
          </h1>

          <p>
            Bonjour ${safeName},
          </p>

          <p>
            Nous avons bien reçu votre demande de partenariat concernant
            <strong>${safeCompany}</strong>.
          </p>

          <p>
            L’équipe PiloEco étudiera votre proposition et reviendra vers vous rapidement.
          </p>

          <p style="margin-top: 28px;">
            Bien cordialement,<br />
            <strong>L’équipe PiloEco</strong><br />
            www.piloeco.com
          </p>
        </div>
      `,
    });

    if (confirmationEmailError) {
      console.error(
        "Erreur Resend e-mail de confirmation :",
        confirmationEmailError
      );
    }

    return jsonResponse(
      {
        success: true,
        message:
          "Votre demande de partenariat a bien été envoyée.",
      },
      201
    );
  } catch (error) {
    console.error(
      "Erreur route contact partenaire :",
      error
    );

    return jsonError(
      "Une erreur inattendue est survenue.",
      500
    );
  }
}