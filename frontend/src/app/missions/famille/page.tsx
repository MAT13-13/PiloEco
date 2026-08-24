"use client";

import MissionLayout from "../../components/MissionLayout";

export default function FamilleMissionPage() {
  return (
    <MissionLayout
      icon="👨‍👩‍👧"
      title="Famille & scolarité"
      subtitle="Trouve une solution pour accompagner la scolarité de ton enfant."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Cours Griffon"
      advice="Pilo te propose une solution de cours à distance et de supports pédagogiques adaptée aux enfants du primaire au collège."
      dynamicOfferField="familyNeed"
      dynamicOffers={{
        "Accompagner la scolarité de mon enfant": {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23305836",
          buttonLabel: "Découvrir Cours Griffon →",
          recommendedName: "Cours Griffon",
          advice:
            "Découvre des cours à distance, des vidéos et des supports pédagogiques pour accompagner ton enfant du primaire au collège, en France ou à l’étranger.",
          external: true,
          completionType: "none",
        },
      }}
      fields={[
        {
          name: "children",
          label: "Nombre d’enfants",
          type: "number",
          defaultValue: 1,
        },
        {
          name: "schoolLevel",
          label: "Niveau scolaire",
          type: "select",
          defaultValue: "Primaire",
          options: ["Primaire", "Collège"],
        },
        {
          name: "familyNeed",
          label: "Quel est ton besoin principal ?",
          type: "select",
          defaultValue: "Accompagner la scolarité de mon enfant",
          options: ["Accompagner la scolarité de mon enfant"],
        },
      ]}
      completionType="none"
    />
  );
}