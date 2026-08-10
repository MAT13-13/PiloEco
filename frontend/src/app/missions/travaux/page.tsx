"use client";

import MissionLayout from "../../components/MissionLayout";

export default function TravauxMissionPage() {
  return (
    <MissionLayout
      icon="🛠️"
      title="Optimiser tes travaux et rénovations"
      subtitle="Décris ton projet et Pilo t'aide à identifier les solutions adaptées à tes travaux."
      basePrice={5000}
      recommendedPrice={4000}
      recommendedName="Projet travaux optimisé"
      advice="Selon ton projet, ton logement et ta situation, Pilo peut identifier différentes solutions adaptées à tes besoins."
      fields={[
        {
          name: "projectType",
          label: "Quel type de travaux souhaites-tu réaliser ?",
          type: "select",
          defaultValue: "Rénovation énergétique",
          options: [
  "Adaptation du logement",
  "Aménagement intérieur",
  "Chauffage",
  "Cuisine",
  "Douche sécurisée",
  "Fenêtres",
  "Isolation",
  "Menuiseries",
  "Monte-escalier",
  "Panneaux photovoltaïques",
  "Peinture et décoration",
  "Pompe à chaleur",
  "Rénovation énergétique",
  "Salle de bain",
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