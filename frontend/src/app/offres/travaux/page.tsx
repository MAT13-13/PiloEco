"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  getRecommendedAffiliateCampaigns,
  type AffiliateCampaign,
} from "../../lib/affiliate-campaigns";

export default function TravauxOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-slate-300">
              Chargement des solutions travaux...
            </p>
          </div>
        </main>
      }
    >
      <TravauxOffersContent />
    </Suspense>
  );
}

function TravauxOffersContent() {
  const searchParams = useSearchParams();

  const projectType =
    searchParams.get("projectType") ??
    searchParams.get("type") ??
    "Rénovation énergétique";

  const allOffers =
    getRecommendedAffiliateCampaigns(projectType);

  const excludedCampaignIds: Record<string, number[]> = {
    "Monte-escalier": [13950],
  };

  const excludedIds =
    excludedCampaignIds[projectType] ?? [];

  const offers = allOffers.filter(
    (offer) => !excludedIds.includes(offer.id)
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🛠️ Solutions pour tes travaux
        </h1>

        <p className="mt-4 text-slate-300">
          Projet sélectionné :{" "}
          <span className="font-bold text-white">
            {projectType}
          </span>
        </p>

        {offers.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Pilo recherche encore la meilleure solution
            </h2>

            <p className="mt-3 text-slate-300">
              Aucun partenaire actif n&apos;est encore disponible
              pour ce type de travaux.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function OfferCard({
  offer,
}: {
  offer: AffiliateCampaign;
}) {
  return (
    <article className="rounded-3xl border border-green-500/30 bg-slate-900 p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            Partenaire Pilo
          </p>

          <h2 className="mt-2 text-2xl font-black">
            {offer.title}
          </h2>
        </div>

        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
          Disponible
        </span>
      </div>

      <p className="mt-4 text-slate-300">
        {offer.description}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Offre proposée via un partenaire externe. Pilo ne
        privilégie pas une offre selon sa rémunération.
      </p>

      {offer.trackingUrl ? (
        <a
          href={offer.trackingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-6 inline-flex rounded-xl bg-green-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-green-400"
        >
          {offer.buttonLabel}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-6 cursor-not-allowed rounded-xl bg-slate-800 px-5 py-3 font-bold text-slate-500"
        >
          Lien partenaire en préparation
        </button>
      )}
    </article>
  );
}