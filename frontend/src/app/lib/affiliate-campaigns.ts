export type AffiliateProvider = "91m2";

export type AffiliateModel = "CPL";

export type AffiliateStatus =
  | "approved"
  | "pending"
  | "paused"
  | "ended";

export type PiloUniverse =
  | "habitat"
  | "travaux"
  | "energie"
  | "assurance"
  | "sante"
  | "senior"
  | "banque"
  | "credit"
  | "services"
  | "pro"
  | "investissement";

export type AffiliateCampaign = {
  id: number;
  provider: AffiliateProvider;

  name: string;
  slug: string;

  model: AffiliateModel;
  payout: number;

  status: AffiliateStatus;

  universe: PiloUniverse;
  category: string;

  /**
   * URL d'affiliation / URL trackée.
   *
   * IMPORTANT :
   * on ne met jamais l'URL finale comparateur-en-ligne.fr ici.
   * On utilise uniquement l'URL trackée stella-2 fournie par 91m2.
   */
  trackingUrl: string;

  /**
   * Support fourni par la plateforme.
   */
  support:
    | "text-link"
    | "mailing"
    | "display"
    | "text-link+display"
    | "mailing+display";

  /**
   * Permet d'intégrer une campagne au système
   * même si son lien doit encore être récupéré.
   */
  integrated: boolean;

  /**
   * Peut être affichée à l'utilisateur.
   *
   * On la mettra à true uniquement lorsque le lien tracké
   * sera renseigné et vérifié.
   */
  published: boolean;

  /**
   * Date de fin connue au format YYYY-MM-DD.
   * null = aucune date de fin indiquée.
   */
  endDate: string | null;

  /**
   * Texte neutre Pilo.
   * On évite les promesses commerciales du support.
   */
  title: string;
  description: string;
  buttonLabel: string;

  /**
   * Mots clés utilisés pour faire correspondre
   * une campagne avec un besoin utilisateur.
   */
  tags: string[];

  /**
   * Informations de conformité / précautions.
   */
  compliance?: {
    regulated?: boolean;
    financialRisk?: boolean;
    avoidClaims?: string[];
    note?: string;
  };
};

/**
 * ============================================================
 * CAMPAGNES 91M2 APPROUVÉES
 * ============================================================
 *
 * Toutes les campagnes approuvées sont présentes ici.
 *
 * Si trackingUrl === "":
 * campagne intégrée au moteur mais pas encore publiée.
 *
 * Dès qu'on ajoute son lien stella-2 :
 * trackingUrl: "https://stella-2.com/..."
 * published: true
 */

