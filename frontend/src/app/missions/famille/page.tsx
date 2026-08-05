"use client";

import MissionLayout from "../../components/MissionLayout";

export default function FamilleMissionPage() {
  return (
    <MissionLayout
      icon="👨‍👩‍👧"
      title="Optimiser ton budget famille"
      subtitle="Pilo analyse les dépenses du foyer et te redirige vers les dispositifs officiels adaptés."
      basePrice={180}
      recommendedPrice={140}
      recommendedName="Budget Famille Éco"
      advice="Selon ta situation, certaines dépenses familiales peuvent être réduites grâce à des aides publiques ou des dispositifs adaptés."
      offerPath="/offres/famille"
      dynamicOfferField="mainExpense"
      dynamicOffers={{
        Activités: {
          href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33680",
          buttonLabel: "Voir les aides aux activités",
          recommendedName: "Activités extrascolaires",
          advice:
            "Découvre les aides possibles pour financer les activités sportives, culturelles ou de loisirs des enfants.",
          external: true,
        },

        Cantine: {
          href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19294",
          buttonLabel: "Voir les aides pour la cantine",
          recommendedName: "Aides à la cantine scolaire",
          advice:
            "Consulte les aides disponibles pour réduire les frais de restauration scolaire selon ta situation et ton quotient familial.",
          external: true,
        },

        Garde: {
          href: "https://www.service-public.gouv.fr/particuliers/vosdroits/N156",
          buttonLabel: "Voir les aides liées aux enfants",
          recommendedName: "Naissance et garde d’enfant",
          advice:
            "Retrouve les informations officielles sur les allocations, la prime à la naissance et les aides liées à la garde d’enfant.",
          external: true,
        },

        Transport: {
          href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1872",
          buttonLabel: "Voir les aides au transport scolaire",
          recommendedName: "Transport scolaire",
          advice:
            "Consulte les informations et les aides disponibles concernant le transport scolaire de tes enfants.",
          external: true,
        },

        Santé: {
          href: "https://www.service-public.gouv.fr/particuliers/recherche?globalSearch=true&keyword=sant%C3%A9",
          buttonLabel: "Rechercher les aides santé",
          recommendedName: "Santé de la famille",
          advice:
            "Accède aux informations officielles concernant la santé, les remboursements, les droits et les aides disponibles.",
          external: true,
        },

        Abonnements: {
          href: "https://www.service-public.gouv.fr/particuliers/recherche?globalSearch=true&keyword=abonnement",
          buttonLabel: "Voir les informations sur les abonnements",
          recommendedName: "Abonnements du foyer",
          advice:
            "Consulte les informations officielles relatives aux abonnements, aux contrats et aux droits des consommateurs.",
          external: true,
        },
      }}
      fields={[
        {
          name: "monthlyPrice",
          label: "Budget mensuel famille",
          type: "number",
          defaultValue: 180,
        },
        {
          name: "children",
          label: "Nombre d’enfants",
          type: "number",
          defaultValue: 1,
        },
        {
          name: "mainExpense",
          label: "Dépense principale",
          type: "select",
          defaultValue: "Activités",
          options: [
            "Activités",
            "Cantine",
            "Garde",
            "Transport",
            "Santé",
            "Abonnements",
          ],
        },
      ]}
    />
  );
}