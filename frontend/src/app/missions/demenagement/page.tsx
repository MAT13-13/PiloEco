"use client";

import MissionLayout from "../../components/MissionLayout";

export default function DemenagementMissionPage() {
  return (
    <MissionLayout
      icon="🚚"
      title="Préparer et optimiser ton déménagement"
      subtitle="Choisis le service dont tu as besoin pour mieux maîtriser les dépenses liées à ton déménagement."
      basePrice={900}
      recommendedPrice={900}
      recommendedName="Solution de déménagement adaptée"
      pricingMode="quote"
      advice="Compare les services inclus dans ton devis avant de confirmer ton déménagement."
      fields={[
        {
          name: "moveType",
          label: "Quel service recherches-tu ?",
          type: "select",
          defaultValue: "Déménageur professionnel",
          options: [
            "Déménageur professionnel",
            "Location de camion",
            "Garde-meubles",
            "Cartons et matériel",
            "Changement d’adresse",
            "Autre",
          ],
        },
        {
          name: "distance",
          label: "Quelle distance environ vas-tu parcourir ?",
          type: "number",
          defaultValue: 120,
        },
        {
          name: "estimatedBudget",
          label: "Quel budget as-tu prévu ?",
          type: "number",
          defaultValue: 900,
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
            "Grâce au partenariat PiloEco, bénéficie de 8 % de remise sur ton déménagement avec Les Gentlemen du Déménagement.",
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
      offerPath="/missions"
    />
  );
}