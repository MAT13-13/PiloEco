"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import PiloMascot from "../components/PiloMascot";
import QuestionCard from "../components/QuestionCard";

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


    fintech: {
    label: "Fintech & budget",
    icon: "💳",
    message:
      "Je vais analyser le service financier que tu utilises ou t’aider à choisir une nouvelle solution.",
    questions: [
      {
        key: "contractStatus",
        type: "select",
        emoji: "💳",
        title: "Quelle est ta situation ?",
        description:
          "Indique si tu utilises déjà un service financier ou si tu recherches une nouvelle solution.",
        options: [
          "J’utilise déjà un service financier",
          "Je cherche un service financier",
        ],
      },

      {
        key: "provider",
        type: "text",
        emoji: "💳",
        title: "Quel service financier utilises-tu ?",
        description:
          "Indique l’application ou le service concerné.",
        placeholder:
          "Ex : Revolut, Lydia, N26, une application de budget...",
        showIf: {
          key: "contractStatus",
          equals: "J’utilise déjà un service financier",
        },
      },

      {
        key: "serviceType",
        type: "select",
        emoji: "📊",
        title: "Quel type de service est concerné ?",
        description:
          "Choisis l’usage principal du service.",
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
        title:
          "Combien ce service te coûte-t-il chaque mois ?",
        description:
          "Indique 0 si le service est actuellement gratuit.",
        placeholder: "Ex : 9.99",
        showIf: {
          key: "contractStatus",
          equals: "J’utilise déjà un service financier",
        },
      },

      {
        key: "mainGoal",
        type: "select",
        emoji: "🎯",
        title: "Quel est ton objectif principal ?",
        description:
          "Choisis ce que tu souhaites améliorer avec ce service.",
        options: [
          "Réduire mes frais",
          "Mieux gérer mon budget",
          "Obtenir du cashback",
          "Épargner automatiquement",
          "Investir",
          "Voyager avec moins de frais",
          "Je souhaite être conseillé",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un service financier",
        },
      },

      {
        key: "priorityFeature",
        type: "select",
        emoji: "⭐",
        title:
          "Quelle fonctionnalité est la plus importante pour toi ?",
        description:
          "Choisis le critère prioritaire.",
        options: [
          "Simplicité",
          "Frais réduits",
          "Application complète",
          "Cashback",
          "Automatisation",
          "Accompagnement",
        ],
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un service financier",
        },
      },

      {
        key: "budget",
        type: "number",
        emoji: "💶",
        title:
          "Quel budget mensuel acceptes-tu pour ce service ?",
        description:
          "Indique 0 si tu recherches une solution gratuite.",
        placeholder: "Ex : 0",
        showIf: {
          key: "contractStatus",
          equals: "Je cherche un service financier",
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
                    {visibleQuestions.length}
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
                          visibleQuestions.length -
                            1
                        ? "Continuer →"
                        : "Voir mon analyse →"}
                  </button>
                </div>

                <div className="mt-8 flex gap-2">
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
              </QuestionCard>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      <PiloMascot />
    </main>
   );
}