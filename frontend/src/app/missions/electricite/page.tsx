"use client";

import MissionLayout from "../../components/MissionLayout";

export default function ElectriciteMissionPage() {
  return (
    <MissionLayout
      icon="⚡"
      title="Comparer ton contrat d'électricité"
      subtitle="Pilo vérifie si ton contrat d'électricité est compétitif."

      basePrice={95}
      recommendedPrice={72}

      recommendedName="Électricité Éco"

      advice="Pilo pense que tu pourrais réduire ta facture avec une offre plus adaptée à ta consommation."

      offerPath="/offres/electricite"

      fields={[
        {
          name: "monthlyPrice",
          label: "Facture mensuelle actuelle",
          type: "number",
          defaultValue: 95,
        },
        {
          name: "consumption",
          label: "Consommation annuelle (kWh)",
          type: "number",
          defaultValue: 4500,
        },
        {
          name: "counter",
          label: "Type de compteur",
          type: "select",
          defaultValue: "Linky",
          options: ["Linky", "Ancien compteur"],
        },
      ]}
    />
  );
}