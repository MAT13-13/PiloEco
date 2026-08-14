"use client";

import MissionLayout from "../../components/MissionLayout";

export default function GazMissionPage() {
  return (
    <MissionLayout
      icon="🔥"
      title="Optimiser ton contrat de gaz"
      subtitle="Analyse ton contrat actuel et découvre si une solution plus adaptée à ta consommation peut être intéressante."
      basePrice={120}
      recommendedPrice={90}
      recommendedName="Offre gaz adaptée"
      advice="Compare le prix du kWh, l'abonnement, les conditions du contrat et les éventuelles offres combinées électricité + gaz."
      fields={[
        {
          name: "currentProvider",
          label: "Quel est ton fournisseur actuel ?",
          type: "text",
          defaultValue: "",
        },
        {
          name: "monthlyPrice",
          label: "Combien paies-tu actuellement par mois ?",
          type: "number",
          defaultValue: 90,
        },
        {
          name: "housingType",
          label: "Quel logement est concerné ?",
          type: "select",
          defaultValue: "Maison",
          options: [
            "Appartement",
            "Maison",
            "Autre",
          ],
        },
        {
          name: "useType",
          label: "À quoi sert principalement le gaz ?",
          type: "select",
          defaultValue: "Chauffage",
          options: [
            "Chauffage",
            "Eau chaude",
            "Cuisson",
            "Chauffage + eau chaude",
            "Chauffage + eau chaude + cuisson",
            "Autre",
          ],
        },
      ]}
      offerPath="/offres/gaz"
    />
  );
}