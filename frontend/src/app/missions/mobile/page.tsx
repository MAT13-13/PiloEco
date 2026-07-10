"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MobileMissionPage() {
  return (
    <MissionLayout
      icon="📱"
      title="Comparer ton forfait mobile"
      subtitle="Pilo analyse ton forfait actuel et estime l’économie possible."
      basePrice={45}
      recommendedPrice={15}
      recommendedName="Forfait Mobile Éco"
      advice="Pilo peut t’aider à repérer un forfait moins cher avec assez de données mobiles, sans payer pour des options inutiles."
      fields={[
        {
          name: "monthlyPrice",
          label: "Prix actuel par mois",
          type: "number",
          defaultValue: 45,
        },
        {
          name: "data",
          label: "Internet inclus en Go",
          type: "number",
          defaultValue: 150,
        },
        {
          name: "operator",
          label: "Opérateur actuel",
          type: "text",
          defaultValue: "",
        },
      ]}
    />
  );
}