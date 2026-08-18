"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MotoMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Comparer ton assurance moto"
      subtitle="Pilo t’oriente directement vers une solution pour obtenir un devis personnalisé."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Devis personnalisé Leocare"
      advice="Accède à Leocare pour obtenir un tarif selon ton deux-roues, ton profil et les garanties choisies."
      fields={[
        {
          name: "offer",
          label: "Solution proposée",
          type: "select",
          defaultValue: "Leocare",
          options: ["Leocare"],
        },
      ]}
      dynamicOffers={{
        Leocare: {
          href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300138",
          buttonLabel: "Calculer mon tarif chez Leocare",
          recommendedName: "Devis personnalisé Leocare",
          advice:
            "Accède à Leocare pour obtenir un devis personnalisé selon ton deux-roues et tes besoins.",
          external: true,
          completionType: "contract",
          monitoringCategory: "moto",
          provider: "Leocare",
          offerName: "Assurance moto",
        },
      }}
      dynamicOfferField="offer"
    />
  );
}