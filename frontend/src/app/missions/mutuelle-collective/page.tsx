"use client";

import { Suspense } from "react";
import MissionLayout from "../../components/MissionLayout";

const MUTUELLE_COLLECTIVE_URL =
  "https://www.assurlandpro.com/mutuelle-sante-collective.html?partnerlinkid=120HL03&utm_medium=affiliation&utm_source=PiloEco&utm_campaign=santeco_conversion_email_CPA_generique";

export default function MutuelleCollectiveMissionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="text-slate-300">
              Chargement de la mission...
            </p>
          </div>
        </main>
      }
    >
      <MissionLayout
        icon="👥"
        title="Comparer les mutuelles santé collectives"
        subtitle="Trouve une complémentaire santé collective adaptée à ton entreprise et à tes salariés."
        basePrice={0}
        recommendedPrice={0}
        recommendedName="Assurland Pro – Mutuelle santé collective"
        advice="Compare les garanties, les niveaux de remboursement, la participation employeur et les services proposés aux salariés."
        fields={[
          {
            name: "companySize",
            label: "Combien de salariés souhaites-tu couvrir ?",
            type: "select",
            defaultValue: "1 à 9 salariés",
            options: [
              "1 à 9 salariés",
              "10 à 49 salariés",
              "50 à 249 salariés",
              "250 salariés ou plus",
            ],
          },
          {
            name: "situation",
            label: "Quelle est ta situation actuelle ?",
            type: "select",
            defaultValue: "Première mise en place",
            options: [
              "Première mise en place",
              "Contrat collectif déjà existant",
              "Changement de mutuelle collective",
              "Création prochaine de l’entreprise",
            ],
          },
          {
            name: "priority",
            label: "Quel est ton besoin principal ?",
            type: "select",
            defaultValue: "Comparer les tarifs",
            options: [
              "Comparer les tarifs",
              "Améliorer les garanties",
              "Réduire le coût pour l’entreprise",
              "Mieux couvrir les salariés",
            ],
          },
        ]}
        dynamicOfferResolver={() => "mutuelle-collective"}
        dynamicOffers={{
          "mutuelle-collective": {
            href: MUTUELLE_COLLECTIVE_URL,
            buttonLabel: "Comparer avec Assurland Pro →",
            recommendedName: "Assurland Pro – Mutuelle santé collective",
            advice:
              "Vérifie les garanties obligatoires, les remboursements, les exclusions et la répartition du coût entre l’entreprise et les salariés.",
            external: true,
            completionType: "none",
          },
        }}
        completionType="none"
      />
    </Suspense>
  );
}