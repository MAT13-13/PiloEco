"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MotoEquipementMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Entretenir ou équiper ta moto"
      subtitle="Choisis ton besoin pour découvrir une solution partenaire dédiée aux pièces, accessoires et équipements deux-roues."
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
    />
  );
}