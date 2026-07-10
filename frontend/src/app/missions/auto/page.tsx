"use client";

import MissionLayout from "../../components/MissionLayout";

export default function AutoMissionPage() {
  return (
    <MissionLayout
      icon="🚗"
      title="Comparer ton assurance auto"
      subtitle="Pilo analyse ton contrat auto pour chercher une offre plus adaptée."
      basePrice={68}
      recommendedPrice={45}
      recommendedName="Assurance Auto Éco"
      advice="Pilo pense que tu peux réduire ta cotisation auto tout en gardant de bonnes garanties."
      offerPath="/offres/auto"
      fields={[
        {
          name: "monthlyPrice",
          label: "Cotisation mensuelle",
          type: "number",
          defaultValue: 68,
        },
        {
          name: "vehicle",
          label: "Véhicule",
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