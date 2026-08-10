import MissionLayout from "../../components/MissionLayout";

const auchanVoyagesLinks: Record<string, string> = {
  Albanie:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dal",
  Angleterre:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dgb.angleterre",
  Autriche:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dat",
  Baléares:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dbaleares",
  Danemark:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Ddk",
  Espagne:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Des",
  "États-Unis":
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dus",
  Finlande:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dfi",
  France:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dfr",
  Grèce:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dgr",
  Guadeloupe:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dgp",
  "Île Maurice":
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dmu",
  Italie:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dit",
  Maroc:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dma",
  Mexique:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dmx",
  Portugal:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dpt",
  Suède:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dse",
  Suisse:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dch",
  Thaïlande:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dth",
  Tunisie:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dtn",
  Turquie:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dtr",
  Vietnam:
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2Fserp%3Ftype%3Dsejour%26s_c.type_voyage%3Dsejour%26s_c.BDES%3Dvn",
  "Autre destination":
    "https://vmx.voyages-auchan.com/?P51211D58C0F51D1&redir=https%3A%2F%2Fwww.voyages-auchan.com%2F",
};

const destinationOptions = [
  "Albanie",
  "Angleterre",
  "Autriche",
  "Baléares",
  "Danemark",
  "Espagne",
  "États-Unis",
  "Finlande",
  "France",
  "Grèce",
  "Guadeloupe",
  "Île Maurice",
  "Italie",
  "Maroc",
  "Mexique",
  "Portugal",
  "Suède",
  "Suisse",
  "Thaïlande",
  "Tunisie",
  "Turquie",
  "Vietnam",
  "Autre destination",
];

function destinationPreposition(destination: string) {
  if (
    ["Portugal", "Maroc", "Mexique", "Vietnam", "Danemark"].includes(
      destination
    )
  ) {
    return "au";
  }

  if (["États-Unis", "Baléares"].includes(destination)) {
    return "aux";
  }

  if (destination === "Île Maurice") {
    return "à l’";
  }

  return "en";
}

const auchanDynamicOffers = Object.fromEntries(
  destinationOptions.map((destination) => {
    const isOther = destination === "Autre destination";

    return [
      destination,
      {
        href: auchanVoyagesLinks[destination],
        buttonLabel: isOther
          ? "Découvrir toutes les destinations"
          : `Voir les séjours ${destinationPreposition(
              destination
            )} ${destination}`,
        recommendedName: isOther
          ? "Auchan Voyages – Toutes les destinations"
          : `Auchan Voyages – Séjours ${destinationPreposition(
              destination
            )} ${destination}`,
        advice: isOther
          ? "Découvre toutes les destinations proposées par Auchan Voyages, puis affine tes dates, ton budget et ton hébergement."
          : "Découvre les séjours disponibles, puis affine les dates, la ville, l’hôtel et la formule directement chez notre partenaire.",
        external: true,
      },
    ];
  })
);

