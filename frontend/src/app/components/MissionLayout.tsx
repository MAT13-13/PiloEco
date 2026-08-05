"use client";

import Link from "next/link";
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

type MissionLayoutProps = {
  icon: string;
  title: string;
  subtitle: string;
  fields: Field[];
  basePrice: number;
  recommendedPrice: number;
  recommendedName: string;
  advice: string;
  offerPath?: string;
  dynamicOfferField?: string;
  dynamicOffers?: Record<string, DynamicOffer>;
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
  offerPath = "/offres/mobile",
  dynamicOfferField,
  dynamicOffers,
}: MissionLayoutProps) {
  const [values, setValues] = useState<Record<string, string | number>>(
    Object.fromEntries(
      fields.map((field) => [field.name, field.defaultValue])
    )
  );

  const currentPrice = Number(values.monthlyPrice ?? basePrice);

  const monthlySaving = Math.max(
    currentPrice - recommendedPrice,
    0
  );

  const yearlySaving = monthlySaving * 12;

  const selectedDynamicValue = dynamicOfferField
    ? String(values[dynamicOfferField] ?? "")
    : "";

  const selectedOffer =
    dynamicOffers && selectedDynamicValue
      ? dynamicOffers[selectedDynamicValue]
      : undefined;

  const finalHref = selectedOffer?.href ?? offerPath;

  const finalButtonLabel =
    selectedOffer?.buttonLabel ?? "Voir une meilleure offre";

  const finalRecommendedName =
    selectedOffer?.recommendedName ?? recommendedName;

  const finalAdvice =
    selectedOffer?.advice ?? advice;

  const opensExternalWebsite =
    selectedOffer?.external === true;

  const actionClassName =
    "mt-8 inline-block rounded-xl bg-green-500 px-8 py-3 font-bold text-black transition hover:bg-green-400";

  const updateValue = (
    fieldName: string,
    value: string | number
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      [fieldName]: value,
    }));
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
                    {field.options?.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
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
                          ? Number(event.target.value)
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

          <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-green-300">
              Économie annuelle estimée
            </p>

            <h2 className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €
            </h2>

            <h3 className="mt-6 text-2xl font-black">
              {finalRecommendedName}
            </h3>

            <p className="mt-3 text-slate-300">
              {finalAdvice}
            </p>

            {opensExternalWebsite && (
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                En cliquant sur ce bouton, tu seras redirigé vers le site de notre partenaire afin d’obtenir un devis personnalisé. Tu restes libre de poursuivre ou non ta demande.
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
        </section>
      </div>
    </main>
  );
}