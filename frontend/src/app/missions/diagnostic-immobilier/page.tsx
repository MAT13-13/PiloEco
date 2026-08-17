"use client";

import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function DiagnosticImmobilierOfferPage() {
  const diagnosticOffer = getAffiliateCampaignById(13931);

  const offerDisponible =
    diagnosticOffer?.published === true &&
    Boolean(diagnosticOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          📋 Recommandation Pilo
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Diagnostic immobilier
        </h1>

        <p className="mt-4 leading-7 text-slate-300">
          Pilo t’oriente vers une solution partenaire pour réaliser les
          diagnostics nécessaires à ton logement ou à ton projet immobilier.
        </p>

        {!offerDisponible || !diagnosticOffer ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire adaptée à ce
              besoin.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Solution partenaire
            </p>

            <h2 className="mt-3 text-2xl font-black">
              {diagnosticOffer.title}
            </h2>

            <p className="mt-3 leading-6 text-slate-300">
              {diagnosticOffer.description}
            </p>

            <p className="mt-4 text-sm text-amber-200">
              ↗ Tu vas être redirigé vers le partenaire pour poursuivre ta
              demande.
            </p>

            <a
              href={diagnosticOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-6 inline-flex rounded-2xl bg-green-500 px-6 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              {diagnosticOffer.buttonLabel || "Comparer les diagnostics"} →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}