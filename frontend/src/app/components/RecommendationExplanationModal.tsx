"use client";

import type { RankedMonitoringOffer } from "../monitoring/services/monitoring-offers.service";

type RecommendationExplanationModalProps = {
  open: boolean;
  onClose: () => void;

  categoryLabel: string;

  currentProvider: string;
  currentOffer?: string;
  currentPrice: number;

  rankedOffers: RankedMonitoringOffer[];

  averageObserved: number;

  confidenceScore: number;
  confidenceLabel: string;

  comparisonDate: string;

  advice?: string | null;
};

function formatPrice(value: number) {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function RecommendationExplanationModal({
  open,
  onClose,
  categoryLabel,
  currentProvider,
  currentOffer,
  currentPrice,
  rankedOffers,
  averageObserved,
  confidenceScore,
  confidenceLabel,
  comparisonDate,
  advice,
}: RecommendationExplanationModalProps) {
  if (!open) {
    return null;
  }

  const bestOffer = rankedOffers[0];

  if (!bestOffer) {
    return null;
  }

  const monthlyDifference = Math.max(
    0,
    currentPrice - bestOffer.price
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommendation-explanation-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-green-500/20 bg-slate-950 p-6 text-white shadow-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-400">
              🤖 Explication de Pilo
            </p>

            <h2
              id="recommendation-explanation-title"
              className="mt-3 text-3xl font-black"
            >
              Pourquoi cette offre est classée n°1 ?
            </h2>

            <p className="mt-3 text-slate-400">
              Analyse de ton contrat{" "}
              {categoryLabel.toLowerCase()}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xl font-black text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Ton contrat actuel
            </p>

            <p className="mt-4 text-2xl font-black">
              {currentProvider ||
                "Fournisseur non renseigné"}
            </p>

            {currentOffer && (
              <p className="mt-2 text-slate-400">
                {currentOffer}
              </p>
            )}

            <p className="mt-5 text-3xl font-black">
              {formatPrice(currentPrice)} €/mois
            </p>
          </article>

          <article className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-green-400">
              Offre classée n°1
            </p>

            <p className="mt-4 text-2xl font-black">
              {bestOffer.provider}
            </p>

            <p className="mt-2 text-slate-300">
              {bestOffer.offer}
            </p>

            <p className="mt-5 text-3xl font-black text-green-400">
              {formatPrice(bestOffer.price)} €/mois
            </p>
          </article>
        </div>

        <article className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Classement Pilo
          </p>

          <div className="mt-4 grid gap-3">
            {rankedOffers
              .slice(0, 3)
              .map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900 p-4"
                >
                  <div>
                    <p className="font-black">
                      {offer.rank === 1
                        ? "🥇"
                        : offer.rank === 2
                          ? "🥈"
                          : "🥉"}{" "}
                      {offer.provider}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {offer.offer}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {offer.highlight}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-black text-green-400">
                      {formatPrice(
                        offer.price
                      )}{" "}
                      €
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Score {offer.score}/100
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </article>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Moyenne du catalogue
            </p>

            <p className="mt-3 text-3xl font-black">
              {formatPrice(
                averageObserved
              )}{" "}
              €/mois
            </p>
          </article>

          <article className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-green-400">
              Écart détecté
            </p>

            {monthlyDifference > 0 ? (
              <>
                <p className="mt-3 text-3xl font-black text-green-400">
                  {formatPrice(
                    monthlyDifference
                  )}{" "}
                  €/mois
                </p>

                <p className="mt-2 text-slate-300">
                  soit{" "}
                  {bestOffer.yearlySaving.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  €/an
                </p>
              </>
            ) : (
              <p className="mt-3 text-lg font-bold text-slate-200">
                Ton contrat semble déjà bien
                positionné.
              </p>
            )}
          </article>
        </div>

        <article className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
                Niveau de confiance Pilo
              </p>

              <p className="mt-2 text-2xl font-black">
                {confidenceLabel}
              </p>
            </div>

            <p className="text-3xl font-black text-green-400">
              {confidenceScore} %
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${confidenceScore}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Ce niveau dépend des informations
            renseignées, du nombre d’offres comparées
            et de l’écart de prix détecté.
          </p>
        </article>

        <article className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Pourquoi cette recommandation ?
          </p>

          <p className="mt-4 whitespace-pre-line leading-7 text-slate-300">
            {advice ||
              `Pilo a comparé ton contrat actuel avec plusieurs offres de son catalogue. ${bestOffer.provider} arrive en tête grâce à son prix, son score et son potentiel d’économie estimé à ${bestOffer.yearlySaving} €/an.`}
          </p>
        </article>

        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
          Les offres affichées sont actuellement des
          données de démonstration. Les tarifs,
          garanties et conditions devront être
          vérifiés avant toute souscription.
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-400">
          <span>
            📅 Dernière comparaison :{" "}
            {new Date(
              comparisonDate
            ).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>

          <span>
            {bestOffer.sourceLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400"
        >
          J’ai compris
        </button>
      </section>
    </div>
  );
}