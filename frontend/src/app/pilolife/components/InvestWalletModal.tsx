"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { PiloLifeProject } from "../services/pilolife.service";

type Props = {
  open: boolean;
  balance: number;
  projects: PiloLifeProject[];

  onClose: () => void;

  onInvestProject: (
    projectId: string,
    amount: number
  ) => Promise<void>;

  onUseForPurchasingPower: (
    amount: number
  ) => Promise<void>;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat(
    "fr-FR",
    {
      maximumFractionDigits: 2,
    }
  ).format(Math.max(0, value));
}

export default function InvestWalletModal({
  open,
  balance,
  projects,
  onClose,
  onInvestProject,
  onUseForPurchasingPower,
}: Props) {
  const [selectedProjectId, setSelectedProjectId] =
    useState("");

  const [destination, setDestination] =
    useState<"project" | "purchasing_power">(
      "project"
    );

  const [amount, setAmount] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const normalizedBalance =
    Math.max(0, Number(balance || 0));

  const numericAmount =
    Number(
      amount.replace(",", ".")
    );

  const selectedProject =
    useMemo(
      () =>
        projects.find(
          (project) =>
            project.id ===
            selectedProjectId
        ) ?? null,
      [
        projects,
        selectedProjectId,
      ]
    );

  useEffect(() => {
    if (!open) {
      return;
    }

    setDestination("project");
    setSelectedProjectId(
      projects[0]?.id ?? ""
    );
    setAmount(
      normalizedBalance > 0
        ? String(
            Math.round(
              normalizedBalance * 100
            ) / 100
          )
        : ""
    );
    setErrorMessage("");
  }, [
    open,
    projects,
    normalizedBalance,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    setErrorMessage("");

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setErrorMessage(
        "Entre un montant supérieur à zéro."
      );
      return;
    }

    if (
      numericAmount >
      normalizedBalance
    ) {
      setErrorMessage(
        "Le montant dépasse le solde disponible."
      );
      return;
    }

    if (
      destination ===
        "project" &&
      !selectedProject
    ) {
      setErrorMessage(
        "Choisis un projet."
      );
      return;
    }

    try {
      setSaving(true);

      if (
        destination ===
          "project" &&
        selectedProject
      ) {
        await onInvestProject(
          selectedProject.id,
          numericAmount
        );
      } else {
        await onUseForPurchasingPower(
          numericAmount
        );
      }

      onClose();
    } catch (error) {
      console.error(
        "Erreur investissement cagnotte :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’utiliser cette économie."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-green-500/20 bg-slate-900 p-6 text-white shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-green-400">
              💰 Cagnotte Pilo
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Investir mes économies
            </h2>

            <p className="mt-3 text-slate-400">
              Choisis une seule destination.
              Tu pourras changer de priorité
              plus tard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-slate-300 transition hover:text-white disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
          <p className="text-sm text-slate-300">
            Disponible
          </p>

          <p className="mt-2 text-4xl font-black text-green-400">
            {formatEuro(
              normalizedBalance
            )}{" "}
            €
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm font-black uppercase tracking-wider text-slate-300">
            Destination
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                setDestination(
                  "project"
                )
              }
              className={`rounded-2xl border p-4 text-left transition ${
                destination ===
                "project"
                  ? "border-green-400 bg-green-500/15"
                  : "border-white/10 bg-slate-950/50 hover:border-green-500/30"
              }`}
            >
              <p className="font-black">
                🎯 Un projet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Fais avancer un seul
                objectif.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setDestination(
                  "purchasing_power"
                )
              }
              className={`rounded-2xl border p-4 text-left transition ${
                destination ===
                "purchasing_power"
                  ? "border-blue-400 bg-blue-500/15"
                  : "border-white/10 bg-slate-950/50 hover:border-blue-500/30"
              }`}
            >
              <p className="font-black">
                💳 Pouvoir d’achat
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Garde cette économie pour
                ton quotidien.
              </p>
            </button>
          </div>
        </div>

        {destination ===
          "project" && (
          <div className="mt-6">
            <label
              htmlFor="wallet-project"
              className="text-sm font-black uppercase tracking-wider text-slate-300"
            >
              Projet choisi
            </label>

            <select
              id="wallet-project"
              value={
                selectedProjectId
              }
              onChange={(event) =>
                setSelectedProjectId(
                  event.target.value
                )
              }
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-white outline-none transition focus:border-green-500"
            >
              {projects.map(
                (project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.title}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="wallet-amount"
              className="text-sm font-black uppercase tracking-wider text-slate-300"
            >
              Montant
            </label>

            <button
              type="button"
              onClick={() =>
                setAmount(
                  String(
                    Math.round(
                      normalizedBalance *
                        100
                    ) / 100
                  )
                )
              }
              className="text-sm font-black text-green-400 transition hover:text-green-300"
            >
              Tout utiliser
            </button>
          </div>

          <div className="mt-3 flex items-center rounded-2xl border border-white/10 bg-slate-950 px-4 focus-within:border-green-500">
            <input
              id="wallet-amount"
              type="number"
              min="0.01"
              step="0.01"
              max={
                normalizedBalance
              }
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target.value
                )
              }
              className="w-full bg-transparent py-4 text-xl font-black text-white outline-none"
            />

            <span className="font-black text-slate-400">
              €
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-2xl border border-white/10 px-5 py-3 font-black text-slate-300 transition hover:text-white disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              saving ||
              normalizedBalance <= 0
            }
            className="rounded-2xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving
              ? "Investissement..."
              : destination ===
                  "project"
                ? "💸 Investir dans ce projet"
                : "💳 Garder en pouvoir d’achat"}
          </button>
        </div>
      </section>
    </div>
  );
}