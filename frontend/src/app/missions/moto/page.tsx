"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MotoMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Comparer ton assurance moto"
      subtitle="Pilo analyse ton contrat moto pour vérifier si tu pourrais payer moins cher."

      basePrice={45}
      recommendedPrice={30}

      recommendedName="Devis personnalisé Leocare"

      advice="Pilo estime qu'une économie est possible sur ton assurance moto. Le tarif définitif dépendra de ton véhicule, de ton profil et des garanties choisies."

      dynamicOfferField="offer"

      dynamicOffers={{
        Leocare: {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300138",
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
          defaultValue: 45,
        },
        {
          name: "vehicleType",
          label: "Type de deux-roues",
          type: "select",
          defaultValue: "Moto",
          options: ["Moto", "Scooter"],
        },
        {
          name: "engineSize",
          label: "Cylindrée",
          type: "select",
          defaultValue: "125 cm³",
          options: [
            "50 cm³",
            "125 cm³",
            "Entre 126 et 500 cm³",
            "Plus de 500 cm³",
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