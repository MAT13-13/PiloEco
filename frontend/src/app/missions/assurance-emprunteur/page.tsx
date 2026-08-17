"use client";

import MissionLayout from "../../components/MissionLayout";

const GSELECT_CLIENT_URL =
  "https://client.gselect-assurances.fr/Guillaume_Garnier?indicateur=5216";

const GSELECT_AMBASSADEUR_URL =
  "https://affilie.gselect-assurances.fr/Guillaume_Garnier?indicateur=5216";

export default function AssuranceEmprunteurMissionPage() {
  return (
    <MissionLayout
      icon="🏦"
      title="Optimiser ton assurance emprunteur"
      subtitle="Indique simplement ton besoin et Pilo t’oriente vers la solution adaptée."
      basePrice={0}
      recommendedPrice={0}
      recommendedName="GSelect Assurances"
      advice="Accède au parcours GSelect pour étudier ton assurance emprunteur et obtenir une proposition personnalisée."
      pricingMode="quote"
      selfServiceQuote={true}
      fields={[
        {
          name: "projectType",
          label: "Quel est ton besoin ?",
          type: "select",
          defaultValue: "Changer mon assurance emprunteur",
          options: [
            "Changer mon assurance emprunteur",
            "Assurer un nouveau prêt",
            "Comparer mon assurance actuelle",
          ],
        },
      ]}
      dynamicOfferField="projectType"
      dynamicOffers={{
        "Changer mon assurance emprunteur": {
          href: GSELECT_CLIENT_URL,
          buttonLabel: "Obtenir une étude avec GSelect →",
          recommendedName: "GSelect Assurances",
          advice:
            "Étudie une solution pour remplacer ton assurance emprunteur actuelle.",
          external: true,
          completionType: "none",
        },
        "Assurer un nouveau prêt": {
          href: GSELECT_CLIENT_URL,
          buttonLabel: "Obtenir une étude avec GSelect →",
          recommendedName: "GSelect Assurances",
          advice:
            "Découvre une solution d’assurance emprunteur pour ton nouveau prêt.",
          external: true,
          completionType: "none",
        },
        "Comparer mon assurance actuelle": {
          href: GSELECT_CLIENT_URL,
          buttonLabel: "Comparer avec GSelect →",
          recommendedName: "GSelect Assurances",
          advice:
            "Compare ton assurance actuelle avec une proposition personnalisée.",
          external: true,
          completionType: "none",
        },
      }}
      thirdOfferTitle="💼 Une autre opportunité"
      thirdOffer={{
        href: GSELECT_AMBASSADEUR_URL,
        buttonLabel: "Découvrir le programme Ambassadeur →",
        recommendedName: "Programme Ambassadeur GSelect",
        advice:
          "Découvre le programme Ambassadeur GSelect et ses conditions de rémunération.",
        external: true,
        completionType: "none",
      }}
      completionType="none"
    />
  );
}