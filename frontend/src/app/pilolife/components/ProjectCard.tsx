"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { FormEvent } from "react";

import {
  deletePiloLifeProject,
  setPiloLifePrimaryProject,
  updatePiloLifeProject,
  type PiloLifeProject,
} from "../services/pilolife.service";

type Props = {
  project: PiloLifeProject;
  onUpdated?: () => void | Promise<void>;

  /**
   * Total annuel des économies encore détectées
   * dans le Monitoring.
   *
   * Facultatif pour que la carte fonctionne
   * immédiatement sans casser la page actuelle.
   */
  detectedYearlySaving?: number;
};

type CurrentAction =
  | "primary"
  | "edit"
  | "delete"
  | null;

function formatMoney(value: number) {
  return Math.round(value).toLocaleString(
    "fr-FR"
  );
}

function addMonthsToToday(months: number) {
  const date = new Date();

  date.setDate(1);
  date.setMonth(date.getMonth() + months);

  return date;
}

function formatEstimatedDate(
  months: number | null
) {
  if (months === null) {
    return null;
  }

  if (months <= 0) {
    return "Objectif atteint";
  }

  return addMonthsToToday(
    months
  ).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export default function ProjectCard({
  project,
  onUpdated,
  detectedYearlySaving = 0,
}: Props) {
  const menuRef =
    useRef<HTMLDivElement | null>(null);

  const [
    currentAction,
    setCurrentAction,
  ] = useState<CurrentAction>(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    editModalOpen,
    setEditModalOpen,
  ] = useState(false);

  const [
    deleteModalOpen,
    setDeleteModalOpen,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [title, setTitle] = useState(
    project.title
  );

  const [category, setCategory] =
    useState(project.category);

  const [
    targetAmount,
    setTargetAmount,
  ] = useState(
    String(project.target_amount)
  );

  const [targetDate, setTargetDate] =
    useState(
      project.target_date
        ? project.target_date.slice(0, 10)
        : ""
    );

  useEffect(() => {
    setTitle(project.title);
    setCategory(project.category);

    setTargetAmount(
      String(project.target_amount)
    );

    setTargetDate(
      project.target_date
        ? project.target_date.slice(0, 10)
        : ""
    );
  }, [project]);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const targetAmountNumber = Math.max(
    0,
    Number(project.target_amount) || 0
  );

  const savedAmount = Math.max(
    0,
    Number(project.saved_amount) || 0
  );

  const monthlySaved = Math.max(
    0,
    Number(project.monthly_saved) || 0
  );

  const safeDetectedYearlySaving =
    Math.max(
      0,
      Number(detectedYearlySaving) || 0
    );

  const remainingAmount = Math.max(
    targetAmountNumber - savedAmount,
    0
  );

  const progress =
    targetAmountNumber > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              (savedAmount /
                targetAmountNumber) *
                100
            )
          )
        )
      : 0;

  const estimatedMonths =
    remainingAmount === 0
      ? 0
      : monthlySaved > 0
        ? Math.ceil(
            remainingAmount /
              monthlySaved
          )
        : null;

  const monthlySavingWithPilo =
    monthlySaved +
    safeDetectedYearlySaving / 12;

  const estimatedMonthsWithPilo =
    remainingAmount === 0
      ? 0
      : monthlySavingWithPilo > 0
        ? Math.ceil(
            remainingAmount /
              monthlySavingWithPilo
          )
        : null;

  const estimatedDate =
    formatEstimatedDate(
      estimatedMonths
    );

  const estimatedDateWithPilo =
    formatEstimatedDate(
      estimatedMonthsWithPilo
    );

  const monthsSaved =
    estimatedMonths !== null &&
    estimatedMonthsWithPilo !== null
      ? Math.max(
          0,
          estimatedMonths -
            estimatedMonthsWithPilo
        )
      : 0;

  const hasPiloProjection =
    safeDetectedYearlySaving > 0 &&
    estimatedDateWithPilo !== null &&
    monthsSaved > 0;

  const isUpdating =
    currentAction !== null;

  function openEditModal() {
    setMenuOpen(false);
    setErrorMessage("");

    setTitle(project.title);
    setCategory(project.category);

    setTargetAmount(
      String(project.target_amount)
    );

    setTargetDate(
      project.target_date
        ? project.target_date.slice(0, 10)
        : ""
    );

    setEditModalOpen(true);
  }

  function openDeleteModal() {
    setMenuOpen(false);
    setErrorMessage("");
    setDeleteModalOpen(true);
  }

  async function handleSetPrimary() {
    setMenuOpen(false);

    if (
      project.is_primary ||
      isUpdating
    ) {
      return;
    }

    try {
      setCurrentAction("primary");
      setErrorMessage("");

      await setPiloLifePrimaryProject(
        project.user_id,
        project.id
      );

      await onUpdated?.();
    } catch (error) {
      console.error(
        "Erreur lors du changement de projet principal :",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Impossible de définir ce projet comme projet principal.";

      setErrorMessage(message);
      window.alert(message);
    } finally {
      setCurrentAction(null);
    }
  }

  async function handleEdit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isUpdating) {
      return;
    }

    const normalizedAmount =
      Number(targetAmount);

    if (!title.trim()) {
      setErrorMessage(
        "Le nom du projet est obligatoire."
      );

      return;
    }

    if (!category.trim()) {
      setErrorMessage(
        "La catégorie est obligatoire."
      );

      return;
    }

    if (
      !Number.isFinite(
        normalizedAmount
      ) ||
      normalizedAmount <= 0
    ) {
      setErrorMessage(
        "Le montant de l’objectif doit être supérieur à zéro."
      );

      return;
    }

    try {
      setCurrentAction("edit");
      setErrorMessage("");

      await updatePiloLifeProject(
        project.user_id,
        project.id,
        {
          title,
          category,
          target_amount:
            normalizedAmount,
          target_date:
            targetDate || null,
        }
      );

      setEditModalOpen(false);

      await onUpdated?.();
    } catch (error) {
      console.error(
        "Erreur lors de la modification du projet :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de modifier ce projet."
      );
    } finally {
      setCurrentAction(null);
    }
  }

  async function handleDelete() {
    if (isUpdating) {
      return;
    }

    try {
      setCurrentAction("delete");
      setErrorMessage("");

      await deletePiloLifeProject(
        project.user_id,
        project.id
      );

      setDeleteModalOpen(false);

      await onUpdated?.();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du projet :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer ce projet."
      );
    } finally {
      setCurrentAction(null);
    }
  }

  return (
    <>
      <article className="relative flex h-full flex-col rounded-[2rem] border border-green-500/20 bg-slate-900 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-green-500/40">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-green-400">
              {project.category}
            </p>

            <h2 className="mt-2 truncate text-2xl font-black text-white">
              🌳 {project.title}
            </h2>
          </div>

          <div
            ref={menuRef}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (current) => !current
                )
              }
              disabled={isUpdating}
              aria-label={`Actions du projet ${project.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-2xl font-black text-slate-300 transition hover:border-green-500/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              ⋮
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 z-20 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl">
                {!project.is_primary && (
                  <button
                    type="button"
                    onClick={
                      handleSetPrimary
                    }
                    disabled={isUpdating}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-green-300 transition hover:bg-green-500/10 disabled:opacity-50"
                  >
                    ⭐ Définir comme
                    principal
                  </button>
                )}

                <button
                  type="button"
                  onClick={openEditModal}
                  disabled={isUpdating}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
                >
                  ✏️ Modifier
                </button>

                <button
                  type="button"
                  onClick={openDeleteModal}
                  disabled={isUpdating}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  🗑️ Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-bold text-slate-400">
              Progression
            </p>

            <p className="text-3xl font-black text-green-400">
              {progress} %
            </p>
          </div>

          <div className="mt-3 h-4 overflow-hidden rounded-full border border-white/5 bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_18px_rgba(34,197,94,0.55)] transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="font-black text-white">
              {formatMoney(savedAmount)} €
            </span>

            <span className="text-slate-400">
              sur{" "}
              {formatMoney(
                targetAmountNumber
              )}{" "}
              €
            </span>
          </div>

          <p className="mt-4 rounded-2xl border border-green-500/15 bg-green-500/5 px-4 py-3 text-sm font-bold text-green-300">
            🌱 Tu as déjà financé{" "}
            {progress} % de ton projet.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          {remainingAmount === 0 ? (
            <div className="text-center">
              <p className="text-3xl">
                🎉
              </p>

              <p className="mt-2 text-xl font-black text-green-300">
                Objectif atteint !
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-400">
                Encore à économiser
              </p>

              <p className="mt-1 text-3xl font-black text-white">
                {formatMoney(
                  remainingAmount
                )}{" "}
                €
              </p>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-sm text-slate-400">
                  📅 Fin estimée
                </p>

                <p className="mt-1 text-lg font-black capitalize text-white">
                  {estimatedDate ??
                    "Ajoute des économies pour obtenir une estimation"}
                </p>
              </div>

              {hasPiloProjection && (
                <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                  <p className="text-sm font-bold text-green-300">
                    🚀 Avec les économies
                    détectées
                  </p>

                  <p className="mt-1 text-lg font-black capitalize text-white">
                    {
                      estimatedDateWithPilo
                    }
                  </p>

                  <p className="mt-2 text-sm font-black text-green-400">
                    ⭐ {monthsSaved} mois
                    gagné
                    {monthsSaved > 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {errorMessage &&
          !editModalOpen &&
          !deleteModalOpen && (
            <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm font-medium text-red-300">
              {errorMessage}
            </p>
          )}

        <div className="mt-auto pt-5">
          {project.is_primary ? (
            <div className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-black text-green-300">
              ⭐ Projet principal
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSetPrimary}
              disabled={isUpdating}
              className="text-sm font-bold text-slate-400 transition hover:text-green-300 disabled:opacity-50"
            >
              {currentAction === "primary"
                ? "Mise à jour..."
                : "Définir comme projet principal"}
            </button>
          )}
        </div>
      </article>

      {editModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-green-500/20 bg-slate-900 p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-green-400">
                  PiloLife
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  Modifier l’objectif
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditModalOpen(false)
                }
                disabled={isUpdating}
                className="rounded-full bg-slate-800 px-3 py-2 text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleEdit}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor={`title-${project.id}`}
                  className="text-sm font-bold text-slate-300"
                >
                  Nom du projet
                </label>

                <input
                  id={`title-${project.id}`}
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  disabled={isUpdating}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-green-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor={`category-${project.id}`}
                  className="text-sm font-bold text-slate-300"
                >
                  Catégorie
                </label>

                <input
                  id={`category-${project.id}`}
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  disabled={isUpdating}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-green-500 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor={`amount-${project.id}`}
                  className="text-sm font-bold text-slate-300"
                >
                  Montant de l’objectif
                </label>

                <div className="relative mt-2">
                  <input
                    id={`amount-${project.id}`}
                    type="number"
                    min="1"
                    step="1"
                    value={targetAmount}
                    onChange={(event) =>
                      setTargetAmount(
                        event.target.value
                      )
                    }
                    disabled={isUpdating}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-green-500 disabled:opacity-60"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    €
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`date-${project.id}`}
                  className="text-sm font-bold text-slate-300"
                >
                  Date cible
                </label>

                <input
                  id={`date-${project.id}`}
                  type="date"
                  value={targetDate}
                  onChange={(event) =>
                    setTargetDate(
                      event.target.value
                    )
                  }
                  disabled={isUpdating}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-green-500 disabled:opacity-60"
                />
              </div>

              {errorMessage && (
                <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-200">
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setEditModalOpen(false)
                  }
                  disabled={isUpdating}
                  className="rounded-2xl border border-slate-700 px-5 py-3 font-bold text-slate-300 transition hover:bg-slate-800 disabled:opacity-60"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-2xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {currentAction === "edit"
                    ? "Enregistrement..."
                    : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-7 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
              🗑️
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">
              Supprimer «{" "}
              {project.title} » ?
            </h2>

            <p className="mt-3 text-slate-400">
              Cette action est définitive.
              La progression de cet
              objectif sera également
              supprimée.
            </p>

            {project.is_primary && (
              <p className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
                Ce projet est actuellement
                ton projet principal. Un
                autre projet sera
                automatiquement
                sélectionné.
              </p>
            )}

            {errorMessage && (
              <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-200">
                {errorMessage}
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteModalOpen(false)
                }
                disabled={isUpdating}
                className="rounded-2xl border border-slate-700 px-5 py-3 font-bold text-slate-300 transition hover:bg-slate-800 disabled:opacity-60"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isUpdating}
                className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {currentAction === "delete"
                  ? "Suppression..."
                  : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}