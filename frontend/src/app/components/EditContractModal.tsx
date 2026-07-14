"use client";

import { useEffect, useState } from "react";

export type EditableContract = {
  provider: string;
  offer: string;
  monthlyPrice: number;
  endDate?: string;
};

type Props = {
  open: boolean;
  categoryLabel: string;
  initialContract: EditableContract;
  saving?: boolean;
  onClose: () => void;
  onSave: (
    contract: EditableContract
  ) => Promise<void> | void;
};

export default function EditContractModal({
  open,
  categoryLabel,
  initialContract,
  saving = false,
  onClose,
  onSave,
}: Props) {
  const [provider, setProvider] = useState("");
  const [offer, setOffer] = useState("");
  const [monthlyPrice, setMonthlyPrice] =
    useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setProvider(initialContract.provider);
    setOffer(initialContract.offer);

    setMonthlyPrice(
      Number.isFinite(initialContract.monthlyPrice)
        ? String(initialContract.monthlyPrice)
        : ""
    );

    setEndDate(initialContract.endDate ?? "");
    setErrorMessage("");
  }, [open, initialContract]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !saving) {
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
  }, [open, saving, onClose]);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) {
      return;
    }

    const normalizedProvider =
      provider.trim();

    const normalizedOffer = offer.trim();

    const normalizedPrice = Number(
      monthlyPrice
    );

    if (!normalizedProvider) {
      setErrorMessage(
        "Indique le fournisseur du contrat."
      );
      return;
    }

    if (
      !Number.isFinite(normalizedPrice) ||
      normalizedPrice < 0
    ) {
      setErrorMessage(
        "Indique un prix mensuel valide."
      );
      return;
    }

    try {
      setErrorMessage("");

      await onSave({
        provider: normalizedProvider,
        offer: normalizedOffer,
        monthlyPrice: normalizedPrice,
        endDate: endDate || undefined,
      });
    } catch (error) {
      console.error(
        "Erreur pendant la modification du contrat :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’enregistrer les modifications."
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-contract-title"
        className="max-h-full w-full max-w-xl overflow-y-auto rounded-[2rem] border border-green-500/20 bg-slate-900 p-6 text-white shadow-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
              Modification
            </p>

            <h2
              id="edit-contract-title"
              className="mt-3 text-3xl font-black"
            >
              ✏️ Modifier le contrat
            </h2>

            <p className="mt-2 text-slate-400">
              {categoryLabel}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Fermer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="edit-provider"
              className="text-sm font-bold text-slate-300"
            >
              Fournisseur
            </label>

            <input
              id="edit-provider"
              type="text"
              value={provider}
              onChange={(event) => {
                setProvider(event.target.value);
                setErrorMessage("");
              }}
              disabled={saving}
              placeholder="Nom du fournisseur"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none transition focus:border-green-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="edit-offer"
              className="text-sm font-bold text-slate-300"
            >
              Offre ou formule
            </label>

            <input
              id="edit-offer"
              type="text"
              value={offer}
              onChange={(event) => {
                setOffer(event.target.value);
                setErrorMessage("");
              }}
              disabled={saving}
              placeholder="Ex : Tous risques, Premium..."
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none transition focus:border-green-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="edit-monthly-price"
              className="text-sm font-bold text-slate-300"
            >
              Prix mensuel
            </label>

            <div className="relative mt-2">
              <input
                id="edit-monthly-price"
                type="number"
                min="0"
                step="0.01"
                value={monthlyPrice}
                onChange={(event) => {
                  setMonthlyPrice(
                    event.target.value
                  );
                  setErrorMessage("");
                }}
                disabled={saving}
                placeholder="Ex : 49.99"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 pr-12 outline-none transition focus:border-green-500 disabled:opacity-60"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                €
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-end-date"
              className="text-sm font-bold text-slate-300"
            >
              Échéance
            </label>

            <input
              id="edit-end-date"
              type="date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                setErrorMessage("");
              }}
              disabled={saving}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none transition focus:border-green-500 disabled:opacity-60"
            />

            <p className="mt-2 text-sm text-slate-500">
              Facultatif.
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-2xl border border-slate-700 px-6 py-4 font-bold text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Recalcul en cours..."
                : "Enregistrer et recalculer"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}