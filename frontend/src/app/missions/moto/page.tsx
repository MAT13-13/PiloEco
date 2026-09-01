"use client";

import MissionLayout from "../../components/MissionLayout";

const LEOCARE_MOTO_URL =
  "https://track.effiliation.com/servlet/effi.click?id_compteur=23300138";

const ASSURLAND_MOTO_URL =
  "https://www.assurland.com/assurance-moto-scooter/assurance-moto.aspx?partnerlinkid=943HL04&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=moto_conversion_email_CPA_generique";

export default function MotoMissionPage() {
  return (
    <MissionLayout
      icon="🏍️"
      title="Comparer ton assurance moto"
      subtitle="Choisis une solution pour obtenir un devis ou comparer les assurances adaptées à ton deux-roues."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution assurance moto"
      advice="Compare les garanties, les franchises, les exclusions et les tarifs avant de choisir ton assurance moto."
      fields={[
        {
          name: "offer",
          label: "Quelle solution souhaites-tu consulter ?",
          type: "select",
          defaultValue: "Leocare",
          options: [
            "Leocare",
            "Comparateur Assurland",
          ],
        },
      ]}
      dynamicOffers={{
        Leocare: {
          href: LEOCARE_MOTO_URL,
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

        "Comparateur Assurland": {
          href: ASSURLAND_MOTO_URL,
          buttonLabel: "Comparer avec Assurland",
          recommendedName: "Comparateur d’assurances moto Assurland",
          advice:
            "Compare les assurances moto et scooter disponibles selon ton véhicule, ton profil et les garanties recherchées.",
          external: true,
          completionType: "none",
        },
      }}
      dynamicOfferField="offer"
    />
  );
}