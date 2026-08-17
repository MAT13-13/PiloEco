"use client";

import MissionLayout from "../../components/MissionLayout";

export default function ElectriciteMissionPage() {
  return (
    <MissionLayout
      icon="⚡"
      title="Optimiser ton contrat d'électricité"
      subtitle="Pilo t’oriente vers une solution pour vérifier si tu peux réduire ta facture."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Optimisation électricité"
      advice="Consulte la solution proposée et compare le tarif et les conditions avec ton contrat actuel avant de changer."
      offerPath="/offres/electricite"
      fields={[]}
    />
  );
}