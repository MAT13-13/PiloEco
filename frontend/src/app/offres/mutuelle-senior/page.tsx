"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function MutuelleSeniorOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-4xl">
            <p className="text-slate-300">
              Chargement de ton offre...
            </p>
          </div>
        </main>
      }
    >
      <MutuelleSeniorOffersContent />
    </Suspense>
  );
}

function MutuelleSeniorOffersContent() {
  const searchParams = useSearchParams();

  const age = searchParams.get("age");
  const monthlyPrice = searchParams.get("monthlyPrice");

  const mutuelleOffer =
    getAffiliateCampaignById(13939);

  const offerDisponible =
    mutuelleOffer?.published === true &&
    Boolean(mutuelleOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          👵 Mutuelle Senior
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo a identifié une solution partenaire pouvant correspondre
          à ton besoin de couverture santé.
        </p>

        {(age || monthlyPrice) && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Ta situation
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {age && (
                <div>
                  <p className="text-sm text-slate-400">
                    Âge
                  </p>

                  <p className="mt-1 font-bold text-white">
                    {age} ans
                  </p>
                </div>
              )}

              {monthlyPrice && (
                <div>
                  <p className="text-sm text-slate-400">
                    Cotisation actuelle
                  </p>

                  <p className="mt-1 font-bold text-white">
                    {monthlyPrice} € / mois
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {!offerDisponible || !mutuelleOffer ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire adaptée à ce besoin.
            </p>
          </div>
        ) : (
          <article className="mt-8 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                Partenaire Pilo
              </p>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                Disponible
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black">
              {mutuelleOffer.title}
            </h2>

            <p className="mt-5 text-slate-300">
              {mutuelleOffer.description}
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Tu seras redirigé vers le site du partenaire pour obtenir
              une proposition personnalisée. Tu restes libre de poursuivre ou non.
            </div>

            <a
              href={mutuelleOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              {mutuelleOffer.buttonLabel || "Comparer les offres"}
            </a>
          </article>
        )}
      </div>
    </main>
  );
}