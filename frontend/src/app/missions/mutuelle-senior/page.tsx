"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MutuelleSeniorMissionPage() {
  return (
    <MissionLayout
      icon="👵"
      title="Comparer une mutuelle senior"
      subtitle="Pilo t'aide à identifier une solution de mutuelle adaptée aux besoins des seniors."
      basePrice={90}
      recommendedPrice={70}
      recommendedName="Solution mutuelle senior"
      advice="Le tarif et les garanties dépendent de ton âge, de ta situation et du niveau de couverture choisi."
      fields={[
        {
          name: "age",
          label: "Quel est ton âge ?",
          type: "number",
          defaultValue: 65,
        },
        {
          name: "monthlyPrice",
          label: "Combien paies-tu actuellement par mois ?",
          type: "number",
          defaultValue: 90,
        },
      ]}
      offerPath="/offres/mutuelle-senior"
    />
  );
}