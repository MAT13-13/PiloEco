"use client";

import MissionLayout from "../../components/MissionLayout";

export default function ElectriciteMissionPage() {
  return (
    <MissionLayout
      icon="⚡"
      title="Comparer ton contrat d'électricité"
      subtitle="Pilo analyse ton contrat d'électricité et t'indique les économies potentielles."
      basePrice={95}
      recommendedPrice={72}
      recommendedName="Optimisation électricité"
      offerPath="/offres/electricite"
      advice="Pilo pense que tu pourrais réduire ta facture avec une offre plus adaptée à ta consommation. Les partenaires énergie sont actuellement en cours d’intégration."
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