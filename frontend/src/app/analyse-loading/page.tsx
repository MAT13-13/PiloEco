"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { monitoringOffers } from "../monitoring/services/monitoring-offers.service";

type AnalyseCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

type AnalysisPayload = {
  category: AnalyseCategory;
  categoryLabel: string;
  icon: string;
  values: Record<string, string>;
  createdAt: string;
};

const loadingSteps: Record<AnalyseCategory, string[]> = {
  telephone: [
    "Lecture de ton opérateur mobile",
    "Analyse du volume de données",
    "Comparaison du prix de ton forfait",
    "Recherche d’une offre plus avantageuse",
    "Préparation du conseil de Pilo",
  ],

  internet: [
    "Lecture de ton fournisseur Internet",
    "Vérification de ta technologie de connexion",
    "Comparaison du prix de ta box",
    "Recherche des offres disponibles",
    "Préparation du conseil de Pilo",
  ],

  electricite: [
    "Lecture de ton fournisseur d’électricité",
    "Vérification de ton option tarifaire",
    "Analyse de ta mensualité",
    "Comparaison avec une offre de référence",
    "Préparation du conseil de Pilo",
  ],

  habitation: [
    "Lecture de ton assureur habitation",
    "Vérification du type de logement",
    "Analyse de ta cotisation",
    "Comparaison des contrats habitation",
    "Préparation du conseil de Pilo",
  ],

  auto: [
    "Lecture de ton assureur auto",
    "Vérification de ta formule",
    "Analyse de ta cotisation",
    "Comparaison des assurances auto",
    "Préparation du conseil de Pilo",
  ],

  animaux: [
    "Lecture de ton assureur",
    "Vérification de l’animal assuré",
    "Analyse de ta cotisation",
    "Comparaison des protections disponibles",
    "Préparation du conseil de Pilo",
  ],

  banque: [
    "Lecture de ta banque actuelle",
    "Vérification de ta carte ou formule",
    "Analyse de tes frais bancaires",
    "Comparaison des offres bancaires",
    "Préparation du conseil de Pilo",
  ],

  streaming: [
    "Lecture de ton abonnement",
    "Vérification de ta formule",
    "Analyse du prix mensuel",
    "Recherche d’une formule optimisée",
    "Préparation du conseil de Pilo",
  ],
};

const categoryDescriptions: Record<
  AnalyseCategory,
  string
> = {
  telephone: "Forfait mobile",
  internet: "Internet",
  electricite: "Électricité",
  habitation: "Assurance habitation",
  auto: "Assurance auto",
  animaux: "Assurance animaux",
  banque: "Banque",
  streaming: "Streaming",
};

function isAnalyseCategory(
  value: unknown
): value is AnalyseCategory {
  return (
    value === "telephone" ||
    value === "internet" ||
    value === "electricite" ||
    value === "habitation" ||
    value === "auto" ||
    value === "animaux" ||
    value === "banque" ||
    value === "streaming"
  );
}

