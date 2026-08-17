"use client";

import MissionLayout from "../../components/MissionLayout";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function CreditImmobilierMissionPage() {
  const creditOffer =
    getAffiliateCampaignById(13912);

  const offerDisponible =
    creditOffer?.published === true &&
    Boolean(creditOffer.trackingUrl);

  const partnerOptions = offerDisponible
    ? ["Solution de courtage immobilier"]
    : [];

  return (
    <MissionLayout
      icon="🏠"
      title="Étudier ton crédit immobilier"
      subtitle="Indique simplement le montant de ton projet."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution de courtage immobilier"
      advice="Pilo t’oriente vers un courtier partenaire pour étudier ton financement. Les conditions dépendent de ton dossier."
      fields={[
        {
          name: "amount",
          label: "Montant du projet estimé (€)",
          type: "number",
          defaultValue: 200000,
        },

        ...(offerDisponible
          ? [
              {
                name: "partner",
                label: "Solution partenaire",
                type: "select" as const,
                defaultValue:
                  "Solution de courtage immobilier",
                options: [
                  "Solution de courtage immobilier",
                ],
              },
            ]
          : []),
      ]}
      dynamicOfferField="partner"
      dynamicOffers={
        offerDisponible && creditOffer
          ? {
              "Solution de courtage immobilier": {
                href: creditOffer.trackingUrl,
                buttonLabel:
                  creditOffer.buttonLabel ||
                  "Étudier mon projet →",
                recommendedName:
                  creditOffer.title,
                advice:
                  creditOffer.description,
                external: true,
                completionType: "none",
              },
            }
          : {}
      }
      completionType="none"
    />
  );
}