"use client";

import MissionLayout from "../../components/MissionLayout";

export default function TravauxMissionPage() {
  return (
    <MissionLayout
      icon="🛠️"
      title="Optimiser tes travaux et rénovations"
      subtitle="Décris ton projet et Pilo t'aide à identifier les solutions et aides qui peuvent correspondre à tes travaux."
      basePrice={5000}
      recommendedPrice={4000}
      recommendedName="Projet travaux optimisé"
      advice="Selon ton projet et ton logement, certaines aides ou solutions peuvent permettre de réduire le coût de tes travaux."
      fields={[
        {
          name: "projectType",
          label: "Quel type de travaux souhaites-tu réaliser ?",
          type: "select",
          defaultValue: "Rénovation énergétique",
          options: [
            "Rénovation énergétique",
            "Isolation",
            "Chauffage",
            "Fenêtres",
            "Salle de bain",
            "Cuisine",
            "Peinture et décoration",
            "Aménagement intérieur",
            "Autre",
          ],
        },
        {
          name: "budget",
          label: "Quel est ton budget estimé ?",
          type: "number",
          defaultValue: 5000,
        },
      ]}
      offerPath="/offres/travaux"
    />
  );
}