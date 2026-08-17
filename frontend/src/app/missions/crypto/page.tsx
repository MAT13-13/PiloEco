"use client";

import MissionLayout from "../../components/MissionLayout";

export default function CryptoMissionPage() {
  return (
    <MissionLayout
      icon="₿"
      title="Explorer les cryptomonnaies"
      subtitle="Indique simplement ce que tu recherches."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution crypto"
      advice="Pilo t’oriente vers une solution correspondant à ton besoin. Les crypto-actifs présentent un risque de perte en capital : vérifie les frais, les conditions et les risques avant toute décision."
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