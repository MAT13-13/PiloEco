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

type CreatePiloLifeProjectInput = {
  user_id: string;
  title: string;
  category: string;
  type: string;
  target_amount: number;
  target_date?: string | null;
  is_primary?: boolean;
};

export type UpdatePiloLifeProjectInput = {
  title: string;
  category: string;
  target_amount: number;
  target_date?: string | null;
};

export type PiloLifeSavingResult = {
  project: PiloLifeProject;
  previousSavedAmount: number;
  savedAmount: number;
  targetAmount: number;
  previousProgress: number;
  progress: number;
  progressGain: number;
};

/**
 * Récupère tous les projets PiloLife de l'utilisateur.
 */
export async function getPiloLifeProjects(
  userId: string
): Promise<PiloLifeProject[]> {
  const { data, error } = await supabase
    .from("pilolife_projects")
    .select("*")
    .eq("user_id", userId)
    .order("is_primary", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as PiloLifeProject[];
}

/**
 * Crée un nouveau projet PiloLife.
 * Si le nouveau projet est principal,
 * les autres ne le sont plus.
 */
export async function createPiloLifeProject(
  project: CreatePiloLifeProjectInput
): Promise<PiloLifeProject> {
  if (project.is_primary) {
    const { error: resetError } =
      await supabase
        .from("pilolife_projects")
        .update({
          is_primary: false,
          updated_at:
            new Date().toISOString(),
        })
        .eq("user_id", project.user_id);

    if (resetError) {
      throw resetError;
    }
  }

  const { data, error } = await supabase
    .from("pilolife_projects")
    .insert({
      user_id: project.user_id,
      title: project.title.trim(),
      category: project.category.trim(),
      type: project.type,
      target_amount:
        project.target_amount,
      target_date:
        project.target_date ?? null,
      is_primary:
        project.is_primary ?? false,
      saved_amount: 0,
      monthly_saved: 0,
      updated_at:
        new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PiloLifeProject;
}

/**
 * Modifie les informations d'un projet PiloLife.
 */
export async function updatePiloLifeProject(
  userId: string,
  projectId: string,
  updates: UpdatePiloLifeProjectInput
): Promise<PiloLifeProject> {
  const title = updates.title.trim();

  const category =
    updates.category.trim();

  const targetAmount = Number(
    updates.target_amount
  );

  if (!title) {
    throw new Error(
      "Le nom du projet est obligatoire."
    );
  }

  if (!category) {
    throw new Error(
      "La catégorie est obligatoire."
    );
  }

  if (
    !Number.isFinite(targetAmount) ||
    targetAmount <= 0
  ) {
    throw new Error(
      "Le montant de l'objectif doit être supérieur à zéro."
    );
  }

  const { data, error } = await supabase
    .from("pilolife_projects")
    .update({
      title,
      category,
      target_amount: targetAmount,
      target_date:
        updates.target_date || null,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PiloLifeProject;
}

/**
 * Supprime un projet PiloLife.
 * Si le projet supprimé était principal,
 * un autre devient principal.
 */
export async function deletePiloLifeProject(
  userId: string,
  projectId: string
): Promise<void> {
  const {
    data: project,
    error: projectError,
  } = await supabase
    .from("pilolife_projects")
    .select("id, is_primary")
    .eq("id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (projectError) {
    throw projectError;
  }

  if (!project) {
    throw new Error(
      "Ce projet n'existe plus."
    );
  }

  const { error: deleteError } =
    await supabase
      .from("pilolife_projects")
      .delete()
      .eq("id", projectId)
      .eq("user_id", userId);

  if (deleteError) {
    throw deleteError;
  }

  if (!project.is_primary) {
    return;
  }

  const {
    data: nextProject,
    error: nextProjectError,
  } = await supabase
    .from("pilolife_projects")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (nextProjectError) {
    throw nextProjectError;
  }

  if (nextProject) {
    const { error: primaryError } =
      await supabase
        .from("pilolife_projects")
        .update({
          is_primary: true,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", nextProject.id)
        .eq("user_id", userId);

    if (primaryError) {
      throw primaryError;
    }
  }
}

/**
 * Définit un projet comme projet principal.
 * Tous les autres projets de l'utilisateur
 * passent à false.
 */
export async function setPiloLifePrimaryProject(
  userId: string,
  projectId: string
): Promise<PiloLifeProject> {
  const { error: resetError } =
    await supabase
      .from("pilolife_projects")
      .update({
        is_primary: false,
        updated_at:
          new Date().toISOString(),
      })
      .eq("user_id", userId);

  if (resetError) {
    throw new Error(resetError.message);
  }

  const {
    data,
    error: updateError,
  } = await supabase
    .from("pilolife_projects")
    .update({
      is_primary: true,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", projectId)
    .eq("user_id", userId)
    .select("*")
    .maybeSingle();

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (!data) {
    throw new Error(
      "Le projet sélectionné n’a pas été trouvé dans Supabase."
    );
  }

  if (data.is_primary !== true) {
    throw new Error(
      "Supabase n’a pas enregistré le projet comme principal."
    );
  }

  return data as PiloLifeProject;
}

/**
 * Ajoute une économie au projet principal
 * et retourne la progression avant/après.
 */
export async function addMissionSavingToPrimaryProject(
  userId: string,
  saving: number
): Promise<PiloLifeSavingResult | null> {
  const normalizedSaving =
    Number(saving);

  if (
    !Number.isFinite(normalizedSaving) ||
    normalizedSaving <= 0
  ) {
    throw new Error(
      "Le montant de l'économie doit être supérieur à zéro."
    );
  }

  const {
    data: project,
    error: projectError,
  } = await supabase
    .from("pilolife_projects")
    .select("*")
    .eq("user_id", userId)
    .eq("is_primary", true)
    .maybeSingle();

  if (projectError) {
    throw projectError;
  }

  if (!project) {
    return null;
  }

  const currentProject =
    project as PiloLifeProject;

  const previousSavedAmount = Number(
    currentProject.saved_amount ?? 0
  );

  const currentMonthlySaved = Number(
    currentProject.monthly_saved ?? 0
  );

  const targetAmount = Number(
    currentProject.target_amount ?? 0
  );

  if (
    !Number.isFinite(targetAmount) ||
    targetAmount <= 0
  ) {
    throw new Error(
      "Le montant cible du projet est invalide."
    );
  }

  const savedAmount =
    previousSavedAmount +
    normalizedSaving;

  const monthlySaving =
    normalizedSaving / 12;

  const previousProgress = Math.min(
    100,
    Math.max(
      0,
      (previousSavedAmount /
        targetAmount) *
        100
    )
  );

  const progress = Math.min(
    100,
    Math.max(
      0,
      (savedAmount / targetAmount) *
        100
    )
  );

  const progressGain = Math.max(
    0,
    progress - previousProgress
  );

  const {
    data: updatedProject,
    error: updateError,
  } = await supabase
    .from("pilolife_projects")
    .update({
      saved_amount: savedAmount,
      monthly_saved:
        currentMonthlySaved +
        monthlySaving,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", currentProject.id)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (updateError) {
    throw updateError;
  }

  return {
    project:
      updatedProject as PiloLifeProject,

    previousSavedAmount,

    savedAmount,

    targetAmount,

    previousProgress,

    progress,

    progressGain,
  };
}