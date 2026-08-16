"use client";

import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function LocationMeubleeOfferPage() {
  const locationMeubleeOffer = getAffiliateCampaignById(20001);
  const offerDisponible =
    locationMeubleeOffer?.published === true &&
    Boolean(locationMeubleeOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🏘️ Location meublée & LMNP
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Pilo a identifié une solution partenaire pour t&apos;aider à gérer
          plus simplement la comptabilité et les démarches liées à ta location
          meublée.
        </p>

        {!offerDisponible || !locationMeubleeOffer ? (
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
          <div className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                🏘️
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-green-400">
                  Solution partenaire
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {locationMeubleeOffer.title}
                </h2>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-300">
              {locationMeubleeOffer.description}
            </p>

            <div className="mt-6 rounded-2xl bg-slate-950/60 p-5">
              <p className="font-bold text-white">
                Cette solution peut notamment concerner :
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>✓ Location meublée longue durée</li>
                <li>✓ Location meublée saisonnière</li>
                <li>✓ Comptabilité liée à une activité LMNP</li>
                <li>✓ Déclarations fiscales liées à la location meublée</li>
              </ul>
            </div>

            <a
              href={locationMeubleeOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-green-400 px-6 py-4 text-center text-lg font-black text-slate-950 transition hover:bg-green-300"
            >
              {locationMeubleeOffer.buttonLabel ||
                "Découvrir la solution LMNP"}{" "}
              →
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Tu seras redirigé vers le site du partenaire pour poursuivre ta
              demande. Les obligations comptables et fiscales dépendent de ta
              situation. PiloEco peut percevoir une rémunération si une mise en
              relation éligible est réalisée.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}