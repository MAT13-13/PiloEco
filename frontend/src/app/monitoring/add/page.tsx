"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PremiumGate from "../../components/PremiumGate";

import {
  createMonitoringContract,
} from "../services/monitoring.service";

const categories = [
  {
    value: "mobile",
    label: "Téléphone",
    icon: "📱",
  },
  {
    value: "internet",
    label: "Internet",
    icon: "🌐",
  },
  {
    value: "electricite",
    label: "Électricité",
    icon: "⚡",
  },
  {
    value: "habitation",
    label: "Assurance habitation",
    icon: "🏠",
  },
  {
    value: "auto",
    label: "Assurance auto",
    icon: "🚗",
  },
  {
    value: "animaux",
    label: "Assurance animaux",
    icon: "🐶",
  },
  {
    value: "banque",
    label: "Banque",
    icon: "🏦",
  },
  {
    value: "streaming",
    label: "Streaming",
    icon: "📺",
  },
];

const categoryConfig = {
  mobile: {
    provider: "Free, Orange, SFR, Bouygues...",
    offer: "Forfait 150 Go",
    offerLabel: "Forfait actuel",
  },

  internet: {
    provider: "Free, Orange, SFR...",
    offer: "Fibre 1 Gb/s",
    offerLabel: "{config.offerLabel}",
  },

  electricite: {
    provider: "EDF, TotalEnergies, Octopus...",
    offer: "Tarif Bleu",
    offerLabel: "Tarif actuel",
  },

  habitation: {
    provider: "AXA, MAIF, Acheel...",
    offer: "Formule Confort",
    offerLabel: "Contrat actuel",
  },

  auto: {
    provider: "AXA, Allianz, MAIF...",
    offer: "Tous risques",
    offerLabel: "Formule actuelle",
  },

  animaux: {
    provider: "SantéVet, Kozoo, Bulle Bleue...",
    offer: "Formule Premium",
    offerLabel: "Formule actuelle",
  },

  banque: {
    provider: "BoursoBank, Crédit Agricole...",
    offer: "Visa Premier",
    offerLabel: "Carte ou offre",
  },

  streaming: {
    provider: "Netflix, Disney+, Spotify...",
    offer: "Premium",
    offerLabel: "Abonnement",
  },
} as const;

function AddMonitoringContractForm() {
  const router = useRouter();

  const [category, setCategory] =
    useState("mobile");

  const [provider, setProvider] =
    useState("");

  const [monthlyPrice, setMonthlyPrice] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [currentOffer, setCurrentOffer] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const selectedCategory =
    categories.find(
      (item) => item.value === category
    ) ?? categories[0];
const config =
  categoryConfig[
    category as keyof typeof categoryConfig
  ];

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    const normalizedPrice =
      Number(monthlyPrice);

    if (!provider.trim()) {
      setErrorMessage(
        "Indique le nom de ton fournisseur."
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
      setSaving(true);
      setErrorMessage("");

      await createMonitoringContract({
        category,
        provider,
        monthly_price: normalizedPrice,
        end_date: endDate || null,
        current_offer:
          currentOffer || null,
      });

      router.push("/monitoring");
      router.refresh();
    } catch (error) {
      console.error(
        "Erreur création contrat :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’enregistrer ce contrat."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:ml-64">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/monitoring"
          className="text-green-400 transition hover:text-green-300"
        >
          ← Retour au Monitoring
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco Premium
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Ajouter un contrat
          </h1>

          <p className="mt-3 text-slate-400">
            Ajoute un contrat pour que Pilo
            surveille son prix, son échéance et
            les économies possibles.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-7"
          >
            <div>
              <p className="mb-3 text-sm font-bold text-slate-300">
                Catégorie
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((item) => {
                  const active =
                    category === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setCategory(item.value)
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-green-400 bg-green-500/20"
                          : "border-white/10 bg-slate-950 hover:border-green-500/40"
                      }`}
                    >
                      <span className="text-3xl">
                        {item.icon}
                      </span>

                      <p className="mt-2 font-bold">
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/70 p-6">
              <p className="font-bold text-green-400">
                {selectedCategory.icon}{" "}
                {selectedCategory.label}
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="provider"
                    className="text-sm font-bold text-slate-300"
                  >
                    Fournisseur
                  </label>

                  <input
                    id="provider"
                    type="text"
                    value={provider}
                    onChange={(event) =>
                      setProvider(
                        event.target.value
                      )
                    }
                    placeholder={config.provider}
                    disabled={saving}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-green-500 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="monthly-price"
                    className="text-sm font-bold text-slate-300"
                  >
                    Prix mensuel
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="monthly-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={monthlyPrice}
                      onChange={(event) =>
                        setMonthlyPrice(
                          event.target.value
                        )
                      }
                      placeholder="19.99"
                      disabled={saving}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 outline-none transition focus:border-green-500 disabled:opacity-60"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      €
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="current-offer"
                    className="text-sm font-bold text-slate-300"
                  >
                    {config.offerLabel}
                  </label>

                  <input
                    id="current-offer"
                    type="text"
                    value={currentOffer}
                    onChange={(event) =>
                      setCurrentOffer(
                        event.target.value
                      )
                    }
                    placeholder={config.offer}
                    disabled={saving}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-green-500 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="end-date"
                    className="text-sm font-bold text-slate-300"
                  >
                    Fin d’engagement ou échéance
                  </label>

                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                      setEndDate(
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-green-500 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/monitoring"
                className="rounded-2xl border border-slate-700 px-6 py-3 text-center font-bold text-slate-300 transition hover:bg-slate-800"
              >
                Annuler
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-green-500 px-6 py-3 font-black text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Enregistrement..."
                  : "💾 Enregistrer le contrat"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function AddMonitoringContractPage() {
  return (
    <PremiumGate
      title="Ajouter un contrat"
      description="Ajoute tes contrats pour activer leur surveillance automatique."
    >
      <AddMonitoringContractForm />
    </PremiumGate>
  );
}