"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MutuelleMissionPage() {
  return (
    <MissionLayout
      icon="❤️"
      title="Optimiser ta mutuelle santé"
      subtitle="Analyse ta mutuelle actuelle et découvre si une solution plus adaptée à tes besoins peut être intéressante."
      basePrice={70}
      recommendedPrice={50}
      recommendedName="Mutuelle santé optimisée"
      advice="Compare ton niveau de couverture et ton budget afin d'identifier une solution adaptée à tes besoins."
      fields={[
        {
          name: "situation",
          label: "Quelle est ta situation ?",
          type: "select",
          defaultValue: "Salarié",
          options: [
            "Salarié",
            "Indépendant",
            "Retraité",
            "Étudiant",
            "Sans emploi",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Combien paies-tu actuellement par mois ?",
          type: "number",
          defaultValue: 70,
        },
        {
          name: "priority",
          label: "Quel est ton besoin principal ?",
          type: "select",
          defaultValue: "Soins courants",
          options: [
            "Soins courants",
            "Optique",
            "Dentaire",
            "Hospitalisation",
            "Couverture complète",
          ],
        },
      ]}
      offerPath="/offres/mutuelle"
    />
  );
}