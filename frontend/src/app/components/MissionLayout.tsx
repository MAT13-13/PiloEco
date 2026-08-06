"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  defaultValue: string | number;
  options?: string[];
};

type DynamicOffer = {
  href: string;
  buttonLabel: string;
  recommendedName?: string;
  advice?: string;
  external?: boolean;
};

type AnalyseCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

type MissionLayoutProps = {
  icon: string;
  title: string;
  subtitle: string;
  fields: Field[];
  basePrice: number;
  recommendedPrice: number;
  recommendedName: string;
  advice: string;

  /*
   * À renseigner uniquement pour les missions compatibles
   * avec le parcours d’analyse Pilo.
   */
  analysisCategory?: AnalyseCategory;

  offerPath?: string;
  dynamicOfferField?: string;
  dynamicOffers?: Record<string, DynamicOffer>;

  alternativeOfferField?: string;
  alternativeOffers?: Record<string, DynamicOffer>;
  alternativeTitle?: string;
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
  analysisCategory,
  offerPath = "/offres/mobile",
  dynamicOfferField,
  dynamicOffers,
  alternativeOfferField,
  alternativeOffers,
  alternativeTitle = "Autre offre partenaire",
}: MissionLayoutProps) {
  const router = useRouter();

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

  const currentPrice = Number(
    values.monthlyPrice ?? basePrice
  );

  const safeCurrentPrice = Number.isFinite(currentPrice)
    ? currentPrice
    : basePrice;

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

  const finalHref =
    selectedOffer?.href ?? offerPath;

  const finalButtonLabel =
    selectedOffer?.buttonLabel ??
    "Voir une offre partenaire";

  const finalRecommendedName =
    selectedOffer?.recommendedName ??
    recommendedName;

  const finalAdvice =
    selectedOffer?.advice ?? advice;

  const opensExternalWebsite =
    selectedOffer?.external === true;

  const actionClassName =
    "mt-8 inline-block rounded-xl bg-green-500 px-8 py-3 font-bold text-black transition hover:bg-green-400";

  const alternativeActionClassName =
    "mt-6 inline-block rounded-xl border border-green-400/40 bg-green-500/10 px-7 py-3 font-bold text-green-300 transition hover:bg-green-500/20";

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
      return;
    }

    /*
     * La page analyse-loading attend uniquement
     * des valeurs sous forme de chaînes de caractères.
     */
    const normalizedValues: Record<
      string,
      string
    > = Object.fromEntries(
      Object.entries(values).map(
        ([key, value]) => [
          key,
          String(value ?? ""),
        ]
      )
    );

    /*
     * On garantit que le prix mensuel est toujours
     * présent dans les données de l’analyse.
     */
    normalizedValues.monthlyPrice = String(
      safeCurrentPrice
    );

    const analysisPayload = {
      category: analysisCategory,
      categoryLabel: title,
      icon,
      values: normalizedValues,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "pilo-analysis",
      JSON.stringify(analysisPayload)
    );

    /*
     * On supprime l’ancien résultat pour éviter
     * d’afficher une analyse précédente.
     */
    localStorage.removeItem(
      "pilo-analysis-result"
    );

    localStorage.removeItem(
      "pilo-ai-advice"
    );

    router.push("/analyse-loading");
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

          <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-green-300">
              Économie annuelle estimée
            </p>

            <h2 className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €
            </h2>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Première offre partenaire
            </p>

            <h3 className="mt-3 text-2xl font-black">
              {finalRecommendedName}
            </h3>

            <p className="mt-3 text-slate-300">
              {finalAdvice}
            </p>

            {opensExternalWebsite && (
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                En cliquant sur ce bouton, tu
                seras redirigé vers le site de
                notre partenaire. Tu restes libre
                de poursuivre ou non ta
                réservation.
              </div>
            )}

            {opensExternalWebsite ? (
              <a
                href={finalHref}
                target="_blank"
                rel="noopener noreferrer"
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
          </div>

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
                  {
                    selectedAlternativeOffer.advice
                  }
                </p>
              )}

              {selectedAlternativeOffer.external ? (
                <a
                  href={
                    selectedAlternativeOffer.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
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
            </div>
          )}
        </section>
      </div>
    </main>
  );
}