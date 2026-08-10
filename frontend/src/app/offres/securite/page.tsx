"use client";

import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function SecuriteOffersPage() {
  const searchParams = useSearchParams();

  const serviceType =
    searchParams.get("serviceType") ?? "Télésurveillance";

  const housingType =
    searchParams.get("housingType") ?? "Maison";

  const monthlyPrice = searchParams.get("monthlyPrice");

  const securiteOffer = getAffiliateCampaignById(13942);

  const offerDisponible =
    securiteOffer?.published === true &&
    Boolean(securiteOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🔐 Alarme & sécurité
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo a identifié une solution pouvant correspondre à ton besoin
          de protection du logement.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            Ton besoin
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">
                Service
              </p>

              <p className="mt-1 font-bold text-white">
                {serviceType}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Logement
              </p>

              <p className="mt-1 font-bold text-white">
                {housingType}
              </p>
            </div>

            {monthlyPrice && (
              <div>
                <p className="text-sm text-slate-400">
                  Budget mensuel
                </p>

                <p className="mt-1 font-bold text-white">
                  {monthlyPrice} € / mois
                </p>
              </div>
            )}
          </div>
        </div>

        {!offerDisponible || !securiteOffer ? (
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                Partenaire Pilo
              </p>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                Disponible
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black">
              {securiteOffer.title}
            </h2>

            <p className="mt-5 text-slate-300">
              {securiteOffer.description}
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Tu seras redirigé vers le site du partenaire afin
              d&apos;obtenir des informations ou un devis personnalisé.
              Tu restes libre de poursuivre ou non.
            </div>

            <a
              href={securiteOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              {securiteOffer.buttonLabel || "Comparer les solutions"}
            </a>
          </article>
        )}
      </div>
    </main>
  );
}