"use client";

import MissionLayout from "../../components/MissionLayout";

export default function HabitationMissionPage() {
  return (
    <MissionLayout
      icon="🏠"
      title="Comparer ton assurance habitation"
      subtitle="Pilo analyse ton contrat habitation pour vérifier si tu pourrais payer moins cher."

      basePrice={32}
      recommendedPrice={18}

      recommendedName="Devis personnalisé Leocare"

      advice="Pilo estime qu'une économie est possible sur ton assurance habitation. Le tarif définitif dépendra de ton logement, de ta situation et des garanties choisies."

      dynamicOfferField="offer"

      dynamicOffers={{
        Leocare: {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300140",
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
          defaultValue: 32,
        },
        {
          name: "surface",
          label: "Surface du logement (m²)",
          type: "number",
          defaultValue: 80,
        },
        {
          name: "status",
          label: "Situation",
          type: "select",
          defaultValue: "Locataire",
          options: ["Locataire", "Propriétaire"],
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