"use client";

import MissionLayout from "../../components/MissionLayout";

export default function BeauteArtisanatMissionPage() {
  return (
    <MissionLayout
      icon="🌸"
      title="Beauté & créations artisanales"
      subtitle="Découvre des créations artisanales faites avec soin."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Création artisanale"
      advice="Choisis simplement le type de création qui t’intéresse et découvre la solution proposée par Pilo."
      offerPath="/offres/beaute-artisanat"
      fields={[
        {
          name: "creationType",
          label: "Que recherches-tu ?",
          type: "select",
          defaultValue: "Press-on nails personnalisés",
          options: [
            "Press-on nails personnalisés",
            "Bougies artisanales",
            "Savons artisanaux",
          ],
        },
      ]}
    />
  );
}