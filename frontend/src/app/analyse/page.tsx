"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import PiloMascot from "../components/PiloMascot";
import QuestionCard from "../components/QuestionCard";

type AnalyseCategory =
  | "famille"
  | "telephone"
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
  | "travaux"
  | "logiciels"
  | "formation"
  | "voyage";

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
      "Je vais analyser ton forfait mobile et son prix.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "📱",
        title: "Quel est ton opérateur mobile ?",
        description:
          "Indique le nom de ton opérateur actuel.",
        placeholder:
          "Ex : Free, Orange, SFR, Bouygues...",
      },
      {
        key: "dataAmount",
        type: "number",
        emoji: "📶",
        title:
          "Combien de Go contient ton forfait ?",
        description:
          "Indique le volume de données mobiles inclus.",
        placeholder: "Ex : 150",
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu ton forfait chaque mois ?",
        description:
          "Indique le prix mensuel en euros.",
        placeholder: "Ex : 24.99",
      },
      {
        key: "commitment",
        type: "select",
        emoji: "📅",
        title: "Es-tu encore engagé ?",
        description:
          "Cela permet à Pilo de savoir quand tu peux changer.",
        options: [
          "Sans engagement",
          "Engagement en cours",
          "Je ne sais pas",
        ],
      },
    ],
  },

  internet: {
    label: "Internet",
    icon: "🌐",
    message:
      "Je vais vérifier le prix et le type de ta box.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🌐",
        title: "Quel est ton fournisseur Internet ?",
        description:
          "Indique le fournisseur de ta box.",
        placeholder:
          "Ex : Free, Orange, SFR, Bouygues...",
      },
      {
        key: "connectionType",
        type: "select",
        emoji: "⚙️",
        title: "Quel type de connexion utilises-tu ?",
        description:
          "Choisis la technologie de ta connexion.",
        options: [
          "Fibre",
          "ADSL",
          "Box 4G ou 5G",
          "Je ne sais pas",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu Internet chaque mois ?",
        description:
          "Indique le prix mensuel de ta box.",
        placeholder: "Ex : 39.99",
      },
      {
        key: "commitment",
        type: "select",
        emoji: "📅",
        title: "Es-tu encore engagé ?",
        description:
          "Cela permet à Pilo de détecter le bon moment pour changer.",
        options: [
          "Sans engagement",
          "Engagement en cours",
          "Je ne sais pas",
        ],
      },
    ],
  },

  electricite: {
    label: "Électricité",
    icon: "⚡",
    message:
      "Je vais examiner ton fournisseur et ta mensualité.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "⚡",
        title:
          "Quel est ton fournisseur d’électricité ?",
        description:
          "Indique le nom de ton fournisseur actuel.",
        placeholder:
          "Ex : EDF, TotalEnergies, Octopus...",
      },
      {
        key: "tariff",
        type: "select",
        emoji: "🕐",
        title: "Quelle option tarifaire utilises-tu ?",
        description:
          "Choisis l’option présente sur ton contrat.",
        options: [
          "Base",
          "Heures pleines / Heures creuses",
          "Je ne sais pas",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Quelle est ta mensualité d’électricité ?",
        description:
          "Indique le montant mensuel en euros.",
        placeholder: "Ex : 120",
      },
    ],
  },

  habitation: {
    label: "Assurance habitation",
    icon: "🏠",
    message:
      "Je vais analyser ton contrat habitation.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🏠",
        title: "Quel est ton assureur habitation ?",
        description:
          "Indique la compagnie qui assure ton logement.",
        placeholder:
          "Ex : MAIF, AXA, Acheel, Allianz...",
      },
      {
        key: "housingType",
        type: "select",
        emoji: "🔑",
        title: "Quel logement assures-tu ?",
        description:
          "Choisis le type de logement concerné.",
        options: [
          "Appartement",
          "Maison",
          "Autre",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu ton assurance habitation ?",
        description:
          "Indique le prix mensuel en euros.",
        placeholder: "Ex : 28",
      },
      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },

  auto: {
    label: "Assurance auto",
    icon: "🚗",
    message:
      "Je vais analyser ton assurance auto uniquement.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🚗",
        title: "Quel est ton assureur auto ?",
        description:
          "Indique le nom de ta compagnie actuelle.",
        placeholder:
          "Ex : MAIF, AXA, Allianz, Direct Assurance...",
      },
      {
        key: "formula",
        type: "select",
        emoji: "🛡️",
        title: "Quelle est ta formule actuelle ?",
        description:
          "Choisis le niveau de couverture de ton contrat.",
        options: [
          "Au tiers",
          "Tiers étendu",
          "Tous risques",
          "Je ne sais pas",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu ton assurance auto ?",
        description:
          "Indique le prix mensuel en euros.",
        placeholder: "Ex : 68",
      },
      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },


  moto: {
    label: "Assurance moto",
    icon: "🏍️",
    message:
      "Je vais analyser ton assurance moto uniquement.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🏍️",
        title: "Quel est ton assureur moto ?",
        description:
          "Indique le nom de ta compagnie actuelle.",
        placeholder:
          "Ex : AMV, April Moto, AXA, Allianz...",
      },
      {
        key: "formula",
        type: "select",
        emoji: "🛡️",
        title: "Quelle est ta formule actuelle ?",
        description:
          "Choisis le niveau de couverture de ton contrat.",
        options: [
          "Au tiers",
          "Tiers étendu",
          "Tous risques",
          "Je ne sais pas",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu ton assurance moto ?",
        description:
          "Indique le prix mensuel en euros.",
        placeholder: "Ex : 42",
      },
      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },

  mutuelle: {
    label: "Mutuelle santé",
    icon: "❤️",
    message:
      "Je vais analyser ta mutuelle santé et son coût.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "❤️",
        title: "Quelle est ta mutuelle actuelle ?",
        description:
          "Indique le nom de ton organisme de complémentaire santé.",
        placeholder:
          "Ex : Harmonie Mutuelle, Alan, Aésio...",
      },
      {
        key: "coverageType",
        type: "select",
        emoji: "👥",
        title: "Qui est couvert par ce contrat ?",
        description:
          "Choisis les personnes couvertes par la mutuelle.",
        options: [
          "Moi uniquement",
          "Couple",
          "Famille",
          "Je ne sais pas",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu ta mutuelle chaque mois ?",
        description:
          "Indique le prix mensuel total en euros.",
        placeholder: "Ex : 65",
      },
      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },

  animaux: {
    label: "Assurance animaux",
    icon: "🐶",
    message:
      "Je vais analyser la couverture de ton animal.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🐶",
        title:
          "Quel est ton assureur pour animaux ?",
        description:
          "Indique le nom de ton assureur actuel.",
        placeholder:
          "Ex : SantéVet, Kozoo, Bulle Bleue...",
      },
      {
        key: "animalType",
        type: "select",
        emoji: "🐾",
        title: "Quel animal est assuré ?",
        description:
          "Choisis le type d’animal concerné.",
        options: ["Chien", "Chat", "Autre"],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu chaque mois ?",
        description:
          "Indique le prix mensuel de l’assurance.",
        placeholder: "Ex : 35",
      },
    ],
  },

  banque: {
    label: "Banque",
    icon: "🏦",
    message:
      "Je vais examiner tes frais bancaires.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🏦",
        title: "Dans quelle banque es-tu ?",
        description:
          "Indique le nom de ta banque principale.",
        placeholder:
          "Ex : Crédit Agricole, BNP, BoursoBank...",
      },
      {
        key: "offer",
        type: "text",
        emoji: "💳",
        title:
          "Quelle carte ou formule utilises-tu ?",
        description:
          "Indique le nom de ta carte ou de ton offre.",
        placeholder:
          "Ex : Visa Premier, Gold Mastercard...",
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu de frais chaque mois ?",
        description:
          "Additionne la carte et les principaux frais récurrents.",
        placeholder: "Ex : 12",
      },
    ],
  },

  streaming: {
    label: "Streaming",
    icon: "📺",
    message:
      "Je vais vérifier le coût de tes abonnements.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "📺",
        title:
          "Quel abonnement veux-tu analyser ?",
        description:
          "Indique le service principal concerné.",
        placeholder:
          "Ex : Netflix, Disney+, Canal+, Spotify...",
      },
      {
        key: "offer",
        type: "text",
        emoji: "🎬",
        title: "Quelle formule utilises-tu ?",
        description:
          "Indique le nom de ton abonnement.",
        placeholder:
          "Ex : Premium, Standard, Famille...",
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title:
          "Combien paies-tu chaque mois ?",
        description:
          "Indique le prix mensuel de l’abonnement.",
        placeholder: "Ex : 19.99",
      },
    ],
  },


  fintech: {
    label: "Fintech & budget",
    icon: "💳",
    message:
      "Je vais analyser les frais et les outils que tu utilises pour gérer ton argent.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "💳",
        title: "Quel service financier utilises-tu ?",
        description:
          "Indique l’application ou le service concerné.",
        placeholder:
          "Ex : Revolut, Lydia, N26, une application de budget...",
      },
      {
        key: "serviceType",
        type: "select",
        emoji: "📊",
        title: "Quel type de service veux-tu analyser ?",
        description:
          "Choisis l’usage principal de ce service.",
        options: [
          "Compte ou carte",
          "Gestion de budget",
          "Cashback",
          "Épargne",
          "Investissement",
          "Autre",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien ce service te coûte-t-il chaque mois ?",
        description:
          "Indique 0 si le service est actuellement gratuit.",
        placeholder: "Ex : 9.99",
      },
    ],
  },

  securite: {
    label: "Alarme & sécurité",
    icon: "🔐",
    message:
      "Je vais analyser ton abonnement de sécurité ou de télésurveillance.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "🔐",
        title: "Quel prestataire de sécurité utilises-tu ?",
        description:
          "Indique le nom de la société ou de la marque.",
        placeholder:
          "Ex : Verisure, Sector Alarm, Homiris...",
      },
      {
        key: "serviceType",
        type: "select",
        emoji: "📹",
        title: "Quel service utilises-tu ?",
        description:
          "Choisis le type de protection concerné.",
        options: [
          "Télésurveillance",
          "Alarme connectée",
          "Caméras",
          "Détecteurs",
          "Autre",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Indique le prix mensuel de ton abonnement.",
        placeholder: "Ex : 39.90",
      },
      {
        key: "commitment",
        type: "select",
        emoji: "📅",
        title: "Es-tu encore engagé ?",
        description:
          "Cette information aide Pilo à déterminer quand changer.",
        options: [
          "Sans engagement",
          "Engagement en cours",
          "Je ne sais pas",
        ],
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
        key: "moveType",
        type: "select",
        emoji: "📦",
        title: "Quel service recherches-tu ?",
        description:
          "Choisis le besoin principal lié à ton déménagement.",
        options: [
          "Déménageur professionnel",
          "Location de camion",
          "Garde-meubles",
          "Cartons et matériel",
          "Changement d’adresse",
          "Autre",
        ],
      },
      {
        key: "distance",
        type: "number",
        emoji: "🛣️",
        title: "Quelle distance environ vas-tu parcourir ?",
        description:
          "Indique la distance estimée en kilomètres.",
        placeholder: "Ex : 120",
      },
      {
        key: "estimatedBudget",
        type: "number",
        emoji: "💶",
        title: "Quel budget as-tu prévu ?",
        description:
          "Indique ton budget approximatif en euros.",
        placeholder: "Ex : 900",
      },
      {
        key: "moveDate",
        type: "date",
        emoji: "📅",
        title: "Quelle est la date prévue du déménagement ?",
        description:
          "Cette information reste facultative.",
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
        key: "serviceType",
        type: "select",
        emoji: "🔧",
        title: "Quel service automobile veux-tu analyser ?",
        description:
          "Choisis la dépense principale concernée.",
        options: [
          "Entretien ou réparation",
          "Pneus",
          "Contrôle technique",
          "Lavage",
          "Parking",
          "Location de véhicule",
          "Autre",
        ],
      },
      {
        key: "provider",
        type: "text",
        emoji: "🏪",
        title: "Quel prestataire utilises-tu actuellement ?",
        description:
          "Indique le garage, l’enseigne ou le service concerné.",
        placeholder:
          "Ex : Norauto, Feu Vert, un garage indépendant...",
      },
      {
        key: "yearlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien dépenses-tu environ par an ?",
        description:
          "Indique une estimation annuelle en euros.",
        placeholder: "Ex : 650",
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
        key: "projectType",
        type: "select",
        emoji: "🛠️",
        title: "Quel type de travaux envisages-tu ?",
        description:
          "Choisis le projet principal.",
        options: [
          "Isolation",
          "Chauffage ou pompe à chaleur",
          "Panneaux solaires",
          "Fenêtres",
          "Rénovation intérieure",
          "Toiture",
          "Autre",
        ],
      },
      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel logement est concerné ?",
        description:
          "Choisis le type de logement.",
        options: [
          "Appartement",
          "Maison",
          "Local professionnel",
          "Autre",
        ],
      },
      {
        key: "estimatedBudget",
        type: "number",
        emoji: "💶",
        title: "Quel budget prévois-tu ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 12000",
      },
      {
        key: "projectDate",
        type: "date",
        emoji: "📅",
        title: "Quand souhaites-tu commencer les travaux ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },

  logiciels: {
    label: "Logiciels",
    icon: "💻",
    message:
      "Je vais vérifier le coût de tes logiciels et abonnements numériques.",
    questions: [
      {
        key: "provider",
        type: "text",
        emoji: "💻",
        title: "Quel logiciel ou service veux-tu analyser ?",
        description:
          "Indique le nom du service concerné.",
        placeholder:
          "Ex : Microsoft 365, NordVPN, Dropbox, antivirus...",
      },
      {
        key: "softwareType",
        type: "select",
        emoji: "🧩",
        title: "Quel type de logiciel est-ce ?",
        description:
          "Choisis la catégorie principale.",
        options: [
          "VPN",
          "Antivirus",
          "Stockage cloud",
          "Bureautique",
          "Création ou design",
          "Gestion professionnelle",
          "Autre",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Convertis le tarif annuel en moyenne mensuelle si nécessaire.",
        placeholder: "Ex : 12.99",
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
        key: "trainingType",
        type: "select",
        emoji: "🎓",
        title: "Quelle formation recherches-tu ?",
        description:
          "Choisis le domaine principal.",
        options: [
          "Langues",
          "Permis de conduire",
          "Numérique",
          "Reconversion professionnelle",
          "Création d’entreprise",
          "Sport",
          "Autre",
        ],
      },
      {
        key: "employmentStatus",
        type: "select",
        emoji: "💼",
        title: "Quelle est ta situation professionnelle ?",
        description:
          "Cette information permet d’identifier les financements possibles.",
        options: [
          "Salarié",
          "Indépendant",
          "Demandeur d’emploi",
          "Étudiant",
          "Sans activité",
          "Autre",
        ],
      },
      {
        key: "estimatedBudget",
        type: "number",
        emoji: "💶",
        title: "Quel est le prix estimé de la formation ?",
        description:
          "Indique le montant total en euros.",
        placeholder: "Ex : 2500",
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
        key: "serviceType",
        type: "select",
        emoji: "✈️",
        title: "Quel service de voyage veux-tu analyser ?",
        description:
          "Choisis le besoin principal.",
        options: [
          "Hébergement",
          "Location de voiture",
          "Assurance voyage",
          "Transport",
          "Activités",
          "Forfait mobile à l’étranger",
          "Autre",
        ],
      },
      {
        key: "destination",
        type: "text",
        emoji: "🌍",
        title: "Quelle est ta destination ?",
        description:
          "Indique la ville ou le pays principal.",
        placeholder: "Ex : Espagne, Rome, New York...",
      },
      {
        key: "estimatedBudget",
        type: "number",
        emoji: "💶",
        title: "Quel budget as-tu prévu ?",
        description:
          "Indique le budget approximatif en euros.",
        placeholder: "Ex : 1800",
      },
      {
        key: "departureDate",
        type: "date",
        emoji: "📅",
        title: "Quelle est ta date de départ ?",
        description:
          "Cette information reste facultative.",
      },
    ],
  },
};

const categoryEntries = Object.entries(
  categories
) as [AnalyseCategory, CategoryConfig][];

export default function AnalysePage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState<AnalyseCategory | null>(null);

  const [step, setStep] = useState(0);

  const [values, setValues] = useState<
    Record<string, string>
  >({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const category = selectedCategory
    ? categories[selectedCategory]
    : null;

  const question = category?.questions[step];

  const currentValue = question
    ? values[question.key] ?? ""
    : "";

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

    if (step < category.questions.length - 1) {
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
                  setValues((currentValues) => ({
                    ...currentValues,
                    [question.key]: option,
                  }));

                  setErrorMessage("");
                }}
                className={`rounded-2xl border p-4 text-left font-bold transition ${
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
        className="mt-8 w-full rounded-2xl bg-white p-5 text-center text-2xl font-bold text-slate-950 placeholder:text-slate-400"
      />
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-20 text-white">
      <button
        type="button"
        onClick={() =>
          router.push("/dashboard")
        }
        className="absolute left-6 top-6 z-20 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 font-semibold text-slate-200 transition hover:border-green-500/40 hover:text-green-400"
      >
        ← Retour au dashboard
      </button>

      {!selectedCategory ? (
        <section className="w-full max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              Analyse Pilo
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Que veux-tu analyser ?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Choisis une catégorie. Pilo te posera
              uniquement les questions utiles pour ce
              contrat.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryEntries.map(
              ([categoryKey, item]) => (
                <button
                  key={categoryKey}
                  type="button"
                  onClick={() =>
                    selectCategory(categoryKey)
                  }
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10"
                >
                  <span className="text-5xl">
                    {item.icon}
                  </span>

                  <h2 className="mt-5 text-xl font-black">
                    {item.label}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.message}
                  </p>
                </button>
              )
            )}
          </div>
        </section>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${step}`}
            className="w-full max-w-2xl"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35 }}
          >
            {question && category && (
              <QuestionCard title={question.title}>
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-green-500/10 text-6xl">
                    🐦
                  </div>

                  <p className="text-sm font-bold uppercase tracking-wide text-green-400">
                    {category.icon} {category.label}
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    Question {step + 1} /{" "}
                    {category.questions.length}
                  </p>

                  <div className="mt-6 text-6xl">
                    {question.emoji}
                  </div>

                  <p className="mt-4 text-slate-400">
                    {question.description}
                  </p>

                  <p className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-300">
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

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    disabled={loading}
                    className="w-1/3 rounded-2xl border border-white/10 bg-white/5 py-5 text-lg font-bold text-white transition hover:bg-white/10 disabled:opacity-50"
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
                    className="flex-1 rounded-2xl bg-green-500 py-5 text-lg font-bold text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "Analyse en cours..."
                      : step <
                          category.questions.length -
                            1
                        ? "Continuer →"
                        : "Voir mon analyse →"}
                  </button>
                </div>

                <div className="mt-8 flex gap-2">
                  {category.questions.map(
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
              </QuestionCard>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <PiloMascot />
    </main>
  );
  }