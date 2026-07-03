"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MobiliteMissionPage() {
  return (
    <MissionLayout
      icon="🚗"
      title="Optimiser tes dépenses de mobilité"
      subtitle="Pilo compare tes dépenses liées à la voiture et aux transports."

      basePrice={120}
      recommendedPrice={90}

      recommendedName="Mobilité Éco"

      advice="Pilo pense que tes dépenses de mobilité peuvent être réduites en regroupant certains contrats ou en changeant d'offre."

      fields={[
        {
          name: "monthlyPrice",
          label: "Budget mensuel",
          type: "number",
          defaultValue: 120,
        },
        {
          name: "vehicle",
          label: "Type de véhicule",
          type: "select",
          defaultValue: "Voiture",
          options: [
            "Voiture",
            "Moto",
            "Transports",
            "Mixte",
          ],
        },
        {
          name: "km",
          label: "Kilomètres / an",
          type: "number",
          defaultValue: 12000,
        },
      ]}
    />
  );
}