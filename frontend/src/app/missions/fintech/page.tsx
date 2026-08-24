"use client";

import MissionLayout from "../../components/MissionLayout";

export default function FintechMissionPage() {
  return (
    <MissionLayout
      icon="💳"
      title="Optimiser tes finances et ton budget"
      subtitle="Analyse les services financiers que tu utilises et identifie les solutions qui peuvent t'aider à mieux gérer ton budget."
      basePrice={20}
      recommendedPrice={10}
      recommendedName="Solution budget optimisée"
      advice="Pilo analyse ton besoin afin de t'orienter vers une solution financière adaptée."
      fields={[
        {
          name: "serviceType",
          label: "Quel service souhaites-tu optimiser ?",
          type: "select",
          defaultValue: "Gestion du budget",
          options: [
            "Crédit immobilier",
            "Épargne",
            "Assurance vie",
            "Gestion du budget",
            "Investissement",
            "Paiements",
            "Rachat de crédits",
            "Regroupement de crédits",
            "Transferts d'argent",
            "Autre",
          ],
        },
        {
          name: "monthlyPrice",
          label: "Combien te coûte actuellement ce service par mois ?",
          type: "number",
          defaultValue: 20,
        },
      ]}
      offerPath="/offres/fintech"
    />
  );
}