export const affiliateCampaigns: AffiliateCampaign[] = [
 {
  id: 13964,
  provider: "91m2",
  name: "Fenêtres",
  slug: "fenetres",
  model: "CPL",
  payout: 6,
  status: "approved",
  universe: "travaux",
  category: "Menuiserie / Fenêtres",

trackingUrl:
  "https://stella-2.com/clc/VerFSRTDmY_aRnRD8nQQUg",
support: "text-link",
integrated: true,
published: true,
  endDate: null,

  title: "Comparer des solutions pour changer vos fenêtres",

  description:
    "Découvrez des solutions adaptées à votre projet de remplacement de fenêtres.",

  buttonLabel: "Voir les solutions",

  tags: [
    "fenetre",
    "fenetres",
    "menuiserie",
    "isolation",
    "travaux",
    "renovation",
    "maison",
    "appartement",
  ],
},
  {

  id: 13963,
  provider: "91m2",
  name: "Assurance Auto",
  slug: "assurance-auto",
  model: "CPL",
  payout: 4.5,
  status: "approved",
  universe: "assurance",
  category: "Assurance Auto",

  trackingUrl: 
     "https://stella-2.com/clc/Qc1FiOaE8z1XRkYJlu1xfQ",

  support: "text-link",
  integrated: true,
  published: true,
  endDate: "2027-04-24",

  title: "Comparer les assurances auto",

  description:
    "Comparez différentes solutions d'assurance auto et trouvez une offre adaptée à votre véhicule et à vos besoins.",

  buttonLabel: "Comparer les assurances auto",

  tags: [
    "assurance auto",
    "auto",
    "voiture",
    "véhicule",
    "assurance",
    "conducteur",
  ],
},
    

  {
    id: 13962,
    provider: "91m2",
    name: "Assurance Habitation",
    slug: "assurance-habitation-91m2",
    model: "CPL",
    payout: 4.5,
    status: "approved",
    universe: "assurance",
    category: "Assurance Habitation",
    trackingUrl: "https://stella-2.com/clc/Cr5bNP7BYDBdrsnQ91IXzg",
    support: "text-link",
    integrated: true,
    published: true,
    endDate: "2027-01-31",
    title: "Comparer des assurances habitation",
    description:
      "Découvrez différentes solutions pour assurer votre logement.",
    buttonLabel: "Comparer les assurances",
    tags: [
      "assurance",
      "habitation",
      "logement",
      "maison",
      "appartement",
    ],
  },

  {
    id: 13961,
    provider: "91m2",
    name: "Création de Site Internet BtoB",
    slug: "creation-site-internet-b2b",
    model: "CPL",
    payout: 40,
    status: "approved",
    universe: "pro",
    category: "Services aux entreprises",
    trackingUrl:
  "https://stella-2.com/clc/HiDB9AmyJd8RYxs4lukr7g",
    support: "mailing",
    integrated: true,
    published: true,
    endDate: "2026-12-31",
    title: "Créer ou refaire un site internet professionnel",
    description:
      "Découvrez une solution destinée aux professionnels ayant un projet de création ou de refonte de site internet.",
    buttonLabel: "Découvrir la solution",
    tags: [
      "professionnel",
      "entreprise",
      "site internet",
      "site web",
      "b2b",
      "digital",
    ],
  },

  {
    id: 13957,
    provider: "91m2",
    name: "Assurance Obsèques",
    slug: "assurance-obseques",
    model: "CPL",
    payout: 6.5,
    status: "approved",
    universe: "assurance",
    category: "Assurance Obsèques",
    trackingUrl:  "https://stella-2.com/clc/jHeRDufvapYFnIhs_dNKKg",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: "2027-01-31",
    title: "Comparer des assurances obsèques",
    description:
      "Comparez différentes solutions d'assurance obsèques selon vos besoins.",
    buttonLabel: "Comparer les solutions",
    tags: [
      "assurance",
      "obseques",
      "senior",
      "prevoyance",
    ],
  },

  {
    id: 13956,
    provider: "91m2",
    name: "Douche Sécurisée",
    slug: "douche-securisee",
    model: "CPL",
    payout: 12,
    status: "approved",
    universe: "senior",
    category: "Adaptation du logement",
    trackingUrl:
  "https://stella-2.com/clc/w7Fbs5pnNV_8ljw6d-3FgQ",
    support: "text-link",
    integrated: true,
    published: true,
    endDate: null,
    title: "Adapter sa salle de bain avec une douche sécurisée",
    description:
      "Étudiez les solutions permettant d'adapter votre salle de bain et d'améliorer son accessibilité.",
    buttonLabel: "Étudier mon projet",
    tags: [
      "douche",
      "douche securisee",
      "senior",
      "accessibilite",
      "salle de bain",
      "adaptation logement",
    ],
  },

  {
    id: 13954,
    provider: "91m2",
    name: "Rachat de crédits Propriétaire",
    slug: "rachat-credits-proprietaire",
    model: "CPL",
    payout: 25,
    status: "approved",
    universe: "credit",
    category: "Rachat de crédits",
    trackingUrl: "https://stella-2.com/clc/FScH71NrI1jZy6XOEmiY1w",
    support: "text-link",
    integrated: true,
    published: true,
    endDate: null,
    title: "Étudier un regroupement de crédits",
    description:
      "Accédez à une simulation de regroupement de crédits adaptée aux propriétaires.",
    buttonLabel: "Faire une simulation",
    tags: [
      "credit",
      "credits",
      "rachat credit",
      "regroupement credit",
      "mensualite",
      "proprietaire",
    ],
    compliance: {
      regulated: true,
      avoidClaims: [
        "meilleur taux garanti",
        "économies garanties",
        "réduction garantie des mensualités",
      ],
      note:
        "Le regroupement de crédits peut augmenter la durée de remboursement et le coût total du crédit.",
    },
  },

  {
    id: 13950,
    provider: "91m2",
    name: "Monte-escalier",
    slug: "monte-escalier-13950",
    model: "CPL",
    payout: 15,
    status: "approved",
    universe: "senior",
    category: "Adaptation du logement",
    trackingUrl: "https://stella-2.com/clc/dFnt_VGn3QXrak9DrlyAUw",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: null,
    title: "Étudier l'installation d'un monte-escalier",
    description:
      "Comparez des solutions adaptées à votre logement pour faciliter les déplacements entre les étages.",
    buttonLabel: "Demander une étude",
    tags: [
      "monte escalier",
      "senior",
      "mobilite",
      "accessibilite",
      "adaptation logement",
    ],
  },

  {
    id: 13948,
    provider: "91m2",
    name: "Cryptomonnaie",
    slug: "cryptomonnaie",
    model: "CPL",
    payout: 9.9,
    status: "approved",
    universe: "investissement",
    category: "Cryptomonnaie",
    trackingUrl: "https://stella-2.com/clc/wsju7TaxI48vpInKiWGL7Q",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: "2026-12-31",
    title: "Découvrir une solution liée aux cryptomonnaies",
    description:
      "Accédez à une plateforme externe proposant des services liés aux actifs numériques.",
    buttonLabel: "Découvrir",
    tags: [
      "crypto",
      "cryptomonnaie",
      "bitcoin",
      "investissement",
      "actifs numeriques",
    ],
    compliance: {
      regulated: true,
      financialRisk: true,
      avoidClaims: [
        "rendement garanti",
        "gain garanti",
        "sans risque",
        "revenu garanti",
      ],
      note:
        "Les crypto-actifs présentent un risque de perte en capital.",
    },
  },

  {
  id: 13942,
  provider: "91m2",
  name: "Alarme & Sécurité",
  slug: "alarme-securite",
  model: "CPL",
  payout: 0,
  status: "approved",
  universe: "habitat",
  category: "Alarme & sécurité",

  trackingUrl:
    "https://stella-2.com/clc/Be1F08wcdYxa6RrDFba74w",

  support: "mailing",
  integrated: true,
  published: true,
  endDate: null,

  title: "Comparer des solutions d'alarme et de télésurveillance",

  description:
    "Découvrez des solutions pour protéger votre logement avec une alarme et un service de télésurveillance.",

  buttonLabel: "Comparer les solutions",

  tags: [
    "alarme",
    "securite",
    "telesurveillance",
    "maison",
    "appartement",
    "logement",
    "intrusion",
    "alarme connectee",
  ],
},

  {
    id: 13941,
    provider: "91m2",
    name: "Menuiserie Fenêtres",
    slug: "menuiserie-fenetres",
    model: "CPL",
    payout: 5.9,
    status: "approved",
    universe: "travaux",
    category: "Menuiserie",
    trackingUrl: "https://stella-2.com/clc/DXvTI_xnlfOsMBSoAU3vjQ",
    support: "text-link",
    integrated: true,
    published: true,
    endDate: "2026-12-31",
    title: "Comparer des solutions de menuiserie",
    description:
      "Fenêtres, portes-fenêtres, volets, portails et clôtures : étudiez différentes solutions pour votre projet.",
    buttonLabel: "Voir les solutions",
    tags: [
      "fenetre",
      "porte fenetre",
      "volet",
      "portail",
      "cloture",
      "menuiserie",
      "pvc",
      "aluminium",
    ],
  },

  {
    id: 13940,
    provider: "91m2",
    name: "Pompe à Chaleur",
    slug: "pompe-a-chaleur",
    model: "CPL",
    payout: 14,
    status: "approved",
    universe: "energie",
    category: "Rénovation énergétique",
    trackingUrl:
  "https://stella-2.com/clc/iTH1hfc_rj4-fhDvKhIp-Q",
    support: "display",
    integrated: true,
    published: true,
    endDate: "2027-12-31",
    title: "Étudier un projet de pompe à chaleur",
    description:
      "Découvrez les solutions disponibles pour un projet de pompe à chaleur dans votre logement.",
    buttonLabel: "Étudier mon projet",
    tags: [
      "pompe a chaleur",
      "pac",
      "chauffage",
      "energie",
      "renovation energetique",
      "chaudiere",
    ],
  },

  {
    id: 13939,
    provider: "91m2",
    name: "Mutuelle Senior",
    slug: "mutuelle-senior",
    model: "CPL",
    payout: 3.9,
    status: "approved",
    universe: "sante",
    category: "Mutuelle Senior",
    trackingUrl: "https://stella-2.com/clc/JBgewpHbtrrUqGtrJKaqgQ",
    support: "mailing",
    integrated: true,
    published: true,
    endDate: null,
    title: "Comparer des mutuelles senior",
    description:
      "Comparez différentes solutions de complémentaire santé adaptées aux seniors.",
    buttonLabel: "Comparer les mutuelles",
    tags: [
      "mutuelle",
      "sante",
      "senior",
      "complementaire sante",
      "assurance sante",
    ],
  },

  {
    id: 13936,
    provider: "91m2",
    name: "Panneaux photovoltaïques",
    slug: "panneaux-photovoltaiques",
    model: "CPL",
    payout: 14,
    status: "approved",
    universe: "energie",
    category: "Solaire / Photovoltaïque",
    trackingUrl:  "https://stella-2.com/clc/_ic5yMUNM5Ew6nVvPGiv_A",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: null,
    title: "Étudier un projet photovoltaïque",
    description:
      "Vérifiez les solutions disponibles pour équiper votre logement de panneaux photovoltaïques.",
    buttonLabel: "Étudier mon projet",
    tags: [
      "solaire",
      "panneaux solaires",
      "photovoltaïque",
      "photovoltaique",
      "energie",
      "electricite",
    ],
  },

  {
    id: 13935,
    provider: "91m2",
    name: "Regroupement de Crédits",
    slug: "regroupement-de-credits",
    model: "CPL",
    payout: 25,
    status: "approved",
    universe: "credit",
    category: "Regroupement de crédits",
    trackingUrl: "https://stella-2.com/clc/P9Up78UhJEMQFwVqZISxWA",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: null,
    title: "Étudier un regroupement de crédits",
    description:
      "Réalisez une simulation pour étudier une solution de regroupement de vos crédits.",
    buttonLabel: "Faire une simulation",
    tags: [
      "credit",
      "credits",
      "regroupement credit",
      "rachat credit",
      "mensualite",
    ],
    compliance: {
      regulated: true,
      avoidClaims: [
        "60 % d'économie garantie",
        "meilleur taux garanti",
        "mensualités forcément réduites",
      ],
      note:
        "Un regroupement de crédits peut augmenter la durée de remboursement et le coût total.",
    },
  },

  {
    id: 13934,
    provider: "91m2",
    name: "Monte-escalier",
    slug: "monte-escalier-13934",
    model: "CPL",
    payout: 15,
    status: "approved",
    universe: "senior",
    category: "Adaptation du logement",
    trackingUrl: "https://stella-2.com/clc/0pR5uRNdjz1K-hwZ5aCcFg",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: null,
    title: "Comparer des solutions de monte-escalier",
    description:
      "Étudiez différentes solutions pour adapter votre logement et faciliter les déplacements.",
    buttonLabel: "Comparer les solutions",
    tags: [
      "monte escalier",
      "senior",
      "mobilite",
      "accessibilite",
      "adaptation logement",
    ],
  },

  {
    id: 13927,
    provider: "91m2",
    name: "Débarras de maison de locaux particuliers",
    slug: "debarras-maison-locaux",
    model: "CPL",
    payout: 13,
    status: "approved",
    universe: "services",
    category: "Débarras",
    trackingUrl:
      "https://stella-2.com/clc/6B7zhroUKKBTObQNTnR5SA",
    support: "mailing+display",
    integrated: true,
    published: true,
    endDate: null,
    title: "Comparer des devis de débarras",
    description:
      "Comparez des solutions pour vider une maison, un appartement, un garage, un grenier ou des locaux.",
    buttonLabel: "Comparer les devis",
    tags: [
      "debarras",
      "maison",
      "appartement",
      "garage",
      "grenier",
      "demenagement",
      "locaux",
    ],
  },

  {
    id: 13912,
    provider: "91m2",
    name: "Courtier crédit immobilier",
    slug: "courtier-credit-immobilier",
    model: "CPL",
    payout: 5.8,
    status: "approved",
    universe: "credit",
    category: "Crédit immobilier",
    trackingUrl:  "https://stella-2.com/clc/uqpEj7ZMcWH56EM9ZArUyA",
    support: "text-link+display",
    integrated: true,
    published: true,
    endDate: "2026-12-31",
    title: "Comparer des courtiers en crédit immobilier",
    description:
      "Découvrez des solutions de courtage pour votre projet de crédit immobilier.",
    buttonLabel: "Comparer les courtiers",
    tags: [
      "credit immobilier",
      "pret immobilier",
      "courtier",
      "immobilier",
      "financement",
    ],
    compliance: {
      regulated: true,
      avoidClaims: [
        "meilleur taux garanti",
        "crédit garanti",
        "acceptation garantie",
      ],
    },
  },
];

