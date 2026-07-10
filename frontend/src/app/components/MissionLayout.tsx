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
}: MissionLayoutProps) {
  const [values, setValues] = useState<Record<string, string | number>>(
    Object.fromEntries(fields.map((field) => [field.name, field.defaultValue]))
  );

  const currentPrice = Number(values.monthlyPrice ?? basePrice);
  const monthlySaving = Math.max(currentPrice - recommendedPrice, 0);
  const yearlySaving = monthlySaving * 12;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="text-green-400 hover:underline">
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            {icon} Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">{title}</h1>

          <p className="mt-4 text-slate-300">{subtitle}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name}>
                <p className="mb-2 font-semibold">{field.label}</p>

                {field.type === "select" ? (
                  <select
                    value={values[field.name]}
                    onChange={(e) =>
                      setValues({ ...values, [field.name]: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
                  >
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={values[field.name]}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [field.name]:
                          field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-green-300">Économie annuelle estimée</p>

            <h2 className="mt-2 text-5xl font-black text-green-400">
              {yearlySaving} €
            </h2>

            <h3 className="mt-6 text-2xl font-black">{recommendedName}</h3>

            <p className="mt-3 text-slate-300">{advice}</p>

            <Link
              href={offerPath}
              className="mt-8 inline-block rounded-xl bg-green-500 px-8 py-3 font-bold text-black hover:bg-green-400"
            >
              Voir une meilleure offre
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}