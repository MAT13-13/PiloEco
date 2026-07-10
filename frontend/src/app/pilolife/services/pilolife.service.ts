import { supabase } from "../../lib/supabase";

export type PiloLifeProject = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  type: string;
  target_amount: number;
  saved_amount: number;
monthly_saved: number;
  target_date: string | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
};

export async function addMissionSavingToPrimaryProject(userId: string, saving: number) {
  const { data: project, error: projectError } = await supabase
    .from("pilolife_projects")
    .select("*")
    .eq("user_id", userId)
    .eq("is_primary", true)
    .single();

  if (projectError) throw projectError;

  const yearlySaving = saving;
  const monthlySaving = saving / 12;

  const { data, error } = await supabase
    .from("pilolife_projects")
    .update({
      saved_amount: Number(project.saved_amount || 0) + yearlySaving,
      monthly_saved: Number(project.monthly_saved || 0) + monthlySaving,
    })
    .eq("id", project.id)
    .select()
    .single();

  if (error) throw error;

  return data as PiloLifeProject;
}

export async function getPiloLifeProjects(userId: string) {
  const { data, error } = await supabase
    .from("pilolife_projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as PiloLifeProject[];
}

export async function createPiloLifeProject(project: {
  user_id: string;
  title: string;
  category: string;
  type: string;
  target_amount: number;
  target_date?: string | null;
  is_primary?: boolean;
}) {
  const { data, error } = await supabase
    .from("pilolife_projects")
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data as PiloLifeProject;
}