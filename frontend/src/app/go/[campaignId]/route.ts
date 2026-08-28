import { NextRequest, NextResponse } from "next/server";

import { affiliateCampaigns } from "@/app/lib/affiliate-campaigns";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    campaignId: string;
  }>;
};

function getFallbackUrl(request: NextRequest) {
  return new URL("/missions", request.url);
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const fallbackUrl = getFallbackUrl(request);

  try {
    const { campaignId } = await context.params;
    const numericCampaignId = Number(campaignId);

    if (
      !Number.isInteger(numericCampaignId) ||
      numericCampaignId <= 0
    ) {
      return NextResponse.redirect(fallbackUrl);
    }

    const campaign = affiliateCampaigns.find(
      (item) => item.id === numericCampaignId
    );

    if (
      !campaign ||
      !campaign.published ||
      !campaign.integrated ||
      !campaign.destinationUrl
    ) {
      return NextResponse.redirect(fallbackUrl);
    }

    let destinationUrl: URL;

    try {
      destinationUrl = new URL(
        campaign.destinationUrl
      );

      if (
        destinationUrl.protocol !== "https:" &&
        destinationUrl.protocol !== "http:"
      ) {
        return NextResponse.redirect(fallbackUrl);
      }
    } catch {
      return NextResponse.redirect(fallbackUrl);
    }

    const clickId = crypto.randomUUID();

    const { error } = await supabaseAdmin
      .from("affiliate_clicks")
      .insert({
        click_id: clickId,
        campaign_id: campaign.id,
        campaign_name: campaign.name,
        campaign_slug: campaign.slug,
        provider: campaign.provider,
        destination_url: campaign.destinationUrl,
        user_id: null,
        referrer: request.headers.get("referer"),
        user_agent: request.headers.get("user-agent"),
      });

    if (error) {
      console.error(
        "Erreur enregistrement clic affiliation :",
        error
      );
    }

    return NextResponse.redirect(destinationUrl);
  } catch (error) {
    console.error(
      "Erreur route affiliation :",
      error
    );

    return NextResponse.redirect(fallbackUrl);
  }
}