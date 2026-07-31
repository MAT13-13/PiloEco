import { supabase } from "../lib/supabase";

export type PartnerOfferCategory =
  | "mobile"
  | "internet"
  | "assurance"
  | "electricite"
  | "habitation"
  | "animaux"
  | "banque"
  | "mobilite"
  | "streaming";

export type PartnerOffer = {
  id: string;
  partnerId: string;
  category: PartnerOfferCategory;
  provider: string;
  offerName: string;
  monthlyPrice: number;
  url: string;
  network?: string;
  data?: string;
  note?: number;
  yearlySaving?: number;
  commitment?: string;
  score?: number;
  description?: string;
  isFeatured: boolean;
};

type PartnerOfferRow = {
  id: string;
  partner_id: string;
  category: PartnerOfferCategory;
  provider: string;
  offer_name: string;
  monthly_price: number | string;
  url: string;
  network: string | null;
  data_amount: string | null;
  note: number | string | null;
  yearly_saving: number | string | null;
  commitment: string | null;
  score: number | null;
  description: string | null;
  is_featured: boolean;
};

function mapPartnerOffer(row: PartnerOfferRow): PartnerOffer {
  return {
    id: row.id,
    partnerId: row.partner_id,
    category: row.category,
    provider: row.provider,
    offerName: row.offer_name,
    monthlyPrice: Number(row.monthly_price),
    url: row.url,
    network: row.network ?? undefined,
    data: row.data_amount ?? undefined,
    note:
      row.note === null
        ? undefined
        : Number(row.note),
    yearlySaving:
      row.yearly_saving === null
        ? undefined
        : Number(row.yearly_saving),
    commitment: row.commitment ?? undefined,
    score: row.score ?? undefined,
    description: row.description ?? undefined,
    isFeatured: row.is_featured,
  };
}

export async function getPartnerOffersByCategory(
  category: PartnerOfferCategory
): Promise<PartnerOffer[]> {
  const { data, error } = await supabase
    .from("partner_offers")
    .select(`
      id,
      partner_id,
      category,
      provider,
      offer_name,
      monthly_price,
      url,
      network,
      data_amount,
      note,
      yearly_saving,
      commitment,
      score,
      description,
      is_featured
    `)
    .eq("category", category)
    .eq("is_active", true)
    .order("is_featured", {
      ascending: false,
    })
    .order("score", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error(
      "Erreur pendant le chargement des offres partenaires :",
      error
    );

    throw new Error(
      "Impossible de charger les offres partenaires."
    );
  }

  return ((data ?? []) as PartnerOfferRow[]).map(
    mapPartnerOffer
  );
}