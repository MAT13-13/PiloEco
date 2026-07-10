"use client";

import MissionLayout from "../../components/MissionLayout";

export default function InternetMissionPage() {
  return (
    <MissionLayout
      icon="🌐"
      title="Comparer ton offre Internet"
      subtitle="Pilo recherche une box Internet moins chère."

      basePrice={38}
      recommendedPrice={25}

      recommendedName="Fibre Éco"

      advice="Pilo a trouvé une offre fibre offrant des performances similaires pour un prix inférieur."

      offerPath="/offres/internet"

      fields={[
        {
          name: "monthlyPrice",
          label: "Prix actuel",
          type: "number",
          defaultValue: 38,
        },
        {
          name: "speed",
          label: "Débit (Mb/s)",
          type: "number",
          defaultValue: 1000,
        },
        {
          name: "provider",
          label: "Opérateur",
          type: "text",
          defaultValue: "",
        },
      ]}
    />
  );
}