"use client";

import MissionLayout from "../../components/MissionLayout";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function AutoMissionPage() {
  const auto91m2 = getAffiliateCampaignById(13963);

  const comparateurDisponible =
    auto91m2?.published === true &&
    Boolean(auto91m2.trackingUrl);

  const partnerOptions = [
    "Leocare",
    ...(comparateurDisponible
      ? ["Comparateur auto"]
      : []),
  ];

  const dynamicOffers = {
    Leocare: {
      href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300139",
      buttonLabel: "Calculer mon tarif chez Leocare",
      recommendedName: "Devis personnalisé Leocare",
      advice:
        "Accède à Leocare pour obtenir un tarif personnalisé selon ton véhicule, ton profil et les garanties choisies.",
      external: true,
    },

    ...(comparateurDisponible && auto91m2
      ? {
          "Comparateur auto": {
            href: auto91m2.trackingUrl,
            buttonLabel: auto91m2.buttonLabel,
            recommendedName: auto91m2.title,
            advice: auto91m2.description,
            external: true,
          },
        }
      : {}),
  };

  return (
    <MissionLayout
      icon="🚗"
      title="Comparer ton assurance auto"
      subtitle="Choisis simplement la solution que tu souhaites consulter."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution assurance auto"
      advice="Pilo t’oriente vers une solution partenaire pour obtenir un tarif adapté à ton profil."
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