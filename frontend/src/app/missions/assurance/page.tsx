"use client";

import Link from "next/link";

const assurances = [
  {
    icon: "🏠",
    title: "Assurance habitation",
    description: "Compare ton assurance logement et cherche une meilleure offre.",
    saving: "Jusqu'à 120 €/an",
    href: "/missions/habitation",
  },
  {
    icon: "🐶",
    title: "Assurance animaux",
    description: "Analyse la mutuelle de ton chien ou chat avec Pilo.",
    saving: "Jusqu'à 90 €/an",
    href: "/missions/animaux",
  },
];

export default function AssuranceHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="font-bold text-green-400 hover:text-green-300">
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Hub assurances
          </p>

          <h1 className="mt-3 text-5xl font-black">🛡️ Tes assurances</h1>

          <p className="mt-5 max-w-3xl text-xl text-slate-300">
            Pilo regroupe ici toutes les missions liées aux assurances pour t'aider
            à repérer les économies les plus simples à faire.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {assurances.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-green-400/60 hover:bg-slate-800"
              >
                <div className="text-5xl">{item.icon}</div>

                <h2 className="mt-5 text-2xl font-black">{item.title}</h2>

                <p className="mt-3 text-slate-300">{item.description}</p>

                <p className="mt-5 font-black text-green-400">{item.saving}</p>

                <div className="mt-6 inline-block rounded-full bg-green-500 px-5 py-3 font-black text-slate-950">
                  Ouvrir la mission →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}