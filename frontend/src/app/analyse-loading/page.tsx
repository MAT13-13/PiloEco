"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

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
  | "mutuelleProfessionnelle"
  | "epargneRetraite"
  | "motoEquipement"
  | "crypto"
  | "cybersecurite"
  | "servicesEntreprises"
  | "debarras"
  | "gaz"
  | "locationMeublee"
  | "rachatCredits";

type AnalysisPayload = {
  category: AnalyseCategory;
  categoryLabel: string;
  icon: string;
  values: Record<string, string>;
  createdAt: string;
};

const categoryDescriptions: Record<
  AnalyseCategory,
  string
> = {
  famille: "Famille & aides",
  telephone: "Téléphone",
  telephoneSenior: "Téléphone senior",
  internet: "Internet",
  electricite: "Électricité",
  habitation: "Assurance habitation",
  auto: "Assurance auto",
  moto: "Assurance moto",
  mutuelle: "Mutuelle santé",
  animaux: "Assurance animaux",
  banque: "Banque",
  streaming: "Streaming",
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
  mutuelleProfessionnelle: "Mutuelle Professionnelle",
  epargneRetraite: "Épargne & retraite",
  motoEquipement: "Moto & équipement",
  crypto: "Cryptomonnaies",
  cybersecurite: "Cybersécurité",
  servicesEntreprises: "Services aux entreprises",
  debarras: "Débarras",
  gaz: "Gaz",
  locationMeublee: "Location meublée & LMNP",
  rachatCredits: "Rachat de crédits",
};

const genericPartnerSteps = [
  "Lecture de ton besoin",
  "Analyse de ton budget",
  "Recherche de la solution partenaire",
  "Vérification de la solution proposée",
  "Préparation du conseil de Pilo",
];

const loadingSteps: Record<
  AnalyseCategory,
  string[]
> = {
  famille: [
    "Lecture de la composition de ton foyer",
    "Analyse de ta situation familiale",
    "Étude de ta situation de logement",
    "Recherche des aides disponibles",
    "Préparation du conseil de Pilo",
  ],

  diagnosticImmobilier: [
    "Lecture de ton besoin immobilier",
    "Analyse du type de bien",
    "Identification des diagnostics adaptés",
    "Recherche de la solution partenaire",
    "Préparation du conseil de Pilo",
  ],

  ambassadeur: [
    "Lecture de ton objectif",
    "Analyse de ta disponibilité",
    "Vérification de ton besoin",
    "Recherche de la solution partenaire",
    "Préparation du conseil de Pilo",
  ],

  telephone: genericPartnerSteps,
  telephoneSenior: genericPartnerSteps,
  internet: genericPartnerSteps,
  electricite: genericPartnerSteps,
  habitation: genericPartnerSteps,
  auto: genericPartnerSteps,
  moto: genericPartnerSteps,
  mutuelle: genericPartnerSteps,
  animaux: genericPartnerSteps,
  banque: genericPartnerSteps,
  streaming: genericPartnerSteps,
  fintech: genericPartnerSteps,
  securite: genericPartnerSteps,
  demenagement: genericPartnerSteps,
  servicesAuto: genericPartnerSteps,
  mobilitesDouces: genericPartnerSteps,
  travaux: genericPartnerSteps,
  logiciels: genericPartnerSteps,
  formation: genericPartnerSteps,
  voyage: genericPartnerSteps,
  beauteArtisanat: genericPartnerSteps,
  siteInternetPro: genericPartnerSteps,
  assuranceEmprunteur: genericPartnerSteps,
  assuranceObseques: genericPartnerSteps,
  creditImmobilier: genericPartnerSteps,
  mutuelleSenior: genericPartnerSteps,
  mutuelleProfessionnelle: genericPartnerSteps,
  epargneRetraite: genericPartnerSteps,
  motoEquipement: genericPartnerSteps,
  crypto: genericPartnerSteps,
  cybersecurite: genericPartnerSteps,
  servicesEntreprises: genericPartnerSteps,
  debarras: genericPartnerSteps,
  gaz: genericPartnerSteps,
  locationMeublee: genericPartnerSteps,
  rachatCredits: genericPartnerSteps,
};

