"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { supabase } from "../../lib/supabase";

import type {
  PiloLifeProject,
} from "../services/pilolife.service";

import {
  getPiloLifeRecommendations,
  type PiloLifeRecommendation,
} from "../services/pilolife-recommendations.service";

type Props = {
  project: PiloLifeProject;

  onBestRecommendationChange?: (
    recommendation:
      | PiloLifeRecommendation
      | null
  ) => void;
};

function formatEuro(value: number) {
  return new Intl.NumberFormat(
    "fr-FR"
  ).format(Math.max(0, value));
}

function getStars(count: number) {
  return "⭐".repeat(
    Math.min(
      5,
      Math.max(1, count)
    )
  );
}

export default function PiloLifeProjectBoost({
  project,
  onBestRecommendationChange,
}: Props) {
  const [
    recommendations,
    setRecommendations,
  ] = useState<
    PiloLifeRecommendation[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  async function loadRecommendations() {
    try {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setRecommendations([]);

        onBestRecommendationChange?.(
          null
        );

        return;
      }

      const data =
        await getPiloLifeRecommendations(
          {
            userId: user.id,

            projectTargetAmount:
              Number(
                project.target_amount ||
                  0
              ),

            projectSavedAmount:
              Number(
                project.saved_amount ||
                  0
              ),

            projectMonthlySaved:
              Number(
                project.monthly_saved ||
                  0
              ),

            limit: 4,
          }
        );

      setRecommendations(data);

      onBestRecommendationChange?.(
        data[0] ?? null
      );
    } catch (error) {
      console.error(
        "Erreur chargement recommandations PiloLife :",
        error
      );

      setRecommendations([]);

      onBestRecommendationChange?.(
        null
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de charger les recommandations."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecommendations();
  }, [
    project.id,
    project.target_amount,
    project.saved_amount,
    project.monthly_saved,
  ]);

  const totalPotential =
    recommendations.reduce(
      (
        total,
        recommendation
      ) =>
        total +
        recommendation.yearlySaving,
      0
    );

  const totalMonthsSaved =
    recommendations.reduce(
      (
        total,
        recommendation
      ) =>
        total +
        recommendation.estimatedMonthsSaved,
      0
    );

  return (
    <section className="mt-8 rounded-[2rem] border border-green-500/20 bg-slate-900/80 p-6 shadow-xl sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-green-400">
            🚀 Accélérer ce projet
          </p>

          <h2 className="mt-3 text-3xl font-black text-white">
            Fais avancer «{" "}
            {project.title} »
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Pilo sélectionne les
            meilleures économies encore
            disponibles pour faire
            avancer ce projet.
          </p>
        </div>

        {!loading &&
          recommendations.length >
            0 && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4">
              <p className="text-sm text-slate-300">
                Potentiel détecté
              </p>

              <p className="mt-1 text-3xl font-black text-green-400">
                {formatEuro(
                  totalPotential
                )}{" "}
                €/an
              </p>

              {totalMonthsSaved >
                0 && (
                <p className="mt-1 text-sm font-bold text-green-200">
                  Jusqu’à environ{" "}
                  {totalMonthsSaved}{" "}
                  mois gagnés
                </p>
              )}
            </div>
          )}
      </div>

      {loading ? (
        <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500/20 border-t-green-400" />

          Pilo cherche les meilleures
          économies...
        </div>
      ) : errorMessage ? (
        <div className="mt-7 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
          <p>{errorMessage}</p>

          <button
            type="button"
            onClick={
              loadRecommendations
            }
            className="mt-3 font-black underline"
          >
            Réessayer
          </button>
        </div>
      ) : recommendations.length ===
        0 ? (
        <div className="mt-7 rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
          <p className="text-xl font-black text-white">
            ✅ Tout est optimisé
          </p>

          <p className="mt-2 text-slate-300">
            Pilo n’a trouvé aucune
            nouvelle mission ou
            opportunité Monitoring pour
            le moment.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/analyse"
              className="rounded-xl bg-green-500 px-5 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              🔄 Relancer une analyse
            </Link>

            <Link
              href="/monitoring"
              className="rounded-xl border border-white/10 bg-slate-950/50 px-5 py-3 font-black text-white transition hover:border-green-500/40 hover:text-green-300"
            >
              📊 Vérifier le Monitoring
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {recommendations.map(
            (recommendation) => (
              <article
                key={
                  recommendation.id
                }
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-green-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-2xl">
                      {
                        recommendation.icon
                      }
                    </div>

                    <div>
                      <h3 className="font-black text-white">
                        {
                          recommendation.title
                        }
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Jusqu’à{" "}
                        <span className="font-black text-green-400">
                          {formatEuro(
                            recommendation.yearlySaving
                          )}{" "}
                          €/an
                        </span>
                      </p>

                      <p className="mt-2 text-xs font-bold text-amber-300">
                        {getStars(
                          recommendation.stars
                        )}{" "}
                        {
                          recommendation.impactLabel
                        }
                      </p>
                    </div>
                  </div>

                  <Link
                    href={
                      recommendation.href
                    }
                    className="shrink-0 rounded-xl bg-green-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-green-400"
                  >
                    Voir
                  </Link>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {
                    recommendation.reason
                  }
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                    {recommendation.source ===
                    "monitoring"
                      ? "📊 Monitoring"
                      : "🎯 Mission"}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                    {
                      recommendation.priorityScore
                    }
                    /100 de priorité
                  </span>

                  {recommendation.estimatedMonthsSaved >
                    0 && (
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-300">
                      ≈{" "}
                      {
                        recommendation.estimatedMonthsSaved
                      }{" "}
                      mois gagnés
                    </span>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black text-white">
            📊 Tes contrats sont déjà
            surveillés ?
          </p>

          <p className="mt-1 text-sm text-slate-300">
            Ouvre le Monitoring pour
            vérifier les hausses, baisses
            et meilleures offres.
          </p>
        </div>

        <Link
          href="/monitoring"
          className="rounded-xl border border-blue-400/30 bg-slate-950/50 px-5 py-3 text-center font-black text-blue-200 transition hover:border-blue-300 hover:text-white"
        >
          Ouvrir le Monitoring
        </Link>
      </div>
    </section>
  );
}