"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignsForNeed } from "../../lib/affiliate-campaigns";

const ASSURANCE_VIE_URL =
  "https://stella-2.com/clc/HJ-PaEO0_bkX1Fz0mo-eGw";

export default function FintechOffersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-slate-300">
              Chargement des solutions financières...
            </p>
          </div>
        </main>
      }
    >
      <FintechOffersContent />
    </Suspense>
  );
}

function FintechOffersContent() {
  const searchParams = useSearchParams();

  const serviceType =
    searchParams.get("serviceType") ?? "Gestion du budget";

  const affiliateOffers =
    getAffiliateCampaignsForNeed(serviceType);

  const assuranceVieOffers =
    serviceType === "Assurance vie"
      ? [
          {
            id: 23305840,
            title: "Comparer les assurances vie",
            description:
              "Compare des solutions d’assurance vie pour constituer un capital, préparer ta retraite ou organiser la transmission de ton patrimoine.",
            trackingUrl: ASSURANCE_VIE_URL,
            buttonLabel: "Comparer les assurances vie →",
          },
        ]
      : [];

  const allOffers =
    serviceType === "Assurance vie"
      ? assuranceVieOffers
      : affiliateOffers;

  const offers =
    serviceType === "Regroupement de crédits"
      ? allOffers.filter((offer) => offer.id === 13935)
      : allOffers;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          💳 Solutions financières
        </h1>

        <p className="mt-4 text-slate-300">
          Besoin sélectionné :{" "}
          <strong className="text-white">
            {serviceType}
          </strong>
        </p>

        {offers.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Pas encore d&apos;offre disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire adaptée à ce
              besoin.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.id}
                className="rounded-3xl border border-green-500/30 bg-slate-900 p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                      Partenaire Pilo
                    </p>

                    <h2 className="mt-3 text-2xl font-black">
                      {offer.title}
                    </h2>
                  </div>

                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                    Disponible
                  </span>
                </div>

                <p className="mt-5 text-slate-300">
                  {offer.description}
                </p>

                <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                  Tu seras redirigé vers le site du partenaire. Tu restes libre
                  de poursuivre ou non ta demande.
                </div>

                <a
                  href={offer.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-7 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
                >
                  {offer.buttonLabel}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}