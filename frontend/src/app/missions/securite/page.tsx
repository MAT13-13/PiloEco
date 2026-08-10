"use client";

import MissionLayout from "../../components/MissionLayout";

export default function SecuriteMissionPage() {
  return (
    <MissionLayout
      icon="🔐"
      title="Protéger ton logement"
      subtitle="Décris ton besoin et Pilo t'aide à identifier une solution de sécurité adaptée à ton logement."
      basePrice={40}
      recommendedPrice={25}
      recommendedName="Solution de sécurité adaptée"
      advice="Compare le prix de l’abonnement, la durée d’engagement et les équipements inclus avant de choisir une nouvelle solution."
      fields={[
        {
          name: "serviceType",
          label: "Quel service est concerné ?",
          type: "select",
          defaultValue: "Télésurveillance",
          options: [
            "Alarme connectée",
            "Caméras",
            "Détecteurs",
            "Sonnette connectée",
            "Télésurveillance",
            "Autre",
          ],
        },
        {
          name: "housingType",
          label: "Quel logement est concerné ?",
          type: "select",
          defaultValue: "Maison",
          options: [
            "Appartement",
            "Local professionnel",
            "Maison",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget mensuel souhaites-tu prévoir ?",
          type: "number",
          defaultValue: 25,
        },
      ]}
      offerPath="/offres/securite"
    />
  );
}