export default function AnalyseLoadingPage() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] =
    useState<AnalysisPayload | null>(null);

  const [analysisFinished, setAnalysisFinished] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const steps = useMemo(() => {
    if (!analysis) {
      return [
        "Lecture de tes informations",
        "Analyse de ton contrat",
        "Comparaison des prix",
        "Recherche des économies possibles",
        "Préparation du conseil de Pilo",
      ];
    }

    return loadingSteps[analysis.category];
  }, [analysis]);

  useEffect(() => {
    async function startAnalysis() {
      const rawAnalysis =
        localStorage.getItem("pilo-analysis");

      if (!rawAnalysis) {
        router.replace("/analyse");
        return;
      }

      try {
        const parsedAnalysis = JSON.parse(
          rawAnalysis
        ) as Partial<AnalysisPayload>;

        if (
          !isAnalyseCategory(
            parsedAnalysis.category
          ) ||
          !parsedAnalysis.values
        ) {
          throw new Error(
            "Les données de l’analyse sont invalides."
          );
        }

        const validAnalysis: AnalysisPayload = {
          category: parsedAnalysis.category,
          categoryLabel:
            parsedAnalysis.categoryLabel ??
            categoryDescriptions[
              parsedAnalysis.category
            ],
          icon: parsedAnalysis.icon ?? "🐦",
          values: parsedAnalysis.values,
          createdAt:
            parsedAnalysis.createdAt ??
            new Date().toISOString(),
        };

        setAnalysis(validAnalysis);

        const currentPrice = Number(
          validAnalysis.values.monthlyPrice ?? 0
        );

        const recommendedOffer =
          monitoringOffers[
            validAnalysis.category
          ];

        const savings = Math.max(
          0,
          Math.round(
            (currentPrice -
              recommendedOffer.price) *
              12
          )
        );

        const score =
          currentPrice <= 0
            ? 50
            : Math.max(
                0,
                Math.min(
                  100,
                  Math.round(
                    100 -
                      (savings /
                        (currentPrice * 12)) *
                        100
                  )
                )
              );

        const response = await fetch("/api/pilo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score,
            savings,
            depenses: [
              {
                description:
                  categoryDescriptions[
                    validAnalysis.category
                  ],
                category:
                  validAnalysis.category,
                amount: currentPrice,
                provider:
                  validAnalysis.values.provider ??
                  "",
                currentOffer:
                  validAnalysis.values.formula ??
                  validAnalysis.values.offer ??
                  validAnalysis.values
                    .connectionType ??
                  validAnalysis.values.tariff ??
                  "",
                recommendedProvider:
                  recommendedOffer.provider,
                recommendedOffer:
                  recommendedOffer.offer,
                recommendedPrice:
                  recommendedOffer.price,
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(
            "Le conseil de Pilo n’a pas pu être généré."
          );
        }

        const data = await response.json();

        const result = {
          ...validAnalysis,
          currentPrice,
          recommendedProvider:
            recommendedOffer.provider,
          recommendedOffer:
            recommendedOffer.offer,
          recommendedPrice:
            recommendedOffer.price,
          yearlySaving: savings,
          score,
          advice:
            data.success && data.advice
              ? data.advice
              : null,
        };

        localStorage.setItem(
          "pilo-analysis-result",
          JSON.stringify(result)
        );

        if (data.success && data.advice) {
          localStorage.setItem(
            "pilo-ai-advice",
            data.advice
          );
        }
      } catch (error) {
        console.error(
          "Erreur pendant l’analyse Pilo :",
          error
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Impossible de terminer l’analyse."
        );
      } finally {
        setAnalysisFinished(true);
      }
    }

    startAnalysis();
  }, [router]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (analysisFinished) {
          window.clearInterval(timer);
          return 100;
        }

        if (currentProgress >= 94) {
          return 94;
        }

        return currentProgress + 2;
      });
    }, 80);

    return () => window.clearInterval(timer);
  }, [analysisFinished]);

  useEffect(() => {
    if (
      progress >= 100 &&
      analysisFinished &&
      !errorMessage
    ) {
      const redirectTimer = window.setTimeout(
        () => {
          router.replace("/analyse-result");
        },
        500
      );

      return () =>
        window.clearTimeout(redirectTimer);
    }
  }, [
    progress,
    analysisFinished,
    errorMessage,
    router,
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <section className="w-full max-w-2xl rounded-[2rem] border border-green-500/20 bg-white/5 p-8 text-center shadow-2xl md:p-10">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-500/10 text-7xl">
          {analysis?.icon ?? "🐦"}
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          {analysis?.categoryLabel ??
            "Analyse Pilo"}
        </p>

        <h1 className="mt-4 text-4xl font-black">
          Pilo analyse ton contrat...
        </h1>

        <p className="mt-4 text-slate-400">
          Je compare tes informations et je
          recherche les économies possibles.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {steps.map((stepLabel, index) => {
            const stepThreshold =
              ((index + 1) / steps.length) * 100;

            const isDone =
              progress >= stepThreshold;

            return (
              <div
                key={stepLabel}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-4"
              >
                <span
                  className={
                    isDone
                      ? "text-white"
                      : "text-slate-400"
                  }
                >
                  {stepLabel}
                </span>

                <span
                  className={
                    isDone
                      ? "text-green-400"
                      : "text-slate-500"
                  }
                >
                  {isDone ? "✓" : "⏳"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-200"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-4 text-2xl font-black text-green-400">
          {progress} %
        </p>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-red-200">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                router.replace("/analyse")
              }
              className="mt-4 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-400"
            >
              Recommencer l’analyse
            </button>
          </div>
        )}
      </section>
    </main>
  );
}