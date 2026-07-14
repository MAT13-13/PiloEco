"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AiAdviceCard from "../components/AiAdviceCard";
import CurrentContractCard from "../components/CurrentContractCard";
import EditContractModal, {
  type EditableContract,
} from "../components/EditContractModal";
import RecommendationCard from "../components/RecommendationCard";
import RecommendationExplanationModal from "../components/RecommendationExplanationModal";
import SavingCard from "../components/SavingCard";

import {
  getMarketAverage,
  getRankedMonitoringOffers,
  getRecommendationConfidence,
  monitoringOffers,
} from "../monitoring/services/monitoring-offers.service";

import { createMonitoringContract } from "../monitoring/services/monitoring.service";

type AnalyseCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

type Result = {
  category: AnalyseCategory;
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
};

function getCurrentOffer(values: Record<string, string>) {
  return (
    values.formula ||
    values.offer ||
    values.connectionType ||
    values.tariff ||
    values.commitment ||
    ""
  );
}

function updateCurrentOffer(
  values: Record<string, string>,
  offer: string
) {
  const updatedValues = { ...values };

  if ("formula" in updatedValues) {
    updatedValues.formula = offer;
  } else if ("offer" in updatedValues) {
    updatedValues.offer = offer;
  } else if ("connectionType" in updatedValues) {
    updatedValues.connectionType = offer;
  } else if ("tariff" in updatedValues) {
    updatedValues.tariff = offer;
  } else {
    updatedValues.offer = offer;
  }

  return updatedValues;
}

function isAnalyseCategory(
  value: unknown
): value is AnalyseCategory {
  return [
    "telephone",
    "internet",
    "electricite",
    "habitation",
    "auto",
    "animaux",
    "banque",
    "streaming",
  ].includes(String(value));
}

