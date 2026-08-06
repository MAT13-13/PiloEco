"use client";

import MissionLayout from "../../components/MissionLayout";

export default function LogicielsMissionPage() {
  return (
    <MissionLayout
      icon="💻"
      title="Optimiser tes logiciels et abonnements numériques"
      subtitle="Analyse ton logiciel actuel ou trouve une solution plus adaptée à ton besoin."
      basePrice={20}
      recommendedPrice={10}
      recommendedName="Solution logicielle adaptée"
      advice="Compare les fonctions réellement utiles, le nombre d’utilisateurs et le coût mensuel avant de choisir une nouvelle solution."
      fields={[
        {
          name: "contractStatus",
          label: "Quelle est ta situation ?",
          type: "select",
          defaultValue: "J’utilise déjà un logiciel",
          options: [
            "J’utilise déjà un logiciel",
            "Je cherche un logiciel",
          ],
        },
        {
          name: "provider",
          label: "Quel logiciel ou service est concerné ?",
          type: "text",
          defaultValue: "",
        },
        {
          name: "softwareType",
          label: "Quel type de logiciel recherches-tu ?",
          type: "select",
          defaultValue: "Bureautique",
          options: [
            "Bureautique",
            "Design et création",
            "Comptabilité",
            "Gestion de projet",
            "Cybersécurité",
            "Stockage cloud",
            "Communication",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Quel budget mensuel souhaites-tu prévoir ?",
          type: "number",
          defaultValue: 15,
        },
      ]}
      offerPath="/offres/logiciels"
    />
  );
}