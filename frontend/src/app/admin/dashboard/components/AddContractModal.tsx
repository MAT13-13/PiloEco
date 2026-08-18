"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { supabase } from "../../../lib/supabase";

type Partner = {
  id: string;
  company: string;
};

type Props = {
  onSuccess: () => void | Promise<void>;
};

export default function AddContractModal({
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);

  const [partners, setPartners] = useState<
    Partner[]
  >([]);

  const [partnerId, setPartnerId] =
    useState("");

  const [commission, setCommission] =
    useState("");

  const [reference, setReference] =
    useState("");

  const [offerName, setOfferName] =
    useState("");

  const [loadingPartners, setLoadingPartners] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    async function loadPartners() {
      try {
        setLoadingPartners(true);
        setErrorMessage(null);

        const { data, error } = await supabase
          .from("partner_profiles")
          .select("id, company")
          .order("company", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        setPartners(
          (data ?? []).map((partner) => ({
            id: partner.id,
            company:
              partner.company ??
              "Partenaire sans nom",
          }))
        );
      } catch (error) {
        console.error(
          "Erreur chargement partenaires :",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Impossible de charger les partenaires."
        );
      } finally {
        setLoadingPartners(false);
      }
    }

    void loadPartners();
  }, [open]);

  function resetForm() {
    setPartnerId("");
    setCommission("");
    setReference("");
    setOfferName("");
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setOpen(false);
    resetForm();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!partnerId) {
      setErrorMessage(
        "Sélectionne un partenaire."
      );
      return;
    }

    const parsedCommission = Number(
      commission
        .replace(",", ".")
        .trim()
    );

    if (
      !Number.isFinite(parsedCommission) ||
      parsedCommission < 0
    ) {
      setErrorMessage(
        "Indique une commission valide."
      );
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase
        .from("partner_events")
        .insert({
          partner_id: partnerId,
          event_type: "sale",
          amount: parsedCommission,
          metadata: {
            reference:
              reference.trim() || null,

            offer_name:
              offerName.trim() || null,

            status: "validated",

            source: "manual_admin",
          },
        });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Contrat enregistré avec succès."
      );

      await onSuccess();

      window.setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 800);
    } catch (error) {
      console.error(
        "Erreur enregistrement contrat :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'enregistrer le contrat."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
      >
        ➕ Ajouter un contrat
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                  PiloEco Business
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  ➕ Ajouter un contrat
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Enregistre une vente validée et sa
                  commission.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 font-bold text-slate-300 transition hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Partenaire *
                </label>

                <select
                  value={partnerId}
                  onChange={(event) =>
                    setPartnerId(
                      event.target.value
                    )
                  }
                  disabled={
                    loadingPartners ||
                    saving
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-green-400"
                >
                  <option value="">
                    {loadingPartners
                      ? "Chargement..."
                      : "Choisir un partenaire"}
                  </option>

                  {partners.map((partner) => (
                    <option
                      key={partner.id}
                      value={partner.id}
                    >
                      {partner.company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Offre
                </label>

                <input
                  type="text"
                  value={offerName}
                  onChange={(event) =>
                    setOfferName(
                      event.target.value
                    )
                  }
                  placeholder="Ex. Électricité Premium"
                  disabled={saving}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Commission (€) *
                </label>

                <input
                  type="text"
                  inputMode="decimal"
                  value={commission}
                  onChange={(event) =>
                    setCommission(
                      event.target.value
                    )
                  }
                  placeholder="Ex. 90"
                  disabled={saving}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Référence du contrat
                </label>

                <input
                  type="text"
                  value={reference}
                  onChange={(event) =>
                    setReference(
                      event.target.value
                    )
                  }
                  placeholder="Ex. OHM-2026-001"
                  disabled={saving}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-green-400"
                />
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-300">
                  {successMessage}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-green-400 px-5 py-3 font-black text-slate-950 transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Enregistrement..."
                    : "✅ Enregistrer le contrat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}