export default function AnalyseResultPage() {
  const router = useRouter();

  const [result, setResult] =
    useState<Result | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [editOpen, setEditOpen] =
    useState(false);

  const [explanationOpen, setExplanationOpen] =
    useState(false);

  const [recalculating, setRecalculating] =
    useState(false);

  const [addingToMonitoring, setAddingToMonitoring] =
    useState(false);

  const [monitoringAdded, setMonitoringAdded] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    const raw = localStorage.getItem(
      "pilo-analysis-result"
    );

    if (!raw) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(
        raw
      ) as Partial<Result>;

      if (
        !isAnalyseCategory(parsed.category) ||
        !parsed.values ||
        typeof parsed.currentPrice !== "number"
      ) {
        throw new Error(
          "Le résultat enregistré est invalide."
        );
      }

      const normalizedResult: Result = {
        ...(parsed as Result),
        comparisonDate:
          typeof parsed.comparisonDate === "string"
            ? parsed.comparisonDate
            : new Date().toISOString(),
      };

      setResult(normalizedResult);

      localStorage.setItem(
        "pilo-analysis-result",
        JSON.stringify(normalizedResult)
      );
    } catch (error) {
      console.error(
        "Erreur lecture résultat :",
        error
      );

      setErrorMessage(
        "Impossible de retrouver le résultat de ton analyse."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleSaveContract(
    contract: EditableContract
  ) {
    if (!result) {
      return;
    }

    try {
      setRecalculating(true);
      setErrorMessage("");

      const reference =
        monitoringOffers[result.category];

      const yearlySaving = Math.max(
        0,
        Math.round(
          (contract.monthlyPrice -
            reference.price) *
            12
        )
      );

      const annualCurrentCost =
        contract.monthlyPrice * 12;

      const score =
        annualCurrentCost <= 0
          ? 100
          : Math.max(
              0,
              Math.min(
                100,
                Math.round(
                  100 -
                    (yearlySaving /
                      annualCurrentCost) *
                      100
                )
              )
            );

      let updatedValues: Record<
        string,
        string
      > = {
        ...result.values,
        provider: contract.provider,
        monthlyPrice: String(
          contract.monthlyPrice
        ),
      };

      updatedValues = updateCurrentOffer(
        updatedValues,
        contract.offer
      );

      if (contract.endDate) {
        updatedValues.endDate =
          contract.endDate;
      } else {
        delete updatedValues.endDate;
      }

      let advice: string | null =
        result.advice;

      try {
        const response = await fetch(
          "/api/pilo",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              score,
              savings: yearlySaving,
              depenses: [
                {
                  description:
                    result.categoryLabel,
                  category:
                    result.category,
                  amount:
                    contract.monthlyPrice,
                  provider:
                    contract.provider,
                  currentOffer:
                    contract.offer,
                  recommendedProvider:
                    reference.provider,
                  recommendedOffer:
                    reference.offer,
                  recommendedPrice:
                    reference.price,
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data =
            await response.json();

          if (
            data.success &&
            data.advice
          ) {
            advice = data.advice;
          }
        }
      } catch (error) {
        console.error(
          "Erreur recalcul conseil IA :",
          error
        );
      }

      if (!advice) {
        advice =
          yearlySaving > 0
            ? `Ton contrat coûte ${contract.monthlyPrice.toFixed(
                2
              )} €/mois. L’offre classée n°1 est proposée à ${reference.price.toFixed(
                2
              )} €/mois chez ${reference.provider}. L’économie potentielle est estimée à ${yearlySaving} €/an.`
            : "Ton contrat semble déjà bien positionné par rapport au catalogue Pilo.";
      }

      const updatedResult: Result = {
        ...result,
        comparisonDate:
          new Date().toISOString(),
        values: updatedValues,
        currentPrice:
          contract.monthlyPrice,
        recommendedProvider:
          reference.provider,
        recommendedOffer:
          reference.offer,
        recommendedPrice:
          reference.price,
        yearlySaving,
        score,
        advice,
      };

      setResult(updatedResult);

      localStorage.setItem(
        "pilo-analysis-result",
        JSON.stringify(updatedResult)
      );

      localStorage.setItem(
        "pilo-ai-advice",
        advice
      );

      const rawAnalysis =
        localStorage.getItem(
          "pilo-analysis"
        );

      if (rawAnalysis) {
        try {
          const originalAnalysis =
            JSON.parse(rawAnalysis);

          localStorage.setItem(
            "pilo-analysis",
            JSON.stringify({
              ...originalAnalysis,
              values: updatedValues,
            })
          );
        } catch (error) {
          console.error(
            "Erreur mise à jour analyse :",
            error
          );
        }
      }

      setEditOpen(false);
    } catch (error) {
      console.error(
        "Erreur modification contrat :",
        error
      );

      throw new Error(
        "Impossible de recalculer le résultat."
      );
    } finally {
      setRecalculating(false);
    }
  }

  async function handleAddToMonitoring() {
    if (
      !result ||
      addingToMonitoring
    ) {
      return;
    }

    try {
      setAddingToMonitoring(true);
      setErrorMessage("");

      await createMonitoringContract({
  category: result.category,

  provider:
    result.values.provider?.trim() ||
    "Fournisseur non renseigné",

  monthly_price:
    result.currentPrice,

  current_offer:
    getCurrentOffer(
      result.values
    ) || null,

  end_date:
    result.values.endDate ||
    null,

  better_offer: bestOffer
    ? `${bestOffer.provider} — ${bestOffer.offer} — ${bestOffer.price.toFixed(
        2
      )} €/mois`
    : null,

  yearly_saving:
    bestOffer?.yearlySaving ?? 0,
});

      setMonitoringAdded(true);

      setTimeout(() => {
        router.push("/monitoring");
      }, 900);
    } catch (error) {
      console.error(
        "Erreur ajout au Monitoring :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’ajouter ce contrat au Monitoring."
      );
    } finally {
      setAddingToMonitoring(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-xl font-bold text-slate-300">
          Chargement du résultat...
        </p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="text-3xl font-black">
            Résultat introuvable
          </h1>

          <p className="mt-4 text-slate-300">
            {errorMessage ||
              "Aucune analyse récente n’a été trouvée."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/analyse")
            }
            className="mt-6 rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:bg-green-400"
          >
            Recommencer une analyse
          </button>
        </section>
      </main>
    );
  }

  const currentOffer =
    getCurrentOffer(result.values);

  const endDate =
    result.values.endDate ?? "";

  const rankedOffers =
    getRankedMonitoringOffers(
      result.category,
      result.currentPrice
    );

  const bestOffer =
    rankedOffers[0];

  const averageObserved =
    getMarketAverage(
      result.category
    );

  const confidence =
    getRecommendationConfidence(
      result.category,
      result.currentPrice,
      result.values.provider,
      currentOffer
    );

  const comparisonDate =
    result.comparisonDate ||
    new Date().toISOString();

  const displayedYearlySaving =
    bestOffer?.yearlySaving ??
    result.yearlySaving;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="text-7xl">
            {result.icon}
          </div>

          <p className="mt-4 font-bold uppercase tracking-[0.3em] text-green-400">
            Analyse terminée
          </p>

          <h1 className="mt-4 text-5xl font-black">
            {result.categoryLabel}
          </h1>

          <p className="mt-4 text-slate-400">
            Voici ce que Pilo a détecté.
          </p>
        </div>

        <CurrentContractCard
          provider={
            result.values.provider ||
            "Non renseigné"
          }
          offer={currentOffer}
          price={result.currentPrice}
          endDate={endDate}
          onEdit={() =>
            setEditOpen(true)
          }
        />

        <RecommendationCard
          offers={rankedOffers}
          onExplain={() =>
            setExplanationOpen(true)
          }
        />

        <SavingCard
          yearlySaving={
            displayedYearlySaving
          }
        />

        <AiAdviceCard
          advice={result.advice}
        />

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMessage}
          </div>
        )}

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={
              handleAddToMonitoring
            }
            disabled={
              addingToMonitoring ||
              monitoringAdded
            }
            className={`rounded-2xl py-5 text-center font-black transition disabled:cursor-not-allowed ${
              monitoringAdded
                ? "bg-green-400 text-slate-950"
                : "bg-green-500 text-slate-950 hover:bg-green-400 disabled:opacity-60"
            }`}
          >
            {monitoringAdded
              ? "✅ Contrat ajouté au Monitoring"
              : addingToMonitoring
                ? "Ajout en cours..."
                : "⭐ Ajouter au Monitoring"}
          </button>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 py-5 text-center font-black transition hover:bg-white/10"
          >
            Retour au Dashboard
          </Link>
        </div>
      </div>

      <EditContractModal
        open={editOpen}
        categoryLabel={
          result.categoryLabel
        }
        saving={recalculating}
        initialContract={{
          provider:
            result.values.provider ??
            "",
          offer: currentOffer,
          monthlyPrice:
            result.currentPrice,
          endDate,
        }}
        onClose={() => {
          if (!recalculating) {
            setEditOpen(false);
          }
        }}
        onSave={handleSaveContract}
      />

      <RecommendationExplanationModal
        open={explanationOpen}
        onClose={() =>
          setExplanationOpen(false)
        }
        categoryLabel={
          result.categoryLabel
        }
        currentProvider={
          result.values.provider ||
          "Fournisseur non renseigné"
        }
        currentOffer={currentOffer}
        currentPrice={
          result.currentPrice
        }
        rankedOffers={
          rankedOffers
        }
        averageObserved={
          averageObserved
        }
        confidenceScore={
          confidence.score
        }
        confidenceLabel={
          confidence.label
        }
        comparisonDate={
          comparisonDate
        }
        advice={result.advice}
      />
    </main>
  );
}