"use client";

import MissionLayout from "../../components/MissionLayout";

export default function HabitationMissionPage() {
  return (
    <MissionLayout
      icon="🏠"
      title="Comparer ton assurance habitation"
      subtitle="Pilo compare ton contrat habitation avec les meilleures offres."

      basePrice={32}
      recommendedPrice={18}

      recommendedName="Habitation Éco"

      advice="Pilo pense que ton contrat actuel peut être optimisé tout en conservant un excellent niveau de garanties."

      offerPath="/offres/habitation"

      fields={[
        {
          name: "monthlyPrice",
          label: "Cotisation mensuelle",
          type: "number",
          defaultValue: 32,
        },
        {
          name: "surface",
          label: "Surface du logement (m²)",
          type: "number",
          defaultValue: 80,
        },
        {
          name: "status",
          label: "Situation",
          type: "select",
          defaultValue: "Locataire",
          options: ["Locataire", "Propriétaire"],
        },
      ]}
    />
  );
}