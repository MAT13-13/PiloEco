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
      subtitle="Analyse ton assurance de prêt actuelle et découvre si une solution partenaire peut t'aider à réduire son coût."
      basePrice={50}
      recommendedPrice={50}
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
        {
          name: "loanType",
          label: "Quel type de prêt souhaites-tu assurer ?",
          type: "select",
          defaultValue: "Résidence principale",
          options: [
            "Résidence principale",
            "Résidence secondaire",
            "Investissement locatif",
            "Prêt professionnel",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label:
            "Combien te coûte environ ton assurance emprunteur par mois ?",
          type: "number",
          defaultValue: 50,
        },
        {
          name: "partner",
          label: "Solution partenaire",
          type: "select",
          defaultValue: "GSelect Assurances",
          options: ["GSelect Assurances"],
        },
      ]}
      dynamicOfferField="partner"
      dynamicOffers={{
        "GSelect Assurances": {
          href: GSELECT_CLIENT_URL,
          buttonLabel: "Obtenir une étude avec GSelect →",
          recommendedName: "GSelect Assurances",
          advice:
            "Accède au parcours GSelect pour étudier ton assurance emprunteur et obtenir une proposition personnalisée.",
          external: true,
          completionType: "none",
        },
      }}
      thirdOfferTitle="💼 Une autre opportunité avec GSelect"
      thirdOffer={{
        href: GSELECT_AMBASSADEUR_URL,
        buttonLabel: "💼 Découvrir le programme Ambassadeur →",
        recommendedName: "Devenir Ambassadeur GSelect",
        advice:
          "Envie de générer un complément de revenus ? Découvre le programme Ambassadeur GSelect et recommande leurs solutions autour de toi. Consulte les conditions du programme et les modalités de rémunération directement auprès de GSelect.",
        external: true,
        completionType: "none",
      }}
      completionType="none"
    />
  );
}