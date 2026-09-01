"use client";

import MissionLayout from "../../components/MissionLayout";

const LEocare_URL =
  "https://track.effiliation.com/servlet/effi.click?id_compteur=23300139";

const ASSURLAND_AUTO_URL =
  "https://www.assurland.com/assurance-voiture/assurance-auto.aspx?partnerlinkid=943HL00&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=auto_conversion_email_CPA_generique";

export default function AutoMissionPage() {
  const partnerOptions = [
    "Leocare",
    "Comparateur Assurland",
  ];

  const dynamicOffers = {
    Leocare: {
      href: LEocare_URL,
      buttonLabel: "Calculer mon tarif chez Leocare",
      recommendedName: "Devis personnalisé Leocare",
      advice:
        "Accède à Leocare pour obtenir un tarif personnalisé selon ton véhicule, ton profil et les garanties choisies.",
      external: true,
    },

    "Comparateur Assurland": {
      href: ASSURLAND_AUTO_URL,
      buttonLabel: "Comparer avec Assurland",
      recommendedName: "Comparateur d’assurances auto Assurland",
      advice:
        "Compare les assurances auto disponibles selon ton véhicule, ton profil et les garanties recherchées.",
      external: true,
    },
  };

  return (
    <MissionLayout
      icon="🚗"
      title="Comparer ton assurance auto"
      subtitle="Choisis simplement la solution que tu souhaites consulter."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution assurance auto"
      advice="Pilo t’oriente vers des partenaires pour obtenir un tarif adapté à ton véhicule et à ton profil."
      dynamicOfferField="offer"
      dynamicOffers={dynamicOffers}
      fields={[
        {
          name: "offer",
          label: "Quelle solution souhaites-tu consulter ?",
          type: "select",
          defaultValue: "Leocare",
          options: partnerOptions,
        },
      ]}
    />
  );
}