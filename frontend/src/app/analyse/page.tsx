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
  | "rachatCredits"
  | "diagnosticImmobilier"
  | "mutuelleSenior"
  | "mutuelleProfessionnelle"
  | "epargneRetraite"
  | "assuranceVie"
  | "motoEquipement"
  | "crypto"
  | "cybersecurite"
  | "assuranceDecennale"
  | "expertComptable"
  | "servicesEntreprises"
  | "visibiliteGoogle"
  | "debarras"
  | "locationMeublee"
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
    label: "Famille & scolarité",
    icon: "👨‍👩‍👧",
    message:
      "Je vais t’aider à trouver une solution adaptée à la scolarité de ton enfant.",
    questions: [
      {
        key: "childrenCount",
        type: "number",
        emoji: "👶",
        title: "Combien d’enfants souhaites-tu accompagner ?",
        description:
          "Indique le nombre d’enfants concernés par ta recherche.",
        placeholder: "Ex : 1",
      },
      {
        key: "schoolLevel",
        type: "select",
        emoji: "🎓",
        title: "Quel est le niveau scolaire concerné ?",
        description:
          "Choisis le niveau correspondant à ton enfant.",
        options: ["Primaire", "Collège"],
      },
      {
        key: "schoolNeed",
        type: "select",
        emoji: "📚",
        title: "Quel accompagnement recherches-tu ?",
        description:
          "Choisis la solution correspondant le mieux à ton besoin.",
        options: [
          "Cours à distance",
          "Soutien scolaire",
          "Supports pédagogiques",
          "École à distance depuis l’étranger",
        ],
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
    label: "Assurance mobilité douce",
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
    icon: "💶",
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

  rachatCredits: {
    label: "Rachat de crédits",
    icon: "💳",
    message:
      "Je vais t’orienter vers la solution de regroupement de crédits adaptée à ta situation.",
    questions: [
      {
        key: "housingStatus",
        type: "select",
        emoji: "🏠",
        title: "Quelle est ta situation ?",
        description:
          "Choisis simplement ta situation de logement.",
        options: [
          "Propriétaire",
          "Locataire",
        ],
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

  mutuelleProfessionnelle: {
  label: "Mutuelle Professionnelle",
  icon: "💼",
  message:
    "Je vais t’aider à identifier une solution de mutuelle professionnelle adaptée à ton activité.",
  questions: [
    {
      key: "activityType",
      type: "select",
      emoji: "💼",
      title: "Quelle est ta situation professionnelle ?",
      description:
        "Choisis la situation qui correspond le mieux à ton activité.",
      options: [
        "Indépendant / TNS",
        "Auto-entrepreneur",
        "Profession libérale",
        "Artisan",
        "Commerçant",
        "Chef d’entreprise",
        "Autre",
      ],
    },
    {
      key: "budget",
      type: "number",
      emoji: "💶",
      title: "Quel budget souhaites-tu prévoir ?",
      description:
        "Indique ton budget mensuel approximatif pour ta mutuelle.",
      placeholder: "Ex : 60",
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

  assuranceVie: {
    label: "Assurance vie",
    icon: "💰",
    message:
      "Je vais t’aider à préciser ton objectif afin de t’orienter vers une solution d’assurance vie adaptée.",
    questions: [
      {
        key: "investmentGoal",
        type: "select",
        emoji: "🎯",
        title: "Quel est ton objectif principal ?",
        description:
          "Choisis l’objectif correspondant le mieux à ton projet.",
        options: [
          "Constituer un capital",
          "Préparer ma retraite",
          "Transmettre mon patrimoine",
          "Faire fructifier mon épargne",
          "Découvrir l’assurance vie",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel montant souhaites-tu épargner chaque mois ?",
        description:
          "Indique une estimation de ton effort d’épargne mensuel.",
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

  assuranceDecennale: {
    label: "Assurance décennale",
    icon: "🏗️",
    message:
      "Je vais t’aider à trouver une assurance décennale adaptée à ton activité professionnelle.",
    questions: [
      {
        key: "activity",
        type: "select",
        emoji: "💼",
        title: "Quelle est ton activité principale ?",
        description:
          "Choisis ton métier pour identifier une assurance adaptée.",
        options: [
          "Artisan du bâtiment",
          "Maçon",
          "Charpentier",
          "Plombier",
          "Électricien",
          "Architecte",
          "Entreprise générale du bâtiment",
          "Autre",
        ],
      },
    ],
  },

  expertComptable: {
    label: "Expert-comptable",
    icon: "🧾",
    message:
      "Je vais t’aider à trouver un accompagnement comptable adapté à ton entreprise.",
    questions: [
      {
        key: "expertType",
        type: "select",
        emoji: "🧾",
        title: "Quel accompagnement recherches-tu ?",
        description:
          "Choisis la solution correspondant à ton besoin.",
        options: [
          "Comparer plusieurs cabinets",
          "Accompagnement comptable",
        ],
      },
      {
        key: "activity",
        type: "select",
        emoji: "💼",
        title: "Quel est ton statut professionnel ?",
        description:
          "Cette information permettra de mieux orienter ta recherche.",
        options: [
          "Micro-entrepreneur",
          "Indépendant",
          "Profession libérale",
          "Commerce",
          "Artisan",
          "Société",
          "Association",
          "Autre",
        ],
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
        key: "serviceType",
        type: "select",
        emoji: "🏢",
        title: "Quel service professionnel recherches-tu ?",
        description:
          "Choisis le service dont ton entreprise a besoin.",
        options: [
          "Assurance décennale",
          "Expert-comptable",
        ],
      },
      {
        key: "activity",
        type: "select",
        emoji: "💼",
        title: "Quelle est ton activité principale ?",
        description:
          "Cette information aide Pilo à mieux orienter ta recherche.",
        options: [
          "Artisan du bâtiment",
          "Maçon",
          "Charpentier",
          "Plombier",
          "Électricien",
          "Architecte",
          "Entreprise générale du bâtiment",
          "Commerce",
          "Profession libérale",
          "Indépendant",
          "Micro-entrepreneur",
          "Société",
          "Autre",
        ],
      },
    ],
  },

  visibiliteGoogle: {
    label: "Visibilité Google",
    icon: "📍",
    message:
      "Je vais identifier les besoins de visibilité locale de ton entreprise afin de t'orienter vers les recommandations adaptées.",
    questions: [
      {
        key: "visibilityGoal",
        type: "select",
        emoji: "📍",
        title: "Quel est ton objectif principal sur Google ?",
        description:
          "Choisis le besoin qui correspond le mieux à ton entreprise.",
        options: [
          "Être plus visible localement",
          "Améliorer ma fiche Google",
          "Obtenir davantage d'avis clients",
          "Attirer plus de clients",
          "Je souhaite être conseillé",
        ],
      },
      {
        key: "businessType",
        type: "select",
        emoji: "🏢",
        title: "Quel type d'activité exerces-tu ?",
        description:
          "Cette information permettra de mieux adapter les recommandations à ton activité.",
        options: [
          "Commerce local",
          "Artisan",
          "Profession libérale",
          "Restaurant ou établissement",
          "Entreprise de services",
          "Indépendant ou micro-entrepreneur",
          "Autre",
        ],
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


  locationMeublee: {
  label: "Location meublée & LMNP",
  icon: "🏘️",
  message:
    "Je vais t’orienter vers la mission adaptée à ton projet de location meublée.",
  questions: [
    {
      key: "locationNeed",
      type: "select",
      emoji: "🏘️",
      title: "Tu as un projet de location meublée ?",
      description:
        "Pilo va t’orienter vers la mission dédiée à la location meublée et au statut LMNP.",
      options: [
        "Oui, je loue déjà un logement meublé",
        "Oui, j’ai un projet de location meublée",
        "Je souhaite simplement me renseigner",
      ],
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

type AnalyseUniverse =
  | "assurancesProtection"
  | "energie"
  | "telecomsNumerique"
  | "maisonImmobilier"
  | "servicesQuotidien"
  | "financePatrimoine"
  | "proEntreprises"
  | "familleScolarite"
  | "beauteArtisanat"
  | "voyagesLoisirs";

type UniverseConfig = {
  label: string;
  icon: string;
  description: string;
  categories: AnalyseCategory[];
};

const universeOrder: AnalyseUniverse[] = [
  "assurancesProtection",
  "energie",
  "telecomsNumerique",
  "maisonImmobilier",
  "financePatrimoine",
  "servicesQuotidien",
  "proEntreprises",
  "familleScolarite",
  "beauteArtisanat",
  "voyagesLoisirs",
];

const universes: Record<AnalyseUniverse, UniverseConfig> = {
  assurancesProtection: {
    label: "Assurances & Protection",
    icon: "🛡️",
    description:
      "Assurances, mutuelles et solutions pour protéger ton quotidien.",
    categories: [
      "mutuelle",
      "mutuelleSenior",
      "animaux",
      "auto",
      "moto",
      "mobilitesDouces",
      "habitation",
      "assuranceEmprunteur",
      "assuranceObseques",
      "ambassadeur",
    ],
  },

  energie: {
    label: "Énergie",
    icon: "⚡",
    description:
      "Électricité et gaz pour mieux maîtriser tes factures d’énergie.",
    categories: [
      "electricite",
      "gaz",
    ],
  },

  telecomsNumerique: {
    label: "Télécoms & Numérique",
    icon: "📱",
    description:
      "Téléphone, Internet et solutions numériques pour ton quotidien.",
    categories: [
      "telephone",
      "telephoneSenior",
      "internet",
      "cybersecurite",
      "logiciels",
      "streaming",
    ],
  },

  maisonImmobilier: {
    label: "Maison & Immobilier",
    icon: "🏠",
    description:
      "Immobilier, logement, travaux et solutions pour ta maison.",
    categories: [
      "creditImmobilier",
      "diagnosticImmobilier",
      "locationMeublee",
      "travaux",
      "securite",
    ],
  },

  servicesQuotidien: {
    label: "Services du quotidien",
    icon: "🧰",
    description:
      "Déménagement, débarras, auto et services pratiques du quotidien.",
    categories: [
      "demenagement",
      "debarras",
      "servicesAuto",
      "motoEquipement",
    ],
  },

  financePatrimoine: {
    label: "Finance & Patrimoine",
    icon: "💰",
    description:
      "Épargne, patrimoine, banque et solutions financières.",
    categories: [
  "epargneRetraite",
  "assuranceVie",
  "rachatCredits",
  "crypto",
  "banque",
],
  },

  proEntreprises: {
    label: "Pro & Entreprises",
    icon: "💼",
    description:
      "Solutions et services pour les professionnels et les entreprises.",
    categories: [
      "mutuelleProfessionnelle",
      "assuranceDecennale",
      "expertComptable",
      "siteInternetPro",
      "formation",
      "visibiliteGoogle",
    ],
  },

  familleScolarite: {
    label: "Famille & Scolarité",
    icon: "👨‍👩‍👧",
    description:
      "Scolarité, accompagnement éducatif et solutions utiles pour la famille.",
    categories: ["famille"],
  },

  beauteArtisanat: {
    label: "Beauté & Artisanat",
    icon: "🌸",
    description:
      "Beauté, créations artisanales et idées faites main.",
    categories: [
      "beauteArtisanat",
    ],
  },

  voyagesLoisirs: {
    label: "Voyages & Loisirs",
    icon: "✈️",
    description:
      "Voyages et solutions adaptées à tes projets de loisirs.",
    categories: [
      "voyage",
    ],
  },
};

const fallbackAvailableCategoryOrder: AnalyseCategory[] = [
  "famille",
  "beauteArtisanat",
  "voyage",
  "telephone",
  "telephoneSenior",
  "siteInternetPro",
  "visibiliteGoogle",
  "mutuelleProfessionnelle",
  "assuranceDecennale",
  "expertComptable",
  "animaux",
  "assuranceEmprunteur",
  "ambassadeur",
  "assuranceObseques",
  "creditImmobilier",
  "diagnosticImmobilier",
  "locationMeublee",
  "habitation",
  "travaux",
  "mutuelleSenior",
  "epargneRetraite",
  "assuranceVie",
  "rachatCredits",
  "auto",
  "moto",
  "mobilitesDouces",
  "servicesAuto",
  "motoEquipement",
  "formation",
  "securite",
  "crypto",
  "cybersecurite",
  "demenagement",
  "debarras",
  "electricite",
  "gaz",
];


const missionSlugToAnalyseCategory: Record<
  string,
  AnalyseCategory
> = {
  "famille": "famille",
  "famille-aides": "famille",
  "famille-scolarite": "famille",
  "beaute-artisanat": "beauteArtisanat",
  "voyage": "voyage",
  "mobile": "telephone",
  "telephone": "telephone",
  "telephone-senior": "telephoneSenior",
  "site-internet-pro": "siteInternetPro",
  "visibilite-google": "visibiliteGoogle",
  "animaux": "animaux",
  "assurance-animaux": "animaux",
  "assurance-emprunteur": "assuranceEmprunteur",
  "ambassadeur": "ambassadeur",
  "ambassadeur-gselect": "ambassadeur",
  "assurance-obseques": "assuranceObseques",
  "credit-immobilier": "creditImmobilier",
  "rachat-credits": "rachatCredits",
  "diagnostic-immobilier": "diagnosticImmobilier",
  "location-meublee": "locationMeublee",
  "habitation": "habitation",
  "assurance-habitation": "habitation",
  "travaux": "travaux",
  "mutuelle-senior": "mutuelleSenior",
  "mutuelle-professionnelle": "mutuelleProfessionnelle",
  "assurance-decennale": "assuranceDecennale",
  "expert-comptable": "expertComptable",
  "epargne-retraite": "epargneRetraite",
  "assurance-vie": "assuranceVie",
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

  const [selectedUniverse, setSelectedUniverse] =
    useState<AnalyseUniverse | null>(null);

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

  const availableEntriesWithCategory =
    availableCategoryEntries.filter(
      (
        entry
      ): entry is AnalyseCatalogEntry & {
        analyseCategory: AnalyseCategory;
        config: CategoryConfig;
      } =>
        Boolean(entry.analyseCategory && entry.config)
    );

  const selectedUniverseConfig = selectedUniverse
    ? universes[selectedUniverse]
    : null;

  const selectedUniverseEntries =
    selectedUniverseConfig
      ? availableEntriesWithCategory.filter((entry) =>
          selectedUniverseConfig.categories.includes(
            entry.analyseCategory
          )
        )
      : [];

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

      if (selectedCategory === "locationMeublee") {
  router.push("/missions/location-meublee");
  return;
}

      if (selectedCategory === "rachatCredits") {
        router.push("/missions/rachat-credits");
        return;
      }

      if (selectedCategory === "servicesEntreprises") {
        router.push("/missions/services-entreprises");
        return;
      }

      if (selectedCategory === "assuranceDecennale") {
        router.push("/missions/assurance-decennale");
        return;
      }

      if (selectedCategory === "expertComptable") {
        router.push("/missions/expert-comptable");
        return;
      }

      if (selectedCategory === "visibiliteGoogle") {
        router.push("/missions/visibilite-google");
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
              {selectedUniverseConfig
                ? selectedUniverseConfig.label
                : "Que veux-tu analyser ?"}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              {selectedUniverseConfig
                ? "Choisis maintenant la mission qui correspond à ton besoin."
                : "Choisis d’abord un univers. Pilo t’affichera uniquement les missions disponibles dans ce domaine."}
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

          {!selectedUniverseConfig ? (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {universeOrder.map((universeKey) => {
                const universe = universes[universeKey];

                const missionCount =
                  availableEntriesWithCategory.filter(
                    (entry) =>
                      universe.categories.includes(
                        entry.analyseCategory
                      )
                  ).length;

                return (
                  <button
                    key={universeKey}
                    type="button"
                    onClick={() =>
                      setSelectedUniverse(universeKey)
                    }
                    className="group w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-green-500/50 hover:bg-green-500/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-5xl">
                        {universe.icon}
                      </span>

                      <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-bold text-slate-400 transition group-hover:border-green-500/30 group-hover:text-green-300">
                        {missionCount} mission
                        {missionCount > 1 ? "s" : ""}
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-black text-white">
                      {universe.label}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {universe.description}
                    </p>

                    <p className="mt-5 text-sm font-bold text-green-400">
                      Voir les missions →
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUniverse(null);
                    setSelectedCategory(null);
                    setStep(0);
                    setValues({});
                    setErrorMessage("");
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-green-500/40 hover:text-green-400"
                >
                  ← Retour aux univers
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {selectedUniverseEntries.map(
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

              {selectedUniverseEntries.length === 0 && (
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="font-bold text-white">
                    Aucune mission disponible pour le moment.
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Les missions en attente de partenariat restent masquées jusqu’à leur activation.
                  </p>
                </div>
              )}
            </>
          )}
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