"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  defaultValue: string | number;
  options?: string[];
};

type CompletionType =
  | "contract"
  | "purchase"
  | "none";

type MonitoringCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "moto"
  | "mutuelle"
  | "mutuelle-senior"
  | "animaux"
  | "assurance-obseques"
  | "banque"
  | "streaming"
  | "mobilites-douces"
  | "securite";

type DynamicOffer = {
  href: string;
  buttonLabel: string;
  recommendedName?: string;
  advice?: string;
  external?: boolean;

  // Partenaire exclusif sur cette mission
  exclusivePartner?: boolean;

  // Contact humain facultatif
  contactPhone?: string;
  contactPhoneLabel?: string;
  contactCode?: string;

  /*
   * Facultatif : permet de personnaliser le suivi
   * après une souscription / un achat.
   */
  completionType?: CompletionType;
  monitoringCategory?: MonitoringCategory;
  provider?: string;
  offerName?: string;
};

type PricingMode = "quote" | "known";

type AnalyseCategory = MonitoringCategory;

type MissionLayoutProps = {
  icon: string;
  title: string;
  subtitle: string;
  fields: Field[];

  /*
   * Conservés pour ne casser aucune mission existante.
   *
   * En mode "quote", recommendedPrice n'est PAS utilisé
   * pour annoncer une économie à l'utilisateur.
   */
  basePrice: number;
  recommendedPrice: number;

  recommendedName: string;
  advice: string;

  /*
   * quote :
   * le tarif du partenaire dépend d'un devis ou du profil.
   * Pilo ne chiffre pas encore l'économie.
   *
   * known :
   * Pilo dispose d'un tarif permettant de calculer
   * une économie estimée.
   *
   * Par sécurité, "quote" est le mode par défaut.
   */
  pricingMode?: PricingMode;

  analysisCategory?: AnalyseCategory;

  offerPath?: string;

  dynamicOfferField?: string;
  dynamicOffers?: Record<string, DynamicOffer>;

  alternativeOfferField?: string;
  alternativeOffers?: Record<string, DynamicOffer>;
  alternativeTitle?: string;

  thirdOffer?: DynamicOffer;
  thirdOfferTitle?: string;

  /*
   * Suivi après consultation d'une offre partenaire.
   *
   * contract :
   * redirige vers le Monitoring Premium avec les
   * informations connues préremplies.
   *
   * purchase :
   * confirme un achat / une prestation ponctuelle
   * sans créer de contrat Monitoring.
   *
   * none :
   * aucun bouton de confirmation supplémentaire.
   */
  completionType?: CompletionType;
  monitoringCategory?: MonitoringCategory;
  partnerName?: string;
  purchaseLabel?: string;

  /*
   * Permet d'afficher un message spécifique pour les parcours
   * entièrement réalisés par l'utilisateur, sans démarchage téléphonique.
   *
   * Exemple : assurance emprunteur GSelect.
   */
  selfServiceQuote?: boolean;

  /*
   * Permet à une mission de récupérer les réponses enregistrées
   * par la page Analyse dans localStorage ("pilo-analysis").
   *
   * Désactivé par défaut pour ne modifier aucun parcours existant.
   */
  inheritAnalysisValues?: boolean;
};