const vacancesBleuesOffers = {
  Atlantique: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fen-atlantique",
    buttonLabel: "Découvrir les séjours sur la côte Atlantique",
    recommendedName: "Vacances Bleues – Côte Atlantique",
    advice:
      "Découvre les hôtels, clubs et résidences disponibles sur la côte Atlantique.",
    external: true,
  },

  Campagne: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fa-la-campagne",
    buttonLabel: "Découvrir les séjours à la campagne",
    recommendedName: "Vacances Bleues – Campagne",
    advice:
      "Explore les hôtels, clubs et résidences disponibles à la campagne.",
    external: true,
  },

  "Circuit organisé": {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues-voyages.fr%2F",
    buttonLabel: "Découvrir les circuits organisés",
    recommendedName: "Vacances Bleues – Circuits organisés",
    advice:
      "Découvre les circuits et voyages organisés proposés par Vacances Bleues.",
    external: true,
  },

  "Club vacances": {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fpartir-avec-vacances-bleues%2Fnos-lieux-d-exception%2Fles-clubs-vacances-bleues",
    buttonLabel: "Voir les clubs vacances",
    recommendedName: "Vacances Bleues – Clubs vacances",
    advice:
      "Découvre les clubs vacances en France et compare les formules proposées.",
    external: true,
  },

  "Croisière fluviale": {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fsur-un-fleuve",
    buttonLabel: "Découvrir les croisières fluviales",
    recommendedName: "Vacances Bleues – Croisières fluviales",
    advice:
      "Découvre les croisières proposées sur les fleuves de France.",
    external: true,
  },

  "Hôtel haut de gamme": {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fpartir-avec-vacances-bleues%2Fnos-lieux-d-exception%2Fles-hotels-vacances-bleues",
    buttonLabel: "Voir les hôtels Vacances Bleues",
    recommendedName: "Vacances Bleues – Hôtels haut de gamme",
    advice:
      "Découvre les hôtels Vacances Bleues et choisis l’établissement adapté à ton séjour.",
    external: true,
  },

  Méditerranée: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fen-mediterranee",
    buttonLabel: "Découvrir les séjours en Méditerranée",
    recommendedName: "Vacances Bleues – Méditerranée",
    advice:
      "Découvre les hôtels, clubs et résidences Vacances Bleues en Méditerranée.",
    external: true,
  },

  Montagne: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fa-la-montagne",
    buttonLabel: "Découvrir les séjours à la montagne",
    recommendedName: "Vacances Bleues – Montagne",
    advice:
      "Explore les hôtels, clubs et résidences Vacances Bleues à la montagne.",
    external: true,
  },

  Résidence: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fpartir-avec-vacances-bleues%2Fnos-lieux-d-exception%2Fles-residences-vacances-bleues",
    buttonLabel: "Voir les résidences de vacances",
    recommendedName: "Vacances Bleues – Résidences",
    advice:
      "Découvre les résidences disponibles pour un séjour plus autonome.",
    external: true,
  },

  Ville: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2Ffr%2Fnos-destinations%2Fen-ville",
    buttonLabel: "Découvrir les séjours en ville",
    recommendedName: "Vacances Bleues – Séjours en ville",
    advice:
      "Découvre les établissements Vacances Bleues situés au cœur des villes.",
    external: true,
  },

  "Transfert aéroport / Disneyland Paris": {
    href: "https://www.tkqlhce.com/click-101847438-11423882",
    buttonLabel: "Réserver mon transfert",
    recommendedName:
      "Magical Shuttle – Transfert aéroport & Disneyland Paris",
    advice:
      "Réserve ton transfert en navette entre les aéroports parisiens et Disneyland Paris avec Magical Shuttle.",
    external: true,
  },

  Autre: {
    href: "https://odx.vacancesbleues.fr/?P513A7F58C0F51F1&redir=https%3A%2F%2Fwww.vacancesbleues.fr%2F",
    buttonLabel: "Découvrir toutes les offres Vacances Bleues",
    recommendedName: "Vacances Bleues – Toutes les offres",
    advice:
      "Découvre tous les séjours, hôtels, clubs, résidences et circuits proposés par Vacances Bleues.",
    external: true,
  },
};

const stayStyleOptions = [
  "Atlantique",
  "Campagne",
  "Circuit organisé",
  "Club vacances",
  "Croisière fluviale",
  "Hôtel haut de gamme",
  "Méditerranée",
  "Montagne",
  "Résidence",
  "Transfert aéroport / Disneyland Paris",
  "Ville",
  "Autre",
];

const tripComOffer = {
  href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23301536",
  buttonLabel: "Découvrir les offres Trip.com",
  recommendedName: "Trip.com – Voyage",
  advice:
    "Découvre les offres disponibles chez Trip.com et vérifie les tarifs et conditions correspondant à ton voyage.",
  external: true,
};

export default function VoyageMissionPage() {
  return (
    <MissionLayout
      icon="✈️"
      title="Trouver un séjour adapté"
      subtitle="Choisis ta destination, ton budget et ton besoin pour découvrir les offres de nos partenaires voyage."
      fields={[
        {
          name: "destination",
          label: "Où souhaites-tu voyager ?",
          type: "select",
          defaultValue: "Espagne",
          options: destinationOptions,
        },
        {
          name: "stayStyle",
          label: "Quel type de séjour ou service recherches-tu ?",
          type: "select",
          defaultValue: "Méditerranée",
          options: stayStyleOptions,
        },
        {
          name: "monthlyPrice",
          label: "Quel budget souhaites-tu consacrer à ce voyage ?",
          type: "number",
          defaultValue: 1500,
        },
        {
          name: "travellers",
          label: "Combien de personnes voyagent ?",
          type: "number",
          defaultValue: 2,
        },
      ]}
      basePrice={1500}
      recommendedPrice={1350}
      recommendedName="Offre de voyage partenaire"
      advice="Compare les offres disponibles avant de choisir celle qui correspond le mieux à ton projet."
      dynamicOfferField="destination"
      dynamicOffers={auchanDynamicOffers}
      alternativeOfferField="stayStyle"
      alternativeOffers={vacancesBleuesOffers}
      alternativeTitle="Autre offre ou service partenaire"
      thirdOffer={tripComOffer}
      thirdOfferTitle="Autre partenaire voyage"
    />
  );
}