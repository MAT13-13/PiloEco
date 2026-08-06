"use client";

import MissionLayout from "../../components/MissionLayout";

export default function MobileMissionPage() {
  return (
    <MissionLayout
      icon="📱"
      title="Comparer ton forfait mobile"
      subtitle="Pilo analyse ton forfait actuel et t’oriente vers une offre mobile adaptée à ton usage."
      analysisCategory="telephone"
      basePrice={45}
      recommendedPrice={15}
      recommendedName="Offre mobile adaptée"
      advice="Compare les forfaits disponibles selon ton budget, ton besoin en données mobiles et le type d’offre recherché."
      fields={[
        {
          name: "monthlyPrice",
          label: "Prix actuel par mois",
          type: "number",
          defaultValue: 45,
        },
        {
          name: "data",
          label: "Internet inclus en Go",
          type: "number",
          defaultValue: 150,
        },
        {
          name: "operator",
          label: "Opérateur actuel",
          type: "select",
          defaultValue: "Orange",
          options: [
            "Bouygues Telecom",
            "B&You",
            "Free Mobile",
            "Lebara",
            "Lyca Mobile",
            "Orange",
            "Prixtel",
            "RED by SFR",
            "SFR",
            "Sosh",
            "YouPrice",
            "Autre",
          ],
        },
        {
          name: "offerType",
          label: "Quel type d’offre recherches-tu ?",
          type: "select",
          defaultValue: "Forfait SIM 1 mois",
          options: [
            "eSIM",
            "Forfait international",
            "Forfait prépayé",
            "Forfait SIM 1 mois",
            "Forfait SIM 24 mois",
          ],
        },
      ]}
      dynamicOfferField="offerType"
      dynamicOffers={{
        eSIM: {
          href: "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fesim%2F",
          buttonLabel: "Découvrir l’eSIM Lyca Mobile",
          recommendedName: "Lyca Mobile – eSIM",
          advice:
            "Découvre l’eSIM Lyca Mobile et vérifie sa compatibilité avec ton téléphone.",
          external: true,
        },

        "Forfait international": {
          href: "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fbundles%2Fforfait-prepaye%2F%23international",
          buttonLabel: "Voir les forfaits internationaux",
          recommendedName: "Lyca Mobile – International",
          advice:
            "Découvre les forfaits adaptés aux appels et aux usages internationaux.",
          external: true,
        },

        "Forfait prépayé": {
          href: "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Ffr%2Fbundles%2Fforfait-prepaye%2F%23forfaits",
          buttonLabel: "Voir les forfaits prépayés",
          recommendedName: "Lyca Mobile – Forfaits prépayés",
          advice:
            "Découvre les offres prépayées Lyca Mobile sans abonnement mobile classique.",
          external: true,
        },

        "Forfait SIM 1 mois": {
          href: "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Fabo%2Ffr%2Fbundles%2Fsim-only-deals%2F%231-mois",
          buttonLabel: "Découvrir les forfaits 1 mois",
          recommendedName: "Lyca Mobile – Forfaits SIM 1 mois",
          advice:
            "Découvre les forfaits SIM Lyca Mobile proposés sur une durée d’un mois.",
          external: true,
        },

        "Forfait SIM 24 mois": {
          href: "https://mkq.lycamobile.fr/?P513AB758C0F52111&redir=https%3A%2F%2Fwww.lycamobile.fr%2Fabo%2Ffr%2Fbundles%2Fsim-only-deals%2F%2324-mois",
          buttonLabel: "Découvrir les forfaits 24 mois",
          recommendedName: "Lyca Mobile – Forfaits SIM 24 mois",
          advice:
            "Découvre les forfaits SIM Lyca Mobile proposés sur une durée de 24 mois.",
          external: true,
        },
      }}
    />
  );
}