"use client";

import type { RankedMonitoringOffer } from "../monitoring/services/monitoring-offers.service";

type Props = {
  offers: RankedMonitoringOffer[];
  onExplain: () => void;
};

export default function RecommendationCard({
  offers,
  onExplain,
}: Props) {
  const bestOffer = offers[0];

  if (!bestOffer) {
    return null;
  }

  return (
    <section className="relative mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-8">
      <button
        type="button"
        onClick={onExplain}
        className="absolute right-6 top-6 rounded-xl border border-green-500/30 bg-slate-950/60 px-4 py-2 font-bold text-green-300 transition hover:border-green-400 hover:bg-slate-950"
      >
        🤖 Pourquoi ?
      </button>

      <p className="pr-32 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
        🏆 Classement Pilo
      </p>

      <div className="mt-6 grid gap-4">
        {offers.slice(0, 3).map((offer) => (
          <article
            key={offer.id}
            className={`rounded-2xl border p-5 transition ${
              offer.rank === 1
                ? "border-green-500/40 bg-slate-950/50"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-black">
                  {offer.rank === 1
                    ? "🥇"
                    : offer.rank === 2
                      ? "🥈"
                      : "🥉"}{" "}
                  {offer.provider}
                </p>

                <p className="mt-2 text-slate-300">
                  {offer.offer}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {offer.highlight}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-black text-green-400">
                  {offer.price.toLocaleString("fr-FR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </p>

                <p className="text-sm text-slate-500">
                  /mois
                </p>
              </div>
            </div>

            {offer.yearlySaving > 0 && (
              <div className="mt-4 rounded-xl bg-green-500/10 p-3">
                <p className="font-bold text-green-300">
                  💰 Jusqu'à{" "}
                  {offer.yearlySaving.toLocaleString("fr-FR")} €/an
                  d'économie
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{offer.commitment}</span>
              <span>Score {offer.score}/100</span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Les offres affichées sont actuellement issues du catalogue de démonstration Pilo.
      </p>
    </section>
  );
}