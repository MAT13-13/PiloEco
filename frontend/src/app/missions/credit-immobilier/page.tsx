"use client";

import MissionLayout from "../../components/MissionLayout";

export default function CreditImmobilierMissionPage() {
  return (
    <MissionLayout
      icon="🏠"
      title="Optimiser ton crédit immobilier"
      subtitle="Indique le montant de ton projet et Pilo t'oriente vers une solution de courtage adaptée."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution de courtage immobilier"
      advice="Pilo peut t'orienter vers un courtier partenaire pour étudier ton projet. Le taux, les frais et l'acceptation dépendent de ton dossier."
      fields={[
        {
          name: "amount",
          label: "Montant du projet estimé (€)",
          type: "number",
          defaultValue: 200000,
        },
      ]}
      offerPath="/offres/credit-immobilier"
    />
  );
}