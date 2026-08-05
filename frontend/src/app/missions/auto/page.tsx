"use client";

import MissionLayout from "../../components/MissionLayout";

export default function AutoMissionPage() {
  return (
    <MissionLayout
      icon="🚗"
      title="Comparer ton assurance auto"
      subtitle="Pilo analyse ton contrat auto pour vérifier si tu pourrais payer moins cher."

      basePrice={68}
      recommendedPrice={45}

      recommendedName="Devis personnalisé Leocare"

      advice="Pilo estime qu'une économie est possible sur ton assurance auto. Le tarif définitif dépendra de ton profil, de ton véhicule et des garanties choisies."

      dynamicOfferField="offer"

      dynamicOffers={{
        Leocare: {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300139",
          buttonLabel: "Calculer mon tarif chez Leocare",
          recommendedName: "Devis personnalisé Leocare",
          advice:
            "Tu vas être redirigé vers Leocare afin d'obtenir un devis personnalisé. Tu restes libre de poursuivre ou non ta demande.",
          external: true,
        },
      }}

      fields={[
        {
          name: "monthlyPrice",
          label: "Cotisation mensuelle",
          type: "number",
          defaultValue: 68,
        },
        {
          name: "vehicle",
          label: "Véhicule",
          type: "text",
          defaultValue: "",
        },
        {
          name: "driverProfile",
          label: "Profil du conducteur",
          type: "select",
          defaultValue: "Conducteur expérimenté",
          options: [
            "Jeune conducteur",
            "Conducteur expérimenté",
            "Conducteur avec malus",
          ],
        },
        {
          name: "offer",
          label: "Offre partenaire",
          type: "select",
          defaultValue: "Leocare",
          options: ["Leocare"],
        },
      ]}
    />
  );
}