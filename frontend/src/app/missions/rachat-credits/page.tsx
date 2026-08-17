"use client";

import MissionLayout from "../../components/MissionLayout";

export default function RachatCreditsMissionPage() {
  return (
    <MissionLayout
  icon="💳"
  title="Réduire tes mensualités de crédits"
  subtitle="Pilo t’oriente vers une solution de regroupement de crédits adaptée à ta situation."
  basePrice={0}
  recommendedPrice={0}
  recommendedName="Solution de rachat de crédits"
  advice="Le regroupement de crédits peut permettre de réduire le montant de tes mensualités. Les conditions et l’acceptation dépendent de ta situation et de l’étude de ton dossier."
  fields={[]}
  offerPath="/offres/rachat-credits"
  inheritAnalysisValues={true}
/>
  );
}