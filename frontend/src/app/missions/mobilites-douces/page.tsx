"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MobilitesDoucesMissionPage() {
  return (
    <MissionLayout
      icon="🚲"
      title="Assurer un vélo ou une nouvelle mobilité"
      subtitle="Choisis le type de véhicule à assurer pour découvrir l’offre Ulygo adaptée."
      basePrice={20}
      recommendedPrice={15}
      recommendedName="Assurance mobilité adaptée"
      advice="Sélectionne ton type de mobilité pour être redirigé vers l’offre Ulygo correspondante."
      fields={[
        {
          name: "mobilityType",
          label: "Quel type de mobilité souhaites-tu assurer ?",
          type: "select",
          defaultValue: "Vélo",
          options: [
            "Trottinette électrique et nouvelles mobilités",
            "Vélo",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget mensuel souhaites-tu consacrer à l’assurance ?",
          type: "select",
          defaultValue: "De 10 € à 20 €",
          options: [
            "Moins de 10 €",
            "De 10 € à 20 €",
            "Plus de 20 €",
          ],
        },
      ]}
      dynamicOfferField="mobilityType"
      dynamicOffers={{
        "Trottinette électrique et nouvelles mobilités": {
          href: "https://dte.ulygo.fr/?P51162958C0F5191&redir=https%3A%2F%2Fulygo.fr%2Fassurance-nouvelles-mobilites-nvei",
          buttonLabel: "Découvrir l’assurance nouvelles mobilités",
          recommendedName:
            "Ulygo – Assurance trottinette et nouvelles mobilités",
          advice:
            "Découvre les garanties Ulygo pour les trottinettes électriques, EDPM et nouvelles mobilités.",
          external: true,
        },

        Vélo: {
          href: "https://dte.ulygo.fr/?P51162958C0F5191&redir=https%3A%2F%2Fulygo.fr%2Fassurance-velo-cycliste",
          buttonLabel: "Découvrir l’assurance vélo",
          recommendedName: "Ulygo – Assurance vélo",
          advice:
            "Découvre les garanties Ulygo pour les vélos musculaires, vélos électriques, VTT, vélos de route et vélos cargo.",
          external: true,
        },
      }}
    />
  );
}