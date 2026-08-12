"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MotoEquipementMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Entretenir ou équiper ta moto"
      subtitle="Choisis ton besoin pour découvrir des solutions partenaires dédiées aux pièces, accessoires et équipements deux-roues."
      basePrice={150}
      recommendedPrice={120}
      recommendedName="Solution moto partenaire"
      offerPath="/offres/moto-equipement"
      advice="Compare les références, compatibilités, prix et conditions de livraison avant de choisir ton équipement."
      fields={[
        {
          name: "needType",
          label: "Que recherches-tu ?",
          type: "select",
          defaultValue: "Moto",
          options: [
            "Casques",
            "Équipement motard",
            "Accessoires moto",
            "Bagagerie",
            "High-tech",
            "Pneus moto",
            "Moto",
            "Scooter",
            "Moto 50cc",
            "Mobylette",
            "Maxi-scooter",
            "Tout-terrain",
            "Quad",
            "Outillage",
            "Vélo",
            "Promotions & déstockage",
            "Nouveautés",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget souhaites-tu consacrer à ce besoin ?",
          type: "number",
          defaultValue: 150,
        },
      ]}
      dynamicOfferField="needType"
      dynamicOffers={{
        Casques: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fcasque%2F",
          buttonLabel: "Voir les casques",
          recommendedName: "La Bécanerie – Casques",
          advice:
            "Découvre les casques disponibles chez La Bécanerie et choisis un modèle adapté à ta pratique.",
          external: true,
        },

        "Équipement motard": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fequipement-motard%2F",
          buttonLabel: "Voir l’équipement motard",
          recommendedName: "La Bécanerie – Équipement motard",
          advice:
            "Découvre les équipements destinés au motard et sélectionne les produits adaptés à ton usage.",
          external: true,
        },

        "Accessoires moto": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto%2F",
          buttonLabel: "Voir les accessoires moto",
          recommendedName: "La Bécanerie – Accessoires moto",
          advice:
            "Découvre les accessoires et équipements disponibles pour compléter ou améliorer ta moto.",
          external: true,
        },

        Bagagerie: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto%2F",
          buttonLabel: "Voir la bagagerie moto",
          recommendedName: "La Bécanerie – Bagagerie",
          advice:
            "Découvre les solutions de rangement et de bagagerie adaptées à ton deux-roues.",
          external: true,
        },

        "High-tech": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto%2F",
          buttonLabel: "Voir les équipements high-tech",
          recommendedName: "La Bécanerie – High-tech",
          advice:
            "Découvre les accessoires technologiques et équipements connectés pour la moto.",
          external: true,
        },

        "Pneus moto": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto%2F",
          buttonLabel: "Voir les pneus moto",
          recommendedName: "La Bécanerie – Pneus moto",
          advice:
            "Découvre les solutions disponibles pour remplacer ou équiper les pneus de ta moto.",
          external: true,
        },

        Moto: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto%2F",
          buttonLabel: "Voir les pièces et équipements moto",
          recommendedName: "La Bécanerie – Moto",
          advice:
            "Découvre les pièces, accessoires et équipements disponibles pour ta moto.",
          external: true,
        },

        Scooter: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fscooter%2F",
          buttonLabel: "Voir les pièces scooter",
          recommendedName: "La Bécanerie – Scooter",
          advice:
            "Découvre les pièces, accessoires et équipements disponibles pour ton scooter.",
          external: true,
        },

        "Moto 50cc": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmoto-50cc%2F",
          buttonLabel: "Voir les équipements 50cc",
          recommendedName: "La Bécanerie – Moto 50cc",
          advice:
            "Découvre les pièces et équipements adaptés aux motos 50cc.",
          external: true,
        },

        Mobylette: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmobylette%2F",
          buttonLabel: "Voir les pièces mobylette",
          recommendedName: "La Bécanerie – Mobylette",
          advice:
            "Découvre les pièces et accessoires disponibles pour les mobylettes.",
          external: true,
        },

        "Maxi-scooter": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fmaxi-scooter%2F",
          buttonLabel: "Voir les équipements maxi-scooter",
          recommendedName: "La Bécanerie – Maxi-scooter",
          advice:
            "Découvre les pièces et équipements disponibles pour les maxi-scooters.",
          external: true,
        },

        "Tout-terrain": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Ftout-terrain%2F",
          buttonLabel: "Voir l’équipement tout-terrain",
          recommendedName: "La Bécanerie – Tout-terrain",
          advice:
            "Découvre les pièces, accessoires et équipements destinés à la pratique tout-terrain.",
          external: true,
        },

        Quad: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fquad%2F",
          buttonLabel: "Voir les pièces quad",
          recommendedName: "La Bécanerie – Quad",
          advice:
            "Découvre les pièces et accessoires disponibles pour ton quad.",
          external: true,
        },

        Outillage: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Foutillage%2F",
          buttonLabel: "Voir l’outillage",
          recommendedName: "La Bécanerie – Outillage",
          advice:
            "Découvre l’outillage nécessaire pour entretenir et réparer ton deux-roues.",
          external: true,
        },

        Vélo: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Fvelo%2F",
          buttonLabel: "Voir les équipements vélo",
          recommendedName: "La Bécanerie – Vélo",
          advice:
            "Découvre les pièces, accessoires et équipements proposés pour le vélo.",
          external: true,
        },

        "Promotions & déstockage": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Frecherche%2F%3Fvf%3D1%26destockage%3D1%26promo%3D1",
          buttonLabel: "Voir les promotions",
          recommendedName: "La Bécanerie – Promotions & déstockage",
          advice:
            "Découvre les produits actuellement en promotion ou en déstockage chez La Bécanerie.",
          external: true,
        },

        Nouveautés: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301532&url=https%3A%2F%2Fwww.la-becanerie.com%2Frecherche%2F%3Fnew%3D1",
          buttonLabel: "Voir les nouveautés",
          recommendedName: "La Bécanerie – Nouveautés",
          advice:
            "Découvre les nouveautés récemment ajoutées au catalogue La Bécanerie.",
          external: true,
        },
      }}
      alternativeOfferField="needType"
      alternativeTitle="Comparer avec MAXXESS"
      alternativeOffers={{
        Casques: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategorie%2Fcasque-moto-15%2F%3Fcategories%3DCasque%2520int%25C3%25A9gral~Casque%2520jet~Casque%2520modulable~Casque%2520crossover~Casque%2520Cross",
          buttonLabel: "Voir les casques chez MAXXESS",
          recommendedName: "MAXXESS – Casques moto",
          advice:
            "Compare également les casques disponibles chez MAXXESS selon ton type de pratique et ton budget.",
          external: true,
        },

        "Équipement motard": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategories%2Fequipement-du-motard-12",
          buttonLabel: "Voir l’équipement chez MAXXESS",
          recommendedName: "MAXXESS – Équipement du motard",
          advice:
            "Découvre les vêtements, protections et équipements du motard proposés par MAXXESS.",
          external: true,
        },

        "Accessoires moto": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategorie%2Faccessoires-de-la-moto-13",
          buttonLabel: "Voir les accessoires chez MAXXESS",
          recommendedName: "MAXXESS – Accessoires moto",
          advice:
            "Compare les accessoires moto disponibles chez MAXXESS selon ton besoin.",
          external: true,
        },

        Bagagerie: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategorie%2Fbagagerie-301",
          buttonLabel: "Voir la bagagerie chez MAXXESS",
          recommendedName: "MAXXESS – Bagagerie",
          advice:
            "Découvre les sacs, top cases et solutions de transport disponibles chez MAXXESS.",
          external: true,
        },

        "High-tech": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategorie%2Fhigh-tech-220",
          buttonLabel: "Voir le high-tech chez MAXXESS",
          recommendedName: "MAXXESS – High-tech moto",
          advice:
            "Découvre les équipements high-tech et accessoires connectés proposés par MAXXESS.",
          external: true,
        },

        "Pneus moto": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fpneu%2Fmerchants",
          buttonLabel: "Voir les pneus chez MAXXESS",
          recommendedName: "MAXXESS – Pneus moto",
          advice:
            "Compare les pneus disponibles chez MAXXESS en fonction de ta moto et de ton utilisation.",
          external: true,
        },

        Moto: {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2F",
          buttonLabel: "Découvrir MAXXESS",
          recommendedName: "MAXXESS – Moto",
          advice:
            "Découvre également les équipements, accessoires et produits moto disponibles chez MAXXESS.",
          external: true,
        },

        "Tout-terrain": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fcategorie%2Fcross-tt-enduro-14",
          buttonLabel: "Voir le tout-terrain chez MAXXESS",
          recommendedName: "MAXXESS – Cross, TT & Enduro",
          advice:
            "Compare les équipements dédiés au cross, tout-terrain et enduro disponibles chez MAXXESS.",
          external: true,
        },

        "Promotions & déstockage": {
          href: "https://track.effiliation.com/servlet/effi.redir?id_compteur=23301763&url=https%3A%2F%2Fwww.maxxess.fr%2Fbons-plans",
          buttonLabel: "Voir les bons plans MAXXESS",
          recommendedName: "MAXXESS – Bons plans",
          advice:
            "Découvre les offres et bons plans actuellement disponibles chez MAXXESS.",
          external: true,
        },
      }}
    />
  );
}