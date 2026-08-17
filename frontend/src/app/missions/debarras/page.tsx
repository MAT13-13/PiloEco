"use client";

import MissionLayout from "../../components/MissionLayout";
import { getAffiliateCampaignById } from "../../lib/affiliate-campaigns";

export default function DebarrasMissionPage() {
  const debarrasOffer =
    getAffiliateCampaignById(13927);

  const offerDisponible =
    debarrasOffer?.published === true &&
    Boolean(debarrasOffer.trackingUrl);

  return (
    <MissionLayout
      icon="📦"
      title="Organiser un débarras"
      subtitle="Indique simplement le type de lieu à débarrasser."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution de débarras"
      advice="Pilo t’oriente vers une solution partenaire pour obtenir une estimation adaptée à ton besoin."
      fields={[
        {
          name: "propertyType",
          label: "Quel lieu souhaites-tu débarrasser ?",
          type: "select",
          defaultValue: "Maison",
          options: [
            "Maison",
            "Appartement",
            "Cave",
            "Garage",
            "Grenier",
            "Locaux",
            "Autre",
          ],
        },
        ...(offerDisponible
          ? [
              {
                name: "partner",
                label: "Solution partenaire",
                type: "select" as const,
                defaultValue: "Solution de débarras",
                options: ["Solution de débarras"],
              },
            ]
          : []),
      ]}
      dynamicOfferField="partner"
      dynamicOffers={
        offerDisponible && debarrasOffer
          ? {
              "Solution de débarras": {
                href: debarrasOffer.trackingUrl,
                buttonLabel:
                  debarrasOffer.buttonLabel ||
                  "Obtenir une estimation →",
                recommendedName:
                  debarrasOffer.title,
                advice:
                  debarrasOffer.description,
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