/**
 * ============================================================
 * HELPERS PILO
 * ============================================================
 */

export function getAffiliateCampaignById(
  id: number
): AffiliateCampaign | undefined {
  return affiliateCampaigns.find(
    (campaign) => campaign.id === id
  );
}

export function getAffiliateCampaignsByUniverse(
  universe: PiloUniverse
): AffiliateCampaign[] {
  return affiliateCampaigns.filter(
    (campaign) =>
      campaign.universe === universe &&
      campaign.integrated &&
      campaign.status === "approved"
  );
}

export function getPublishedAffiliateCampaigns(): AffiliateCampaign[] {
  return affiliateCampaigns.filter(
    (campaign) =>
      campaign.integrated &&
      campaign.published &&
      campaign.status === "approved" &&
      Boolean(campaign.trackingUrl)
  );
}

export function getPublishedAffiliateCampaignsByUniverse(
  universe: PiloUniverse
): AffiliateCampaign[] {
  return getPublishedAffiliateCampaigns().filter(
    (campaign) => campaign.universe === universe
  );
}

export function searchAffiliateCampaigns(
  query: string
): AffiliateCampaign[] {
  const normalizedQuery = normalizeAffiliateSearch(query);

  if (!normalizedQuery) {
    return [];
  }

  return affiliateCampaigns
    .filter(
      (campaign) =>
        campaign.integrated &&
        campaign.status === "approved"
    )
    .filter((campaign) => {
      const searchableText = normalizeAffiliateSearch(
        [
          campaign.name,
          campaign.category,
          campaign.title,
          campaign.description,
          ...campaign.tags,
        ].join(" ")
      );

      return searchableText.includes(normalizedQuery);
    });
}

