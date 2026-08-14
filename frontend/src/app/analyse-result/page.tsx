"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  | "epargneRetraite"
  | "motoEquipement"
  | "crypto"
  | "cybersecurite"
  | "servicesEntreprises"
  | "debarras"
  | "gaz";

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

const missionRoutes: Record<
  AnalyseCategory,
  string
> = {
  famille: "/offres/famille",
  telephone: "/missions/mobile",
  telephoneSenior: "/missions/telephone-senior",
  internet: "/missions",
  electricite: "/missions/electricite",
  habitation: "/missions/habitation",
  auto: "/missions/auto",
  moto: "/missions/moto",
  mutuelle: "/missions",
  animaux: "/missions/animaux",
  banque: "/missions",
  streaming: "/missions",
  fintech: "/missions",
  securite: "/missions/securite",
  demenagement: "/missions/demenagement",
  servicesAuto: "/missions/services-auto",
  mobilitesDouces: "/missions/mobilites-douces",
  travaux: "/missions/travaux",
  logiciels: "/missions",
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

function formatFieldLabel(key: string) {
  const labels: Record<string, string> = {
    budget: "Budget",
    householdStatus: "Situation du foyer",
    childrenCount: "Nombre d'enfants",
    housingStatus: "Logement",
    employmentStatus: "Situation professionnelle",
    monthlyHouseholdIncome: "Revenus mensuels du foyer",
    transactionType: "Besoin",
    housingType: "Type de bien",
    goal: "Objectif",
    availability: "Disponibilité",
  };

  return labels[key] ?? key;
}

function formatFieldValue(
  key: string,
  value: string
) {
  if (
    key === "budget" ||
    key === "monthlyHouseholdIncome"
  ) {
    const amount = Number(value);

    if (Number.isFinite(amount)) {
      return `${amount.toLocaleString(
        "fr-FR"
      )} €`;
    }
  }

  return value;
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
        !isAnalyseCategory(
          parsed.category
        ) ||
        !parsed.values ||
        typeof parsed.values !==
          "object"
      ) {
        throw new Error(
          "Le résultat enregistré est invalide."
        );
      }

      const normalizedResult: Result = {
        analysisId:
          typeof parsed.analysisId ===
            "string" &&
          parsed.analysisId.trim()
            ? parsed.analysisId
            : crypto.randomUUID(),

        category: parsed.category,

        categoryLabel:
          typeof parsed.categoryLabel ===
            "string" &&
          parsed.categoryLabel.trim()
            ? parsed.categoryLabel
            : categoryDescriptions[
                parsed.category
              ],

        icon:
          typeof parsed.icon === "string"
            ? parsed.icon
            : "🐦",

        values: parsed.values,

        currentPrice:
          typeof parsed.currentPrice ===
            "number"
            ? parsed.currentPrice
            : 0,

        recommendedProvider:
          typeof parsed.recommendedProvider ===
            "string"
            ? parsed.recommendedProvider
            : "",

        recommendedOffer:
          typeof parsed.recommendedOffer ===
            "string"
            ? parsed.recommendedOffer
            : "",

        recommendedPrice:
          typeof parsed.recommendedPrice ===
            "number"
            ? parsed.recommendedPrice
            : 0,

        yearlySaving: 0,

        score:
          typeof parsed.score === "number"
            ? parsed.score
            : 70,

        advice:
          typeof parsed.advice === "string" ||
          parsed.advice === null
            ? parsed.advice
            : null,

        comparisonDate:
          typeof parsed.comparisonDate ===
            "string"
            ? parsed.comparisonDate
            : new Date().toISOString(),
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
              Famille & aides
            </h1>

            <p className="mt-4 text-slate-400">
              Pilo a analysé les informations utiles de ton foyer.
            </p>
          </div>

          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Ta situation
            </p>

            <h2 className="mt-4 text-2xl font-black">
              {familySituation}
            </h2>

            <p className="mt-3 text-slate-300">
              {familyDetails}
            </p>

            {householdIncome > 0 && (
              <p className="mt-3 text-slate-400">
                Revenus mensuels déclarés :{" "}
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
              Vérifie les aides auxquelles ton foyer peut avoir droit
            </h2>

            <p className="mt-3 text-slate-300">
              Les montants et l’éligibilité doivent être confirmés auprès des organismes officiels.
            </p>

            {result.advice && (
              <p className="mt-4 text-slate-300">
                {result.advice}
              </p>
            )}
          </section>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/offres/famille"
              className="rounded-2xl bg-green-500 py-5 text-center font-black text-slate-950 transition hover:bg-green-400"
            >
              Voir les solutions famille →
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

  const visibleValues =
    Object.entries(result.values).filter(
      ([, value]) =>
        typeof value === "string" &&
        value.trim()
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
            Pilo a pris en compte les informations utiles à ton besoin.
          </p>
        </div>

        {visibleValues.length > 0 && (
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Ton besoin
            </p>

            <div className="mt-4 space-y-3 text-slate-300">
              {visibleValues.map(
                ([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold text-white">
                      {formatFieldLabel(key)}
                    </span>
                    {" : "}
                    {formatFieldValue(
                      key,
                      value
                    )}
                  </p>
                )
              )}
            </div>
          </section>
        )}

        <section className="mt-6 rounded-3xl border border-green-500/30 bg-green-500/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
            Recommandation Pilo
          </p>

          <h2 className="mt-4 text-2xl font-black">
            Une solution partenaire est disponible
          </h2>

          <p className="mt-3 text-slate-300">
            Pilo t’oriente vers la mission correspondante pour découvrir la solution réellement disponible chez le partenaire.
          </p>

          {result.advice &&
            !result.advice
              .toLowerCase()
              .includes("économis") &&
            !result.advice
              .toLowerCase()
              .includes("offre classée") && (
              <p className="mt-4 text-slate-300">
                {result.advice}
              </p>
            )}
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            href={
              missionRoutes[
                result.category
              ]
            }
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