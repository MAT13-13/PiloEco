"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ServicesEntreprisesOfferContent() {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("serviceType") || "Service professionnel";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/missions/services-entreprises"
          className="text-green-400 hover:underline"
        >
          ← Retour à la mission services aux entreprises
        </Link>

        <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            Solution professionnelle identifiée par Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            🏢 {serviceType}
          </h1>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Pilo recherche encore la meilleure solution
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Partenaire en cours d&apos;intégration
            </h2>

            <p className="mt-4 text-slate-300">
              Aucun partenaire actif n&apos;est encore disponible pour ce
              service professionnel.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Dès qu&apos;une solution partenaire sera validée, Pilo pourra
              t&apos;orienter vers une offre adaptée à ton activité et à tes
              besoins.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ServicesEntreprisesOfferPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-4xl">
            <p className="text-slate-300">Chargement des solutions...</p>
          </div>
        </main>
      }
    >
      <ServicesEntreprisesOfferContent />
    </Suspense>
  );
}