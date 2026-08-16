"use client";

import MissionLayout from "../../components/MissionLayout";

export default function LocationMeubleeMissionPage() {
  return (
    <MissionLayout
      icon="🏘️"
      title="Gérer ma location meublée"
      subtitle="Réponds à quelques questions pour découvrir une solution adaptée à la gestion comptable et fiscale de ta location meublée."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="Solution comptable LMNP"
      offerPath="/offres/location-meublee"
      advice="Les besoins comptables et fiscaux peuvent varier selon ton activité, ton régime d’imposition et ta situation personnelle."
      fields={[
        {
          name: "situation",
          label: "Où en es-tu dans ton projet ?",
          type: "select",
          defaultValue: "Je loue déjà un logement meublé",
          options: [
            "Je loue déjà un logement meublé",
            "Je vais bientôt louer un logement meublé",
            "Je me renseigne avant de me lancer",
          ],
        },
        {
          name: "locationType",
          label: "Quel type de location est concerné ?",
          type: "select",
          defaultValue: "Location meublée longue durée",
          options: [
            "Location meublée longue durée",
            "Location saisonnière / courte durée",
            "Les deux",
            "Je ne sais pas encore",
          ],
        },
        {
          name: "need",
          label: "De quoi as-tu principalement besoin ?",
          type: "select",
          defaultValue: "Gérer ma comptabilité LMNP",
          options: [
            "Gérer ma comptabilité LMNP",
            "Préparer ma déclaration fiscale",
            "Être accompagné dans mes démarches",
            "Comprendre quel régime choisir",
            "Je ne sais pas encore",
          ],
        },
      ]}
    />
  );
}