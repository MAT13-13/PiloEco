"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function SiteInternetProOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-4xl">
            <p className="text-slate-300">
              Chargement de ton projet...
            </p>
          </div>
        </main>
      }
    >
      <SiteInternetProOffersContent />
    </Suspense>
  );
}

function SiteInternetProOffersContent() {
  const searchParams = useSearchParams();

  const projectType =
    searchParams.get("projectType") ?? "Création d'un site";

  const siteType =
    searchParams.get("siteType") ?? "Site vitrine";

  const budget = searchParams.get("budget");

  const offer = getAffiliateCampaignById(13961);

  const offerDisponible =
    offer?.published === true &&
    Boolean(offer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🌐 Site internet professionnel
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo a identifié un partenaire adapté à ton projet
          de création ou de refonte de site internet professionnel.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            Ton projet
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">
                Projet
              </p>

              <p className="mt-1 font-bold">
                {projectType}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Type de site
              </p>

              <p className="mt-1 font-bold">
                {siteType}
              </p>
            </div>

            {budget && (
              <div>
                <p className="text-sm text-slate-400">
                  Budget
                </p>

                <p className="mt-1 font-bold">
                  {Number(budget).toLocaleString("fr-FR")} €
                </p>
              </div>
            )}
          </div>
        </div>

        {!offerDisponible || !offer ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire
              adaptée à ce besoin.
            </p>
          </div>
        ) : (
          <article className="mt-8 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                  Partenaire Pilo
                </p>

                <p className="mt-2 text-sm font-bold text-slate-400">
                  91m²
                </p>
              </div>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                Disponible
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black">
              {offer.title}
            </h2>

            <p className="mt-5 text-slate-300">
              {offer.description}
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Cette solution est destinée aux professionnels.
              Tu seras redirigé vers le site du partenaire afin de
              poursuivre ta demande de devis. Tu restes libre de
              poursuivre ou non.
            </div>

            <a
              href={offer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              Demander mon devis chez 91m²
            </a>
          </article>
        )}
      </div>
    </main>
  );
}