"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Analysis = {
  analysisId: string;
  category: string;
  categoryLabel: string;
  icon: string;
  values: Record<string, string>;
  currentPrice: number;
  recommendedProvider: string;
  recommendedOffer: string;
  recommendedPrice: number;
  yearlySaving: number;
  score?: number;
  advice: string | null;
  comparisonDate?: string;
  createdAt?: string;
};

const STORAGE_KEY =
  "pilo-analysis-history";

export default function AnalysesPage() {
  const router = useRouter();

  const [analyses, setAnalyses] =
    useState<Analysis[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [deleteAllOpen, setDeleteAllOpen] =
    useState(false);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setAnalyses([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        setAnalyses([]);
        return;
      }

      const validAnalyses =
        parsed.filter(
          (
            item
          ): item is Analysis =>
            Boolean(
              item &&
                typeof item ===
                  "object" &&
                typeof item.analysisId ===
                  "string"
            )
        );

      const sortedAnalyses = [
        ...validAnalyses,
      ].sort((a, b) => {
        const firstDate = new Date(
          a.comparisonDate ??
            a.createdAt ??
            0
        ).getTime();

        const secondDate = new Date(
          b.comparisonDate ??
            b.createdAt ??
            0
        ).getTime();

        return secondDate - firstDate;
      });

      setAnalyses(sortedAnalyses);
    } catch (error) {
      console.error(
        "Erreur lecture historique :",
        error
      );

      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalSaving = useMemo(() => {
    return analyses.reduce(
      (sum, analysis) =>
        sum +
        Math.max(
          0,
          Number(
            analysis.yearlySaving
          ) || 0
        ),
      0
    );
  }, [analyses]);

  function saveHistory(
    updatedAnalyses: Analysis[]
  ) {
    setAnalyses(updatedAnalyses);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        updatedAnalyses
      )
    );
  }

  function handleViewAnalysis(
    analysis: Analysis
  ) {
    localStorage.setItem(
      "pilo-analysis-result",
      JSON.stringify(analysis)
    );

    router.push(
      "/analyse-result"
    );
  }

  function handleDeleteAnalysis(
    analysisId: string
  ) {
    const updatedAnalyses =
      analyses.filter(
        (analysis) =>
          analysis.analysisId !==
          analysisId
      );

    saveHistory(updatedAnalyses);
    setDeletingId(null);

    const currentResult =
      localStorage.getItem(
        "pilo-analysis-result"
      );

    if (!currentResult) {
      return;
    }

    try {
      const parsedCurrent =
        JSON.parse(currentResult);

      if (
        parsedCurrent.analysisId ===
        analysisId
      ) {
        const newestAnalysis =
          updatedAnalyses[0];

        if (newestAnalysis) {
          localStorage.setItem(
            "pilo-analysis-result",
            JSON.stringify(
              newestAnalysis
            )
          );
        } else {
          localStorage.removeItem(
            "pilo-analysis-result"
          );
        }
      }
    } catch (error) {
      console.error(
        "Erreur mise à jour du dernier résultat :",
        error
      );
    }
  }

  function handleDeleteAll() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    localStorage.removeItem(
      "pilo-analysis-result"
    );

    setAnalyses([]);
    setDeleteAllOpen(false);
  }

  function formatDate(
    analysis: Analysis
  ) {
    const value =
      analysis.comparisonDate ??
      analysis.createdAt;

    if (!value) {
      return "Date inconnue";
    }

    const date = new Date(value);

    if (
      Number.isNaN(date.getTime())
    ) {
      return "Date inconnue";
    }

    return date.toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-xl font-bold text-slate-300">
          Chargement des analyses...
        </p>
      </main>
    );
  }

  if (!analyses.length) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="font-bold text-green-400 transition hover:text-green-300"
          >
            ← Retour au dashboard
          </Link>

          <section className="mt-16 rounded-[2rem] border border-white/10 bg-slate-900 p-10 text-center shadow-xl">
            <div className="text-7xl">
              📈
            </div>

            <h1 className="mt-6 text-4xl font-black">
              Aucune analyse
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Lance une première
              analyse pour découvrir
              tes économies
              potentielles.
            </p>

            <Link
              href="/analyse"
              className="mt-8 inline-block rounded-2xl bg-green-500 px-8 py-4 font-black text-slate-950 transition hover:bg-green-400"
            >
              ➕ Nouvelle analyse
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="font-bold text-green-400 transition hover:text-green-300"
        >
          ← Retour au dashboard
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Historique
            </p>

            <h1 className="mt-2 text-5xl font-black">
              📈 Mes analyses
            </h1>

            <p className="mt-3 text-slate-400">
              Retrouve toutes tes
              analyses réalisées avec
              Pilo.
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
            <p className="text-sm font-bold text-green-300">
              Économies détectées
            </p>

            <div className="mt-2 text-4xl font-black">
              {Math.round(
                totalSaving
              ).toLocaleString(
                "fr-FR"
              )}{" "}
              €
            </div>

            <p className="text-sm text-green-300">
              par an
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-bold text-slate-300">
            {analyses.length}{" "}
            {analyses.length > 1
              ? "analyses enregistrées"
              : "analyse enregistrée"}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/analyse"
              className="rounded-2xl bg-green-500 px-5 py-3 font-black text-slate-950 transition hover:bg-green-400"
            >
              ➕ Nouvelle analyse
            </Link>

            <button
              type="button"
              onClick={() =>
                setDeleteAllOpen(true)
              }
              className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-black text-red-300 transition hover:bg-red-500/20"
            >
              🧹 Tout supprimer
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {analyses.map(
            (analysis) => (
              <article
                key={
                  analysis.analysisId
                }
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-xl transition hover:border-green-500/30"
              >
                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-4xl">
                        {analysis.icon ||
                          "📊"}
                      </div>

                      <div>
                        <h2 className="text-2xl font-black">
                          {analysis.categoryLabel ||
                            "Analyse Pilo"}
                        </h2>

                        <p className="mt-1 text-slate-400">
                          {analysis.values
                            ?.provider ||
                            "Fournisseur non renseigné"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="rounded-xl bg-slate-800 px-4 py-2 font-bold">
                        💶{" "}
                        {Number(
                          analysis.currentPrice
                        ).toFixed(
                          2
                        )}{" "}
                        €/mois
                      </div>

                      <div className="rounded-xl bg-green-500/10 px-4 py-2 font-bold text-green-300">
                        💰{" "}
                        {Math.round(
                          Number(
                            analysis.yearlySaving
                          ) || 0
                        )}{" "}
                        €/an
                      </div>

                      <div className="rounded-xl bg-slate-800 px-4 py-2 font-bold text-slate-300">
                        📅{" "}
                        {formatDate(
                          analysis
                        )}
                      </div>
                    </div>

                    {analysis.recommendedProvider && (
                      <p className="mt-5 text-sm text-slate-400">
                        Offre recommandée :{" "}
                        <span className="font-bold text-white">
                          {
                            analysis.recommendedProvider
                          }
                          {analysis.recommendedOffer
                            ? ` — ${analysis.recommendedOffer}`
                            : ""}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex min-w-full flex-col gap-3 sm:min-w-[230px]">
                    <button
                      type="button"
                      onClick={() =>
                        handleViewAnalysis(
                          analysis
                        )
                      }
                      className="rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:bg-green-400"
                    >
                      👀 Voir l’analyse
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeletingId(
                          analysis.analysisId
                        )
                      }
                      className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 font-black text-red-300 transition hover:bg-red-500/20"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>

                {deletingId ===
                  analysis.analysisId && (
                  <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
                    <p className="font-bold text-red-200">
                      Supprimer cette
                      analyse ?
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Cette action est
                      définitive.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteAnalysis(
                            analysis.analysisId
                          )
                        }
                        className="rounded-xl bg-red-500 px-5 py-3 font-black text-white transition hover:bg-red-400"
                      >
                        Oui, supprimer
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeletingId(
                            null
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </article>
            )
          )}
        </div>
      </div>

      {deleteAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-6 backdrop-blur-sm">
          <section className="w-full max-w-lg rounded-[2rem] border border-red-500/30 bg-slate-900 p-8 shadow-2xl">
            <div className="text-5xl">
              🧹
            </div>

            <h2 className="mt-5 text-3xl font-black">
              Tout supprimer ?
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Toutes tes analyses
              enregistrées seront
              supprimées
              définitivement.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={
                  handleDeleteAll
                }
                className="rounded-2xl bg-red-500 px-5 py-4 font-black text-white transition hover:bg-red-400"
              >
                Tout supprimer
              </button>

              <button
                type="button"
                onClick={() =>
                  setDeleteAllOpen(
                    false
                  )
                }
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-black transition hover:bg-white/10"
              >
                Annuler
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}