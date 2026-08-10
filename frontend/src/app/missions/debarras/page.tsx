"use client";

import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

const propertyLabels: Record<string, string> = {
  Maison: "une maison",
  Appartement: "un appartement",
  Cave: "une cave",
  Garage: "un garage",
  Grenier: "un grenier",
  Locaux: "des locaux",
  Autre: "ton espace",
};

export default function DebarrasOffersPage() {
  const searchParams = useSearchParams();

  const propertyType =
    searchParams.get("propertyType") ?? "Maison";

  const surface = searchParams.get("surface");

  const propertyLabel =
    propertyLabels[propertyType] ?? "ton espace";

  const debarrasOffer =
    getAffiliateCampaignById(13927);

  const offerDisponible =
    debarrasOffer?.published === true &&
    Boolean(debarrasOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          📦 Débarrasser {propertyLabel}
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo a identifié une solution pouvant correspondre
          à ton besoin de débarras.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
            Ton projet
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">
                Type de débarras
              </p>

              <p className="mt-1 font-bold text-white">
                {propertyType}
              </p>
            </div>

            {surface && (
              <div>
                <p className="text-sm text-slate-400">
                  Surface approximative
                </p>

                <p className="mt-1 font-bold text-white">
                  {surface} m²
                </p>
              </div>
            )}
          </div>
        </div>

        {!offerDisponible || !debarrasOffer ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire
              adaptée à ton besoin de débarras.
            </p>
          </div>
        ) : (
          <article className="mt-8 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                  Solution identifiée par Pilo
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Solution pour débarrasser {propertyLabel}
                </h2>
              </div>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                Disponible
              </span>
            </div>

            <p className="mt-5 text-slate-300">
              {debarrasOffer.description}
            </p>

            <p className="mt-4 text-slate-300">
              Ton besoin concerne{" "}
              <strong className="text-white">
                {propertyLabel}
              </strong>
              {surface ? (
                <>
                  {" "}
                  d&apos;environ{" "}
                  <strong className="text-white">
                    {surface} m²
                  </strong>
                </>
              ) : null}
              .
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              En cliquant sur ce bouton, tu seras redirigé vers
              le site de notre partenaire. Tu restes libre de
              poursuivre ou non ta demande.
            </div>

            <a
              href={debarrasOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              {debarrasOffer.buttonLabel}
            </a>

            <p className="mt-5 text-xs text-slate-500">
              Offre proposée via un partenaire externe. Pilo ne
              privilégie pas une offre selon sa rémunération.
            </p>
          </article>
        )}
      </div>
    </main>
  );
}