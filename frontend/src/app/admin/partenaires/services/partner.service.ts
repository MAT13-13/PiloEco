import { supabase } from "../../../lib/supabase";

export type PartnerRequestStatus =
  | "En attente"
  | "À relancer"
  | "Relancé"
  | "Accepté"
  | "Refusé";

export type PartnerRequest = {
  id: string;

  name: string;
  company: string;
  email: string;

  website: string | null;

  partnership_type: string;
  message: string;

  status: PartnerRequestStatus;

  internal_notes: string | null;

  contact_date: string | null;
  follow_up_date: string | null;
  signed_date: string | null;

  commission_percent: number | null;
  commission_fixed: number | null;

  estimated_monthly_revenue: number | null;

  total_sales: number;
  total_revenue: number;

  contract_url: string | null;

  created_at: string;
  updated_at: string;
};

export async function getPartnerRequests(): Promise<
  PartnerRequest[]
> {
  const { data, error } = await supabase
    .from("partner_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as PartnerRequest[];
}

export async function updatePartnerRequestStatus(
  requestId: string,
  status: PartnerRequestStatus
) {
  const { data, error } = await supabase
    .from("partner_requests")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PartnerRequest;
}

export async function updatePartnerRequestNotes(
  requestId: string,
  internalNotes: string
) {
  const { data, error } = await supabase
    .from("partner_requests")
    .update({
      internal_notes: internalNotes.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PartnerRequest;
}

export async function updatePartnerRequest(
  requestId: string,
  values: Partial<PartnerRequest>
) {
  const { data, error } = await supabase
    .from("partner_requests")
    .update({
      ...values,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PartnerRequest;
}