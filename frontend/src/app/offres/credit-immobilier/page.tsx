"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function CreditImmobilierOffersPage() {
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
      <CreditImmobilierOffersContent />
    </Suspense>
  );
}

function CreditImmobilierOffersContent() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");

  const creditOffer = getAffiliateCampaignById(13912);

  const offerDisponible =
    creditOffer?.published === true &&
    Boolean(creditOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🏠 Crédit immobilier
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo a identifié une solution de courtage pour étudier ton projet
          immobilier.
        </p>

        {amount && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Ton projet
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Montant estimé
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {Number(amount).toLocaleString("fr-FR")} €
            </p>
          </div>
        )}

        {!offerDisponible || !creditOffer ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire adaptée à ce
              besoin.
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
              {creditOffer.title}
            </h2>

            <p className="mt-5 text-slate-300">
              {creditOffer.description}
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Tu seras redirigé vers le site du partenaire pour réaliser une
              simulation. Tu restes libre de poursuivre ou non ta demande.
            </div>

            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/40 p-4 text-sm text-slate-300">
              L&apos;obtention d&apos;un crédit dépend de l&apos;étude de ton
              dossier. Pilo ne garantit ni l&apos;acceptation du financement,
              ni un taux particulier.
            </div>

            <a
              href={creditOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              {creditOffer.buttonLabel || "Étudier mon projet"}
            </a>
          </article>
        )}
      </div>
    </main>
  );
}