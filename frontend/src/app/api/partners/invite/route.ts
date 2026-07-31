import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

export const runtime = "nodejs";

type InvitePartnerBody = {
  requestId?: unknown;
};

type PartnerRequestRecord = {
  id: string;
  name: string;
  company: string;
  email: string;
  status: string;
  commission_percent: number | null;
  commission_fixed: number | null;
  total_sales: number | null;
  total_revenue: number | null;
  contract_url: string | null;
};

function createSupabaseAdmin(): SupabaseClient {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Configuration Supabase serveur manquante."
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

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
): string | null {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return null;
  }

  const token = authorization
    .slice("Bearer ".length)
    .trim();

  return token || null;
}

function isValidRequestId(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= 200
  );
}

export async function POST(
  request: NextRequest
) {
  const supabaseAdmin =
    createSupabaseAdmin();

  let invitedUserId: string | null = null;
  let partnerProfileCreated = false;

  try {
    /*
     * 1. Vérification de la session
     */
    const accessToken =
      getBearerToken(request);

    if (!accessToken) {
      return jsonError(
        "Vous devez être connecté.",
        401
      );
    }

    const {
      data: userData,
      error: userError,
    } = await supabaseAdmin.auth.getUser(
      accessToken
    );

    if (
      userError ||
      !userData.user
    ) {
      return jsonError(
        "Session invalide ou expirée.",
        401
      );
    }

    const adminUser =
      userData.user;

    /*
     * 2. Vérification du rôle administrateur
     */
    const {
      data: adminProfile,
      error: adminProfileError,
    } = await supabaseAdmin
      .from("profils")
      .select("role")
      .eq("id", adminUser.id)
      .maybeSingle();

    if (adminProfileError) {
      console.error(
        "Erreur vérification profil admin :",
        adminProfileError
      );

      return jsonError(
        "Impossible de vérifier vos droits.",
        500
      );
    }

    if (
      adminProfile?.role !== "admin"
    ) {
      return jsonError(
        "Accès réservé à l’administrateur.",
        403
      );
    }

    /*
     * 3. Lecture et validation du corps JSON
     */
    let body: InvitePartnerBody;

    try {
      body =
        (await request.json()) as InvitePartnerBody;
    } catch {
      return jsonError(
        "Corps de requête invalide.",
        400
      );
    }

    if (
      !isValidRequestId(body.requestId)
    ) {
      return jsonError(
        "Identifiant de demande invalide.",
        400
      );
    }

    const requestId =
      body.requestId.trim();

    /*
     * 4. Chargement de la demande partenaire
     */
    const {
      data: partnerRequestData,
      error: partnerRequestError,
    } = await supabaseAdmin
      .from("partner_requests")
      .select(
        `
          id,
          name,
          company,
          email,
          status,
          commission_percent,
          commission_fixed,
          total_sales,
          total_revenue,
          contract_url
        `
      )
      .eq("id", requestId)
      .maybeSingle();

    if (partnerRequestError) {
      console.error(
        "Erreur lecture demande partenaire :",
        partnerRequestError
      );

      return jsonError(
        "Impossible de charger la demande partenaire.",
        500
      );
    }

    if (!partnerRequestData) {
      return jsonError(
        "Demande partenaire introuvable.",
        404
      );
    }

    const partnerRequest =
      partnerRequestData as PartnerRequestRecord;

    const partnerEmail =
      typeof partnerRequest.email === "string"
        ? partnerRequest.email
            .trim()
            .toLowerCase()
        : "";

    if (!partnerEmail) {
      return jsonError(
        "La demande ne contient aucune adresse e-mail.",
        400
      );
    }

    /*
     * 5. Vérification d’un accès déjà existant
     */
    const {
      data: existingPartners,
      error: existingPartnerError,
    } = await supabaseAdmin
      .from("partner_profiles")
      .select(
        `
          id,
          user_id,
          invitation_status
        `
      )
      .or(
        `partner_request_id.eq.${partnerRequest.id},email.eq.${partnerEmail}`
      )
      .limit(1);

    if (existingPartnerError) {
      console.error(
        "Erreur vérification partenaire existant :",
        existingPartnerError
      );

      return jsonError(
        "Impossible de vérifier l’existence du partenaire.",
        500
      );
    }

    if (
      existingPartners &&
      existingPartners.length > 0
    ) {
      return jsonError(
        "Un accès existe déjà pour ce partenaire.",
        409
      );
    }

    /*
     * 6. Envoi de l’invitation Supabase
     */
    const siteUrl =
      (
        process.env.NEXT_PUBLIC_SITE_URL ??
        request.nextUrl.origin
      ).replace(/\/$/, "");

    const redirectTo =
      `${siteUrl}/auth/callback` +
      "?next=/partner-dashboard";

    const {
      data: invitationData,
      error: invitationError,
    } =
      await supabaseAdmin.auth.admin
        .inviteUserByEmail(
          partnerEmail,
          {
            redirectTo,
            data: {
              role: "partner",
              company:
                partnerRequest.company,
              contact_name:
                partnerRequest.name,
              partner_request_id:
                partnerRequest.id,
            },
          }
        );

    if (
      invitationError ||
      !invitationData.user
    ) {
      console.error(
        "Erreur invitation Supabase :",
        invitationError
      );

      return jsonError(
  invitationError?.message ??
    "Impossible d’envoyer l’invitation.",
  400
);
    }

    invitedUserId =
      invitationData.user.id;

    /*
     * 7. Création du profil partenaire
     */
    const {
      error: partnerProfileError,
    } = await supabaseAdmin
      .from("partner_profiles")
      .insert({
        user_id: invitedUserId,

        partner_request_id:
          partnerRequest.id,

        company:
          partnerRequest.company,

        contact_name:
          partnerRequest.name,

        email:
          partnerEmail,

        status: "pending",

        invitation_status: "sent",

        invited_at:
          new Date().toISOString(),

        commission_percent:
          partnerRequest.commission_percent,

        commission_fixed:
          partnerRequest.commission_fixed,

        total_sales:
          partnerRequest.total_sales ?? 0,

        total_revenue:
          partnerRequest.total_revenue ?? 0,

        contract_url:
          partnerRequest.contract_url,
      });

    if (partnerProfileError) {
      console.error(
        "Erreur création profil partenaire :",
        partnerProfileError
      );

      throw new Error(
        "Impossible de créer le profil partenaire."
      );
    }

    partnerProfileCreated = true;

    /*
     * 8. Création ou mise à jour du rôle global
     */
    const {
      data: existingRoleProfile,
      error: existingRoleProfileError,
    } = await supabaseAdmin
      .from("profils")
      .select("id")
      .eq("id", invitedUserId)
      .maybeSingle();

    if (existingRoleProfileError) {
      console.error(
        "Erreur vérification profil utilisateur :",
        existingRoleProfileError
      );

      throw new Error(
        "Impossible de vérifier le profil utilisateur."
      );
    }

    if (existingRoleProfile) {
      const {
        error: roleUpdateError,
      } = await supabaseAdmin
        .from("profils")
        .update({
          role: "partner",
        })
        .eq("id", invitedUserId);

      if (roleUpdateError) {
        console.error(
          "Erreur mise à jour rôle partenaire :",
          roleUpdateError
        );

        throw new Error(
          "Impossible d’attribuer le rôle partenaire."
        );
      }
    } else {
      const {
        error: roleInsertError,
      } = await supabaseAdmin
        .from("profils")
        .insert({
          id: invitedUserId,
          role: "partner",
        });

      if (roleInsertError) {
        console.error(
          "Erreur création rôle partenaire :",
          roleInsertError
        );

        throw new Error(
          "Impossible de créer le rôle partenaire."
        );
      }
    }

    /*
     * 9. Mise à jour de la demande partenaire
     */
    const updateValues: {
      status: string;
      signed_date?: string;
    } = {
      status: "Accepté",
    };

    if (
      partnerRequest.status !== "Accepté"
    ) {
      updateValues.signed_date =
        new Date()
          .toISOString()
          .slice(0, 10);
    }

    const {
      error: requestUpdateError,
    } = await supabaseAdmin
      .from("partner_requests")
      .update(updateValues)
      .eq("id", partnerRequest.id);

    if (requestUpdateError) {
      console.error(
        "Erreur mise à jour demande partenaire :",
        requestUpdateError
      );

      throw new Error(
        "Impossible de mettre à jour la demande partenaire."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "L’invitation partenaire a été envoyée avec succès.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Erreur invitation partenaire :",
      error
    );

    /*
     * Nettoyage en cas d’échec après l’invitation.
     */
    if (invitedUserId) {
      if (partnerProfileCreated) {
        const {
          error: profileCleanupError,
        } = await supabaseAdmin
          .from("partner_profiles")
          .delete()
          .eq("user_id", invitedUserId);

        if (profileCleanupError) {
          console.error(
            "Échec nettoyage partner_profiles :",
            profileCleanupError
          );
        }
      }

      const {
        error: roleCleanupError,
      } = await supabaseAdmin
        .from("profils")
        .delete()
        .eq("id", invitedUserId)
        .eq("role", "partner");

      if (roleCleanupError) {
        console.error(
          "Échec nettoyage profils :",
          roleCleanupError
        );
      }

      const {
        error: userCleanupError,
      } =
        await supabaseAdmin.auth.admin
          .deleteUser(invitedUserId);

      if (userCleanupError) {
        console.error(
          "Échec suppression utilisateur invité :",
          userCleanupError
        );
      }
    }

    return jsonError(
      "Une erreur est survenue pendant l’invitation du partenaire.",
      500
    );
  }
}