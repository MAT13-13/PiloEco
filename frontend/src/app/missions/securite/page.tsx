"use client";

import MissionLayout from "../../components/MissionLayout";

export default function SecuriteMissionPage() {
  return (
    <MissionLayout
      icon="🔐"
      title="Protéger ton logement"
      subtitle="Analyse ta solution de sécurité actuelle ou trouve un équipement adapté à ton logement."
      basePrice={40}
      recommendedPrice={25}
      recommendedName="Solution de sécurité adaptée"
      advice="Compare le prix de l’abonnement, la durée d’engagement et les équipements inclus avant de choisir une nouvelle solution."
      fields={[
        {
          name: "contractStatus",
          label: "Quelle est ta situation ?",
          type: "select",
          defaultValue: "J’ai déjà une solution de sécurité",
          options: [
            "J’ai déjà une solution de sécurité",
            "Je cherche une solution de sécurité",
          ],
        },
        {
          name: "provider",
          label: "Quel prestataire ou quelle marque utilises-tu ?",
          type: "text",
          defaultValue: "",
        },
        {
          name: "serviceType",
          label: "Quel service est concerné ?",
          type: "select",
          defaultValue: "Télésurveillance",
          options: [
            "Télésurveillance",
            "Alarme connectée",
            "Caméras",
            "Détecteurs",
            "Sonnette connectée",
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
            "Maison",
            "Local professionnel",
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
      offerPath="/cybersecurite"
    />
  );
}