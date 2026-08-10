"use client";

import MissionLayout from "../../components/MissionLayout";

export default function AssuranceObsequesMissionPage() {
  return (
    <MissionLayout
      icon="🕊️"
      title="Comparer une assurance obsèques"
      subtitle="Pilo t'aide à identifier une solution adaptée pour anticiper le financement et l'organisation de tes obsèques."
      basePrice={35}
      recommendedPrice={25}
      recommendedName="Solution assurance obsèques"
      advice="Le tarif et les garanties dépendent notamment de ton âge, du capital choisi et des conditions du contrat."
      fields={[
        {
          name: "age",
          label: "Quel est ton âge ?",
          type: "number",
          defaultValue: 65,
        },
        {
          name: "monthlyPrice",
          label: "Quel budget mensuel envisages-tu ?",
          type: "number",
          defaultValue: 35,
        },
      ]}
      offerPath="/offres/assurance-obseques"
    />
  );
}