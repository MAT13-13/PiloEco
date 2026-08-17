"use client";

import Link from "next/link";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function AssuranceObsequesMissionPage() {
  const obsequesOffer =
    getAffiliateCampaignById(13957);

  const offerDisponible =
    obsequesOffer?.published === true &&
    Boolean(obsequesOffer.trackingUrl);

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
          <p className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
            🕊️ Mission Pilo
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Comparer une assurance obsèques
          </h1>

          <p className="mt-4 text-slate-300">
            Pilo t’oriente directement vers une solution partenaire pour
            comparer les offres disponibles.
          </p>

          {!offerDisponible || !obsequesOffer ? (
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/50 p-6">
              <h2 className="text-xl font-black">
                Offre bientôt disponible
              </h2>

              <p className="mt-3 text-slate-400">
                Pilo recherche actuellement une solution adaptée à ce besoin.
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Recommandation Pilo
              </p>

              <h2 className="mt-3 text-2xl font-black">
                {obsequesOffer.title}
              </h2>

              <p className="mt-3 leading-6 text-slate-300">
                {obsequesOffer.description}
              </p>

              <p className="mt-4 text-sm text-amber-200">
                ↗ Vérifie le tarif, le capital prévu, les garanties et les
                conditions avant de souscrire.
              </p>

              <a
                href={obsequesOffer.trackingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-flex rounded-xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
              >
                {obsequesOffer.buttonLabel || "Comparer les offres"} →
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}