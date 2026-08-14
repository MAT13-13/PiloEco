"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import PiloMascot from "../components/PiloMascot";
import { supabase } from "../lib/supabase";

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

type QuestionType =
  | "text"
  | "number"
  | "select"
  | "date";

type AnalyseQuestion = {
  key: string;
  type: QuestionType;
  emoji: string;
  title: string;
  description: string;
  placeholder?: string;
  options?: string[];
  showIf?: {
    key: string;
    equals: string;
  };
};

type CategoryConfig = {
  label: string;
  icon: string;
  message: string;
  questions: AnalyseQuestion[];
};

const categories: Record<
  AnalyseCategory,
  CategoryConfig
> = {
  famille: {
    label: "Famille & aides",
    icon: "👨‍👩‍👧",
    message:
      "Je vais rechercher les aides de l’État et les dispositifs adaptés à ton foyer.",
    questions: [
      {
        key: "householdStatus",
        type: "select",
        emoji: "👨‍👩‍👧",
        title: "Quelle est la situation de ton foyer ?",
        description:
          "Choisis la situation qui correspond le mieux à ton foyer.",
        options: [
          "Personne seule",
          "Couple sans enfant",
          "Famille avec enfant(s)",
          "Famille monoparentale",
          "Autre situation",
        ],
      },
      {
        key: "childrenCount",
        type: "number",
        emoji: "👶",
        title: "Combien d’enfants vivent dans ton foyer ?",
        description:
          "Indique 0 si aucun enfant ne vit dans ton foyer.",
        placeholder: "Ex : 2",
      },
      {
        key: "housingStatus",
        type: "select",
        emoji: "🏠",
        title: "Quelle est ta situation de logement ?",
        description:
          "Cette information aide Pilo à repérer les aides au logement possibles.",
        options: [
          "Locataire",
          "Propriétaire",
          "Hébergé gratuitement",
          "Logement social",
          "Autre",
        ],
      },
      {
        key: "employmentStatus",
        type: "select",
        emoji: "💼",
        title: "Quelle est ta situation professionnelle ?",
        description:
          "Choisis ta situation principale actuelle.",
        options: [
          "Salarié",
          "Indépendant",
          "Demandeur d’emploi",
          "Étudiant",
          "Retraité",
          "Sans activité",
          "Autre",
        ],
      },
      {
        key: "monthlyHouseholdIncome",
        type: "number",
        emoji: "💶",
        title: "Quel est le revenu mensuel approximatif du foyer ?",
        description:
          "Indique une estimation du revenu net total du foyer.",
        placeholder: "Ex : 2800",
      },
    ],
  },

   telephone: {
    label: "Téléphone",
    icon: "📱",
    message:
      "Je vais analyser ton forfait actuel ou t’aider à trouver une nouvelle offre mobile.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  telephoneSenior: {
  label: "Téléphone senior",
  icon: "👴",
  message:
    "Je vais t'aider à trouver un téléphone simple et adapté aux seniors.",
  questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
},

    internet: {
    label: "Internet",
    icon: "🌐",
    message:
      "Je vais analyser ta box actuelle ou t’aider à trouver une nouvelle offre Internet.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    electricite: {
    label: "Électricité",
    icon: "⚡",
    message:
      "Je vais analyser ton contrat actuel ou t’aider à trouver une offre adaptée à ton logement.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    habitation: {
    label: "Assurance habitation",
    icon: "🏠",
    message:
      "Je vais analyser ton contrat actuel ou t’aider à trouver une première assurance habitation.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    auto: {
    label: "Assurance auto",
    icon: "🚗",
    message:
      "Je vais analyser ton contrat actuel ou t’aider à trouver une première assurance auto.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  mobilitesDouces: {
    label: "Mobilités douces",
    icon: "🚲",
    message:
      "Je vais analyser l’assurance de ton vélo ou de ta trottinette électrique.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  moto: {
    label: "Assurance moto",
    icon: "🏍️",
    message:
      "Je vais t’aider à analyser ton contrat actuel ou à rechercher une première assurance moto.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    mutuelle: {
    label: "Mutuelle santé",
    icon: "❤️",
    message:
      "Je vais analyser ta mutuelle actuelle ou t’aider à trouver une première couverture santé.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    animaux: {
    label: "Assurance animaux",
    icon: "🐶",
    message:
      "Je vais analyser la couverture actuelle de ton animal ou t’aider à trouver une première assurance.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    banque: {
    label: "Banque",
    icon: "🏦",
    message:
      "Je vais analyser tes frais bancaires actuels ou t’aider à choisir une nouvelle banque.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    streaming: {
    label: "Streaming",
    icon: "📺",
    message:
      "Je vais analyser tes abonnements actuels ou t’aider à choisir un nouveau service de streaming.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },



    securite: {
    label: "Alarme & sécurité",
    icon: "🔐",
    message:
      "Je vais analyser ta solution actuelle ou t’aider à choisir un premier équipement de sécurité.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  demenagement: {
    label: "Déménagement",
    icon: "🚚",
    message:
      "Je vais t’aider à comparer les principaux coûts de ton déménagement.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  servicesAuto: {
  label: "Services auto",
  icon: "🔧",
  message:
    "Je vais analyser tes dépenses d’entretien et de services automobiles.",
  questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
},

  travaux: {
    label: "Travaux & rénovation",
    icon: "🛠️",
    message:
      "Je vais analyser ton projet et rechercher des économies ou des aides possibles.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

    logiciels: {
    label: "Logiciels",
    icon: "💻",
    message:
      "Je vais analyser ton abonnement actuel ou t’aider à choisir un nouveau logiciel.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  formation: {
    label: "Formation",
    icon: "🎓",
    message:
      "Je vais analyser ton projet de formation et les financements possibles.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  voyage: {
    label: "Voyage",
    icon: "✈️",
    message:
      "Je vais analyser les principaux frais liés à ton prochain voyage.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  beauteArtisanat: {
    label: "Beauté & Artisanat",
    icon: "🌸",
    message:
      "Je vais préciser le type de création ou de prestation artisanale qui correspond à ton besoin.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  siteInternetPro: {
    label: "Site internet pro",
    icon: "🌐",
    message:
      "Je vais identifier le type de site professionnel adapté à ton activité et à ton budget.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  assuranceEmprunteur: {
    label: "Assurance emprunteur",
    icon: "🏦",
    message:
      "Je vais analyser les principaux éléments de ton assurance de prêt pour identifier une solution adaptée.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  ambassadeur: {
    label: "Ambassadeur GSelect",
    icon: "💼",
    message:
      "Je vais t'aider à vérifier si une activité d'ambassadeur peut correspondre à ton profil et à tes disponibilités.",
    questions: [
      {
        key: "goal",
        type: "select",
        emoji: "🎯",
        title: "Quel est ton objectif ?",
        description: "Choisis ce que tu recherches avec cette opportunité.",
        options: [
          "Complément de revenus",
          "Nouvelle activité",
          "Activité flexible",
          "Découvrir l'opportunité",
        ],
      },
      {
        key: "availability",
        type: "select",
        emoji: "🕐",
        title: "Quelle disponibilité peux-tu y consacrer ?",
        description: "Une estimation suffit.",
        options: [
          "Moins de 5 h par semaine",
          "5 à 10 h par semaine",
          "10 à 20 h par semaine",
          "Plus de 20 h par semaine",
        ],
      },
    ],
  },

  assuranceObseques: {
    label: "Assurance obsèques",
    icon: "🕊️",
    message:
      "Je vais analyser les éléments essentiels d'un contrat obsèques ou t'aider à préciser la couverture recherchée.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  creditImmobilier: {
    label: "Crédit immobilier",
    icon: "🏠",
    message:
      "Je vais structurer les informations principales de ton projet immobilier pour identifier une solution de financement adaptée.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  diagnosticImmobilier: {
    label: "Diagnostic immobilier",
    icon: "📋",
    message:
      "Je vais préciser les caractéristiques du bien afin de t'orienter vers les diagnostics adaptés.",
    questions: [
      {
        key: "transactionType",
        type: "select",
        emoji: "📋",
        title: "Quel est ton besoin ?",
        description: "Cette information détermine les diagnostics à envisager.",
        options: [
          "Vente",
          "Location",
          "Travaux",
          "Autre",
        ],
      },
      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel type de bien est concerné ?",
        description: "Choisis le type de bien à diagnostiquer.",
        options: [
          "Appartement",
          "Maison",
          "Local professionnel",
          "Autre",
        ],
      },
    ],
  },

  mutuelleSenior: {
    label: "Mutuelle Senior",
    icon: "👵",
    message:
      "Je vais t'aider à préciser les garanties santé les plus importantes pour une couverture senior.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  epargneRetraite: {
    label: "Épargne & retraite",
    icon: "💰",
    message:
      "Je vais clarifier ton objectif d'épargne afin de t'orienter vers les solutions partenaires correspondant à ton projet.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  motoEquipement: {
    label: "Moto & équipement",
    icon: "🏍️",
    message:
      "Je vais identifier l'équipement moto correspondant à ton besoin et à ton budget.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  crypto: {
    label: "Cryptomonnaies",
    icon: "₿",
    message:
      "Je vais préciser ton besoin afin de t'orienter vers une plateforme ou un service adapté à ton niveau.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  cybersecurite: {
    label: "Cybersécurité",
    icon: "🛡️",
    message:
      "Je vais identifier les protections numériques utiles selon tes appareils et tes usages.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  servicesEntreprises: {
    label: "Services aux entreprises",
    icon: "🏢",
    message:
      "Je vais préciser le besoin de ton entreprise afin de t'orienter vers le bon service partenaire.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  debarras: {
    label: "Débarras",
    icon: "📦",
    message:
      "Je vais préciser le volume et les contraintes du débarras pour t'orienter vers une solution adaptée.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

  gaz: {
    label: "Gaz",
    icon: "🔥",
    message:
      "Je vais analyser ton contrat de gaz actuel ou t'aider à préciser les besoins de ton logement.",
    questions: [
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description: "Indique simplement ton budget approximatif en euros.",
        placeholder: "Ex : 100",
      },
    ],
  },

};

type MissionCatalog = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string | null;
  status: "available" | "pending" | "disabled";
  route: string | null;
  sort_order: number;
  is_premium?: boolean;
};

