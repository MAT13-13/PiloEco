"use client";

import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function FormationOfferPage() {
  const formationOffer = getAffiliateCampaignById(13932);

  const offerDisponible =
    formationOffer?.published === true &&
    Boolean(formationOffer.trackingUrl);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🎓 Formation en ligne
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Pilo a identifié une solution partenaire pour t&apos;aider à trouver
          une formation adaptée à ton projet professionnel.
        </p>

        {!offerDisponible || !formationOffer ? (
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
                🎓
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-green-400">
                  Solution partenaire
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {formationOffer.title}
                </h2>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-300">
              {formationOffer.description}
            </p>

            <div className="mt-6 rounded-2xl bg-slate-950/60 p-5">
              <p className="font-bold text-white">
                Cette solution peut être intéressante pour :
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>✓ Préparer une reconversion professionnelle</li>
                <li>✓ Développer de nouvelles compétences</li>
                <li>✓ Se former aux métiers du digital</li>
                <li>✓ Étudier les possibilités de financement</li>
              </ul>
            </div>

            <a
              href={formationOffer.trackingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-green-400 px-6 py-4 text-center text-lg font-black text-slate-950 transition hover:bg-green-300"
            >
              {formationOffer.buttonLabel || "Découvrir les formations"} →
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Tu seras redirigé vers le site du partenaire pour poursuivre ta
              demande. Les possibilités de financement dépendent de ta situation
              et des conditions d&apos;éligibilité. PiloEco peut percevoir une
              rémunération pour une mise en relation éligible.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}