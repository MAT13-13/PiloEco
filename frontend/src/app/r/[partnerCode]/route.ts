import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    partnerCode: string;
  }>;
};

function getSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Les variables Supabase sont manquantes."
    );
  }

  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

function getSafeRedirectUrl(
  destination: string | null,
  request: NextRequest
) {
  if (!destination || destination === "/") {
    return new URL("/", request.url);
  }

  try {
    return new URL(destination);
  } catch {
    return new URL(destination, request.url);
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { partnerCode } = await context.params;

    const cleanPartnerCode =
      decodeURIComponent(partnerCode)
        .trim()
        .toLowerCase();

    if (!cleanPartnerCode) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    const supabase = getSupabaseClient();

    const referrer =
      request.headers.get("referer");

    const userAgent =
      request.headers.get("user-agent");

    const clickId = crypto.randomUUID();

const {
  data: destination,
  error,
} = await supabase.rpc(
  "track_partner_click_v2",
  {
    requested_partner_code:
      cleanPartnerCode,
    click_referrer: referrer,
    click_user_agent: userAgent,
    requested_click_id: clickId,
  }
);

    if (error) {
      console.error(
        "Erreur suivi clic partenaire :",
        error
      );

      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.redirect(
      getSafeRedirectUrl(
        destination as string | null,
        request
      )
    );
  } catch (error) {
    console.error(
      "Erreur route partenaire :",
      error
    );

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }
}