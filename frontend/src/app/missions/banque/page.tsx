"use client";

import MissionLayout from "../../components/MissionLayout";

export default function BanqueMissionPage() {
  return (
    <MissionLayout
      icon="🏦"
      title="Optimiser tes frais bancaires"
      subtitle="Pilo t’oriente vers une solution pour découvrir une offre bancaire potentiellement plus avantageuse."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Offre bancaire partenaire"
      advice="Découvre la solution proposée et compare ses frais, ses services et ses conditions avec ta banque actuelle."
      fields={[]}
      offerPath="/offres/banque"
    />
  );
}