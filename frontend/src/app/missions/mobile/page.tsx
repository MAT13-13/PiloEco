"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MobileMissionPage() {
  return (
    <MissionLayout
      icon="📱"
      title="Comparer ton forfait mobile"
      subtitle="Pilo recherche un forfait moins cher."

      basePrice={45}
      recommendedPrice={15}

      recommendedName="Forfait Mobile Éco"

      advice="Pilo a trouvé un forfait offrant les mêmes services pour un prix inférieur."

      fields={[
        {
          name: "monthlyPrice",
          label: "Prix actuel",
          type: "number",
          defaultValue: 45,
        },
        {
          name: "data",
          label: "Go Internet",
          type: "number",
          defaultValue: 150,
        },
        {
          name: "operator",
          label: "Opérateur",
          type: "text",
          defaultValue: "",
        },
      ]}
    />
  );
}