"use client";

import Link from "next/link";

export default function OffreGazPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🔥 Offre Gaz
        </h1>

        <div className="mt-8 rounded-3xl border border-green-500/20 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            Solution partenaire
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Une offre gaz adaptée à ton besoin
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            Pilo a identifié une solution partenaire pour t&apos;aider à
            comparer ton contrat de gaz et vérifier si une offre plus adaptée
            à ta consommation peut être intéressante.
          </p>

          <p className="mt-4 leading-7 text-slate-400">
            Tu restes libre d&apos;aller au bout de la démarche. Les tarifs et
            économies éventuelles dépendent de ton logement, de ta consommation
            et de l&apos;offre proposée par le partenaire.
          </p>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
            <p className="font-bold text-amber-300">
              🔗 Accès à l&apos;offre bientôt disponible
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Pilo finalise actuellement l&apos;intégration du lien partenaire.
              Tu pourras bientôt accéder directement à l&apos;offre depuis
              cette page.
            </p>
          </div>

          <Link
            href="/missions"
            className="mt-6 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-green-400 hover:text-white"
          >
            ← Retour aux missions
          </Link>
        </div>
      </div>
    </main>
  );
}