"use client";

import { useEffect, useState } from "react";
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
};

type CurrentAction = "primary" | "edit" | "delete" | null;

export default function ProjectCard({
  project,
  onUpdated,
}: Props) {
  const [currentAction, setCurrentAction] =
    useState<CurrentAction>(null);

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [title, setTitle] = useState(project.title);

  const [category, setCategory] =
    useState(project.category);

  const [targetAmount, setTargetAmount] = useState(
    String(project.target_amount)
  );

  const [targetDate, setTargetDate] = useState(
    project.target_date
      ? project.target_date.slice(0, 10)
      : ""
  );

  useEffect(() => {
    setTitle(project.title);
    setCategory(project.category);
    setTargetAmount(String(project.target_amount));

    setTargetDate(
      project.target_date
        ? project.target_date.slice(0, 10)
        : ""
    );
  }, [project]);

  const targetAmountNumber = Number(
    project.target_amount || 0
  );

  const savedAmount = Number(
    project.saved_amount || 0
  );

  const monthlySaved = Number(
    project.monthly_saved || 0
  );

  const remainingAmount = Math.max(
    targetAmountNumber - savedAmount,
    0
  );

  const progress =
    targetAmountNumber > 0
      ? Math.min(
          Math.round(
            (savedAmount / targetAmountNumber) * 100
          ),
          100
        )
      : 0;

  const estimatedMonths =
    monthlySaved > 0 && remainingAmount > 0
      ? Math.ceil(
          remainingAmount / monthlySaved
        )
      : null;

  const isUpdating =
    currentAction !== null;

  function formatEstimatedTime(
    months: number | null
  ) {
    if (months === null) {
      return "Ajoute des économies pour obtenir une estimation";
    }

    if (months <= 1) {
      return "Moins d’un mois";
    }

    if (months < 12) {
      return `${months} mois`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} an${
        years > 1 ? "s" : ""
      }`;
    }

    return `${years} an${
      years > 1 ? "s" : ""
    } et ${remainingMonths} mois`;
  }

  function openEditModal() {
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

  async function handleSetPrimary() {
    console.log("CLICK", project.id, project.user_id);
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
      alert(message);
    } finally {
      setCurrentAction(null);
    }
  }

  async function handleEdit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isUpdating) return;

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
      !Number.isFinite(normalizedAmount) ||
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
          target_amount: normalizedAmount,
          target_date: targetDate || null,
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
    if (isUpdating) return;

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
      <article className="flex h-full flex-col rounded-3xl border border-green-500/20 bg-slate-900 p-7 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-green-500/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-green-400">
              {project.category}
            </p>

            <h2 className="mt-3 text-2xl font-black text-white">
              {project.title}
            </h2>
          </div>

          <div className="rounded-2xl bg-green-500/10 px-3 py-2 text-xl font-black text-green-400">
            {progress} %
          </div>
        </div>

        <div className="mt-7">
          <div className="h-4 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-green-400">
              {savedAmount.toLocaleString(
                "fr-FR",
                {
                  maximumFractionDigits: 2,
                }
              )}{" "}
              €
            </span>

            <span className="text-slate-400">
              sur{" "}
              {targetAmountNumber.toLocaleString(
                "fr-FR",
                {
                  maximumFractionDigits: 2,
                }
              )}{" "}
              €
            </span>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">
              Encore à économiser
            </p>

            <p className="mt-2 text-xl font-black text-white">
              {remainingAmount.toLocaleString(
                "fr-FR",
                {
                  maximumFractionDigits: 2,
                }
              )}{" "}
              €
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950/70 p-4">
            <p className="text-sm text-slate-400">
              Au rythme actuel
            </p>

            <p className="mt-2 text-base font-black text-white">
              {remainingAmount === 0
                ? "Objectif atteint 🎉"
                : formatEstimatedTime(
                    estimatedMonths
                  )}
            </p>
          </div>
        </div>

        {project.target_date && (
          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <p className="text-sm text-slate-400">
              Date cible
            </p>

            <p className="mt-1 font-bold text-slate-200">
              {new Date(
                `${project.target_date.slice(
                  0,
                  10
                )}T12:00:00`
              ).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}

        {errorMessage &&
          !editModalOpen &&
          !deleteModalOpen && (
            <p className="mt-4 text-sm font-medium text-red-300">
              {errorMessage}
            </p>
          )}

        <div className="mt-auto space-y-3 pt-6">
          {project.is_primary ? (
            <div className="inline-flex rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
              ⭐ Projet principal
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSetPrimary}
              disabled={isUpdating}
              className="w-full rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 font-bold text-green-300 transition hover:border-green-400 hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {currentAction === "primary"
                ? "Mise à jour..."
                : "⭐ Définir comme projet principal"}
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={openEditModal}
              disabled={isUpdating}
              className="rounded-2xl border border-slate-600 bg-slate-800 px-4 py-3 font-bold text-slate-200 transition hover:border-slate-400 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              ✏️ Modifier
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                setDeleteModalOpen(true);
              }}
              disabled={isUpdating}
              className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-bold text-red-300 transition hover:border-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      </article>

      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm">
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
                  placeholder="Maison dans le Var"
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
                  placeholder="Maison"
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
                    placeholder="35000"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-7 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
              🗑️
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">
              Supprimer « {project.title} » ?
            </h2>

            <p className="mt-3 text-slate-400">
              Cette action est définitive. La
              progression de cet objectif sera
              également supprimée.
            </p>

            {project.is_primary && (
              <p className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
                Ce projet est actuellement ton projet
                principal. Un autre projet sera
                automatiquement sélectionné.
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