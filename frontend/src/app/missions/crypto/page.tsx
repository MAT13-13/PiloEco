"use client";

import MissionLayout from "../../components/MissionLayout";

export default function CryptoMissionPage() {
  return (
    <MissionLayout
      icon="₿"
      title="Explorer les cryptomonnaies"
      subtitle="Pilo t'aide à identifier une solution liée aux crypto-actifs tout en gardant en tête les risques associés."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution crypto"
      advice="Les crypto-actifs sont des placements risqués. Pilo peut t'orienter vers une solution partenaire, mais tu dois vérifier les conditions, les frais et les risques avant toute décision."
      fields={[
        {
          name: "cryptoNeed",
          label: "Quel est ton besoin ?",
          type: "select",
          defaultValue: "Découvrir une plateforme",
          options: [
            "Découvrir une plateforme",
            "Acheter des cryptomonnaies",
            "Investir",
            "Autre",
          ],
        },
      ]}
      offerPath="/offres/crypto"
    />
  );
}