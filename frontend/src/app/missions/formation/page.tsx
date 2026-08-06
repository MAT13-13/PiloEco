"use client";

import MissionLayout from "../../components/MissionLayout";

export default function FormationMissionPage() {
  return (
    <MissionLayout
      icon="🎓"
      title="Trouver et financer ta formation"
      subtitle="Analyse ton projet de formation et découvre les dispositifs de financement qui peuvent correspondre à ta situation."
      basePrice={1500}
      recommendedPrice={500}
      recommendedName="Formation avec financement"
      advice="Selon ta situation professionnelle, différents dispositifs peuvent participer au financement de ta formation."
      fields={[
        {
          name: "situation",
          label: "Quelle est ta situation actuelle ?",
          type: "select",
          defaultValue: "Salarié",
          options: [
            "Salarié",
            "Demandeur d'emploi",
            "Indépendant",
            "Étudiant",
            "En reconversion professionnelle",
            "Autre",
          ],
        },
        {
          name: "formationType",
          label: "Quel est ton objectif ?",
          type: "select",
          defaultValue: "Reconversion professionnelle",
          options: [
            "Reconversion professionnelle",
            "Développer mes compétences",
            "Obtenir un diplôme",
            "Créer mon entreprise",
            "Changer de métier",
            "Autre",
          ],
        },
        {
          name: "budget",
          label: "Quel est le prix estimé de la formation ?",
          type: "number",
          defaultValue: 1500,
        },
      ]}
      offerPath="/offres/formation"
    />
  );
}