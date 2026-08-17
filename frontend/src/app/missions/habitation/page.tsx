"use client";

import MissionLayout from "../../components/MissionLayout";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function HabitationMissionPage() {
  const habitation91m2 =
    getAffiliateCampaignById(13962);

  const comparateurDisponible =
    habitation91m2?.published === true &&
    Boolean(habitation91m2.trackingUrl);

  const partnerOptions = [
    "Leocare",
    ...(comparateurDisponible
      ? ["Comparateur habitation"]
      : []),
  ];

  const dynamicOffers = {
    Leocare: {
      href: "https://track.effiliation.com/servlet/effi.click?id_compteur=23300140",
      buttonLabel:
        "Calculer mon tarif chez Leocare",
      recommendedName:
        "Devis personnalisé Leocare",
      advice:
        "Accède à Leocare pour obtenir un tarif personnalisé selon ton logement et les garanties choisies.",
      external: true,
    },

    ...(comparateurDisponible &&
    habitation91m2
      ? {
          "Comparateur habitation": {
            href: habitation91m2.trackingUrl,
            buttonLabel:
              habitation91m2.buttonLabel,
            recommendedName:
              habitation91m2.title,
            advice:
              habitation91m2.description,
            external: true,
          },
        }
      : {}),
  };

  return (
    <MissionLayout
      icon="🏠"
      title="Comparer ton assurance habitation"
      subtitle="Choisis simplement la solution que tu souhaites consulter."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution assurance habitation"
      advice="Pilo t’oriente vers une solution partenaire pour obtenir un tarif adapté à ton logement."
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