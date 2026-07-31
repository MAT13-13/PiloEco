import { supabase } from "../../../lib/supabase";

export type PartnerStatistic = {
  partnerId: string;
  company: string;
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
  conversionRate: number;
};

export type OfferStatistic = {
  offerId: string;
  offerName: string;
  partnerId: string | null;
  company: string;
  clicks: number;
  leads: number;
  sales: number;
  revenue: number;
};

export type MonthlyRevenue = {
  month: string;
  monthKey: string;
  revenue: number;
};

export type DashboardStatistics = {
  totalClicks: number;
  totalLeads: number;
  totalSales: number;
  totalRevenue: number;
  conversionRate: number;

  currentMonthRevenue: number;
  previousMonthRevenue: number;
  monthlyEvolution: number;

  topPartner: PartnerStatistic | null;
  topOffer: OfferStatistic | null;

  partners: PartnerStatistic[];
  offers: OfferStatistic[];
  monthlyRevenue: MonthlyRevenue[];
};

type GenericRow = Record<string, unknown>;

function getString(
  row: GenericRow,
  possibleKeys: string[],
  fallback = ""
) {
  for (const key of possibleKeys) {
    const value = row[key];

    if (
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      return value;
    }
  }

  return fallback;
}

function getNullableString(
  row: GenericRow,
  possibleKeys: string[]
) {
  const value = getString(row, possibleKeys);

  return value || null;
}

function getNumber(
  row: GenericRow,
  possibleKeys: string[],
  fallback = 0
) {
  for (const key of possibleKeys) {
    const value = row[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      const parsedValue = Number(value);

      if (Number.isFinite(parsedValue)) {
        return parsedValue;
      }
    }
  }

  return fallback;
}

function getEventType(row: GenericRow) {
  return getString(row, [
    "event_type",
    "type",
    "action",
    "name",
  ]).toLowerCase();
}

function getEventDate(row: GenericRow) {
  const rawDate = getString(row, [
    "created_at",
    "event_date",
    "date",
  ]);

  if (!rawDate) {
    return null;
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getPartnerId(row: GenericRow) {
  return getNullableString(row, [
    "partner_id",
    "partner_profile_id",
    "profile_id",
  ]);
}

function getOfferId(row: GenericRow) {
  return getNullableString(row, [
    "offer_id",
    "partner_offer_id",
  ]);
}

function getEventRevenue(row: GenericRow) {
  return getNumber(row, [
    "commission_amount",
    "commission",
    "amount",
    "revenue",
  ]);
}

function calculateConversionRate(
  sales: number,
  leads: number,
  clicks: number
) {
  const base = leads > 0 ? leads : clicks;

  if (base <= 0) {
    return 0;
  }

  return Number(((sales / base) * 100).toFixed(1));
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
}

function getMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "2-digit",
  }).format(date);
}

function createLastTwelveMonths(): MonthlyRevenue[] {
  const months: MonthlyRevenue[] = [];
  const now = new Date();

  for (let index = 11; index >= 0; index -= 1) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - index,
      1
    );

    months.push({
      month: getMonthLabel(date),
      monthKey: getMonthKey(date),
      revenue: 0,
    });
  }

  return months;
}

