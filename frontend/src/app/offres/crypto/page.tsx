"use client";

import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function CryptoOffersPage() {
  const cryptoOffer = getAffiliateCampaignById(13948);

  const offerDisponible =
    cryptoOffer?.published === true &&
    Boolean(cryptoOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          ₿ Solutions crypto
        </h1>

        <p className="mt-4 text-slate-300">
          Pilo te présente une solution partenaire liée aux crypto-actifs.
        </p>

        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-100">
          Les crypto-actifs présentent un risque de perte en capital.
          Vérifie les frais, les conditions et les risques avant toute décision.
        </div>

        {!offerDisponible || !cryptoOffer ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">
              Offre bientôt disponible
            </h2>

            <p className="mt-3 text-slate-300">
              Pilo recherche actuellement une solution partenaire pour ce besoin.
            </p>
          </div>
        ) : (
          <article className="mt-8 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Partenaire Pilo
            </p>

            <h2 className="mt-3 text-3xl font-black">
              {cryptoOffer.title}
            </h2>

            <p className="mt-5 text-slate-300">
              {cryptoOffer.description}
            </p>

            <a
              href={cryptoOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
            >
              {cryptoOffer.buttonLabel}
            </a>

            <p className="mt-5 text-xs text-slate-500">
              Pilo ne garantit aucun rendement et ne classe pas cette offre selon sa rémunération.
            </p>
          </article>
        )}
      </div>
    </main>
  );
}