type AnalyseCatalogEntry = {
  mission: MissionCatalog;
  analyseCategory: AnalyseCategory | null;
  config: CategoryConfig | null;
};

const fallbackAvailableCategoryOrder: AnalyseCategory[] = [
  "famille",
  "beauteArtisanat",
  "voyage",
  "telephone",
  "telephoneSenior",
  "siteInternetPro",
  "animaux",
  "assuranceEmprunteur",
  "ambassadeur",
  "assuranceObseques",
  "creditImmobilier",
  "diagnosticImmobilier",
  "habitation",
  "travaux",
  "mutuelleSenior",
  "epargneRetraite",
  "auto",
  "moto",
  "mobilitesDouces",
  "servicesAuto",
  "motoEquipement",
  "formation",
  "securite",
  "crypto",
  "cybersecurite",
  "servicesEntreprises",
  "demenagement",
  "debarras",
  "electricite",
  "gaz",
];

const fallbackPendingCategoryOrder: AnalyseCategory[] = [
  "mutuelle",
  "internet",
  "banque",
  "streaming",
  "logiciels",
];

const missionSlugToAnalyseCategory: Record<
  string,
  AnalyseCategory
> = {
  "famille": "famille",
  "beaute-artisanat": "beauteArtisanat",
  "voyage": "voyage",
  "mobile": "telephone",
  "telephone": "telephone",
  "telephone-senior": "telephoneSenior",
  "site-internet-pro": "siteInternetPro",
  "animaux": "animaux",
  "assurance-animaux": "animaux",
  "assurance-emprunteur": "assuranceEmprunteur",
  "ambassadeur": "ambassadeur",
  "ambassadeur-gselect": "ambassadeur",
  "assurance-obseques": "assuranceObseques",
  "credit-immobilier": "creditImmobilier",
  "diagnostic-immobilier": "diagnosticImmobilier",
  "habitation": "habitation",
  "assurance-habitation": "habitation",
  "travaux": "travaux",
  "mutuelle-senior": "mutuelleSenior",
  "epargne-retraite": "epargneRetraite",
  "auto": "auto",
  "assurance-auto": "auto",
  "moto": "moto",
  "assurance-moto": "moto",
  "mobilites-douces": "mobilitesDouces",
  "services-auto": "servicesAuto",
  "service-auto": "servicesAuto",
  "moto-equipement": "motoEquipement",
  "formation": "formation",
  "securite": "securite",
  "alarme-securite": "securite",
  "crypto": "crypto",
  "cryptomonnaies": "crypto",
  "cybersecurite": "cybersecurite",
  "services-entreprises": "servicesEntreprises",
  "demenagement": "demenagement",
  "debarras": "debarras",
  "electricite": "electricite",
  "gaz": "gaz",

  // En attente
  "mutuelle": "mutuelle",
  "mutuelle-sante": "mutuelle",
  "internet": "internet",
  "banque": "banque",
  "streaming": "streaming",
  "logiciels": "logiciels",
};

