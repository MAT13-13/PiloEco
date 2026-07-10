import { supabase } from "../../lib/supabase";

export type Depense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
};

export async function getDepenses(): Promise<Depense[]> {
  const { data, error } = await supabase
    .from("depenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Depense[];
}

export async function addDepense(depense: Omit<Depense, "id">) {
  const { data, error } = await supabase
    .from("depenses")
    .insert([depense])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateDepense(
  id: string,
  depense: Omit<Depense, "id">
) {
  const { data, error } = await supabase
    .from("depenses")
    .update(depense)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteDepense(id: string) {
  const { error } = await supabase
    .from("depenses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}