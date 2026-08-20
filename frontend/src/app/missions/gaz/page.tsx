"use client";

import MissionLayout from "../../components/MissionLayout";

export default function GazMissionPage() {
  return (
    <MissionLayout
      icon="🔥"
      title="Optimiser ton contrat de gaz"
      subtitle="Pilo t’oriente vers une solution pour vérifier si tu peux réduire ta facture."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Offre gaz adaptée"
      advice="Consulte la solution proposée et compare le tarif, l’abonnement et les conditions avec ton contrat actuel avant de changer."
      fields={[]}
      offerPath="https://dte.ohm-energie.com/?P512BA758C0F5191&redir=https%3A%2F%2Fohm-energie.com%2Foffre%2Foffre-gaz"
    />
  );
}