export default function MissionLayout({
  icon,
  title,
  subtitle,
  fields,
  basePrice,
  recommendedPrice,
  recommendedName,
  advice,
  pricingMode = "quote",
  analysisCategory,
  offerPath = "/offres/mobile",
  dynamicOfferField,
  dynamicOffers,
  alternativeOfferField,
  alternativeOffers,
  alternativeTitle = "Autre offre partenaire",
  thirdOffer,
  thirdOfferTitle = "Autre partenaire",
  completionType,
  monitoringCategory,
  partnerName,
  purchaseLabel = "✅ J’ai réalisé cet achat",
  selfServiceQuote = false,
  inheritAnalysisValues = false,
}: MissionLayoutProps) {
  const router = useRouter();

  const [
    confirmedPurchaseHref,
    setConfirmedPurchaseHref,
  ] = useState<string | null>(null);

  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const [values, setValues] = useState<
    Record<string, string | number>
  >(
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.defaultValue,
      ])
    )
  );

  useEffect(() => {
    if (!inheritAnalysisValues) {
      return;
    }

    try {
      const rawAnalysis = localStorage.getItem("pilo-analysis");

      if (!rawAnalysis) {
        return;
      }

      const parsedAnalysis = JSON.parse(rawAnalysis) as {
        values?: Record<string, string | number>;
      };

      if (!parsedAnalysis.values) {
        return;
      }

      setValues((previousValues) => ({
        ...previousValues,
        ...parsedAnalysis.values,
      }));
    } catch (error) {
      console.error(
        "Impossible de récupérer les réponses de l’analyse Pilo :",
        error
      );
    }
  }, [inheritAnalysisValues]);

  const currentPrice = Number(
    values.monthlyPrice ?? basePrice
  );

  const safeCurrentPrice = Number.isFinite(
    currentPrice
  )
    ? currentPrice
    : basePrice;

  /*
   * Ce calcul n'est affiché que lorsque pricingMode === "known".
   *
   * En mode devis, Pilo attend le vrai tarif partenaire
   * avant de calculer l'économie réelle.
   */
  const monthlySaving = Math.max(
    safeCurrentPrice - recommendedPrice,
    0
  );

  const yearlySaving = Math.round(
    monthlySaving * 12
  );

  const selectedDynamicValue = dynamicOfferField
    ? String(values[dynamicOfferField] ?? "")
    : "";

  const selectedOffer =
    dynamicOffers && selectedDynamicValue
      ? dynamicOffers[selectedDynamicValue]
      : undefined;

  const selectedAlternativeValue =
    alternativeOfferField
      ? String(
          values[alternativeOfferField] ?? ""
        )
      : "";

  const selectedAlternativeOffer =
    alternativeOffers &&
    selectedAlternativeValue
      ? alternativeOffers[
          selectedAlternativeValue
        ]
      : undefined;

  const buildInternalOfferHref = () => {
    const params = new URLSearchParams();

    Object.entries(values).forEach(
      ([key, value]) => {
        params.set(
          key,
          String(value ?? "")
        );
      }
    );

    const queryString = params.toString();

    return queryString
      ? `${offerPath}?${queryString}`
      : offerPath;
  };

  const finalHref =
    selectedOffer?.href ??
    buildInternalOfferHref();

  const finalButtonLabel =
    selectedOffer?.buttonLabel ??
    "Voir les solutions partenaires";

  const finalRecommendedName =
    selectedOffer?.recommendedName ??
    recommendedName;

  const finalAdvice =
    selectedOffer?.advice ??
    advice;

  const opensExternalWebsite =
    selectedOffer?.external === true;

  const isExclusivePartner =
    selectedOffer?.exclusivePartner === true;

  const actionClassName =
    "mt-8 inline-block rounded-xl bg-green-500 px-8 py-3 font-bold text-black transition hover:bg-green-400";

  const alternativeActionClassName =
    "mt-6 inline-block rounded-xl border border-green-400/40 bg-green-500/10 px-7 py-3 font-bold text-green-300 transition hover:bg-green-500/20";


  const completionActionClassName =
    "mt-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 px-6 py-3 text-sm font-black text-white transition hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-300";

  const getCompletionType = (
    offer?: DynamicOffer
  ): CompletionType => {
    if (offer?.completionType) {
      return offer.completionType;
    }

    if (completionType) {
      return completionType;
    }

    const category =
      offer?.monitoringCategory ??
      monitoringCategory ??
      analysisCategory;

    return category ? "contract" : "none";
  };

  const getMonitoringCategory = (
    offer?: DynamicOffer
  ): MonitoringCategory | undefined =>
    offer?.monitoringCategory ??
    monitoringCategory ??
    analysisCategory;

  const buildMonitoringHref = (
    offer: DynamicOffer | undefined,
    offerName: string
  ) => {
    const category =
      getMonitoringCategory(offer);

    if (!category) {
      return "/monitoring/add";
    }

    const params = new URLSearchParams();

    params.set("source", "mission");
    params.set("category", category);

    const provider =
      offer?.provider?.trim() ||
      partnerName?.trim() ||
      "";

    if (provider) {
      params.set("provider", provider);
    }

    const selectedOfferName =
      offer?.offerName?.trim() ||
      offer?.recommendedName?.trim() ||
      offerName.trim();

    if (selectedOfferName) {
      params.set(
        "offer",
        selectedOfferName
      );
    }

    /*
     * En mode "known", Pilo connaît le tarif.
     * En mode devis, on laisse le prix vide car
     * seul le partenaire peut fournir le montant réel.
     */
    if (pricingMode === "known") {
      params.set(
        "price",
        String(recommendedPrice)
      );

      if (monthlySaving > 0) {
        params.set(
          "saving",
          String(monthlySaving)
        );
      }
    }

    return `/monitoring/add?${params.toString()}`;
  };

  const confirmPurchase = (
    offerHref: string,
    offerName: string
  ) => {
    const payload = {
      missionTitle: title,
      offerName,
      offerHref,
      confirmedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "pilo-last-purchase",
      JSON.stringify(payload)
    );

    setConfirmedPurchaseHref(
      offerHref
    );
  };

  const renderCompletionAction = (
    offer: DynamicOffer | undefined,
    offerHref: string,
    offerName: string
  ) => {
    const type = getCompletionType(
      offer
    );

    if (type === "none") {
      return null;
    }

    if (type === "contract") {
      const category =
        getMonitoringCategory(offer);

      if (!category) {
        return null;
      }

      return (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-sm font-bold text-white">
            Tu as souscrit ?
          </p>

          <Link
            href={buildMonitoringHref(
              offer,
              offerName
            )}
            className={
              completionActionClassName
            }
          >
            ✅ Ajouter à mon suivi Pilo
          </Link>
        </div>
      );
    }

    const purchaseConfirmed =
      confirmedPurchaseHref ===
      offerHref;

    return (
      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        {purchaseConfirmed ? (
          <p className="font-bold text-green-300">
            ✅ Action confirmée dans Pilo.
          </p>
        ) : (
          <button
            type="button"
            onClick={() =>
              confirmPurchase(
                offerHref,
                offerName
              )
            }
            className={
              completionActionClassName
            }
          >
            {purchaseLabel}
          </button>
        )}
      </div>
    );
  };

  const updateValue = (
    fieldName: string,
    value: string | number
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      [fieldName]: value,
    }));
  };

  const startAnalysis = () => {
    if (!analysisCategory) {
      router.push("/analyse");
      return;
    }

    router.push(
      `/analyse?category=${encodeURIComponent(
        analysisCategory
      )}`
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="text-green-400 hover:underline"
        >
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            {icon} Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            {title}
          </h1>

          <p className="mt-4 text-slate-300">
            {subtitle}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name}>
                <p className="mb-2 font-semibold">
                  {field.label}
                </p>

                {field.type === "select" ? (
                  <select
                    value={String(
                      values[field.name] ??
                        field.defaultValue
                    )}
                    onChange={(event) =>
                      updateValue(
                        field.name,
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
                  >
                    {field.options?.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    min={
                      field.type === "number"
                        ? 0
                        : undefined
                    }
                    value={
                      values[field.name] ??
                      field.defaultValue
                    }
                    onChange={(event) => {
                      const newValue =
                        field.type === "number"
                          ? event.target.value === ""
                            ? 0
                            : Number(
                                event.target.value
                              )
                          : event.target.value;

                      updateValue(
                        field.name,
                        newValue
                      );
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
                  />
                )}
              </label>
            ))}
          </div>

          {analysisCategory && (
            <button
              type="button"
              onClick={startAnalysis}
              className="mt-8 w-full rounded-2xl bg-green-500 px-8 py-4 text-lg font-black text-slate-950 transition hover:bg-green-400"
            >
              🔍 Lancer l’analyse de Pilo
            </button>
          )}

          {pricingMode === "known" ? (
            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Recommandation Pilo
              </p>

              <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
                <h2 className="text-4xl font-black text-green-400">
                  {yearlySaving} €
                </h2>
                <p className="pb-1 text-sm text-slate-300">
                  d&apos;économie annuelle estimée
                </p>
              </div>

              <h3 className="mt-5 text-2xl font-black">
                {finalRecommendedName}
              </h3>

              <p className="mt-2 leading-6 text-slate-300">
                {finalAdvice}
              </p>

              {opensExternalWebsite && (
                <p className="mt-4 text-sm text-amber-200">
                  ↗ Tu vas être redirigé vers le partenaire pour vérifier le tarif et les conditions.
                </p>
              )}

              {opensExternalWebsite ? (
                <a
                  href={finalHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={actionClassName}
                >
                  {finalButtonLabel}
                </a>
              ) : (
                <Link
                  href={finalHref}
                  className={actionClassName}
                >
                  {finalButtonLabel}
                </Link>
              )}

              {renderCompletionAction(
                selectedOffer,
                finalHref,
                finalRecommendedName
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-300">
                  Recommandation Pilo
                </p>

                {isExclusivePartner && (
                  <span className="rounded-full border border-green-400/30 bg-green-500/10 px-3 py-1 text-xs font-black text-green-300">
                    🎁 Avantage PiloEco
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                {finalRecommendedName}
              </h2>

              <p className="mt-3 leading-6 text-slate-300">
                {finalAdvice}
              </p>

              {selfServiceQuote && (
                <p className="mt-4 text-sm font-semibold text-green-200">
                  ✅ Tu réalises la démarche toi-même, à ton rythme.
                </p>
              )}

              {opensExternalWebsite && (
                <p className="mt-4 text-sm text-amber-200">
                  ↗ Le bouton ouvre le site du partenaire. Tu restes libre de poursuivre ou non.
                </p>
              )}

              {opensExternalWebsite ? (
                <a
                  href={finalHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={actionClassName}
                >
                  {finalButtonLabel}
                </a>
              ) : (
                <Link
                  href={finalHref}
                  className={actionClassName}
                >
                  {finalButtonLabel}
                </Link>
              )}

              {selectedOffer?.contactPhone && (
                <div className="mt-6 rounded-2xl border border-green-500/20 bg-slate-950/50 p-4">
                  <p className="text-sm font-bold text-white">
                    📞 Besoin d&apos;un accompagnement ?
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${selectedOffer.contactPhone}`}
                      className="inline-flex items-center justify-center rounded-xl border border-green-400/40 bg-green-500/10 px-5 py-3 font-bold text-green-300 transition hover:bg-green-500/20"
                    >
                      📞 {selectedOffer.contactPhoneLabel ?? selectedOffer.contactPhone}
                    </a>

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            selectedOffer.contactPhone ?? ""
                          );
                          setCopiedPhone(selectedOffer.contactPhone ?? null);
                          window.setTimeout(() => setCopiedPhone(null), 2000);
                        } catch {
                          setCopiedPhone(null);
                        }
                      }}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 px-5 py-3 text-sm font-bold text-white transition hover:border-green-400/40 hover:text-green-300"
                    >
                      {copiedPhone === selectedOffer.contactPhone
                        ? "✅ Numéro copié"
                        : "📋 Copier"}
                    </button>
                  </div>

                  {selectedOffer.contactCode && (
                    <p className="mt-3 text-sm text-slate-300">
                      Code avantage :{" "}
                      <span className="font-black text-green-300">
                        {selectedOffer.contactCode}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {renderCompletionAction(
                selectedOffer,
                finalHref,
                finalRecommendedName
              )}
            </div>
          )}

          {selectedAlternativeOffer && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                {alternativeTitle}
              </p>

              <h3 className="mt-4 text-2xl font-black">
                {selectedAlternativeOffer.recommendedName ??
                  "Offre partenaire"}
              </h3>

              {selectedAlternativeOffer.advice && (
                <p className="mt-3 text-slate-300">
                  {selectedAlternativeOffer.advice}
                </p>
              )}

              {selectedAlternativeOffer.external ? (
                <a
                  href={
                    selectedAlternativeOffer.href
                  }
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={
                    alternativeActionClassName
                  }
                >
                  {
                    selectedAlternativeOffer.buttonLabel
                  }
                </a>
              ) : (
                <Link
                  href={
                    selectedAlternativeOffer.href
                  }
                  className={
                    alternativeActionClassName
                  }
                >
                  {
                    selectedAlternativeOffer.buttonLabel
                  }
                </Link>
              )}

              {renderCompletionAction(
                selectedAlternativeOffer,
                selectedAlternativeOffer.href,
                selectedAlternativeOffer.recommendedName ??
                  "Offre partenaire"
              )}
            </div>
          )}

          {thirdOffer && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                {thirdOfferTitle}
              </p>

              <h3 className="mt-4 text-2xl font-black">
                {thirdOffer.recommendedName ??
                  "Offre partenaire"}
              </h3>

              {thirdOffer.advice && (
                <p className="mt-3 text-slate-300">
                  {thirdOffer.advice}
                </p>
              )}

              {thirdOffer.external ? (
                <a
                  href={thirdOffer.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={
                    alternativeActionClassName
                  }
                >
                  {thirdOffer.buttonLabel}
                </a>
              ) : (
                <Link
                  href={thirdOffer.href}
                  className={
                    alternativeActionClassName
                  }
                >
                  {thirdOffer.buttonLabel}
                </Link>
              )}

              {renderCompletionAction(
                thirdOffer,
                thirdOffer.href,
                thirdOffer.recommendedName ??
                  "Offre partenaire"
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}