"use client";

import Link from "next/link";

const OHM_ELECTRICITE_URL =
  "https://dte.ohm-energie.com/?P512BA758C0F5191&redir=https%3A%2F%2Fohm-energie.com%2Foffre%2Felectricite";

export default function ElectriciteOfferPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">⚡ Offre Électricité</h1>

        <div className="mt-8 rounded-3xl border border-green-500/20 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            Solution partenaire
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Une offre électricité adaptée à ton besoin
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Pilo a identifié une solution partenaire pour t&apos;aider à
            comparer ton contrat d&apos;électricité et vérifier si une offre
            plus adaptée à ta consommation peut être intéressante.
          </p>

          <p className="mt-4 leading-7 text-slate-400">
            Tu restes libre d&apos;aller au bout de la démarche. Les tarifs et
            économies éventuelles dépendent de ton logement, de ta consommation
            et de l&apos;offre proposée par le partenaire.
          </p>

          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
            <p className="font-black text-green-300">⚡ OHM Énergie</p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Consulte l&apos;offre proposée par OHM Énergie et compare-la avec
              ton contrat actuel avant de prendre ta décision.
            </p>

            <a
              href={OHM_ELECTRICITE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 inline-flex rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir l&apos;offre OHM Énergie →
            </a>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            PiloEco peut percevoir une rémunération si tu souscris auprès de ce
            partenaire, sans coût supplémentaire pour toi.
          </p>

          <Link
            href="/missions"
            className="mt-6 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-green-400 hover:text-green-400"
          >
            ← Retour aux missions
          </Link>
        </div>
      </div>
    </main>
  );
}