function normalizeMissionValue(
  value: string | null | undefined
) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/^missions\//, "")
    .replace(/^offres\//, "")
    .replace(/&/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findAnalyseCategory(
  mission: MissionCatalog
): AnalyseCategory | null {
  /*
   * IMPORTANT :
   * On ne fait plus aucun rapprochement "approximatif".
   * Une mission doit correspondre exactement à son slug ou à sa route.
   * Cela évite qu'"assurance-obseques" soit pris pour "habitation",
   * ou qu'"assurance-animaux" ouvre une autre assurance.
   */
  const candidates = [
    mission.slug,
    mission.route,
  ]
    .map(normalizeMissionValue)
    .filter(Boolean);

  for (const candidate of candidates) {
    const exactMatch =
      missionSlugToAnalyseCategory[candidate];

    if (exactMatch) {
      return exactMatch;
    }
  }

  console.warn(
    "Mission sans correspondance Analyse exacte :",
    {
      slug: mission.slug,
      route: mission.route,
      title: mission.title,
      category: mission.category,
    }
  );

  return null;
}

function missionToAnalyseEntry(
  mission: MissionCatalog
): AnalyseCatalogEntry {
  const analyseCategory =
    findAnalyseCategory(mission);

  return {
    mission,
    analyseCategory,
    config: analyseCategory
      ? categories[analyseCategory]
      : null,
  };
}

export default function AnalysePage() {
  const router = useRouter();

  const [missionCatalog, setMissionCatalog] =
    useState<MissionCatalog[]>([]);

  const [catalogLoading, setCatalogLoading] =
    useState(true);

  const [catalogError, setCatalogError] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<AnalyseCategory | null>(null);

  const [step, setStep] = useState(0);

  const [values, setValues] = useState<
    Record<string, string>
  >({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadMissionCatalog() {
      try {
        setCatalogLoading(true);
        setCatalogError("");

        const { data, error } = await supabase
          .from("mission_catalog")
          .select(
            `
              id,
              slug,
              title,
              icon,
              category,
              status,
              route,
              sort_order,
              is_premium
            `
          )
          .neq("status", "disabled")
          .order("sort_order", {
            ascending: true,
          });

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Erreur mission_catalog Analyse :",
            error
          );

          setCatalogError(
            "Impossible de synchroniser les catégories avec les missions."
          );

          return;
        }

        setMissionCatalog(
          (data as MissionCatalog[] | null) ?? []
        );
      } catch (error) {
        console.error(
          "Erreur chargement catalogue Analyse :",
          error
        );

        if (mounted) {
          setCatalogError(
            "Impossible de synchroniser les catégories avec les missions."
          );
        }
      } finally {
        if (mounted) {
          setCatalogLoading(false);
        }
      }
    }

    void loadMissionCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");

    if (!categoryFromUrl) {
      return;
    }

    if (
      Object.prototype.hasOwnProperty.call(
        categories,
        categoryFromUrl
      )
    ) {
      setSelectedCategory(
        categoryFromUrl as AnalyseCategory
      );

      setStep(0);
      setValues({});
      setErrorMessage("");
    }
  }, []);

  const category = selectedCategory
    ? categories[selectedCategory]
    : null;

  const visibleQuestions =
    category?.questions.filter((item) => {
      if (!item.showIf) {
        return true;
      }

      return (
        values[item.showIf.key] ===
        item.showIf.equals
      );
    }) ?? [];

  const question = visibleQuestions[step];

  const currentValue = question
    ? values[question.key] ?? ""
    : "";

  const availableCategoryEntries: AnalyseCatalogEntry[] =
    missionCatalog.length > 0
      ? missionCatalog
          .filter(
            (mission) =>
              mission.status === "available"
          )
          .map(missionToAnalyseEntry)
      : fallbackAvailableCategoryOrder.map(
          (categoryKey, index) => ({
            mission: {
              id: `fallback-available-${categoryKey}`,
              slug: categoryKey,
              title: categories[categoryKey].label,
              icon: categories[categoryKey].icon,
              category: categoryKey,
              status: "available",
              route: null,
              sort_order: index,
            },
            analyseCategory: categoryKey,
            config: categories[categoryKey],
          })
        );

  const pendingCategoryEntries: AnalyseCatalogEntry[] =
    missionCatalog.length > 0
      ? missionCatalog
          .filter(
            (mission) =>
              mission.status === "pending"
          )
          .map(missionToAnalyseEntry)
      : fallbackPendingCategoryOrder.map(
          (categoryKey, index) => ({
            mission: {
              id: `fallback-pending-${categoryKey}`,
              slug: categoryKey,
              title: categories[categoryKey].label,
              icon: categories[categoryKey].icon,
              category: categoryKey,
              status: "pending",
              route: null,
              sort_order: index,
            },
            analyseCategory: categoryKey,
            config: categories[categoryKey],
          })
        );

  function openCatalogMission(
    entry: AnalyseCatalogEntry
  ) {
    if (entry.analyseCategory) {
      selectCategory(entry.analyseCategory);
      return;
    }

    const missionRoute =
      entry.mission.route ||
      `/missions/${entry.mission.slug}`;

    router.push(missionRoute);
  }

  function selectCategory(
    categoryKey: AnalyseCategory
  ) {
    setSelectedCategory(categoryKey);
    setStep(0);
    setValues({});
    setErrorMessage("");
  }

  function handlePreviousStep() {
    setErrorMessage("");

    if (step > 0) {
      setStep((currentStep) => currentStep - 1);
      return;
    }

    setSelectedCategory(null);
    setValues({});
  }

  function validateCurrentQuestion() {
    if (!question) {
      return false;
    }

    const questionValue = currentValue.trim();

    if (
      question.type === "date" &&
      !questionValue
    ) {
      return true;
    }

    if (!questionValue) {
      setErrorMessage(
        "Réponds à cette question pour continuer."
      );

      return false;
    }

    if (
      question.type === "number" &&
      (!Number.isFinite(Number(questionValue)) ||
        Number(questionValue) < 0)
    ) {
      setErrorMessage(
        "Indique une valeur valide pour continuer."
      );

      return false;
    }

    return true;
  }

  async function handleNext() {
    if (
      !selectedCategory ||
      !category ||
      !question
    ) {
      return;
    }

    if (!validateCurrentQuestion()) {
      return;
    }

    setErrorMessage("");

    if (step < visibleQuestions.length - 1) {
      setStep((currentStep) => currentStep + 1);
      return;
    }

    try {
      setLoading(true);

      const analysisPayload = {
        category: selectedCategory,
        categoryLabel: category.label,
        icon: category.icon,
        values,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "pilo-analysis",
        JSON.stringify(analysisPayload)
      );

      if (selectedCategory === "telephoneSenior") {
        router.push("/missions/telephone-senior");
        return;
      }

      if (selectedCategory === "mobilitesDouces") {
        router.push("/missions/mobilites-douces");
        return;
      }

      router.push("/analyse-loading");
    } catch (error) {
      console.error(
        "Erreur pendant l’analyse :",
        error
      );

      setErrorMessage(
        "Impossible de lancer ton analyse pour le moment."
      );
    } finally {
      setLoading(false);
    }
  }

  function renderInput() {
    if (!question) {
      return null;
    }

    if (question.type === "select") {
      return (
        <div className="mt-8 grid gap-3">
          {question.options?.map((option) => {
            const active =
              currentValue === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setValues((currentValues) => {
                    const nextValues = {
                      ...currentValues,
                      [question.key]: option,
                    };

                    if (
                      question.key === "contractStatus"
                    ) {
                      const keysToReset = [
                        "provider",
                        "formula",
                        "monthlyPrice",
                        "endDate",
                        "engineSize",
                        "desiredFormula",
                        "vehicleValue",
                        "budget",
                      ];

                      keysToReset.forEach((key) => {
                        delete nextValues[key];
                      });
                    }

                    return nextValues;
                  });

                  if (
                    question.key === "contractStatus"
                  ) {
                    setStep(0);
                  }

                  setErrorMessage("");
                }}
                className={`w-full min-w-0 rounded-2xl border px-4 py-4 text-left text-sm font-bold leading-5 transition sm:p-4 sm:text-base ${
                  active
                    ? "border-green-400 bg-green-500/20 text-green-300"
                    : "border-white/10 bg-white/5 text-white hover:border-green-500/40"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <input
        type={question.type}
        min={
          question.type === "number"
            ? "0"
            : undefined
        }
        step={
          question.type === "number"
            ? "0.01"
            : undefined
        }
        value={currentValue}
        onChange={(event) => {
          setValues((currentValues) => ({
            ...currentValues,
            [question.key]: event.target.value,
          }));

          setErrorMessage("");
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !loading
          ) {
            handleNext();
          }
        }}
        placeholder={question.placeholder}
        className="mt-6 w-full min-w-0 rounded-2xl bg-white px-4 py-4 text-center text-base font-bold text-slate-950 placeholder:text-slate-400 sm:mt-8 sm:p-5 sm:text-2xl"
      />
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-slate-950 px-4 pb-10 pt-24 text-white sm:px-6 sm:py-20 md:justify-center">
      <button
        type="button"
        onClick={() =>
          router.push("/dashboard")
        }
        className="absolute left-4 top-4 z-20 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-green-500/40 hover:text-green-400 sm:left-6 sm:top-6 sm:px-4 sm:py-3 sm:text-base"
      >
        ← Retour au dashboard
      </button>

      {!selectedCategory ? (
        <section className="w-full max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Analyse Pilo
            </p>

            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Que veux-tu analyser ?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Choisis une catégorie. Pilo te posera
              uniquement les questions utiles pour ce
              contrat.
            </p>

            {catalogLoading && (
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Synchronisation des missions...
              </p>
            )}

            {catalogError && (
              <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                {catalogError} Pilo affiche temporairement la dernière liste connue.
              </p>
            )}
          </div>

          {/* CATÉGORIES DISPONIBLES */}
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-green-400">
                Catégories disponibles
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {availableCategoryEntries.map(
                (entry) => {
                  const item = entry.config;

                  return (
                    <button
                      key={entry.mission.id}
                      type="button"
                      onClick={() =>
                        openCatalogMission(entry)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10 sm:rounded-3xl sm:p-6"
                    >
                      <span className="text-5xl">
                        {entry.mission.icon ||
                          item?.icon ||
                          "🎯"}
                      </span>

                      <h2 className="mt-5 text-xl font-black">
                        {entry.mission.title ||
                          item?.label}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item?.message ??
                          "Cette mission est disponible. Ouvre-la pour découvrir la solution proposée par Pilo."}
                      </p>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* EN COURS DE PARTENARIAT */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                Prochainement
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                En cours de partenariat
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Pilo prépare actuellement de nouvelles solutions pour ces catégories.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pendingCategoryEntries.map(
                (entry) => (
                  <div
                    key={entry.mission.id}
                    className="relative rounded-2xl border border-amber-500/20 bg-white/[0.03] p-5 opacity-80"
                  >
                    <div className="absolute right-4 top-4 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-amber-300">
                      En cours
                    </div>

                    <span className="text-3xl">
                      {entry.mission.icon ||
                        entry.config?.icon ||
                        "⏳"}
                    </span>

                    <h3 className="mt-4 font-black text-white">
                      {entry.mission.title ||
                        entry.config?.label}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      Solution partenaire en préparation
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${step}`}
            className="w-full min-w-0 max-w-2xl"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35 }}
          >
            {question && category && (
              <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-green-500/20 bg-slate-900/95 p-4 shadow-2xl shadow-black/20 sm:p-8">
                <h2 className="break-words text-center text-2xl font-black leading-tight text-white sm:text-4xl">
                  {question.title}
                </h2>
                <div className="text-center">
                  <div className="mx-auto mb-4 mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-4xl sm:mb-6 sm:h-24 sm:w-24 sm:text-6xl">
                    🐦
                  </div>

                  <p className="break-words text-xs font-bold uppercase tracking-wide text-green-400 sm:text-sm">
                    {category.icon} {category.label}
                  </p>

                  <p className="mt-2 text-xs font-bold text-slate-500 sm:text-sm">
                    Question {step + 1} /{" "}
                    {visibleQuestions.length}
                  </p>

                  <div className="mt-5 text-4xl sm:mt-6 sm:text-6xl">
                    {question.emoji}
                  </div>

                  <p className="mt-3 break-words text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base">
                    {question.description}
                  </p>

                  <p className="mt-5 break-words rounded-2xl border border-green-500/20 bg-green-500/10 p-3 text-sm leading-6 text-green-300 sm:mt-6 sm:p-4 sm:text-base">
                    {category.message}
                  </p>
                </div>

                {renderInput()}

                {question.type === "date" &&
                  !currentValue && (
                    <p className="mt-3 text-center text-sm text-slate-500">
                      Tu peux laisser cette date vide.
                    </p>
                  )}

                {errorMessage && (
                  <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-red-300">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-6 flex w-full gap-3 sm:mt-8 sm:gap-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    disabled={loading}
                    className="w-[38%] min-w-0 rounded-2xl border border-white/10 bg-white/5 px-2 py-4 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-50 sm:w-1/3 sm:py-5 sm:text-lg"
                  >
                    ← Retour
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      loading ||
                      (!currentValue &&
                        question.type !== "date")
                    }
                    className="min-w-0 flex-1 rounded-2xl bg-green-500 px-3 py-4 text-sm font-bold text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50 sm:py-5 sm:text-lg"
                  >
                    {loading
                      ? "Analyse en cours..."
                      : step <
                          visibleQuestions.length -
                            1
                        ? "Continuer →"
                        : "Voir mon analyse →"}
                  </button>
                </div>

                <div className="mt-6 flex gap-2 sm:mt-8">
                  {visibleQuestions.map(
                    (item, index) => (
                      <div
                        key={item.key}
                        className={`h-2 flex-1 rounded-full ${
                          index <= step
                            ? "bg-green-500"
                            : "bg-slate-700"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="hidden md:block">
        <PiloMascot />
      </div>
    </main>
   );
}