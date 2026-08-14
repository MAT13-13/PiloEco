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

type MonitoringCategory =
  | "telephone"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "animaux"
  | "banque"
  | "streaming";

type AnalyseCategory =
  | "famille"
  | "telephoneSenior"
  | "moto"
  | "mutuelle"
  | "fintech"
  | "securite"
  | "demenagement"
  | "servicesAuto"
  | "mobilitesDouces"
  | "travaux"
  | "logiciels"
  | "formation"
  | "voyage"
  | "beauteArtisanat"
  | "siteInternetPro"
  | "assuranceEmprunteur"
  | "ambassadeur"
  | "assuranceObseques"
  | "creditImmobilier"
  | "diagnosticImmobilier"
  | "mutuelleSenior"
  | "epargneRetraite"
  | "motoEquipement"
  | "crypto"
  | "cybersecurite"
  | "servicesEntreprises"
  | "debarras"
  | "gaz"
  | MonitoringCategory;

type Result = {
  analysisId: string;
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

const ANALYSIS_HISTORY_KEY =
  "pilo-analysis-history";

function isMonitoringCategory(
  value: AnalyseCategory
): value is MonitoringCategory {
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

function isAnalyseCategory(
  value: unknown
): value is AnalyseCategory {
  return (
    value === "famille" ||
    value === "telephone" ||
    value === "telephoneSenior" ||
    value === "internet" ||
    value === "electricite" ||
    value === "habitation" ||
    value === "auto" ||
    value === "moto" ||
    value === "mutuelle" ||
    value === "animaux" ||
    value === "banque" ||
    value === "streaming" ||
    value === "fintech" ||
    value === "securite" ||
    value === "demenagement" ||
    value === "servicesAuto" ||
    value === "mobilitesDouces" ||
    value === "travaux" ||
    value === "logiciels" ||
    value === "formation" ||
    value === "voyage" ||
    value === "beauteArtisanat" ||
    value === "siteInternetPro" ||
    value === "assuranceEmprunteur" ||
    value === "ambassadeur" ||
    value === "assuranceObseques" ||
    value === "creditImmobilier" ||
    value === "diagnosticImmobilier" ||
    value === "mutuelleSenior" ||
    value === "epargneRetraite" ||
    value === "motoEquipement" ||
    value === "crypto" ||
    value === "cybersecurite" ||
    value === "servicesEntreprises" ||
    value === "debarras" ||
    value === "gaz"
  );
}

const missionRoutes: Partial<
  Record<AnalyseCategory, string>
> = {
  telephoneSenior: "/missions/telephone-senior",
  moto: "/missions/moto",
  mutuelle: "/missions/mutuelle",
  securite: "/missions/securite",
  demenagement: "/missions/demenagement",
  servicesAuto: "/missions/services-auto",
  mobilitesDouces: "/missions/mobilites-douces",
  travaux: "/missions/travaux",
  logiciels: "/missions/logiciels",
  formation: "/missions/formation",
  voyage: "/missions/voyage",
  beauteArtisanat: "/missions/beaute-artisanat",
  siteInternetPro: "/missions/site-internet-pro",
  assuranceEmprunteur: "/missions/assurance-emprunteur",
  ambassadeur: "/missions/ambassadeur",
  assuranceObseques: "/missions/assurance-obseques",
  creditImmobilier: "/missions/credit-immobilier",
  diagnosticImmobilier: "/missions/diagnostic-immobilier",
  mutuelleSenior: "/missions/mutuelle-senior",
  epargneRetraite: "/missions/epargne-retraite",
  motoEquipement: "/missions/moto-equipement",
  crypto: "/missions/crypto",
  cybersecurite: "/missions/cybersecurite",
  servicesEntreprises: "/missions/services-entreprises",
  debarras: "/missions/debarras",
  gaz: "/missions/gaz",
};

function getMissionRoute(
  category: AnalyseCategory
) {
  return (
    missionRoutes[category] ??
    "/missions"
  );
}

function formatFieldLabel(key: string) {
  const labels: Record<string, string> = {
    serviceType: "Besoin",
    destination: "Destination",
    estimatedBudget: "Budget estimé",
    budget: "Budget",
    creationType: "Création recherchée",
    occasion: "Occasion",
    personalization: "Personnalisation",
    siteStatus: "Situation du site",
    businessType: "Activité",
    siteGoal: "Objectif du site",
    loanStatus: "Situation du prêt",
    remainingCapital: "Capital restant",
    loanAmount: "Montant du prêt",
    currentMonthlyInsurance: "Assurance mensuelle",
    borrowersCount: "Emprunteurs",
    employmentStatus: "Situation",
    availability: "Disponibilité",
    contactComfort: "Aisance relationnelle",
    goal: "Objectif",
    projectType: "Projet",
    projectAmount: "Montant du projet",
    downPayment: "Apport",
    monthlyIncome: "Revenus mensuels",
    desiredDuration: "Durée souhaitée",
    transactionType: "Besoin",
    housingType: "Type de bien",
    surface: "Surface",
    postalCode: "Code postal",
    deadline: "Date souhaitée",
    ageRange: "Tranche d'âge",
    priorityNeed: "Besoin prioritaire",
    savingGoal: "Objectif d'épargne",
    investmentHorizon: "Horizon",
    initialAmount: "Montant initial",
    monthlySaving: "Épargne mensuelle",
    riskPreference: "Profil de variation",
    needType: "Équipement recherché",
    bikeType: "Type de moto",
    priority: "Critère principal",
    experience: "Expérience",
    mainNeed: "Besoin principal",
    securityPriority: "Priorité",
    protectionType: "Protection recherchée",
    devicesCount: "Appareils",
    usage: "Usage",
    companyStatus: "Situation de l'entreprise",
    companySize: "Taille de l'entreprise",
    propertyType: "Type de lieu",
    volume: "Volume",
    access: "Accès",
    contractStatus: "Situation du contrat",
    provider: "Fournisseur",
    monthlyPrice: "Prix mensuel",
    gasUsage: "Usage du gaz",
    occupants: "Occupants",
  };

  return labels[key] ?? key;
}

function saveAnalysisToHistory(
  analysis: Result
) {
  try {
    const rawHistory =
      localStorage.getItem(
        ANALYSIS_HISTORY_KEY
      );

    const parsedHistory = rawHistory
      ? JSON.parse(rawHistory)
      : [];

    const history: Result[] =
      Array.isArray(parsedHistory)
        ? parsedHistory
        : [];

    const updatedHistory = [
      analysis,
      ...history.filter(
        (item) =>
          item.analysisId !==
          analysis.analysisId
      ),
    ].sort((first, second) => {
      const firstDate = new Date(
        first.comparisonDate ?? 0
      ).getTime();

      const secondDate = new Date(
        second.comparisonDate ?? 0
      ).getTime();

      return secondDate - firstDate;
    });

    localStorage.setItem(
      ANALYSIS_HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde historique analyses :",
      error
    );
  }
}

function getCurrentOffer(
  values: Record<string, string>
) {
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
  const updatedValues = {
    ...values,
  };

  if ("formula" in updatedValues) {
    updatedValues.formula = offer;
  } else if ("offer" in updatedValues) {
    updatedValues.offer = offer;
  } else if (
    "connectionType" in updatedValues
  ) {
    updatedValues.connectionType =
      offer;
  } else if ("tariff" in updatedValues) {
    updatedValues.tariff = offer;
  } else {
    updatedValues.offer = offer;
  }

  return updatedValues;
}

function getFamilySituation(
  values: Record<string, string>
) {
  return (
    values.householdStatus ||
    "Situation du foyer non renseignée"
  );
}

function getFamilyDetails(
  values: Record<string, string>
) {
  const children =
    values.childrenCount || "0";

  const housing =
    values.housingStatus ||
    "Logement non renseigné";

  const employment =
    values.employmentStatus ||
    "Situation professionnelle non renseignée";

  return `${children} enfant(s) — ${housing} — ${employment}`;
}

function getFamilyIncome(
  values: Record<string, string>
) {
  const income = Number(
    values.monthlyHouseholdIncome ?? 0
  );

  return Number.isFinite(income)
    ? income
    : 0;
}

export default function AnalyseResultPage() {
  const router = useRouter();

  const [result, setResult] =
    useState<Result | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [editOpen, setEditOpen] =
    useState(false);

  const [
    explanationOpen,
    setExplanationOpen,
  ] = useState(false);

  const [
    recalculating,
    setRecalculating,
  ] = useState(false);

  const [
    addingToMonitoring,
    setAddingToMonitoring,
  ] = useState(false);

  const [
    monitoringAdded,
    setMonitoringAdded,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

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
        !isAnalyseCategory(
          parsed.category
        ) ||
        !parsed.values ||
        typeof parsed.values !==
          "object" ||
        typeof parsed.currentPrice !==
          "number"
      ) {
        throw new Error(
          "Le résultat enregistré est invalide."
        );
      }

      const normalizedResult: Result = {
        ...(parsed as Result),

        analysisId:
          typeof parsed.analysisId ===
            "string" &&
          parsed.analysisId.trim()
            ? parsed.analysisId
            : crypto.randomUUID(),

        comparisonDate:
          typeof parsed.comparisonDate ===
          "string"
            ? parsed.comparisonDate
            : new Date().toISOString(),

        recommendedProvider:
          typeof parsed.recommendedProvider ===
          "string"
            ? parsed.recommendedProvider
            : parsed.category === "famille"
              ? "Service-Public.fr"
              : "",

        recommendedOffer:
          typeof parsed.recommendedOffer ===
          "string"
            ? parsed.recommendedOffer
            : parsed.category === "famille"
              ? "Aides et dispositifs officiels"
              : "",

        recommendedPrice:
          typeof parsed.recommendedPrice ===
          "number"
            ? parsed.recommendedPrice
            : 0,

        yearlySaving:
          typeof parsed.yearlySaving ===
          "number"
            ? parsed.yearlySaving
            : 0,

        advice:
          typeof parsed.advice ===
            "string" ||
          parsed.advice === null
            ? parsed.advice
            : null,
      };

      setResult(normalizedResult);

      localStorage.setItem(
        "pilo-analysis-result",
        JSON.stringify(normalizedResult)
      );

      saveAnalysisToHistory(
        normalizedResult
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
    if (
      !result ||
      !isMonitoringCategory(
        result.category
      )
    ) {
      return;
    }

    try {
      setRecalculating(true);
      setErrorMessage("");

      const reference =
        monitoringOffers[
          result.category
        ];

      if (!reference) {
        throw new Error(
          "Aucune offre de référence n’est disponible."
        );
      }

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

      updatedValues =
        updateCurrentOffer(
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

      saveAnalysisToHistory(
        updatedResult
      );

      if (advice) {
        localStorage.setItem(
          "pilo-ai-advice",
          advice
        );
      }

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

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de recalculer le résultat."
      );
    } finally {
      setRecalculating(false);
    }
  }

  async function handleAddToMonitoring() {
    if (
      !result ||
      addingToMonitoring ||
      !isMonitoringCategory(
        result.category
      )
    ) {
      return;
    }

    try {
      setAddingToMonitoring(true);
      setErrorMessage("");

      const rankedOffers =
        getRankedMonitoringOffers(
          result.category,
          result.currentPrice
        );

      const bestOffer =
        rankedOffers[0];

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

      window.setTimeout(() => {
        router.push("/monitoring");
      }, 900);
    } catch (error) {
      console.error(
        "Erreur ajout au Monitoring :",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Impossible d’ajouter ce contrat au Monitoring.";

      if (
        message ===
        "Ce contrat est déjà surveillé."
      ) {
        setMonitoringAdded(true);

        window.setTimeout(() => {
          router.push("/monitoring");
        }, 800);

        return;
      }

      setErrorMessage(message);
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

  /*
   * Résultat spécifique à Famille & aides.
   * Cette rubrique ne correspond pas à un
   * contrat pouvant être ajouté au Monitoring.
   */
  if (result.category === "famille") {
    const familySituation =
      getFamilySituation(
        result.values
      );

    const familyDetails =
      getFamilyDetails(
        result.values
      );

    const householdIncome =
      getFamilyIncome(
        result.values
      );

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
              Voici les premières pistes
              détectées par Pilo pour ton foyer.
            </p>
          </div>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Situation analysée
            </p>

            <h2 className="mt-4 text-2xl font-black">
              {familySituation}
            </h2>

            <p className="mt-3 text-slate-300">
              {familyDetails}
            </p>

            {householdIncome > 0 && (
              <p className="mt-3 text-slate-400">
                Revenu mensuel déclaré du foyer :
                {" "}
                <strong className="text-white">
                  {householdIncome.toLocaleString(
                    "fr-FR"
                  )} €
                </strong>
              </p>
            )}
          </section>

          <section className="mt-6 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Recommandation Pilo
            </p>

            <h2 className="mt-4 text-2xl font-black">
              Aides et dispositifs officiels
            </h2>

            <p className="mt-3 text-slate-300">
              Selon la composition de ton foyer,
              tes revenus, ton logement et ta
              situation professionnelle, tu peux
              être éligible à plusieurs aides.
              Les montants exacts doivent être
              confirmés auprès des organismes
              officiels.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="https://www.caf.fr/allocataires/aides-et-demarches"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-500 px-5 py-4 text-center font-black text-slate-950 transition hover:bg-green-400"
              >
                Consulter les aides CAF
              </a>

              <a
                href="https://www.service-public.fr/particuliers/vosdroits/N19811"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center font-black transition hover:bg-white/10"
              >
                Voir les aides aux familles
              </a>
            </div>
          </section>

          <AiAdviceCard
            advice={result.advice}
          />

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/offres/famille"
              className="rounded-2xl bg-green-500 py-5 text-center font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir les solutions famille
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 py-5 text-center font-black transition hover:bg-white/10"
            >
              Retour au Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Les catégories hors Monitoring disposent d'un résultat
   * générique. Elles ne doivent pas être envoyées aux fonctions
   * de classement réservées au Monitoring.
   */
  if (!isMonitoringCategory(result.category)) {
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
              Voici ce que Pilo a détecté pour ta situation.
            </p>
          </div>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Situation analysée
            </p>

            <div className="mt-4 space-y-2 text-slate-300">
              {Object.entries(result.values).map(
                ([key, value]) =>
                  value ? (
                    <p key={key}>
                      <span className="font-semibold text-white">
                        {formatFieldLabel(key)}
                      </span>
                      {" : "}
                      {value}
                    </p>
                  ) : null
              )}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
              Recommandation Pilo
            </p>

            <h2 className="mt-4 text-2xl font-black">
              {result.recommendedOffer ||
                "Solutions adaptées à ton besoin"}
            </h2>

            {result.recommendedProvider && (
              <p className="mt-3 text-slate-300">
                Solution proposée par{" "}
                <strong className="text-white">
                  {result.recommendedProvider}
                </strong>
                .
              </p>
            )}

            {result.advice && (
              <p className="mt-4 text-slate-300">
                {result.advice}
              </p>
            )}
          </section>

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href={getMissionRoute(
                result.category
              )}
              className="rounded-2xl bg-green-500 py-5 text-center font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir la solution partenaire →
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-white/5 py-5 text-center font-black transition hover:bg-white/10"
            >
              Retour au Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * À partir d’ici, TypeScript sait que la
   * catégorie appartient bien au Monitoring.
   */
  const monitoringCategory =
    result.category;

  const currentOffer =
    getCurrentOffer(
      result.values
    );

  const endDate =
    result.values.endDate ?? "";

  const rankedOffers =
    getRankedMonitoringOffers(
      monitoringCategory,
      result.currentPrice
    );

  const bestOffer =
    rankedOffers[0];

  const averageObserved =
    getMarketAverage(
      monitoringCategory
    );

  const confidence =
    getRecommendationConfidence(
      monitoringCategory,
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
            result.values.operator ||
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
            result.values.operator ??
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
          result.values.operator ||
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