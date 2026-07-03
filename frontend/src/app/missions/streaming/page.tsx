"use client";

import MissionLayout from "../../components/MissionLayout";

export default function StreamingMissionPage() {
  return (
    <MissionLayout
      icon="📺"
      title="Optimiser tes abonnements"
      subtitle="Pilo analyse tes abonnements streaming et numériques."

      basePrice={42}
      recommendedPrice={24}

      recommendedName="Pack Streaming Éco"

      advice="Pilo a trouvé plusieurs abonnements redondants. En regroupant tes services, tu pourrais économiser chaque mois."

      fields={[
        {
          name: "monthlyPrice",
          label: "Budget mensuel",
          type: "number",
          defaultValue: 42,
        },
        {
          name: "services",
          label: "Nombre d'abonnements",
          type: "number",
          defaultValue: 4,
        },
        {
          name: "favorite",
          label: "Plateforme principale",
          type: "select",
          defaultValue: "Netflix",
          options: [
            "Netflix",
            "Disney+",
            "Prime Video",
            "Canal+",
            "Max",
            "Paramount+",
          ],
        },
      ]}
    />
  );
}