export async function getDashboardStatistics():
Promise<DashboardStatistics> {
  const [
    eventsResult,
    partnersResult,
    offersResult,
  ] = await Promise.all([
    supabase.from("partner_events").select("*"),
    supabase.from("partner_profiles").select("*"),
    supabase.from("partner_offers").select("*"),
  ]);

  if (eventsResult.error) {
    throw new Error(
      `Impossible de charger les événements partenaires : ${
        eventsResult.error.message
      }`
    );
  }

  if (partnersResult.error) {
    throw new Error(
      `Impossible de charger les partenaires : ${
        partnersResult.error.message
      }`
    );
  }

  if (offersResult.error) {
    throw new Error(
      `Impossible de charger les offres : ${
        offersResult.error.message
      }`
    );
  }

  const events = (eventsResult.data ?? []) as GenericRow[];
  const partnerRows =
    (partnersResult.data ?? []) as GenericRow[];
  const offerRows =
    (offersResult.data ?? []) as GenericRow[];

  const partnerMap = new Map<
    string,
    PartnerStatistic
  >();

  for (const partner of partnerRows) {
    const partnerId = getString(partner, ["id"]);

    if (!partnerId) {
      continue;
    }

    partnerMap.set(partnerId, {
      partnerId,
      company: getString(
        partner,
        ["company", "company_name", "name"],
        "Partenaire sans nom"
      ),
      clicks: 0,
      leads: 0,
      sales: 0,
      revenue: 0,
      conversionRate: 0,
    });
  }

  const offerMap = new Map<string, OfferStatistic>();

  for (const offer of offerRows) {
    const offerId = getString(offer, ["id"]);

    if (!offerId) {
      continue;
    }

    const partnerId = getPartnerId(offer);

    offerMap.set(offerId, {
      offerId,
      offerName: getString(
        offer,
        ["name", "title", "offer_name"],
        "Offre sans nom"
      ),
      partnerId,
      company:
        partnerId &&
        partnerMap.get(partnerId)?.company
          ? partnerMap.get(partnerId)!.company
          : getString(
              offer,
              ["provider", "company", "brand"],
              "Partenaire inconnu"
            ),
      clicks: 0,
      leads: 0,
      sales: 0,
      revenue: 0,
    });
  }

  let totalClicks = 0;
  let totalLeads = 0;
  let totalSales = 0;
  let totalRevenue = 0;

  const monthlyRevenue = createLastTwelveMonths();
  const monthlyRevenueMap = new Map(
    monthlyRevenue.map((item) => [
      item.monthKey,
      item,
    ])
  );

  for (const event of events) {
    const eventType = getEventType(event);
    const partnerId = getPartnerId(event);
    const offerId = getOfferId(event);
    const revenue = getEventRevenue(event);
    const eventDate = getEventDate(event);

    const partnerStatistic = partnerId
      ? partnerMap.get(partnerId)
      : undefined;

    const offerStatistic = offerId
      ? offerMap.get(offerId)
      : undefined;

    if (eventType === "click") {
      totalClicks += 1;

      if (partnerStatistic) {
        partnerStatistic.clicks += 1;
      }

      if (offerStatistic) {
        offerStatistic.clicks += 1;
      }
    }

    if (eventType === "lead") {
      totalLeads += 1;

      if (partnerStatistic) {
        partnerStatistic.leads += 1;
      }

      if (offerStatistic) {
        offerStatistic.leads += 1;
      }
    }

    if (eventType === "sale") {
      totalSales += 1;
      totalRevenue += revenue;

      if (partnerStatistic) {
        partnerStatistic.sales += 1;
        partnerStatistic.revenue += revenue;
      }

      if (offerStatistic) {
        offerStatistic.sales += 1;
        offerStatistic.revenue += revenue;
      }

      if (eventDate) {
        const monthKey = getMonthKey(eventDate);
        const monthItem =
          monthlyRevenueMap.get(monthKey);

        if (monthItem) {
          monthItem.revenue += revenue;
        }
      }
    }
  }

  const partners = Array.from(
    partnerMap.values()
  )
    .map((partner) => ({
      ...partner,
      revenue: Number(partner.revenue.toFixed(2)),
      conversionRate: calculateConversionRate(
        partner.sales,
        partner.leads,
        partner.clicks
      ),
    }))
    .sort((firstPartner, secondPartner) => {
      return (
        secondPartner.revenue -
        firstPartner.revenue
      );
    });

  const offers = Array.from(offerMap.values())
    .map((offer) => ({
      ...offer,
      revenue: Number(offer.revenue.toFixed(2)),
    }))
    .sort((firstOffer, secondOffer) => {
      return (
        secondOffer.revenue -
        firstOffer.revenue
      );
    });

  const now = new Date();

  const currentMonthKey = getMonthKey(now);

  const previousMonthDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const previousMonthKey =
    getMonthKey(previousMonthDate);

  const currentMonthRevenue =
    monthlyRevenueMap.get(currentMonthKey)?.revenue ??
    0;

  const previousMonthRevenue =
    monthlyRevenueMap.get(previousMonthKey)?.revenue ??
    0;

  let monthlyEvolution = 0;

  if (previousMonthRevenue > 0) {
    monthlyEvolution =
      ((currentMonthRevenue -
        previousMonthRevenue) /
        previousMonthRevenue) *
      100;
  } else if (currentMonthRevenue > 0) {
    monthlyEvolution = 100;
  }

  return {
    totalClicks,
    totalLeads,
    totalSales,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    conversionRate: calculateConversionRate(
      totalSales,
      totalLeads,
      totalClicks
    ),

    currentMonthRevenue: Number(
      currentMonthRevenue.toFixed(2)
    ),
    previousMonthRevenue: Number(
      previousMonthRevenue.toFixed(2)
    ),
    monthlyEvolution: Number(
      monthlyEvolution.toFixed(1)
    ),

    topPartner: partners[0] ?? null,
    topOffer: offers[0] ?? null,

    partners,
    offers,
    monthlyRevenue: monthlyRevenue.map((item) => ({
      ...item,
      revenue: Number(item.revenue.toFixed(2)),
    })),
  };
}