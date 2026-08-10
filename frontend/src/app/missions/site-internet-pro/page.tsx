"use client";

import MissionLayout from "../../components/MissionLayout";

export default function SiteInternetProMissionPage() {
  return (
    <MissionLayout
      icon="🌐"
      title="Créer ou refaire ton site internet professionnel"
      subtitle="Décris ton projet et Pilo t'aide à trouver une solution adaptée pour créer ou moderniser le site internet de ton entreprise."
      basePrice={1500}
      recommendedPrice={1000}
      recommendedName="Solution site internet professionnel"
      advice="Compare le contenu de la prestation, l'hébergement, la maintenance, l'accompagnement et les modalités de paiement avant de choisir."
      fields={[
        {
          name: "projectType",
          label: "Quel est ton projet ?",
          type: "select",
          defaultValue: "Création d'un site",
          options: [
            "Création d'un site",
            "Refonte d'un site existant",
          ],
        },
        {
          name: "siteType",
          label: "Quel type de site souhaites-tu ?",
          type: "select",
          defaultValue: "Site vitrine",
          options: [
            "Site vitrine",
            "Site e-commerce",
            "Site professionnel",
            "Je ne sais pas encore",
          ],
        },
        {
          name: "budget",
          label: "Quel budget souhaites-tu prévoir ?",
          type: "number",
          defaultValue: 1500,
        },
      ]}
      offerPath="/offres/site-internet-pro"
    />
  );
}