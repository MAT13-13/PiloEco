"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { monitoringOffers } from "../monitoring/services/monitoring-offers.service";

type AnalyseCategory =
  | "famille"
  | "telephone"
  | "telephoneSenior"
  | "internet"
  | "electricite"
  | "habitation"
  | "auto"
  | "moto"
  | "mutuelle"
  | "animaux"
  | "banque"
  | "streaming"
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
  | "gaz";

type AnalysisPayload = {
  category: AnalyseCategory;
  categoryLabel: string;
  icon: string;
  values: Record<string, string>;
  createdAt: string;
};

type RecommendedOffer = {
  provider: string;
  offer: string;
  price: number;
};

const loadingSteps: Record<
  AnalyseCategory,
  string[]
> = {
  famille: [
    "Analyse de la composition de ton foyer",
    "Étude de ta situation familiale",
    "Recherche des aides disponibles",
    "Vérification des dispositifs officiels",
    "Préparation du conseil de Pilo",
  ],

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

  telephoneSenior: ["Lecture de ton besoin", "Analyse de ton budget", "Recherche des solutions", "Comparaison des options", "Préparation du conseil de Pilo"],
  moto: ["Lecture de ton assurance moto", "Analyse de ta couverture", "Étude de ta cotisation", "Recherche des solutions", "Préparation du conseil de Pilo"],
  mutuelle: ["Lecture de ta mutuelle", "Analyse de ta couverture", "Étude de ta cotisation", "Recherche des solutions", "Préparation du conseil de Pilo"],
  fintech: ["Lecture de ta situation", "Analyse de ton besoin", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  securite: ["Lecture de ton besoin", "Analyse de ton logement", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  demenagement: ["Lecture de ton projet", "Analyse de ton déménagement", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  servicesAuto: ["Lecture de ton besoin automobile", "Analyse de ton véhicule", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  mobilitesDouces: ["Lecture de ton besoin", "Analyse de ta mobilité", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  travaux: ["Lecture de ton projet", "Analyse de tes travaux", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  logiciels: ["Lecture de ton besoin", "Analyse de ton équipement", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  formation: ["Lecture de ton projet", "Analyse de tes besoins", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  voyage: ["Lecture de ton projet", "Analyse de ta destination", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  beauteArtisanat: ["Lecture de ton besoin", "Analyse de tes préférences", "Étude de ton budget", "Recherche des créations disponibles", "Préparation du conseil de Pilo"],
  siteInternetPro: ["Lecture de ton activité", "Analyse de ton projet web", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  assuranceEmprunteur: ["Lecture de ton prêt", "Analyse de ta couverture", "Étude de ton coût actuel", "Recherche des solutions", "Préparation du conseil de Pilo"],
  ambassadeur: ["Lecture de ton profil", "Analyse de tes disponibilités", "Étude de ton objectif", "Recherche de la solution", "Préparation du conseil de Pilo"],
  assuranceObseques: ["Lecture de ta situation", "Analyse de ta couverture", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  creditImmobilier: ["Lecture de ton projet", "Analyse de ton financement", "Étude de ton apport et revenus", "Recherche des solutions", "Préparation du conseil de Pilo"],
  diagnosticImmobilier: ["Lecture du bien", "Analyse de la situation", "Étude des diagnostics utiles", "Recherche des solutions", "Préparation du conseil de Pilo"],
  mutuelleSenior: ["Lecture de ton profil", "Analyse de tes besoins santé", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  epargneRetraite: ["Lecture de ton objectif", "Analyse de ton horizon", "Étude de ton effort d'épargne", "Recherche des solutions", "Préparation du conseil de Pilo"],
  motoEquipement: ["Lecture de ton besoin", "Analyse de ta moto", "Étude de ton budget", "Recherche des équipements", "Préparation du conseil de Pilo"],
  crypto: ["Lecture de ton profil", "Analyse de ton besoin", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  cybersecurite: ["Lecture de tes usages", "Analyse de tes appareils", "Étude de ton besoin de protection", "Recherche des solutions", "Préparation du conseil de Pilo"],
  servicesEntreprises: ["Lecture de ton activité", "Analyse de ton besoin professionnel", "Étude de ton budget", "Recherche des solutions", "Préparation du conseil de Pilo"],
  debarras: ["Lecture du lieu", "Analyse du volume", "Étude des contraintes d'accès", "Recherche des solutions", "Préparation du conseil de Pilo"],
  gaz: ["Lecture de ton fournisseur de gaz", "Analyse de ta consommation", "Étude de ta mensualité", "Recherche des solutions", "Préparation du conseil de Pilo"],
};

const categoryDescriptions: Record<
  AnalyseCategory,
  string
> = {
  famille: "Famille & aides",
  telephone: "Forfait mobile",
  internet: "Internet",
  electricite: "Électricité",
  habitation: "Assurance habitation",
  auto: "Assurance auto",
  animaux: "Assurance animaux",
  banque: "Banque",
  streaming: "Streaming",
  telephoneSenior: "Téléphone senior",
  moto: "Assurance moto",
  mutuelle: "Mutuelle santé",
  fintech: "Fintech & budget",
  securite: "Alarme & sécurité",
  demenagement: "Déménagement",
  servicesAuto: "Services auto",
  mobilitesDouces: "Mobilités douces",
  travaux: "Travaux & rénovation",
  logiciels: "Logiciels",
  formation: "Formation",
  voyage: "Voyage",
  beauteArtisanat: "Beauté & Artisanat",
  siteInternetPro: "Site internet pro",
  assuranceEmprunteur: "Assurance emprunteur",
  ambassadeur: "Ambassadeur GSelect",
  assuranceObseques: "Assurance obsèques",
  creditImmobilier: "Crédit immobilier",
  diagnosticImmobilier: "Diagnostic immobilier",
  mutuelleSenior: "Mutuelle Senior",
  epargneRetraite: "Épargne & retraite",
  motoEquipement: "Moto & équipement",
  crypto: "Cryptomonnaies",
  cybersecurite: "Cybersécurité",
  servicesEntreprises: "Services aux entreprises",
  debarras: "Débarras",
  gaz: "Gaz",
};

function isAnalyseCategory(
  value: unknown
): value is AnalyseCategory {
  return (
    typeof value === "string" &&
    value in categoryDescriptions
  );
}

function isMonitoringCategory(
  category: AnalyseCategory
) {
  return (
    category === "telephone" ||
    category === "internet" ||
    category === "electricite" ||
    category === "habitation" ||
    category === "auto" ||
    category === "animaux" ||
    category === "banque" ||
    category === "streaming"
  );
}

function getRecommendedOffer(
  category: AnalyseCategory
): RecommendedOffer | undefined {
  /*
   * Famille ne correspond pas à un contrat classique.
   * On utilise donc les dispositifs officiels comme
   * recommandation de référence.
   */
  if (category === "famille") {
    return {
      provider: "Service-Public.fr",
      offer: "Aides et dispositifs officiels",
      price: 0,
    };
  }

  if (isMonitoringCategory(category)) {
    const monitoringOffer =
      monitoringOffers[
        category as keyof typeof monitoringOffers
      ];

    if (monitoringOffer) {
      return monitoringOffer;
    }
  }

  return {
    provider: "Partenaires Pilo",
    offer: "Solution partenaire adaptée à ton besoin",
    price: 0,
  };
}

function getCurrentPrice(
  analysis: AnalysisPayload
): number {
  const rawPrice =
    analysis.values.monthlyPrice ??
    analysis.values.budget ??
    "0";

  const parsedPrice = Number(rawPrice);

  return Number.isFinite(parsedPrice)
    ? parsedPrice
    : 0;
}

function getProvider(
  analysis: AnalysisPayload
): string {
  if (analysis.category === "famille") {
    return (
      analysis.values.householdStatus ??
      "Foyer non renseigné"
    );
  }

  return (
    analysis.values.provider ??
    analysis.values.operator ??
    ""
  );
}

function getCurrentOffer(
  analysis: AnalysisPayload
): string {
  if (analysis.category === "famille") {
    const children =
      analysis.values.childrenCount ?? "0";

    const housing =
      analysis.values.housingStatus ??
      "Logement non renseigné";

    return `${children} enfant(s) — ${housing}`;
  }

  return (
    analysis.values.formula ??
    analysis.values.offer ??
    analysis.values.connectionType ??
    analysis.values.tariff ??
    analysis.values.commitment ??
    ""
  );
}

export default function AnalyseLoadingPage() {
  const router = useRouter();

  const [progress, setProgress] =
    useState(0);

  const [analysis, setAnalysis] =
    useState<AnalysisPayload | null>(null);

  const [
    analysisFinished,
    setAnalysisFinished,
  ] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const steps = useMemo(() => {
    if (!analysis) {
      return [
        "Lecture de tes informations",
        "Analyse de ta situation",
        "Recherche des solutions",
        "Étude des économies possibles",
        "Préparation du conseil de Pilo",
      ];
    }

    return loadingSteps[analysis.category];
  }, [analysis]);

  useEffect(() => {
    async function startAnalysis() {
      const rawAnalysis =
        localStorage.getItem(
          "pilo-analysis"
        );

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
          !parsedAnalysis.values ||
          typeof parsedAnalysis.values !==
            "object"
        ) {
          throw new Error(
            "Les données de l’analyse sont invalides."
          );
        }

        const validAnalysis: AnalysisPayload =
          {
            category:
              parsedAnalysis.category,

            categoryLabel:
              parsedAnalysis.categoryLabel ??
              categoryDescriptions[
                parsedAnalysis.category
              ],

            icon:
              parsedAnalysis.icon ?? "🐦",

            values:
              parsedAnalysis.values,

            createdAt:
              parsedAnalysis.createdAt ??
              new Date().toISOString(),
          };

        setAnalysis(validAnalysis);

        const currentPrice =
          getCurrentPrice(validAnalysis);

        const recommendedOffer =
          getRecommendedOffer(
            validAnalysis.category
          );

        if (!recommendedOffer) {
          throw new Error(
            "Aucune offre de référence n’est disponible pour cette catégorie."
          );
        }

        /*
         * Pour Famille & aides, on ne présente pas
         * une économie commerciale automatique.
         * Le résultat dépendra des aides accessibles
         * selon la situation du foyer.
         */
        const canCalculateSavings =
          isMonitoringCategory(
            validAnalysis.category
          );

        const savings =
          canCalculateSavings
            ? Math.max(
                0,
                Math.round(
                  (currentPrice -
                    recommendedOffer.price) *
                    12
                )
              )
            : 0;

        const score =
          !canCalculateSavings
            ? 70
            : currentPrice <= 0
              ? 50
              : Math.max(
                  0,
                  Math.min(
                    100,
                    Math.round(
                      100 -
                        (savings /
                          (currentPrice *
                            12)) *
                          100
                    )
                  )
                );

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
                    getProvider(
                      validAnalysis
                    ),

                  currentOffer:
                    getCurrentOffer(
                      validAnalysis
                    ),

                  recommendedProvider:
                    recommendedOffer.provider,

                  recommendedOffer:
                    recommendedOffer.offer,

                  recommendedPrice:
                    recommendedOffer.price,
                },
              ],
            }),
          }
        );

        let data: {
          success?: boolean;
          advice?: string;
          error?: string;
        } = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Le conseil de Pilo n’a pas pu être généré."
          );
        }

        const fallbackAdvice =
          validAnalysis.category === "famille"
            ? "Selon la composition de ton foyer, tes revenus et ta situation de logement, plusieurs aides publiques peuvent être accessibles. Consulte les dispositifs officiels proposés dans les recommandations de Pilo."
            : isMonitoringCategory(
                validAnalysis.category
              )
              ? savings > 0
                ? `Pilo estime que tu pourrais économiser jusqu’à ${savings} € par an en étudiant une offre mieux adaptée.`
                : "Ta situation semble déjà correctement positionnée. Pilo te conseille néanmoins de vérifier régulièrement les nouvelles offres disponibles."
              : `Pilo a analysé ton besoin ${categoryDescriptions[
                  validAnalysis.category
                ].toLowerCase()}. Consulte la solution partenaire proposée pour poursuivre ta démarche.`;

        const safeAdvice =
          data.success &&
          typeof data.advice === "string" &&
          data.advice.trim() &&
          !data.advice
            .toLowerCase()
            .includes("undefined")
            ? data.advice
            : fallbackAdvice;

        const result = {
          ...validAnalysis,

          analysisId:
            crypto.randomUUID(),

          comparisonDate:
            new Date().toISOString(),

          currentPrice,

          recommendedProvider:
            recommendedOffer.provider,

          recommendedOffer:
            recommendedOffer.offer,

          recommendedPrice:
            recommendedOffer.price,

          yearlySaving: savings,

          score,

          advice: safeAdvice,
        };

        localStorage.setItem(
          "pilo-analysis-result",
          JSON.stringify(result)
        );

        localStorage.setItem(
          "pilo-ai-advice",
          result.advice
        );
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
    const timer =
      window.setInterval(() => {
        setProgress(
          (currentProgress) => {
            if (analysisFinished) {
              window.clearInterval(
                timer
              );

              return 100;
            }

            if (
              currentProgress >= 94
            ) {
              return 94;
            }

            return (
              currentProgress + 2
            );
          }
        );
      }, 80);

    return () =>
      window.clearInterval(timer);
  }, [analysisFinished]);

  useEffect(() => {
    if (
      progress >= 100 &&
      analysisFinished &&
      !errorMessage
    ) {
      const redirectTimer =
        window.setTimeout(() => {
          router.replace(
            "/analyse-result"
          );
        }, 500);

      return () =>
        window.clearTimeout(
          redirectTimer
        );
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
          Pilo analyse ta situation...
        </h1>

        <p className="mt-4 text-slate-400">
          Je compare tes informations et
          je recherche les solutions et les
          économies possibles.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {steps.map(
            (stepLabel, index) => {
              const stepThreshold =
                ((index + 1) /
                  steps.length) *
                100;

              const isDone =
                progress >=
                stepThreshold;

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
                    {isDone
                      ? "✓"
                      : "⏳"}
                  </span>
                </div>
              );
            }
          )}
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
                router.replace(
                  "/analyse"
                )
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