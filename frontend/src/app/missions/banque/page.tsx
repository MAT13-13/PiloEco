"use client";

import MissionLayout from "../../components/MissionLayout";

export default function BanqueMissionPage() {
  return (
    <MissionLayout
      icon="🏦"
      title="Optimiser tes frais bancaires"
      subtitle="Pilo compare les frais bancaires pour trouver une meilleure offre."

      basePrice={18}
      recommendedPrice={6}

      recommendedName="Banque Éco"

      advice="Pilo pense qu'une banque en ligne pourrait réduire tes frais tout en conservant les mêmes services."

      offerPath="/offres/banque"

      fields={[
        {
          name: "bank",
          label: "Banque actuelle",
          type: "text",
          defaultValue: "",
        },
        {
          name: "monthlyPrice",
          label: "Frais mensuels",
          type: "number",
          defaultValue: 18,
        },
        {
          name: "card",
          label: "Carte bancaire",
          type: "select",
          defaultValue: "Classique",
          options: ["Classique", "Premium", "Gold"],
        },
      ]}
    />
  );
}