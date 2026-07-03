"use client";

import MissionLayout from "../../components/MissionLayout";

export default function FamilleMissionPage() {
  return (
    <MissionLayout
      icon="👨‍👩‍👧"
      title="Optimiser ton budget famille"
      subtitle="Pilo analyse les dépenses du foyer et les aides possibles."

      basePrice={180}
      recommendedPrice={140}
      recommendedName="Budget Famille Éco"
      advice="Pilo pense que certaines dépenses familiales peuvent être optimisées avec des aides, des abonnements mieux adaptés ou des offres regroupées."

      fields={[
        {
          name: "monthlyPrice",
          label: "Budget mensuel famille",
          type: "number",
          defaultValue: 180,
        },
        {
          name: "children",
          label: "Nombre d'enfants",
          type: "number",
          defaultValue: 1,
        },
        {
          name: "mainExpense",
          label: "Dépense principale",
          type: "select",
          defaultValue: "Activités",
          options: [
            "Activités",
            "Cantine",
            "Garde",
            "Transport",
            "Santé",
            "Abonnements",
          ],
        },
      ]}
    />
  );
}