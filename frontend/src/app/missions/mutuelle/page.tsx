"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MutuelleMissionPage() {
  return (
    <MissionLayout
      icon="❤️"
      title="Trouver une mutuelle santé adaptée"
      subtitle="Indique simplement ta situation et ton besoin principal."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Mutuelle santé adaptée"
      advice="Pilo t’oriente vers une solution correspondant à ton profil et à tes priorités de couverture."
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