const missionRouteByCategory: Record<
  AnalyseCategory,
  string
> = {
  famille: "/missions/famille",
  telephone: "/missions/mobile",
  telephoneSenior: "/missions/telephone-senior",
  internet: "/missions/internet",
  electricite: "/missions/electricite",
  habitation: "/missions/habitation",
  auto: "/missions/auto",
  moto: "/missions/moto",
  mutuelle: "/missions/mutuelle",
  animaux: "/missions/animaux",
  banque: "/missions/banque",
  streaming: "/missions/streaming",
  fintech: "/missions/fintech",
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
  mutuelleProfessionnelle: "/missions/mutuelle-professionnelle",
  epargneRetraite: "/missions/epargne-retraite",
  motoEquipement: "/missions/moto-equipement",
  crypto: "/missions/crypto",
  cybersecurite: "/missions/cybersecurite",
  servicesEntreprises: "/missions/services-entreprises",
  debarras: "/missions/debarras",
  gaz: "/missions/gaz",
  locationMeublee: "/missions/location-meublee",
  rachatCredits: "/missions/rachat-credits",
};

function isAnalyseCategory(
  value: unknown
): value is AnalyseCategory {
  return (
    typeof value === "string" &&
    value in categoryDescriptions
  );
}

function getBudget(
  analysis: AnalysisPayload
) {
  const rawBudget =
    analysis.values.budget ??
    "0";

  const budget = Number(rawBudget);

  return Number.isFinite(budget)
    ? budget
    : 0;
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
        "Analyse de ton besoin",
        "Recherche de la solution partenaire",
        "Vérification de la solution",
        "Préparation du conseil de Pilo",
      ];
    }

    return loadingSteps[
      analysis.category
    ];
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

        const budget =
          getBudget(validAnalysis);

        let advice: string | null = null;

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
                score: 70,
                savings: 0,

                depenses: [
                  {
                    description:
                      categoryDescriptions[
                        validAnalysis.category
                      ],

                    category:
                      validAnalysis.category,

                    amount: budget,

                    provider: "",

                    currentOffer: "",

                    recommendedProvider:
                      validAnalysis.category ===
                      "famille"
                        ? "Service-Public.fr"
                        : "Partenaire Pilo",

                    recommendedOffer:
                      validAnalysis.category ===
                      "famille"
                        ? "Aides et dispositifs officiels"
                        : "Solution partenaire adaptée",

                    recommendedPrice: 0,
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
              typeof data.advice ===
                "string" &&
              data.advice.trim() &&
              !data.advice
                .toLowerCase()
                .includes("undefined")
            ) {
              advice = data.advice;
            }
          }
        } catch (error) {
          console.error(
            "Conseil IA indisponible :",
            error
          );
        }

        const fallbackAdvice =
          validAnalysis.category ===
          "famille"
            ? "Pilo a analysé les informations utiles de ton foyer. Consulte les aides et dispositifs officiels proposés."
            : "Pilo a identifié la mission correspondant à ton besoin. Consulte la solution partenaire pour poursuivre.";

        const safeAdvice =
          advice &&
          !advice
            .toLowerCase()
            .includes("économis") &&
          !advice
            .toLowerCase()
            .includes("offre classée")
            ? advice
            : fallbackAdvice;

        const result = {
          ...validAnalysis,

          analysisId:
            crypto.randomUUID(),

          comparisonDate:
            new Date().toISOString(),

          currentPrice: budget,

          recommendedProvider:
            validAnalysis.category ===
            "famille"
              ? "Service-Public.fr"
              : "Partenaire Pilo",

          recommendedOffer:
            validAnalysis.category ===
            "famille"
              ? "Aides et dispositifs officiels"
              : "Solution partenaire adaptée",

          recommendedPrice: 0,

          yearlySaving: 0,

          score: 70,

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

    void startAnalysis();
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
          if (!analysis) {
            router.replace("/analyse");
            return;
          }

          router.replace(
            missionRouteByCategory[
              analysis.category
            ]
          );
        }, 350);

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
    analysis,
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
          J’analyse ton besoin et je recherche
          la solution partenaire la plus adaptée
          à ta demande.
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
                  key={`${stepLabel}-${index}`}
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