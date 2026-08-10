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
        "Tu vas être redirigé vers Leocare afin d'obtenir un devis personnalisé. Tu restes libre de poursuivre ou non ta demande.",
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
      subtitle="Pilo analyse ton contrat habitation pour vérifier si tu pourrais payer moins cher."
      basePrice={32}
      recommendedPrice={18}
      recommendedName="Comparer ton assurance habitation"
      advice="Pilo estime qu'une économie est possible sur ton assurance habitation. Le tarif définitif dépendra de ton logement, de ta situation et des garanties choisies."
      dynamicOfferField="offer"
      dynamicOffers={dynamicOffers}
      fields={[
        {
          name: "monthlyPrice",
          label: "Cotisation mensuelle",
          type: "number",
          defaultValue: 32,
        },
        {
          name: "surface",
          label: "Surface du logement (m²)",
          type: "number",
          defaultValue: 80,
        },
        {
          name: "status",
          label: "Situation",
          type: "select",
          defaultValue: "Locataire",
          options: [
            "Locataire",
            "Propriétaire",
          ],
        },
        {
          name: "offer",
          label: "Offre partenaire",
          type: "select",
          defaultValue: "Leocare",
          options: partnerOptions,
        },
      ]}
    />
  );
}