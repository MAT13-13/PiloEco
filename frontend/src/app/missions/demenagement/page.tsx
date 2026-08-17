"use client";

import MissionLayout from "../../components/MissionLayout";

export default function DemenagementMissionPage() {
  return (
    <MissionLayout
      icon="🚚"
      title="Organiser ton déménagement"
      subtitle="Pilo t’oriente vers une solution partenaire pour obtenir un devis."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Les Gentlemen du Déménagement"
      pricingMode="quote"
      advice="Compare les services inclus et le tarif proposé avant de confirmer ton déménagement."
      fields={[
        {
          name: "moveType",
          label: "Quel service recherches-tu ?",
          type: "select",
          defaultValue: "Déménageur professionnel",
          options: [
            "Déménageur professionnel",
          ],
        },
      ]}
      dynamicOfferField="moveType"
      dynamicOffers={{
        "Déménageur professionnel": {
          href: "https://www.gentlemen-demenagement.com/piloeco",
          buttonLabel: "🚚 Obtenir mon devis avec -8 %",
          recommendedName:
            "Les Gentlemen du Déménagement",
          advice:
            "Profite de l’avantage PiloEco de -8 % sur ton déménagement et demande ton devis directement au partenaire.",
          external: true,
          exclusivePartner: true,
          contactPhone: "+33475460404",
          contactPhoneLabel: "Parler à un conseiller",
          contactCode: "PILO26GDD",
          completionType: "purchase",
          provider: "Les Gentlemen du Déménagement",
          offerName: "Déménagement — avantage PiloEco -8 %",
        },
      }}
      completionType="purchase"
      purchaseLabel="✅ J’ai réalisé mon déménagement"
    />
  );
}