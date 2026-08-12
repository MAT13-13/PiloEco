"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PremiumGate from "../../components/PremiumGate";

import {
  createMonitoringContract,
} from "../services/monitoring.service";

const categories = [
  { value: "mobile", label: "Téléphone", icon: "📱" },
  { value: "internet", label: "Internet", icon: "🌐" },
  { value: "electricite", label: "Électricité", icon: "⚡" },
  { value: "habitation", label: "Assurance habitation", icon: "🏠" },
  { value: "auto", label: "Assurance auto", icon: "🚗" },
  { value: "moto", label: "Assurance moto", icon: "🏍️" },
  { value: "mutuelle", label: "Mutuelle santé", icon: "❤️" },
  { value: "mutuelle-senior", label: "Mutuelle senior", icon: "👵" },
  { value: "animaux", label: "Assurance animaux", icon: "🐶" },
  { value: "assurance-obseques", label: "Assurance obsèques", icon: "🕊️" },
  { value: "banque", label: "Banque", icon: "🏦" },
  { value: "streaming", label: "Streaming", icon: "📺" },
  { value: "mobilites-douces", label: "Assurance vélo / NVEI", icon: "🚲" },
  { value: "securite", label: "Sécurité / télésurveillance", icon: "🔐" },
] as const;

const categoryConfig = {
  mobile: {
    provider: "Free, Orange, SFR, Bouygues...",
    offer: "Forfait 150 Go",
    offerLabel: "Forfait actuel",
  },

  internet: {
    provider: "Free, Orange, SFR...",
    offer: "Fibre 1 Gb/s",
    offerLabel: "Offre actuelle",
  },

  electricite: {
    provider: "EDF, TotalEnergies, Octopus...",
    offer: "Offre électricité",
    offerLabel: "Offre actuelle",
  },

  habitation: {
    provider: "Leocare, MAIF, AXA...",
    offer: "Formule Confort",
    offerLabel: "Contrat actuel",
  },

  auto: {
    provider: "Leocare, Allianz, MAIF...",
    offer: "Tous risques",
    offerLabel: "Formule actuelle",
  },

  moto: {
    provider: "Leocare, AMV, April Moto...",
    offer: "Tous risques",
    offerLabel: "Formule actuelle",
  },

  mutuelle: {
    provider: "Nom de la mutuelle",
    offer: "Formule santé",
    offerLabel: "Formule actuelle",
  },

  "mutuelle-senior": {
    provider: "Nom de la mutuelle",
    offer: "Formule senior",
    offerLabel: "Formule actuelle",
  },

  animaux: {
    provider: "SantéVet, Kozoo, Bulle Bleue...",
    offer: "Formule Premium",
    offerLabel: "Formule actuelle",
  },

  "assurance-obseques": {
    provider: "Nom de l’assureur",
    offer: "Contrat obsèques",
    offerLabel: "Contrat actuel",
  },

  banque: {
    provider: "BoursoBank, Fortuneo, Crédit Agricole...",
    offer: "Compte / carte bancaire",
    offerLabel: "Offre actuelle",
  },

  streaming: {
    provider: "Netflix, Disney+, Spotify...",
    offer: "Premium",
    offerLabel: "Abonnement",
  },

  "mobilites-douces": {
    provider: "Ulygo...",
    offer: "Assurance vélo / NVEI",
    offerLabel: "Contrat actuel",
  },

  securite: {
    provider: "Verisure, Sector Alarm...",
    offer: "Télésurveillance",
    offerLabel: "Abonnement actuel",
  },
} as const;

type CategoryValue =
  (typeof categories)[number]["value"];

function isCategoryValue(
  value: string
): value is CategoryValue {
  return categories.some(
    (category) => category.value === value
  );
}

function addMonthsToDate(
  date: string,
  months: number
) {
  if (!date || !Number.isFinite(months) || months <= 0) {
    return "";
  }

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  parsed.setMonth(parsed.getMonth() + months);

  return parsed.toISOString().slice(0, 10);
}

