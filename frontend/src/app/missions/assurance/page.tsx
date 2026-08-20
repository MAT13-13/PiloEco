"use client";

import Link from "next/link";

const assurances = [
  
  {
    icon: "🐶",
    title: "Assurance animaux",
    description:
      "Analyse la protection de ton chien ou chat et compare les solutions disponibles.",
    saving: "Opportunité d'économie",
    href: "/missions/animaux",
  },
  {
    icon: "🚗",
    title: "Assurance auto",
    description:
      "Compare ton assurance auto et découvre les solutions partenaires adaptées.",
    saving: "Opportunité d'économie",
    href: "/missions/auto",
  },
  {
    icon: "🏍️",
    title: "Assurance moto",
    description:
      "Compare ton assurance moto et découvre les solutions adaptées à ton profil.",
    saving: "Opportunité d'économie",
    href: "/missions/moto",
  },
  {
    icon: "🏠",
    title: "Assurance habitation",
    description:
      "Compare ton assurance logement et découvre les solutions partenaires disponibles.",
    saving: "Opportunité d'économie",
    href: "/missions/habitation",
  },
  
  {
    icon: "🏦",
    title: "Assurance emprunteur",
    description:
      "Analyse ton assurance de prêt et découvre si une solution partenaire peut t'aider à réduire son coût.",
    saving: "Opportunité d'économie",
    href: "/missions/assurance-emprunteur",
  },
];

export default function AssuranceHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="text-green-400 hover:underline"
        >
          ← Retour au dashboard
        </Link>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Hub assurances
          </p>

          <h1 className="mt-3 text-5xl font-black">
            🛡️ Tes assurances
          </h1>

          <p className="mt-5 max-w-3xl text-xl text-slate-300">
            Pilo regroupe ici les missions liées aux assurances afin de
            t&apos;aider à identifier les contrats qui peuvent être optimisés.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {assurances.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-green-400/60 hover:bg-slate-800"
              >
                <div className="text-5xl">
                  {item.icon}
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  {item.title}
                </h2>

                <p className="mt-3 text-slate-300">
                  {item.description}
                </p>

                <p className="mt-5 font-black text-green-400">
                  💡 {item.saving}
                </p>

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