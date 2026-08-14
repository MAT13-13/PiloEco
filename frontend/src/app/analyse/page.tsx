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
        key: "contractStatus",
        type: "select",
        emoji: "📱",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un forfait mobile ou si tu recherches une nouvelle offre.",
        options: [
          "J’ai déjà un forfait mobile",
          "Je cherche un forfait mobile",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "📱",
        title: "Quel est ton opérateur mobile ?",
        description:
          "Indique le nom de ton opérateur actuel.",
        placeholder:
          "Ex : Free, Orange, SFR, Bouygues...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un forfait mobile",
        },
      },

      {
        key: "dataAmount",
        type: "number",
        emoji: "📶",
        title: "Combien de Go contient ton forfait ?",
        description:
          "Indique le volume de données mobiles inclus.",
        placeholder: "Ex : 150",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un forfait mobile",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un forfait mobile",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un forfait mobile",
        },
      },

      {
        key: "desiredData",
        type: "select",
        emoji: "📶",
        title:
          "De combien de données mobiles as-tu besoin ?",
        description:
          "Choisis la quantité qui correspond le mieux à ton utilisation.",
        options: [
          "Moins de 20 Go",
          "De 20 à 100 Go",
          "De 100 à 200 Go",
          "Plus de 200 Go",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un forfait mobile",
        },
      },

      {
        key: "offerType",
        type: "select",
        emoji: "📲",
        title: "Quel type de forfait recherches-tu ?",
        description:
          "Choisis le format de forfait qui correspond à ton besoin.",
        options: [
          "Forfait classique",
          "Forfait prépayé",
          "Forfait international",
          "eSIM",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un forfait mobile",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer au forfait ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 15",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un forfait mobile",
        },
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
      key: "deviceType",
      type: "select",
      emoji: "📱",
      title: "Que recherches-tu ?",
      description:
        "Choisis le type d'appareil souhaité.",
      options: [
        "Smartphone simplifié",
        "Téléphone mobile simple",
        "Téléphone fixe",
        "Forfait Doro Connect",
      ],
    },
    {
      key: "budget",
      type: "number",
      emoji: "💶",
      title: "Quel est ton budget ?",
      description:
        "Indique le budget maximum souhaité.",
      placeholder: "Ex : 150",
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
        key: "contractStatus",
        type: "select",
        emoji: "🌐",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà une box Internet ou si tu recherches une nouvelle offre.",
        options: [
          "J’ai déjà une box Internet",
          "Je cherche une box Internet",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🌐",
        title: "Quel est ton fournisseur Internet ?",
        description:
          "Indique le fournisseur de ta box actuelle.",
        placeholder:
          "Ex : Free, Orange, SFR, Bouygues...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une box Internet",
        },
      },

      {
        key: "connectionType",
        type: "select",
        emoji: "⚙️",
        title: "Quel type de connexion utilises-tu ?",
        description:
          "Choisis la technologie de ta connexion actuelle.",
        options: [
          "Fibre",
          "ADSL",
          "Box 4G ou 5G",
          "Satellite",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une box Internet",
        },
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu Internet chaque mois ?",
        description:
          "Indique le prix mensuel de ta box.",
        placeholder: "Ex : 39.99",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une box Internet",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une box Internet",
        },
      },

      {
        key: "desiredConnection",
        type: "select",
        emoji: "⚡",
        title: "Quel type de connexion recherches-tu ?",
        description:
          "Choisis la technologie souhaitée pour ton logement.",
        options: [
          "Fibre",
          "ADSL",
          "Box 4G ou 5G",
          "Satellite",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une box Internet",
        },
      },

      {
        key: "householdSize",
        type: "number",
        emoji: "👥",
        title: "Combien de personnes utiliseront la connexion ?",
        description:
          "Indique le nombre de personnes dans le foyer.",
        placeholder: "Ex : 3",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une box Internet",
        },
      },

      {
        key: "usageType",
        type: "select",
        emoji: "💻",
        title: "Quel sera ton usage principal d’Internet ?",
        description:
          "Choisis l’utilisation la plus importante pour ton foyer.",
        options: [
          "Navigation et réseaux sociaux",
          "Télétravail",
          "Streaming vidéo",
          "Jeux en ligne",
          "Plusieurs usages intensifs",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une box Internet",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer à Internet ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 30",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une box Internet",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "⚡",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un contrat d’électricité ou si tu recherches une nouvelle offre.",
        options: [
          "J’ai déjà un contrat d’électricité",
          "Je cherche un contrat d’électricité",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "⚡",
        title: "Quel est ton fournisseur d’électricité ?",
        description:
          "Indique le nom de ton fournisseur actuel.",
        placeholder:
          "Ex : EDF, TotalEnergies, Octopus...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un contrat d’électricité",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un contrat d’électricité",
        },
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Quelle est ta mensualité d’électricité ?",
        description:
          "Indique le montant mensuel en euros.",
        placeholder: "Ex : 120",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un contrat d’électricité",
        },
      },

      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel logement est concerné ?",
        description:
          "Choisis le type de logement à alimenter.",
        options: [
          "Appartement",
          "Maison",
          "Autre",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat d’électricité",
        },
      },

      {
        key: "surface",
        type: "number",
        emoji: "📐",
        title: "Quelle est la surface approximative du logement ?",
        description:
          "Indique la surface en mètres carrés.",
        placeholder: "Ex : 70",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat d’électricité",
        },
      },

      {
        key: "heatingType",
        type: "select",
        emoji: "🔥",
        title: "Quel est le mode de chauffage principal ?",
        description:
          "Cette information aide Pilo à estimer la consommation.",
        options: [
          "Électricité",
          "Gaz",
          "Bois ou granulés",
          "Pompe à chaleur",
          "Autre",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat d’électricité",
        },
      },

      {
        key: "occupants",
        type: "number",
        emoji: "👥",
        title: "Combien de personnes vivent dans le logement ?",
        description:
          "Indique le nombre d’occupants.",
        placeholder: "Ex : 2",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat d’électricité",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget approximatif.",
        placeholder: "Ex : 100",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat d’électricité",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "🏠",
        title: "Quelle est ta situation ?",
        description:
          "Indique si ton logement est déjà assuré ou si tu recherches une assurance habitation.",
        options: [
          "J’ai déjà une assurance habitation",
          "Je cherche une assurance habitation",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🏠",
        title: "Quel est ton assureur habitation ?",
        description:
          "Indique la compagnie qui assure actuellement ton logement.",
        placeholder:
          "Ex : MAIF, AXA, Acheel, Allianz...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance habitation",
        },
      },

      {
        key: "housingType",
        type: "select",
        emoji: "🔑",
        title: "Quel logement est concerné ?",
        description:
          "Choisis le type de logement à assurer.",
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance habitation",
        },
      },

      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance habitation",
        },
      },

      {
        key: "occupancyStatus",
        type: "select",
        emoji: "🔑",
        title: "Quelle est ta situation dans le logement ?",
        description:
          "Choisis ton statut d’occupation.",
        options: [
          "Locataire",
          "Propriétaire occupant",
          "Propriétaire non occupant",
          "Hébergé",
          "Autre",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance habitation",
        },
      },

      {
        key: "surface",
        type: "number",
        emoji: "📐",
        title:
          "Quelle est la surface approximative du logement ?",
        description:
          "Indique la surface en mètres carrés.",
        placeholder: "Ex : 65",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance habitation",
        },
      },

      {
        key: "rooms",
        type: "number",
        emoji: "🚪",
        title:
          "Combien de pièces principales possède le logement ?",
        description:
          "Indique le nombre de pièces principales.",
        placeholder: "Ex : 3",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance habitation",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer à l’assurance ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 25",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance habitation",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "🚗",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà une assurance auto ou si tu recherches un nouveau contrat.",
        options: [
          "J’ai déjà une assurance auto",
          "Je cherche une assurance auto",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🚗",
        title: "Quel est ton assureur auto ?",
        description:
          "Indique le nom de ta compagnie actuelle.",
        placeholder:
          "Ex : MAIF, AXA, Allianz, Direct Assurance...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance auto",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance auto",
        },
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu ton assurance auto ?",
        description:
          "Indique le prix mensuel en euros.",
        placeholder: "Ex : 68",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance auto",
        },
      },

      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance auto",
        },
      },

      {
        key: "vehicleType",
        type: "select",
        emoji: "🚘",
        title: "Quel type de véhicule souhaites-tu assurer ?",
        description:
          "Choisis le type de véhicule concerné.",
        options: [
          "Citadine",
          "Berline",
          "SUV",
          "Utilitaire",
          "Voiture électrique ou hybride",
          "Autre",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance auto",
        },
      },

      {
        key: "desiredFormula",
        type: "select",
        emoji: "🛡️",
        title: "Quelle couverture souhaites-tu ?",
        description:
          "Choisis le niveau de protection recherché.",
        options: [
          "Au tiers",
          "Tiers étendu",
          "Tous risques",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance auto",
        },
      },

      {
        key: "vehicleValue",
        type: "number",
        emoji: "💶",
        title:
          "Quelle est la valeur approximative du véhicule ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 12000",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance auto",
        },
      },

      {
        key: "driverProfile",
        type: "select",
        emoji: "👤",
        title: "Quel est ton profil de conducteur ?",
        description:
          "Choisis la situation qui te correspond le mieux.",
        options: [
          "Conducteur expérimenté",
          "Jeune conducteur",
          "Conducteur secondaire",
          "Plusieurs conducteurs",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance auto",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "🎯",
        title:
          "Quel budget mensuel souhaites-tu consacrer à l’assurance ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 60",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une assurance auto",
        },
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
        key: "vehicleType",
        type: "select",
        emoji: "🚲",
        title: "Quel véhicule souhaites-tu assurer ?",
        description:
          "Choisis le type de mobilité concerné.",
        options: [
          "Vélo",
          "Trottinette électrique et nouvelles mobilités",
        ],
      },
      {
        key: "budget",
        type: "select",
        emoji: "💶",
        title: "Quel budget mensuel souhaites-tu consacrer à l’assurance ?",
        description:
          "Choisis la fourchette correspondant à ton budget.",
        options: [
          "Moins de 10 €",
          "De 10 € à 20 €",
          "Plus de 20 €",
        ],
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
        key: "contractStatus",
        type: "select",
        emoji: "🏍️",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà une assurance moto ou si tu recherches ton premier contrat.",
        options: [
          "J’ai déjà une assurance moto",
          "Je cherche une première assurance moto",
        ],
      },
      {
        key: "provider",
        type: "text",
        emoji: "🏍️",
        title: "Quel est ton assureur moto ?",
        description:
          "Indique le nom de ta compagnie actuelle.",
        placeholder:
          "Ex : AMV, April Moto, AXA, Allianz...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance moto",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance moto",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance moto",
        },
      },
      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une assurance moto",
        },
      },
      {
        key: "engineSize",
        type: "select",
        emoji: "🏍️",
        title: "Quelle est la cylindrée de ta moto ?",
        description:
          "Choisis la tranche correspondant à ton véhicule.",
        options: [
          "Moins de 125 cm³",
          "125 cm³",
          "De 126 à 600 cm³",
          "Plus de 600 cm³",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une première assurance moto",
        },
      },
      {
        key: "desiredFormula",
        type: "select",
        emoji: "🛡️",
        title: "Quelle couverture souhaites-tu ?",
        description:
          "Choisis le niveau de protection recherché.",
        options: [
          "Au tiers",
          "Tiers étendu",
          "Tous risques",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une première assurance moto",
        },
      },
      {
        key: "vehicleValue",
        type: "number",
        emoji: "💶",
        title: "Quelle est la valeur approximative de la moto ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 6500",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une première assurance moto",
        },
      },
      {
        key: "budget",
        type: "number",
        emoji: "🎯",
        title: "Quel budget mensuel souhaites-tu consacrer à l’assurance ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 50",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une première assurance moto",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "❤️",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà une mutuelle ou si tu recherches une nouvelle couverture.",
        options: [
          "J’ai déjà une mutuelle",
          "Je cherche une mutuelle",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "❤️",
        title: "Quelle est ta mutuelle actuelle ?",
        description:
          "Indique le nom de ton organisme de complémentaire santé.",
        placeholder:
          "Ex : Harmonie Mutuelle, Alan, Aésio...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une mutuelle",
        },
      },

      {
        key: "coverageType",
        type: "select",
        emoji: "👥",
        title: "Qui est couvert par le contrat ?",
        description:
          "Choisis les personnes couvertes ou à couvrir.",
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
        title: "Combien paies-tu ta mutuelle chaque mois ?",
        description:
          "Indique le prix mensuel total en euros.",
        placeholder: "Ex : 65",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une mutuelle",
        },
      },

      {
        key: "endDate",
        type: "date",
        emoji: "📅",
        title:
          "Quelle est la prochaine échéance du contrat ?",
        description:
          "Cette information reste facultative.",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une mutuelle",
        },
      },

      {
        key: "priorityNeed",
        type: "select",
        emoji: "🩺",
        title: "Quel est ton besoin de santé prioritaire ?",
        description:
          "Choisis le poste de remboursement le plus important pour toi.",
        options: [
          "Soins courants",
          "Dentaire",
          "Optique",
          "Hospitalisation",
          "Médecines douces",
          "Couverture équilibrée",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une mutuelle",
        },
      },

      {
        key: "coverageLevel",
        type: "select",
        emoji: "🛡️",
        title: "Quel niveau de couverture recherches-tu ?",
        description:
          "Choisis le niveau de protection souhaité.",
        options: [
          "Essentiel",
          "Intermédiaire",
          "Renforcé",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une mutuelle",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer à la mutuelle ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 60",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une mutuelle",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "🐾",
        title: "Quelle est ta situation ?",
        description:
          "Indique si ton animal est déjà assuré ou si tu recherches une assurance.",
        options: [
          "Mon animal est déjà assuré",
          "Je cherche une assurance pour mon animal",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🐶",
        title: "Quel est ton assureur ?",
        description:
          "Indique le nom de ton assurance actuelle.",
        placeholder:
          "Ex : SantéVet, Kozoo, Bulle Bleue...",
        showIf: {
          key: "contractStatus",
          equals: "Mon animal est déjà assuré",
        },
      },

      {
        key: "animalType",
        type: "select",
        emoji: "🐾",
        title: "Quel animal est concerné ?",
        description:
          "Choisis l'animal à assurer.",
        options: [
          "Chien",
          "Chat",
          "Autre",
        ],
      },

      {
        key: "breed",
        type: "text",
        emoji: "🦴",
        title: "Quelle est sa race ?",
        description:
          "Indique la race de ton animal.",
        placeholder:
          "Ex : Staffordshire Bull Terrier",
      },

      {
        key: "age",
        type: "number",
        emoji: "🎂",
        title: "Quel âge a ton animal ?",
        description:
          "Indique son âge en années.",
        placeholder: "Ex : 3",
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Indique le prix mensuel de ton assurance.",
        placeholder: "Ex : 35",
        showIf: {
          key: "contractStatus",
          equals: "Mon animal est déjà assuré",
        },
      },

      {
        key: "desiredCoverage",
        type: "select",
        emoji: "🛡️",
        title: "Quelle couverture recherches-tu ?",
        description:
          "Choisis le niveau de protection souhaité.",
        options: [
          "Accidents uniquement",
          "Accidents + maladies",
          "Protection maximale",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals:
            "Je cherche une assurance pour mon animal",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer à l'assurance ?",
        description:
          "Indique ton budget maximum.",
        placeholder: "Ex : 30",
        showIf: {
          key: "contractStatus",
          equals:
            "Je cherche une assurance pour mon animal",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "🏦",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un compte bancaire ou si tu recherches une nouvelle banque.",
        options: [
          "J’ai déjà un compte bancaire",
          "Je cherche une banque",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🏦",
        title: "Quelle est ta banque actuelle ?",
        description:
          "Indique le nom de ta banque principale.",
        placeholder:
          "Ex : Crédit Agricole, BNP Paribas, BoursoBank...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un compte bancaire",
        },
      },

      {
        key: "accountType",
        type: "select",
        emoji: "💳",
        title: "Quel type de compte possèdes-tu ?",
        description:
          "Choisis le compte que tu souhaites analyser.",
        options: [
          "Compte courant",
          "Compte joint",
          "Compte professionnel",
        ],
      },

      {
        key: "cardType",
        type: "select",
        emoji: "💳",
        title: "Quel type de carte bancaire possèdes-tu ?",
        description:
          "Choisis ta carte actuelle.",
        options: [
          "Visa Classic",
          "Visa Premier",
          "Mastercard",
          "Gold Mastercard",
          "Autre",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un compte bancaire",
        },
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien te coûtent tes frais bancaires par mois ?",
        description:
          "Additionne les principaux frais récurrents.",
        placeholder: "Ex : 12",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un compte bancaire",
        },
      },

      {
        key: "bankType",
        type: "select",
        emoji: "🏦",
        title: "Quel type de banque recherches-tu ?",
        description:
          "Choisis le type d'établissement souhaité.",
        options: [
          "Banque en ligne",
          "Banque traditionnelle",
          "Les deux me conviennent",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une banque",
        },
      },

      {
        key: "mainNeed",
        type: "select",
        emoji: "⭐",
        title: "Quel est ton besoin principal ?",
        description:
          "Choisis ce qui est le plus important pour toi.",
        options: [
          "Carte gratuite",
          "Compte joint",
          "Voyages à l'étranger",
          "Épargne",
          "Investissement",
          "Compte professionnel",
          "Cashback",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une banque",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget mensuel acceptes-tu pour les frais bancaires ?",
        description:
          "Indique 0 € si tu recherches une banque gratuite.",
        placeholder: "Ex : 0",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une banque",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "📺",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un abonnement ou si tu recherches un nouveau service.",
        options: [
          "J’ai déjà un abonnement",
          "Je cherche un abonnement",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "📺",
        title: "Quel abonnement veux-tu analyser ?",
        description:
          "Indique le service principal concerné.",
        placeholder:
          "Ex : Netflix, Disney+, Canal+, Spotify...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un abonnement",
        },
      },

      {
        key: "offer",
        type: "text",
        emoji: "🎬",
        title: "Quelle formule utilises-tu ?",
        description:
          "Indique le nom de ton abonnement actuel.",
        placeholder:
          "Ex : Premium, Standard, Famille...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un abonnement",
        },
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Indique le prix mensuel de l’abonnement.",
        placeholder: "Ex : 19.99",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà un abonnement",
        },
      },

      {
        key: "contentType",
        type: "select",
        emoji: "🎬",
        title: "Quel type de contenu recherches-tu ?",
        description:
          "Choisis le contenu principal qui t’intéresse.",
        options: [
          "Films et séries",
          "Sport",
          "Musique",
          "Documentaires",
          "Contenus pour enfants",
          "Plusieurs types de contenus",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un abonnement",
        },
      },

      {
        key: "users",
        type: "number",
        emoji: "👥",
        title:
          "Combien de personnes utiliseront l’abonnement ?",
        description:
          "Indique le nombre d’utilisateurs prévus.",
        placeholder: "Ex : 2",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un abonnement",
        },
      },

      {
        key: "advertisingPreference",
        type: "select",
        emoji: "📢",
        title: "Acceptes-tu une formule avec publicité ?",
        description:
          "Les offres avec publicité sont souvent moins chères.",
        options: [
          "Oui",
          "Non",
          "Peu importe",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un abonnement",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer au streaming ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 15",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un abonnement",
        },
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
        key: "contractStatus",
        type: "select",
        emoji: "🔐",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu utilises déjà une solution de sécurité ou si tu recherches un nouvel équipement.",
        options: [
          "J’ai déjà une solution de sécurité",
          "Je cherche une solution de sécurité",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "🔐",
        title: "Quel prestataire de sécurité utilises-tu ?",
        description:
          "Indique le nom de la société ou de la marque.",
        placeholder:
          "Ex : Verisure, Sector Alarm, Homiris...",
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une solution de sécurité",
        },
      },

      {
        key: "serviceType",
        type: "select",
        emoji: "📹",
        title: "Quel service est concerné ?",
        description:
          "Choisis le type de protection.",
        options: [
          "Télésurveillance",
          "Alarme connectée",
          "Caméras",
          "Détecteurs",
          "Sonnette connectée",
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une solution de sécurité",
        },
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
        showIf: {
          key: "contractStatus",
          equals: "J’ai déjà une solution de sécurité",
        },
      },

      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel logement souhaites-tu protéger ?",
        description:
          "Choisis le type de logement concerné.",
        options: [
          "Appartement",
          "Maison",
          "Local professionnel",
          "Autre",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une solution de sécurité",
        },
      },

      {
        key: "subscriptionPreference",
        type: "select",
        emoji: "📦",
        title: "Souhaites-tu une solution avec abonnement ?",
        description:
          "Choisis le modèle qui te convient le mieux.",
        options: [
          "Avec abonnement",
          "Sans abonnement",
          "Je ne sais pas",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une solution de sécurité",
        },
      },

      {
        key: "priorityNeed",
        type: "select",
        emoji: "🛡️",
        title: "Quel est ton besoin principal ?",
        description:
          "Choisis la protection la plus importante pour toi.",
        options: [
          "Protéger les accès",
          "Surveiller à distance",
          "Être alerté en cas d’intrusion",
          "Protéger une personne âgée",
          "Sécuriser un local professionnel",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une solution de sécurité",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget approximatif.",
        placeholder: "Ex : 25",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche une solution de sécurité",
        },
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

    // ENTRETIEN / RÉPARATION
    {
      key: "provider",
      type: "text",
      emoji: "🔧",
      title: "Quel garage ou réparateur utilises-tu actuellement ?",
      description:
        "Indique le garage ou l’enseigne qui entretient ou répare ton véhicule.",
      placeholder:
        "Ex : AD, Norauto, Feu Vert, garage indépendant...",
      showIf: {
        key: "serviceType",
        equals: "Entretien ou réparation",
      },
    },

    // PNEUS
    {
      key: "provider",
      type: "text",
      emoji: "🛞",
      title: "Où achètes-tu ou fais-tu monter tes pneus ?",
      description:
        "Indique l’enseigne ou le professionnel que tu utilises actuellement.",
      placeholder:
        "Ex : Allopneus, Norauto, Feu Vert...",
      showIf: {
        key: "serviceType",
        equals: "Pneus",
      },
    },

    // CONTRÔLE TECHNIQUE
    {
      key: "provider",
      type: "text",
      emoji: "🔍",
      title: "Quel centre de contrôle technique utilises-tu ?",
      description:
        "Indique l’enseigne ou le centre où tu réalises ton contrôle technique.",
      placeholder:
        "Ex : Dekra, Sécuritest, Autosur...",
      showIf: {
        key: "serviceType",
        equals: "Contrôle technique",
      },
    },

    // LAVAGE
    {
      key: "provider",
      type: "text",
      emoji: "🧽",
      title: "Quel service de lavage utilises-tu ?",
      description:
        "Indique la station, l’enseigne ou le service de lavage concerné.",
      placeholder:
        "Ex : Éléphant Bleu, Total Wash, station locale...",
      showIf: {
        key: "serviceType",
        equals: "Lavage",
      },
    },

    // PARKING
    {
      key: "provider",
      type: "text",
      emoji: "🅿️",
      title: "Quel parking ou service de stationnement utilises-tu ?",
      description:
        "Indique le parking, l’application ou le service de stationnement concerné.",
      placeholder:
        "Ex : Indigo, Q-Park, Zenpark, Yespark...",
      showIf: {
        key: "serviceType",
        equals: "Parking",
      },
    },

    // LOCATION DE VÉHICULE
    {
      key: "provider",
      type: "text",
      emoji: "🚙",
      title: "Quelle agence ou plateforme de location utilises-tu ?",
      description:
        "Indique l’agence ou la plateforme utilisée pour louer un véhicule.",
      placeholder:
        "Ex : Europcar, Sixt, Hertz, Getaround...",
      showIf: {
        key: "serviceType",
        equals: "Location de véhicule",
      },
    },

    // AUTRE
    {
      key: "provider",
      type: "text",
      emoji: "🏪",
      title: "Quel prestataire utilises-tu ?",
      description:
        "Indique l’enseigne ou le service automobile concerné.",
      placeholder:
        "Ex : nom de l’enseigne ou du prestataire...",
      showIf: {
        key: "serviceType",
        equals: "Autre",
      },
    },

    // PRIX ANNUEL
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
      "Je vais analyser ton abonnement actuel ou t’aider à choisir un nouveau logiciel.",
    questions: [
      {
        key: "contractStatus",
        type: "select",
        emoji: "💻",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu utilises déjà un logiciel ou si tu recherches une nouvelle solution.",
        options: [
          "J’utilise déjà un logiciel",
          "Je cherche un logiciel",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "💻",
        title: "Quel logiciel souhaites-tu analyser ?",
        description:
          "Indique le nom du logiciel ou du service actuel.",
        placeholder:
          "Ex : Microsoft 365, Dropbox, NordVPN...",
        showIf: {
          key: "contractStatus",
          equals: "J’utilise déjà un logiciel",
        },
      },

      {
        key: "softwareType",
        type: "select",
        emoji: "🧩",
        title: "Quel type de logiciel est concerné ?",
        description:
          "Choisis la catégorie du logiciel.",
        options: [
          "VPN",
          "Antivirus",
          "Stockage Cloud",
          "Suite bureautique",
          "Création graphique",
          "Gestion d'entreprise",
          "Autre",
        ],
      },

      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Convertis le tarif annuel en mensualité si besoin.",
        placeholder: "Ex : 9.99",
        showIf: {
          key: "contractStatus",
          equals: "J’utilise déjà un logiciel",
        },
      },

      {
        key: "usageType",
        type: "select",
        emoji: "👤",
        title: "Quel sera ton usage ?",
        description:
          "Choisis l'utilisation principale.",
        options: [
          "Personnel",
          "Professionnel",
          "Famille",
          "Entreprise",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un logiciel",
        },
      },

      {
        key: "priority",
        type: "select",
        emoji: "⭐",
        title: "Quel est ton critère principal ?",
        description:
          "Choisis ce qui est le plus important.",
        options: [
          "Le prix",
          "La simplicité",
          "Les fonctionnalités",
          "La sécurité",
          "Le support",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un logiciel",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel souhaites-tu consacrer au logiciel ?",
        description:
          "Indique ton budget maximum.",
        placeholder: "Ex : 10",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un logiciel",
        },
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

  beauteArtisanat: {
    label: "Beauté & Artisanat",
    icon: "🌸",
    message:
      "Je vais préciser le type de création ou de prestation artisanale qui correspond à ton besoin.",
    questions: [
      {
        key: "creationType",
        type: "select",
        emoji: "🌸",
        title: "Que recherches-tu ?",
        description:
          "Choisis le type de création ou de prestation qui t'intéresse.",
        options: [
          "Press-on nails personnalisés",
          "Bougie artisanale",
          "Savon artisanal",
          "Macramé",
          "Cadre ou décoration florale",
          "Coffret cadeau personnalisé",
          "Autre création artisanale",
        ],
      },
      {
        key: "occasion",
        type: "select",
        emoji: "🎁",
        title: "Pour quelle occasion ?",
        description:
          "Cela aide Pilo à mieux orienter la création.",
        options: [
          "Pour moi",
          "Anniversaire",
          "Naissance",
          "Mariage",
          "Fête",
          "Cadeau",
          "Autre",
        ],
      },
      {
        key: "personalization",
        type: "select",
        emoji: "✨",
        title: "Souhaites-tu une création personnalisée ?",
        description:
          "Choisis le niveau de personnalisation souhaité.",
        options: [
          "Oui, entièrement personnalisée",
          "Quelques personnalisations",
          "Non, un modèle existant me convient",
          "Je ne sais pas",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description:
          "Indique ton budget maximum approximatif en euros.",
        placeholder: "Ex : 45",
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
        key: "siteStatus",
        type: "select",
        emoji: "🌐",
        title: "As-tu déjà un site internet professionnel ?",
        description:
          "Indique si tu pars de zéro ou si tu souhaites améliorer un site existant.",
        options: [
          "Je n'ai pas encore de site",
          "J'ai déjà un site à améliorer",
          "Je souhaite refaire complètement mon site",
        ],
      },
      {
        key: "businessType",
        type: "text",
        emoji: "🏢",
        title: "Quelle est ton activité ?",
        description:
          "Décris brièvement ton activité professionnelle.",
        placeholder: "Ex : artisan, coach, commerce, consultant...",
      },
      {
        key: "siteGoal",
        type: "select",
        emoji: "🎯",
        title: "Quel est l'objectif principal du site ?",
        description:
          "Choisis la fonction la plus importante.",
        options: [
          "Présenter mon activité",
          "Recevoir des demandes de contact",
          "Prendre des rendez-vous",
          "Vendre en ligne",
          "Présenter un portfolio",
          "Plusieurs objectifs",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu consacrer au projet ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 800",
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
        key: "loanStatus",
        type: "select",
        emoji: "🏦",
        title: "Quelle est ta situation ?",
        description:
          "Indique si ton prêt existe déjà ou si ton financement est en préparation.",
        options: [
          "J'ai déjà un prêt immobilier",
          "Mon prêt est en cours de mise en place",
          "Je prépare un projet immobilier",
        ],
      },
      {
        key: "remainingCapital",
        type: "number",
        emoji: "💶",
        title: "Quel capital reste environ à rembourser ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 180000",
        showIf: {
          key: "loanStatus",
          equals: "J'ai déjà un prêt immobilier",
        },
      },
      {
        key: "loanAmount",
        type: "number",
        emoji: "🏠",
        title: "Quel montant souhaites-tu emprunter ?",
        description:
          "Indique le montant approximatif du financement.",
        placeholder: "Ex : 220000",
        showIf: {
          key: "loanStatus",
          equals: "Mon prêt est en cours de mise en place",
        },
      },
      {
        key: "currentMonthlyInsurance",
        type: "number",
        emoji: "🛡️",
        title: "Combien coûte ton assurance emprunteur par mois ?",
        description:
          "Indique le montant mensuel approximatif si tu le connais.",
        placeholder: "Ex : 42",
        showIf: {
          key: "loanStatus",
          equals: "J'ai déjà un prêt immobilier",
        },
      },
      {
        key: "borrowersCount",
        type: "select",
        emoji: "👥",
        title: "Combien d'emprunteurs sont concernés ?",
        description:
          "Choisis la situation correspondant au prêt.",
        options: [
          "1 emprunteur",
          "2 emprunteurs",
          "Plus de 2 emprunteurs",
        ],
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
        key: "employmentStatus",
        type: "select",
        emoji: "💼",
        title: "Quelle est ta situation actuelle ?",
        description:
          "Choisis ta situation principale.",
        options: [
          "Salarié",
          "Indépendant",
          "Demandeur d'emploi",
          "Étudiant",
          "Retraité",
          "Autre",
        ],
      },
      {
        key: "availability",
        type: "select",
        emoji: "🕐",
        title: "Combien de temps pourrais-tu y consacrer ?",
        description:
          "Choisis une disponibilité approximative.",
        options: [
          "Moins de 5 h par semaine",
          "5 à 10 h par semaine",
          "10 à 20 h par semaine",
          "Plus de 20 h par semaine",
        ],
      },
      {
        key: "contactComfort",
        type: "select",
        emoji: "🤝",
        title: "Es-tu à l'aise pour parler d'une offre autour de toi ?",
        description:
          "Cela permet de vérifier si le modèle d'ambassadeur te convient.",
        options: [
          "Oui",
          "Plutôt oui",
          "Plutôt non",
          "Non",
        ],
      },
      {
        key: "goal",
        type: "select",
        emoji: "🎯",
        title: "Quel est ton objectif principal ?",
        description:
          "Choisis ce que tu recherches avec cette activité.",
        options: [
          "Complément de revenus",
          "Nouvelle activité",
          "Activité flexible",
          "Découvrir le métier",
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
        key: "contractStatus",
        type: "select",
        emoji: "🕊️",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un contrat ou si tu recherches une couverture.",
        options: [
          "J'ai déjà un contrat obsèques",
          "Je cherche un contrat obsèques",
        ],
      },
      {
        key: "provider",
        type: "text",
        emoji: "🏢",
        title: "Quel organisme gère ton contrat actuel ?",
        description:
          "Indique le nom de l'assureur si tu le connais.",
        placeholder: "Ex : assureur ou organisme...",
        showIf: {
          key: "contractStatus",
          equals: "J'ai déjà un contrat obsèques",
        },
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu chaque mois ?",
        description:
          "Indique le montant mensuel approximatif.",
        placeholder: "Ex : 35",
        showIf: {
          key: "contractStatus",
          equals: "J'ai déjà un contrat obsèques",
        },
      },
      {
        key: "desiredCapital",
        type: "number",
        emoji: "🛡️",
        title: "Quel capital souhaites-tu prévoir ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 5000",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat obsèques",
        },
      },
      {
        key: "budget",
        type: "number",
        emoji: "🎯",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget approximatif.",
        placeholder: "Ex : 30",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat obsèques",
        },
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
        key: "projectType",
        type: "select",
        emoji: "🏠",
        title: "Quel est ton projet immobilier ?",
        description:
          "Choisis le type de projet concerné.",
        options: [
          "Résidence principale",
          "Résidence secondaire",
          "Investissement locatif",
          "Rachat de crédit immobilier",
          "Autre projet",
        ],
      },
      {
        key: "projectAmount",
        type: "number",
        emoji: "💶",
        title: "Quel est le montant approximatif du projet ?",
        description:
          "Indique le prix ou le budget global estimé.",
        placeholder: "Ex : 250000",
      },
      {
        key: "downPayment",
        type: "number",
        emoji: "💰",
        title: "Quel apport personnel prévois-tu ?",
        description:
          "Indique le montant approximatif de ton apport.",
        placeholder: "Ex : 25000",
      },
      {
        key: "monthlyIncome",
        type: "number",
        emoji: "📊",
        title: "Quel est le revenu mensuel net approximatif du foyer ?",
        description:
          "Indique une estimation globale.",
        placeholder: "Ex : 4200",
      },
      {
        key: "desiredDuration",
        type: "select",
        emoji: "📅",
        title: "Quelle durée de financement envisages-tu ?",
        description:
          "Choisis la durée qui correspond le mieux à ton projet.",
        options: [
          "10 ans",
          "15 ans",
          "20 ans",
          "25 ans",
          "Je souhaite être conseillé",
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
        title: "Pourquoi as-tu besoin d'un diagnostic ?",
        description:
          "Choisis la situation correspondant au bien.",
        options: [
          "Vente",
          "Location",
          "Travaux",
          "Mise en copropriété",
          "Autre",
        ],
      },
      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel type de bien est concerné ?",
        description:
          "Choisis le type de logement ou de local.",
        options: [
          "Appartement",
          "Maison",
          "Local professionnel",
          "Autre",
        ],
      },
      {
        key: "surface",
        type: "number",
        emoji: "📐",
        title: "Quelle est la surface approximative ?",
        description:
          "Indique la surface en mètres carrés.",
        placeholder: "Ex : 75",
      },
      {
        key: "postalCode",
        type: "text",
        emoji: "📍",
        title: "Dans quel secteur se trouve le bien ?",
        description:
          "Indique le code postal du bien.",
        placeholder: "Ex : 06000",
      },
      {
        key: "deadline",
        type: "date",
        emoji: "📅",
        title: "Pour quelle date souhaites-tu le diagnostic ?",
        description:
          "Cette information reste facultative.",
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
        key: "ageRange",
        type: "select",
        emoji: "👵",
        title: "Quelle est ta tranche d'âge ?",
        description:
          "Choisis la tranche correspondant à la personne principale à couvrir.",
        options: [
          "55 à 64 ans",
          "65 à 74 ans",
          "75 à 84 ans",
          "85 ans et plus",
        ],
      },
      {
        key: "contractStatus",
        type: "select",
        emoji: "❤️",
        title: "As-tu déjà une mutuelle ?",
        description:
          "Indique si tu souhaites comparer un contrat existant ou en trouver un nouveau.",
        options: [
          "J'ai déjà une mutuelle",
          "Je cherche une mutuelle",
        ],
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Combien paies-tu actuellement par mois ?",
        description:
          "Indique le montant mensuel total.",
        placeholder: "Ex : 95",
        showIf: {
          key: "contractStatus",
          equals: "J'ai déjà une mutuelle",
        },
      },
      {
        key: "priorityNeed",
        type: "select",
        emoji: "🩺",
        title: "Quelle garantie est prioritaire pour toi ?",
        description:
          "Choisis le poste le plus important.",
        options: [
          "Hospitalisation",
          "Dentaire",
          "Optique",
          "Appareillage auditif",
          "Soins courants",
          "Couverture équilibrée",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "🎯",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget maximum approximatif.",
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
        key: "savingGoal",
        type: "select",
        emoji: "🎯",
        title: "Quel est ton objectif principal ?",
        description:
          "Choisis le projet pour lequel tu souhaites épargner.",
        options: [
          "Préparer ma retraite",
          "Constituer une épargne de précaution",
          "Financer un projet",
          "Faire fructifier une épargne",
          "Préparer une transmission",
          "Je souhaite être conseillé",
        ],
      },
      {
        key: "investmentHorizon",
        type: "select",
        emoji: "📅",
        title: "Quel est ton horizon de placement ?",
        description:
          "Choisis la durée pendant laquelle tu peux envisager de laisser l'argent placé.",
        options: [
          "Moins de 3 ans",
          "3 à 5 ans",
          "5 à 10 ans",
          "Plus de 10 ans",
          "Je ne sais pas",
        ],
      },
      {
        key: "initialAmount",
        type: "number",
        emoji: "💶",
        title: "Quel montant souhaites-tu placer au départ ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 5000",
      },
      {
        key: "monthlySaving",
        type: "number",
        emoji: "💰",
        title: "Combien pourrais-tu épargner chaque mois ?",
        description:
          "Indique une estimation mensuelle.",
        placeholder: "Ex : 150",
      },
      {
        key: "riskPreference",
        type: "select",
        emoji: "📊",
        title: "Quelle variation de ton épargne serais-tu prêt à accepter ?",
        description:
          "Cette réponse sert uniquement à mieux comprendre ton profil.",
        options: [
          "Je privilégie la stabilité",
          "J'accepte des variations modérées",
          "J'accepte des variations importantes",
          "Je ne sais pas",
        ],
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
        key: "needType",
        type: "select",
        emoji: "🏍️",
        title: "Que recherches-tu ?",
        description:
          "Choisis la catégorie d'équipement concernée.",
        options: [
          "Casque",
          "Équipement du motard",
          "Accessoires moto",
          "Bagagerie",
          "High-tech",
          "Tout-terrain / cross / enduro",
          "Pneus",
          "Pièces ou entretien",
          "Autre",
        ],
      },
      {
        key: "bikeType",
        type: "select",
        emoji: "🏍️",
        title: "Quel type de moto possèdes-tu ?",
        description:
          "Choisis la catégorie la plus proche.",
        options: [
          "Roadster",
          "Sportive",
          "Trail",
          "Custom",
          "Scooter",
          "Tout-terrain",
          "Autre",
        ],
      },
      {
        key: "priority",
        type: "select",
        emoji: "⭐",
        title: "Quel est ton critère principal ?",
        description:
          "Choisis ce qui compte le plus pour toi.",
        options: [
          "Prix",
          "Sécurité",
          "Confort",
          "Style",
          "Performance",
          "Je souhaite être conseillé",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description:
          "Indique ton budget maximum approximatif.",
        placeholder: "Ex : 180",
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
        key: "experience",
        type: "select",
        emoji: "₿",
        title: "Quel est ton niveau d'expérience ?",
        description:
          "Choisis la situation qui te correspond.",
        options: [
          "Je débute complètement",
          "J'ai déjà acheté des cryptomonnaies",
          "J'utilise régulièrement une plateforme",
          "Utilisateur expérimenté",
        ],
      },
      {
        key: "mainNeed",
        type: "select",
        emoji: "🎯",
        title: "Que souhaites-tu principalement faire ?",
        description:
          "Choisis ton besoin principal.",
        options: [
          "Découvrir le fonctionnement",
          "Acheter ou vendre",
          "Conserver mes actifs",
          "Suivre mon portefeuille",
          "Comparer des plateformes",
        ],
      },
      {
        key: "securityPriority",
        type: "select",
        emoji: "🔐",
        title: "Quel niveau d'accompagnement recherches-tu ?",
        description:
          "Choisis ce qui te rassure le plus.",
        options: [
          "Interface très simple",
          "Sécurité renforcée",
          "Frais réduits",
          "Large choix d'actifs",
          "Je souhaite être guidé",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel montant envisages-tu de consacrer à ce projet ?",
        description:
          "Indique uniquement un ordre de grandeur en euros.",
        placeholder: "Ex : 500",
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
        key: "protectionType",
        type: "select",
        emoji: "🛡️",
        title: "Quel est ton besoin principal ?",
        description:
          "Choisis le type de protection recherché.",
        options: [
          "VPN",
          "Antivirus",
          "Protection de la vie privée",
          "Gestionnaire de mots de passe",
          "Protection de plusieurs appareils",
          "Je souhaite être conseillé",
        ],
      },
      {
        key: "devicesCount",
        type: "number",
        emoji: "💻",
        title: "Combien d'appareils souhaites-tu protéger ?",
        description:
          "Compte les ordinateurs, téléphones et tablettes concernés.",
        placeholder: "Ex : 4",
      },
      {
        key: "usage",
        type: "select",
        emoji: "🌐",
        title: "Quel est ton usage principal ?",
        description:
          "Choisis l'utilisation la plus importante.",
        options: [
          "Navigation quotidienne",
          "Télétravail",
          "Voyages",
          "Streaming",
          "Wi-Fi public",
          "Usage professionnel",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget approximatif.",
        placeholder: "Ex : 6",
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
        title: "Quel service recherches-tu ?",
        description:
          "Choisis le besoin principal de ton activité.",
        options: [
          "Création ou gestion d'entreprise",
          "Comptabilité",
          "Communication / marketing",
          "Téléphonie ou outils numériques",
          "Financement",
          "Assurance professionnelle",
          "Autre",
        ],
      },
      {
        key: "companyStatus",
        type: "select",
        emoji: "💼",
        title: "Quelle est la situation de ton entreprise ?",
        description:
          "Choisis la situation actuelle.",
        options: [
          "Projet de création",
          "Micro-entreprise",
          "Société",
          "Association",
          "Autre structure",
        ],
      },
      {
        key: "companySize",
        type: "select",
        emoji: "👥",
        title: "Quelle est la taille de la structure ?",
        description:
          "Choisis l'effectif approximatif.",
        options: [
          "1 personne",
          "2 à 5 personnes",
          "6 à 20 personnes",
          "Plus de 20 personnes",
        ],
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description:
          "Indique un budget approximatif en euros.",
        placeholder: "Ex : 300",
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
        key: "propertyType",
        type: "select",
        emoji: "🏠",
        title: "Quel lieu faut-il débarrasser ?",
        description:
          "Choisis le type de lieu concerné.",
        options: [
          "Appartement",
          "Maison",
          "Cave",
          "Garage",
          "Local professionnel",
          "Autre",
        ],
      },
      {
        key: "volume",
        type: "select",
        emoji: "📦",
        title: "Quel volume faut-il environ débarrasser ?",
        description:
          "Choisis l'estimation la plus proche.",
        options: [
          "Quelques objets",
          "Une pièce",
          "Plusieurs pièces",
          "Logement complet",
          "Je ne sais pas",
        ],
      },
      {
        key: "access",
        type: "select",
        emoji: "🚪",
        title: "Comment est l'accès au lieu ?",
        description:
          "Cette information peut influencer l'organisation du débarras.",
        options: [
          "Rez-de-chaussée",
          "Étage avec ascenseur",
          "Étage sans ascenseur",
          "Accès difficile",
          "Je ne sais pas",
        ],
      },
      {
        key: "deadline",
        type: "date",
        emoji: "📅",
        title: "Pour quelle date souhaites-tu le débarras ?",
        description:
          "Cette information reste facultative.",
      },
      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title: "Quel budget souhaites-tu prévoir ?",
        description:
          "Indique une estimation en euros.",
        placeholder: "Ex : 350",
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
        key: "contractStatus",
        type: "select",
        emoji: "🔥",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu possèdes déjà un contrat de gaz ou si tu recherches une nouvelle offre.",
        options: [
          "J'ai déjà un contrat de gaz",
          "Je cherche un contrat de gaz",
        ],
      },
      {
        key: "provider",
        type: "text",
        emoji: "🔥",
        title: "Quel est ton fournisseur de gaz ?",
        description:
          "Indique le nom de ton fournisseur actuel.",
        placeholder: "Ex : Engie, EDF, TotalEnergies, OHM Énergie...",
        showIf: {
          key: "contractStatus",
          equals: "J'ai déjà un contrat de gaz",
        },
      },
      {
        key: "monthlyPrice",
        type: "number",
        emoji: "💶",
        title: "Quelle est ta mensualité de gaz ?",
        description:
          "Indique le montant mensuel approximatif.",
        placeholder: "Ex : 85",
        showIf: {
          key: "contractStatus",
          equals: "J'ai déjà un contrat de gaz",
        },
      },
      {
        key: "housingType",
        type: "select",
        emoji: "🏠",
        title: "Quel logement est concerné ?",
        description:
          "Choisis le type de logement alimenté au gaz.",
        options: [
          "Appartement",
          "Maison",
          "Autre",
        ],
      },
      {
        key: "surface",
        type: "number",
        emoji: "📐",
        title: "Quelle est la surface approximative du logement ?",
        description:
          "Indique la surface en mètres carrés.",
        placeholder: "Ex : 80",
      },
      {
        key: "gasUsage",
        type: "select",
        emoji: "🔥",
        title: "À quoi sert principalement le gaz ?",
        description:
          "Choisis les usages concernés.",
        options: [
          "Chauffage",
          "Eau chaude",
          "Cuisson",
          "Chauffage + eau chaude",
          "Plusieurs usages",
          "Je ne sais pas",
        ],
      },
      {
        key: "occupants",
        type: "number",
        emoji: "👥",
        title: "Combien de personnes vivent dans le logement ?",
        description:
          "Indique le nombre d'occupants.",
        placeholder: "Ex : 2",
      },
      {
        key: "budget",
        type: "number",
        emoji: "🎯",
        title: "Quel budget mensuel souhaites-tu prévoir ?",
        description:
          "Indique ton budget approximatif.",
        placeholder: "Ex : 80",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un contrat de gaz",
        },
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