function AddMonitoringContractForm() {
  const router = useRouter();

  const [category, setCategory] =
    useState<CategoryValue>("mobile");

  const [provider, setProvider] =
    useState("");

  const [monthlyPrice, setMonthlyPrice] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [currentOffer, setCurrentOffer] =
    useState("");

  const [
    subscriptionDate,
    setSubscriptionDate,
  ] = useState("");

  const [
    commitmentMonths,
    setCommitmentMonths,
  ] = useState("");

  const [
    autoRenewal,
    setAutoRenewal,
  ] = useState(false);

  const [
    isPromotional,
    setIsPromotional,
  ] = useState(false);

  const [
    promotionEndDate,
    setPromotionEndDate,
  ] = useState("");

  const [
    priceAfterPromotion,
    setPriceAfterPromotion,
  ] = useState("");

  const [
    monthlySaving,
    setMonthlySaving,
  ] = useState("");

  const [
    contractSource,
    setContractSource,
  ] = useState<"manual" | "mission">(
    "manual"
  );

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const categoryParam =
      params.get("category")?.trim() ?? "";

    const normalizedCategory =
      categoryParam === "telephone"
        ? "mobile"
        : categoryParam;

    if (isCategoryValue(normalizedCategory)) {
      setCategory(normalizedCategory);
    }

    const providerParam =
      params.get("provider")?.trim();

    const offerParam =
      params.get("offer")?.trim();

    const priceParam =
      params.get("price")?.trim();

    const sourceParam =
      params.get("source")?.trim();

    const savingParam =
      params.get("saving")?.trim();

    const subscriptionDateParam =
      params.get("subscriptionDate")?.trim();

    if (providerParam) {
      setProvider(providerParam);
    }

    if (offerParam) {
      setCurrentOffer(offerParam);
    }

    if (priceParam) {
      setMonthlyPrice(priceParam);
    }

    if (savingParam) {
      setMonthlySaving(savingParam);
    }

    if (subscriptionDateParam) {
      setSubscriptionDate(
        subscriptionDateParam
      );
    }

    if (sourceParam === "mission") {
      setContractSource("mission");
    }
  }, []);

  const selectedCategory =
    categories.find(
      (item) => item.value === category
    ) ?? categories[0];

  const config =
    categoryConfig[category];

  const calculatedEndDate = useMemo(() => {
    const months = Number(commitmentMonths);

    if (
      !subscriptionDate ||
      !Number.isFinite(months) ||
      months <= 0
    ) {
      return "";
    }

    return addMonthsToDate(
      subscriptionDate,
      months
    );
  }, [
    subscriptionDate,
    commitmentMonths,
  ]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    const normalizedPrice =
      Number(monthlyPrice);

    const normalizedCommitment =
      commitmentMonths.trim() === ""
        ? null
        : Number(commitmentMonths);

    const normalizedFuturePrice =
      priceAfterPromotion.trim() === ""
        ? null
        : Number(priceAfterPromotion);

    const normalizedMonthlySaving =
      monthlySaving.trim() === ""
        ? 0
        : Number(monthlySaving);

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

    if (
      normalizedCommitment !== null &&
      (
        !Number.isFinite(
          normalizedCommitment
        ) ||
        normalizedCommitment < 0
      )
    ) {
      setErrorMessage(
        "Indique une durée d’engagement valide."
      );

      return;
    }

    if (
      isPromotional &&
      normalizedFuturePrice !== null &&
      (
        !Number.isFinite(
          normalizedFuturePrice
        ) ||
        normalizedFuturePrice < 0
      )
    ) {
      setErrorMessage(
        "Indique un prix après promotion valide."
      );

      return;
    }

    if (
      !Number.isFinite(
        normalizedMonthlySaving
      ) ||
      normalizedMonthlySaving < 0
    ) {
      setErrorMessage(
        "Indique une économie mensuelle valide."
      );

      return;
    }

    const finalEndDate =
      endDate ||
      calculatedEndDate ||
      null;

    try {
      setSaving(true);
      setErrorMessage("");

      await createMonitoringContract({
        category,
        provider,
        monthly_price: normalizedPrice,
        end_date: finalEndDate,
        current_offer:
          currentOffer || null,

        subscription_date:
          subscriptionDate || null,

        commitment_months:
          normalizedCommitment,

        auto_renewal: autoRenewal,

        is_promotional: isPromotional,

        promotion_end_date:
          isPromotional
            ? promotionEndDate || null
            : null,

        price_after_promotion:
          isPromotional
            ? normalizedFuturePrice
            : null,

        monthly_saving:
          normalizedMonthlySaving,

        contract_source:
          contractSource,
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
            {contractSource === "mission"
              ? "✅ Confirmer mon nouveau contrat"
              : "Ajouter un contrat"}
          </h1>

          <p className="mt-3 text-slate-400">
            {contractSource === "mission"
              ? "Complète les informations de l’offre que tu viens de choisir pour que Pilo puisse suivre son prix et ses échéances."
              : "Ajoute les informations utiles de ton contrat pour que Pilo surveille son prix, ses échéances et les économies possibles."}
          </p>

          {contractSource === "mission" && (
            <div className="mt-5 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-100">
              ✨ Offre issue d’une mission Pilo. Les informations déjà connues ont été préremplies.
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-400">
            Le Monitoring est réservé aux contrats et abonnements récurrents. Les achats ponctuels
            comme un voyage, des travaux, un déménagement, des pièces auto ou de l’équipement
            ne sont pas ajoutés ici.
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-7"
          >
            <div>
              <p className="mb-3 text-sm font-bold text-slate-300">
                Catégorie
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
                      disabled={saving}
                      className={`rounded-2xl border p-4 text-left transition disabled:opacity-60 ${
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
                    Fournisseur / partenaire
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
                    htmlFor="subscription-date"
                    className="text-sm font-bold text-slate-300"
                  >
                    Date de souscription
                  </label>

                  <input
                    id="subscription-date"
                    type="date"
                    value={subscriptionDate}
                    onChange={(event) =>
                      setSubscriptionDate(
                        event.target.value
                      )
                    }
                    disabled={saving}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-green-500 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="commitment-months"
                    className="text-sm font-bold text-slate-300"
                  >
                    Durée d’engagement
                  </label>

                  <div className="relative mt-2">
                    <input
                      id="commitment-months"
                      type="number"
                      min="0"
                      step="1"
                      value={commitmentMonths}
                      onChange={(event) =>
                        setCommitmentMonths(
                          event.target.value
                        )
                      }
                      placeholder="12"
                      disabled={saving}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 pr-16 outline-none transition focus:border-green-500 disabled:opacity-60"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      mois
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="end-date"
                    className="text-sm font-bold text-slate-300"
                  >
                    Fin d’engagement / échéance
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

                  {!endDate &&
                    calculatedEndDate && (
                      <p className="mt-2 text-xs text-slate-500">
                        Pilo calculera automatiquement :{" "}
                        {new Date(
                          `${calculatedEndDate}T12:00:00`
                        ).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="text-lg font-black">
                🔔 Suivi du contrat
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Ces informations permettent à Pilo de te prévenir au bon moment.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <input
                    type="checkbox"
                    checked={autoRenewal}
                    onChange={(event) =>
                      setAutoRenewal(
                        event.target.checked
                      )
                    }
                    disabled={saving}
                    className="mt-1 h-4 w-4 accent-green-500"
                  />

                  <span>
                    <span className="block font-bold">
                      Renouvellement automatique
                    </span>

                    <span className="mt-1 block text-sm text-slate-400">
                      Le contrat peut se renouveler automatiquement à son échéance.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-900 p-4">
                  <input
                    type="checkbox"
                    checked={isPromotional}
                    onChange={(event) =>
                      setIsPromotional(
                        event.target.checked
                      )
                    }
                    disabled={saving}
                    className="mt-1 h-4 w-4 accent-green-500"
                  />

                  <span>
                    <span className="block font-bold">
                      Tarif promotionnel
                    </span>

                    <span className="mt-1 block text-sm text-slate-400">
                      Le prix actuel est temporaire et changera après la promotion.
                    </span>
                  </span>
                </label>
              </div>

              {isPromotional && (
                <div className="mt-5 grid gap-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="promotion-end-date"
                      className="text-sm font-bold text-slate-300"
                    >
                      Fin de la promotion
                    </label>

                    <input
                      id="promotion-end-date"
                      type="date"
                      value={promotionEndDate}
                      onChange={(event) =>
                        setPromotionEndDate(
                          event.target.value
                        )
                      }
                      disabled={saving}
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-green-500 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price-after-promotion"
                      className="text-sm font-bold text-slate-300"
                    >
                      Prix après promotion
                    </label>

                    <div className="relative mt-2">
                      <input
                        id="price-after-promotion"
                        type="number"
                        min="0"
                        step="0.01"
                        value={priceAfterPromotion}
                        onChange={(event) =>
                          setPriceAfterPromotion(
                            event.target.value
                          )
                        }
                        placeholder="29.99"
                        disabled={saving}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 outline-none transition focus:border-green-500 disabled:opacity-60"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        €
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-6">
              <h2 className="text-lg font-black">
                💰 Économie réalisée
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Facultatif. Indique l’économie mensuelle obtenue grâce à ce changement.
              </p>

              <div className="mt-5 max-w-sm">
                <label
                  htmlFor="monthly-saving"
                  className="text-sm font-bold text-slate-300"
                >
                  Économie mensuelle
                </label>

                <div className="relative mt-2">
                  <input
                    id="monthly-saving"
                    type="number"
                    min="0"
                    step="0.01"
                    value={monthlySaving}
                    onChange={(event) =>
                      setMonthlySaving(
                        event.target.value
                      )
                    }
                    placeholder="10.00"
                    disabled={saving}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 outline-none transition focus:border-green-500 disabled:opacity-60"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    €
                  </span>
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
                  : contractSource === "mission"
                    ? "✅ Activer le suivi Premium"
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