"use client";

import MissionLayout from "../../components/MissionLayout";

export default function DemenagementMissionPage() {
  return (
    <MissionLayout
      icon="🚚"
      title="Préparer et optimiser ton déménagement"
      subtitle="Choisis le service dont tu as besoin pour mieux maîtriser les dépenses liées à ton déménagement."
      basePrice={900}
      recommendedPrice={700}
      recommendedName="Solution de déménagement adaptée"
      advice="Compare plusieurs prestataires et vérifie précisément les services inclus avant de réserver."
      fields={[
        {
          name: "moveType",
          label: "Quel service recherches-tu ?",
          type: "select",
          defaultValue: "Déménageur professionnel",
          options: [
            "Déménageur professionnel",
            "Location de camion",
            "Garde-meubles",
            "Cartons et matériel",
            "Changement d’adresse",
            "Autre",
          ],
        },
        {
          name: "distance",
          label: "Quelle distance environ vas-tu parcourir ?",
          type: "number",
          defaultValue: 120,
        },
        {
          name: "estimatedBudget",
          label: "Quel budget as-tu prévu ?",
          type: "number",
          defaultValue: 900,
        },
      ]}
      offerPath="/missions"
    />
  );
}