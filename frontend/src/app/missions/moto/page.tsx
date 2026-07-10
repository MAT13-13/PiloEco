"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MotoMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Comparer ton assurance moto"
      subtitle="Pilo recherche une assurance moto moins chère avec des garanties équivalentes."

      basePrice={42}
      recommendedPrice={28}

      recommendedName="Assurance Moto Éco"

      advice="Pilo pense qu'une autre assurance pourrait réduire ta cotisation tout en gardant une bonne protection."

      offerPath="/offres/moto"

      fields={[
        {
          name: "monthlyPrice",
          label: "Cotisation mensuelle",
          type: "number",
          defaultValue: 42,
        },
        {
          name: "moto",
          label: "Moto",
          type: "text",
          defaultValue: "",
        },
        {
          name: "coverage",
          label: "Formule actuelle",
          type: "select",
          defaultValue: "Tous risques",
          options: ["Tiers", "Tiers +", "Tous risques"],
        },
      ]}
    />
  );
}