export function getAffiliateCampaignsForNeed(
  need: string
): AffiliateCampaign[] {
  const normalizedNeed =
    normalizeAffiliateSearch(need);

  if (!normalizedNeed) {
    return [];
  }

  const ignoredWords = new Set([
    "a",
    "au",
    "aux",
    "de",
    "des",
    "du",
    "en",
    "et",
    "la",
    "le",
    "les",
    "pour",
    "un",
    "une",
  ]);

  const needWords = normalizedNeed
    .split(" ")
    .filter(
      (word) =>
        word.length >= 3 &&
        !ignoredWords.has(word)
    );

  return affiliateCampaigns
    .filter(
      (campaign) =>
        campaign.integrated &&
        campaign.status === "approved"
    )
    .map((campaign) => {
      let score = 0;

      const searchableValues = [
        campaign.name,
        campaign.slug,
        campaign.category,
        campaign.title,
        ...campaign.tags,
      ].map(normalizeAffiliateSearch);

      for (const value of searchableValues) {
        if (
          value === normalizedNeed ||
          value.includes(normalizedNeed) ||
          normalizedNeed.includes(value)
        ) {
          score += 100;
          continue;
        }

        const valueWords = value
          .split(" ")
          .filter(Boolean);

        const matchingWords =
          needWords.filter((word) =>
            valueWords.includes(word)
          );

        score += matchingWords.length * 10;
      }

      return {
        campaign,
        score,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ campaign }) => campaign);
}

/**
 * Important :
 * Le moteur Pilo ne classe JAMAIS les campagnes
 * selon le montant de commission.
 *
 * La rémunération appartient au back-office.
 * Elle ne doit pas déterminer la recommandation utilisateur.
 */
export function getRecommendedAffiliateCampaigns(
  need: string
): AffiliateCampaign[] {
  return getAffiliateCampaignsForNeed(need).filter(
    (campaign) =>
      campaign.published &&
      Boolean(campaign.trackingUrl)
  );
}

function normalizeAffiliateSearch(
  value: string
): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}